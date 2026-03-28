import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function getRequiredSecret(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) {
    throw new Error(`${name} not configured`);
  }
  return value;
}

function parseGoogleAdsError(status: number, text: string): Error {
  // FIX 1: Improved HTML detection — covers both <!DOCTYPE and bare <html responses.
  // A 404 HTML response means Google's gateway rejected the request before reaching
  // the Ads service. Most common cause: Google Ads API not enabled in the GCP project
  // that owns the OAuth Client ID, OR the developer token is in "Test Account" mode.
  if (text.startsWith("<!DOCTYPE") || text.startsWith("<html") || text.includes("<title>Error 404")) {
    return new Error(
      "Google Ads API returned an HTML 404 page instead of JSON. " +
      "This means Google's gateway rejected the request before reaching the Ads service. " +
      "To fix this: " +
      "(1) Enable the 'Google Ads API' in your Google Cloud project at console.cloud.google.com → APIs & Services → Library. " +
      "(2) Verify your developer token is at least 'Explorer' level (not 'Test Account') at ads.google.com/aw/apicenter. " +
      "(3) Ensure the OAuth Client ID used to generate GOOGLE_ADS_REFRESH_TOKEN belongs to the same GCP project where the API is enabled."
    );
  }

  try {
    const parsed = JSON.parse(text);
    const details = parsed?.error?.message || parsed?.error?.details?.[0]?.message || text;
    return new Error(`Google Ads API error [${status}]: ${details}`);
  } catch {
    return new Error(`Google Ads API error [${status}]: ${text.substring(0, 300)}`);
  }
}

async function getAccessToken(): Promise<string> {
  const clientId = getRequiredSecret("GOOGLE_ADS_CLIENT_ID");
  const clientSecret = getRequiredSecret("GOOGLE_ADS_CLIENT_SECRET");
  const refreshToken = getRequiredSecret("GOOGLE_ADS_REFRESH_TOKEN");

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

  const tokenText = await tokenRes.text();
  if (!tokenRes.ok) {
    throw new Error(`Token refresh failed: ${tokenText}`);
  }

  const tokenData = JSON.parse(tokenText);
  return tokenData.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const customerId = getRequiredSecret("GOOGLE_ADS_CUSTOMER_ID").replace(/-/g, "");
    const developerToken = getRequiredSecret("GOOGLE_ADS_DEVELOPER_TOKEN");
    const mccId = Deno.env.get("GOOGLE_ADS_MCC_ID")?.trim().replace(/-/g, "") || "";
    const accessToken = await getAccessToken();

    const { startDate, endDate } = await req.json().catch(() => ({
      startDate: "2026-01-01",
      endDate: new Date().toISOString().split("T")[0],
    }));

    // FIX 2: login-customer-id is REQUIRED when authenticating via an MCC account.
    // It must be set on ALL requests (including listAccessibleCustomers), not just the search call.
    // Without it, the API returns USER_PERMISSION_DENIED or silently routes incorrectly.
    const authHeaders: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "developer-token": developerToken,
    };

    if (mccId) {
      authHeaders["login-customer-id"] = mccId;
    }

    // FIX 3: listAccessibleCustomers was being called WITHOUT login-customer-id.
    // Now it reuses authHeaders (which already includes login-customer-id when mccId is set).
    const accessibleRes = await fetch(
      "https://googleads.googleapis.com/v19/customers:listAccessibleCustomers",
      {
        method: "GET",
        headers: authHeaders,
      }
    );

    const accessibleText = await accessibleRes.text();
    if (!accessibleRes.ok) {
      console.error("Accessible customers error:", accessibleText.substring(0, 500));
      throw parseGoogleAdsError(accessibleRes.status, accessibleText);
    }

    const accessibleData = JSON.parse(accessibleText);
    const accessibleCustomers: string[] = Array.isArray(accessibleData.resourceNames)
      ? accessibleData.resourceNames.map((name: string) => name.split("/").pop() || "")
      : [];

    console.log("Accessible customers:", accessibleCustomers.join(", "));
    console.log("Using MCC:", mccId || "none");
    console.log("Using customer:", customerId);

    const hasDirectAccess = accessibleCustomers.includes(customerId);
    const hasMccAccess = !!mccId && accessibleCustomers.includes(mccId);

    if (!hasDirectAccess && !hasMccAccess) {
      throw new Error(
        `The OAuth user behind GOOGLE_ADS_REFRESH_TOKEN does not have access to ad account ${customerId} or MCC ${mccId || "not provided"}. ` +
        `Accessible accounts: [${accessibleCustomers.join(", ")}]. ` +
        `Regenerate the refresh token while logged into the MCC user that manages this account.`
      );
    }

    const query = `
      SELECT
        campaign.name,
        campaign.id,
        campaign.status,
        customer.currency_code,
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

    const adsUrl = `https://googleads.googleapis.com/v19/customers/${customerId}/googleAds:search`;
    console.log("Google Ads request URL:", adsUrl);

    const adsRes = await fetch(adsUrl, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ query, pageSize: 10000 }),
    });

    const adsText = await adsRes.text();
    if (!adsRes.ok) {
      console.error("Google Ads API error:", adsText.substring(0, 500));
      throw parseGoogleAdsError(adsRes.status, adsText);
    }

    const adsData = JSON.parse(adsText);
    const campaignMap: Record<string, any> = {};
    const dailyMap: Record<string, any> = {};
    const currencyCode = adsData.results?.[0]?.customer?.currencyCode || null;

    for (const result of adsData.results || []) {
      const campId = result.campaign?.id || "";
      const campName = result.campaign?.name || "";
      const date = result.segments?.date || "";
      const impressions = parseInt(result.metrics?.impressions || "0", 10);
      const clicks = parseInt(result.metrics?.clicks || "0", 10);
      const spend = parseInt(result.metrics?.costMicros || "0", 10) / 1_000_000;
      const conversions = parseFloat(result.metrics?.conversions || "0");

      if (!campaignMap[campId]) {
        campaignMap[campId] = {
          id: campId,
          name: campName,
          status: result.campaign?.status || "",
          impressions: 0,
          clicks: 0,
          spend: 0,
          conversions: 0,
          currencyCode,
        };
      }

      campaignMap[campId].impressions += impressions;
      campaignMap[campId].clicks += clicks;
      campaignMap[campId].spend += spend;
      campaignMap[campId].conversions += conversions;

      if (!dailyMap[date]) {
        dailyMap[date] = { date, impressions: 0, clicks: 0, spend: 0, conversions: 0, currencyCode };
      }

      dailyMap[date].impressions += impressions;
      dailyMap[date].clicks += clicks;
      dailyMap[date].spend += spend;
      dailyMap[date].conversions += conversions;
    }

    return new Response(
      JSON.stringify({
        campaigns: Object.values(campaignMap),
        dailyAds: Object.values(dailyMap).sort((a: any, b: any) => a.date.localeCompare(b.date)),
        currencyCode,
        accessibleCustomers,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Google Ads error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
