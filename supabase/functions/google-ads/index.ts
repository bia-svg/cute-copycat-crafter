import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function getRequiredSecret(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) {
    throw new Error(`Secret '${name}' not configured in Supabase Edge Function secrets.`);
  }
  return value;
}

function parseGoogleAdsError(status: number, text: string, context: string): Error {
  // HTML 404 = Google's gateway rejected the request before reaching the Ads service.
  // Possible causes (in order of likelihood):
  //   1. OAuth scope is missing 'https://www.googleapis.com/auth/adwords' — the refresh
  //      token was generated without the Ads scope, so the access token doesn't carry it.
  //   2. The GCP project that owns the OAuth Client ID is different from the one where
  //      the Google Ads API is enabled (DEVELOPER_TOKEN_PROHIBITED scenario).
  //   3. Developer token is in 'Test Account' mode and the account is a production account.
  if (
    text.startsWith("<!DOCTYPE") ||
    text.startsWith("<html") ||
    text.includes("<title>Error 404") ||
    text.includes("That's an error")
  ) {
    return new Error(
      `[${context}] Google Ads API returned HTML 404 — request was rejected at Google's gateway. ` +
      `Checklist: ` +
      `(A) The refresh token MUST have been generated with scope 'https://www.googleapis.com/auth/adwords'. ` +
      `If it was generated for another scope (e.g. Analytics only), regenerate it with the Ads scope. ` +
      `(B) The GCP project that owns GOOGLE_ADS_CLIENT_ID must be the SAME project where Google Ads API is enabled. ` +
      `(C) Developer token must be at least 'Explorer' level (not 'Test Account') to access production accounts. ` +
      `Check ads.google.com/aw/apicenter for the current access level.`
    );
  }

  try {
    const parsed = JSON.parse(text);
    const details =
      parsed?.error?.message ||
      parsed?.error?.details?.[0]?.message ||
      parsed?.error?.errors?.[0]?.message ||
      text;
    return new Error(`[${context}] Google Ads API error [${status}]: ${details}`);
  } catch {
    return new Error(`[${context}] Google Ads API error [${status}]: ${text.substring(0, 400)}`);
  }
}

