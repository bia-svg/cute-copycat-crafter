import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getAccessToken(serviceAccount: any, loginEmail?: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload: any = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/adwords",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  // Domain-wide delegation: impersonate the Google Ads admin user
  if (loginEmail) {
    payload.sub = loginEmail;
  }

  const encode = (obj: any) =>
    btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const headerB64 = encode(header);
  const payloadB64 = encode(payload);
  const unsignedToken = `${headerB64}.${payloadB64}`;

  const pemContents = serviceAccount.private_key
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\n/g, "");
  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const jwt = `${unsignedToken}.${sigB64}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(`Token exchange failed: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    if (!serviceAccountJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not configured");

    const customerId = Deno.env.get("GOOGLE_ADS_CUSTOMER_ID");
    if (!customerId) throw new Error("GOOGLE_ADS_CUSTOMER_ID not configured");

    const developerToken = Deno.env.get("GOOGLE_ADS_DEVELOPER_TOKEN");
    if (!developerToken) throw new Error("GOOGLE_ADS_DEVELOPER_TOKEN not configured — get it from Google Ads Manager Account → Tools → API Center");

    const loginEmail = Deno.env.get("GOOGLE_ADS_LOGIN_EMAIL");

    const serviceAccount = JSON.parse(serviceAccountJson);
    const accessToken = await getAccessToken(serviceAccount, loginEmail || undefined);

    const cleanCustomerId = customerId.replace(/-/g, "");

    const { startDate, endDate } = await req.json().catch(() => ({
      startDate: "2026-01-01",
      endDate: new Date().toISOString().split("T")[0],
    }));

    // Campaign performance query with daily segments
    const query = `
      SELECT
        campaign.name,
        campaign.id,
        campaign.status,
        segments.date,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND campaign.status != 'REMOVED'
      ORDER BY segments.date DESC
    `;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "developer-token": developerToken,
    };

    // If using MCC account, add login-customer-id
    const mccId = Deno.env.get("GOOGLE_ADS_MCC_ID");
    if (mccId) {
      headers["login-customer-id"] = mccId.replace(/-/g, "");
    }

    const adsRes = await fetch(
      `https://googleads.googleapis.com/v18/customers/${cleanCustomerId}/googleAds:searchStream`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ query }),
      }
    );

    // Read raw response first for debugging
    const rawText = await adsRes.text();
    
    if (!adsRes.ok) {
      console.error("Google Ads API raw response:", rawText.substring(0, 500));
      
      // Check if response is HTML (auth failure)
      if (rawText.startsWith("<!DOCTYPE") || rawText.startsWith("<html")) {
        throw new Error("Google Ads API returned HTML — likely auth failure. Check: 1) Developer token is valid 2) Service account has domain-wide delegation 3) GOOGLE_ADS_LOGIN_EMAIL is set to a Google Ads admin email");
      }
      
      throw new Error(`Google Ads API error [${adsRes.status}]: ${rawText.substring(0, 300)}`);
    }

    let adsData;
    try {
      adsData = JSON.parse(rawText);
    } catch {
      throw new Error(`Failed to parse Google Ads response: ${rawText.substring(0, 200)}`);
    }

    // Parse campaign data — aggregate by campaign
    const campaignMap: Record<string, any> = {};
    const dailyMap: Record<string, any> = {};
    const results = Array.isArray(adsData) ? adsData : [adsData];

    for (const batch of results) {
      if (batch.results) {
        for (const result of batch.results) {
          const campId = result.campaign?.id || "";
          const campName = result.campaign?.name || "";
          const date = result.segments?.date || "";
          const impressions = parseInt(result.metrics?.impressions || "0", 10);
          const clicks = parseInt(result.metrics?.clicks || "0", 10);
          const spend = parseInt(result.metrics?.costMicros || "0", 10) / 1_000_000;
          const conversions = parseFloat(result.metrics?.conversions || "0");

          // Aggregate by campaign
          if (!campaignMap[campId]) {
            campaignMap[campId] = {
              id: campId,
              name: campName,
              status: result.campaign?.status || "",
              impressions: 0, clicks: 0, spend: 0, conversions: 0,
            };
          }
          campaignMap[campId].impressions += impressions;
          campaignMap[campId].clicks += clicks;
          campaignMap[campId].spend += spend;
          campaignMap[campId].conversions += conversions;

          // Aggregate by date (for daily paid traffic chart)
          if (!dailyMap[date]) {
            dailyMap[date] = { date, impressions: 0, clicks: 0, spend: 0, conversions: 0 };
          }
          dailyMap[date].impressions += impressions;
          dailyMap[date].clicks += clicks;
          dailyMap[date].spend += spend;
          dailyMap[date].conversions += conversions;
        }
      }
    }

    const campaigns = Object.values(campaignMap);
    const dailyAds = Object.values(dailyMap).sort((a: any, b: any) => a.date.localeCompare(b.date));

    return new Response(JSON.stringify({ campaigns, dailyAds }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Google Ads error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
