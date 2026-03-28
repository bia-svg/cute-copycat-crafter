import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getAccessToken(): Promise<string> {
  const clientId = Deno.env.get("GOOGLE_ADS_CLIENT_ID");
  const clientSecret = Deno.env.get("GOOGLE_ADS_CLIENT_SECRET");
  const refreshToken = Deno.env.get("GOOGLE_ADS_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing OAuth2 credentials (CLIENT_ID, CLIENT_SECRET, or REFRESH_TOKEN)");
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(`Token refresh failed: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const customerId = Deno.env.get("GOOGLE_ADS_CUSTOMER_ID");
    if (!customerId) throw new Error("GOOGLE_ADS_CUSTOMER_ID not configured");

    const developerToken = Deno.env.get("GOOGLE_ADS_DEVELOPER_TOKEN");
    if (!developerToken) throw new Error("GOOGLE_ADS_DEVELOPER_TOKEN not configured");

    const accessToken = await getAccessToken();
    const cleanCustomerId = customerId.replace(/-/g, "");

    const { startDate, endDate } = await req.json().catch(() => ({
      startDate: "2026-01-01",
      endDate: new Date().toISOString().split("T")[0],
    }));

    const query = `
      SELECT
        campaign.name, campaign.id, campaign.status,
        segments.date,
        metrics.impressions, metrics.clicks, metrics.cost_micros,
        metrics.conversions, metrics.conversions_value
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

    const mccId = Deno.env.get("GOOGLE_ADS_MCC_ID");
    if (mccId) {
      headers["login-customer-id"] = mccId.replace(/-/g, "");
    }

    const adsRes = await fetch(
      `https://googleads.googleapis.com/v18/customers/${cleanCustomerId}/googleAds:searchStream`,
      { method: "POST", headers, body: JSON.stringify({ query }) }
    );

    const rawText = await adsRes.text();

    if (!adsRes.ok) {
      console.error("Google Ads API error:", rawText.substring(0, 500));
      if (rawText.startsWith("<!DOCTYPE") || rawText.startsWith("<html")) {
        throw new Error("Google Ads API returned HTML — auth failure. Verify OAuth2 credentials and developer token.");
      }
      throw new Error(`Google Ads API error [${adsRes.status}]: ${rawText.substring(0, 300)}`);
    }

    let adsData;
    try {
      adsData = JSON.parse(rawText);
    } catch {
      throw new Error(`Failed to parse response: ${rawText.substring(0, 200)}`);
    }

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

          if (!campaignMap[campId]) {
            campaignMap[campId] = { id: campId, name: campName, status: result.campaign?.status || "", impressions: 0, clicks: 0, spend: 0, conversions: 0 };
          }
          campaignMap[campId].impressions += impressions;
          campaignMap[campId].clicks += clicks;
          campaignMap[campId].spend += spend;
          campaignMap[campId].conversions += conversions;

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