async function getAccessToken(): Promise<{ accessToken: string; scopes: string }> {
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
    throw new Error(`Token refresh failed [${tokenRes.status}]: ${tokenText}`);
  }

  const tokenData = JSON.parse(tokenText);

  if (!tokenData.access_token) {
    throw new Error(`Token refresh returned no access_token. Response: ${tokenText}`);
  }

  // Introspect the token to confirm it carries the Ads scope.
  // A missing 'https://www.googleapis.com/auth/adwords' scope is a common cause of 404 HTML.
  let scopes = tokenData.scope || "scope_not_returned_by_token_endpoint";

  try {
    const introspectRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${tokenData.access_token}`
    );
    if (introspectRes.ok) {
      const introspectData = await introspectRes.json();
      scopes = introspectData.scope || scopes;
    }
  } catch {
    // Non-fatal: introspection is diagnostic only
  }

  return { accessToken: tokenData.access_token, scopes };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const customerId = getRequiredSecret("GOOGLE_ADS_CUSTOMER_ID").replace(/-/g, "");
    const developerToken = getRequiredSecret("GOOGLE_ADS_DEVELOPER_TOKEN");
    const mccId = Deno.env.get("GOOGLE_ADS_MCC_ID")?.trim().replace(/-/g, "") || "";

    const { accessToken, scopes } = await getAccessToken();

    // Diagnostic: log which scopes the token actually carries.
    // If 'adwords' is not present, the 404 HTML is caused by a missing scope.
    const hasAdsScope = scopes.includes("adwords");
    console.log("Token scopes:", scopes);
    console.log("Has adwords scope:", hasAdsScope);

    if (!hasAdsScope) {
      throw new Error(
        `The access token does NOT include the Google Ads scope ('https://www.googleapis.com/auth/adwords'). ` +
        `Current scopes: [${scopes}]. ` +
        `You must regenerate GOOGLE_ADS_REFRESH_TOKEN using the OAuth flow with scope=https://www.googleapis.com/auth/adwords. ` +
        `This is the most likely cause of the HTML 404 error.`
      );
    }

    const { startDate, endDate } = await req.json().catch(() => ({
      startDate: "2026-01-01",
      endDate: new Date().toISOString().split("T")[0],
    }));

    console.log("Using MCC:", mccId || "none");
    console.log("Using customer:", customerId);
    console.log("developer-token length:", developerToken.length);
    console.log("developer-token first 4 chars:", developerToken.substring(0, 4));

    // Diagnostic: DNS/connectivity check
    try {
      const dnsCheck = await fetch("https://googleads.googleapis.com/", { method: "GET" });
      console.log(`DNS/base check: status=${dnsCheck.status}`);
    } catch (e) {
      console.error("DNS/base check FAILED:", e);
    }

    // Step 1: List accessible customers using v20 (current latest)
    const listHeaders: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": developerToken,
    };

    const apiVersion = "v20";
    const listUrl = `https://googleads.googleapis.com/${apiVersion}/customers:listAccessibleCustomers`;
    console.log(`Calling listAccessibleCustomers with ${apiVersion}...`);
    console.log("Request headers:", JSON.stringify({ ...listHeaders, Authorization: "Bearer [REDACTED]" }));
    
    const accessibleRes = await fetch(listUrl, { method: "GET", headers: listHeaders });
    const accessibleText = await accessibleRes.text();
    console.log(`${apiVersion} status: ${accessibleRes.status}`);
    console.log(`Response headers:`, JSON.stringify(Object.fromEntries(accessibleRes.headers.entries())));
    console.log(`Response body (first 500):`, accessibleText.substring(0, 500));

    if (!accessibleRes || !accessibleRes.ok) {
      console.error("listAccessibleCustomers error body:", accessibleText.substring(0, 800));
      throw parseGoogleAdsError(accessibleRes?.status || 500, accessibleText, "listAccessibleCustomers");
    }

    const accessibleData = JSON.parse(accessibleText);
    const accessibleCustomers: string[] = Array.isArray(accessibleData.resourceNames)
      ? accessibleData.resourceNames.map((name: string) => name.split("/").pop() || "")
      : [];

    console.log("Accessible customers:", accessibleCustomers.join(", "));

    const hasDirectAccess = accessibleCustomers.includes(customerId);
    const hasMccAccess = !!mccId && accessibleCustomers.includes(mccId);

    if (!hasDirectAccess && !hasMccAccess) {
      throw new Error(
        `The OAuth user behind GOOGLE_ADS_REFRESH_TOKEN does not have access to ad account ${customerId} or MCC ${mccId || "not provided"}. ` +
        `Accessible accounts: [${accessibleCustomers.join(", ")}]. ` +
        `Regenerate the refresh token while logged into the MCC user that manages this account.`
      );
    }

    // Step 2: Query campaign performance
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

    // Build auth headers for campaign query (needs Content-Type + login-customer-id)
    const queryHeaders: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "developer-token": developerToken,
    };
    if (mccId) {
      queryHeaders["login-customer-id"] = mccId;
    }

    console.log("Query headers (redacted):", JSON.stringify({ ...queryHeaders, Authorization: "Bearer [REDACTED]" }));

    // The accessible accounts are listed — try the configured customer first,
    // if 403 try each other accessible non-MCC account
    const customerCandidates = [customerId, ...accessibleCustomers.filter(c => c !== customerId)];
    let adsRes: Response | null = null;
    let adsText = "";
    let usedCustomerId = customerId;

    for (const candidateId of customerCandidates) {
      const adsUrl = `https://googleads.googleapis.com/${apiVersion}/customers/${candidateId}/googleAds:search`;
      console.log(`Trying campaign search for customer ${candidateId}...`);

      adsRes = await fetch(adsUrl, {
        method: "POST",
        headers: queryHeaders,
        body: JSON.stringify({ query, pageSize: 10000 }),
      });

      adsText = await adsRes.text();
      if (adsRes.ok) {
        usedCustomerId = candidateId;
        console.log(`Success with customer ${candidateId}`);
        break;
      }
      console.warn(`Customer ${candidateId} returned ${adsRes.status}: ${adsText.substring(0, 200)}`);
    }

    if (!adsRes || !adsRes.ok) {
      console.error("googleAds:search final error body:", adsText.substring(0, 800));
      throw parseGoogleAdsError(adsRes?.status || 500, adsText, "googleAds:search");
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
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
