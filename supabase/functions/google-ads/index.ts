import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getAccessToken(serviceAccount: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/adwords",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: any) => btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
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

    const serviceAccount = JSON.parse(serviceAccountJson);
    const accessToken = await getAccessToken(serviceAccount);

    // Remove dashes from customer ID
    const cleanCustomerId = customerId.replace(/-/g, "");

    const { startDate = "2026-01-01", endDate = "2026-03-24" } = await req.json().catch(() => ({}));

    // Google Ads API — GAQL query for campaign performance
    const query = `
      SELECT
        campaign.name,
        campaign.id,
        campaign.status,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
        AND campaign.status != 'REMOVED'
    `;

    const adsRes = await fetch(
      `https://googleads.googleapis.com/v18/customers/${cleanCustomerId}/googleAds:searchStream`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "developer-token": Deno.env.get("GOOGLE_ADS_DEVELOPER_TOKEN") || "",
        },
        body: JSON.stringify({ query }),
      }
    );

    const adsData = await adsRes.json();
    if (!adsRes.ok) {
      throw new Error(`Google Ads API error [${adsRes.status}]: ${JSON.stringify(adsData)}`);
    }

    // Parse campaign data from streaming response
    const campaigns: any[] = [];
    const results = Array.isArray(adsData) ? adsData : [adsData];
    
    for (const batch of results) {
      if (batch.results) {
        for (const result of batch.results) {
          campaigns.push({
            id: result.campaign?.id || "",
            name: result.campaign?.name || "",
            status: result.campaign?.status || "",
            impressions: parseInt(result.metrics?.impressions || "0", 10),
            clicks: parseInt(result.metrics?.clicks || "0", 10),
            spend: parseInt(result.metrics?.costMicros || "0", 10) / 1_000_000,
            conversions: parseFloat(result.metrics?.conversions || "0"),
            conversionsValue: parseFloat(result.metrics?.conversionsValue || "0"),
          });
        }
      }
    }

    return new Response(JSON.stringify({ campaigns }), {
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
