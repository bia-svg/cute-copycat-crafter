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
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
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

function shiftDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function diffDays(start: string, end: string): number {
  const a = new Date(start + "T00:00:00Z").getTime();
  const b = new Date(end + "T00:00:00Z").getTime();
  return Math.round((b - a) / 86400000) + 1;
}

async function gscQuery(apiBase: string, headers: Record<string, string>, body: Record<string, unknown>) {
  const r = await fetch(apiBase, { method: "POST", headers, body: JSON.stringify(body) });
  const data = await r.json();
  if (!r.ok) throw new Error(`GSC API error [${r.status}]: ${JSON.stringify(data)}`);
  return data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    if (!serviceAccountJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not configured");

    const siteUrl = Deno.env.get("GSC_SITE_URL");
    if (!siteUrl) throw new Error("GSC_SITE_URL not configured");

    const serviceAccount = JSON.parse(serviceAccountJson);
    const accessToken = await getAccessToken(serviceAccount);

    const { startDate = "2025-01-01", endDate = "2025-12-31" } = await req.json().catch(() => ({}));

    const apiBase = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
    const authHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    // Compute previous comparable period
    const periodLength = diffDays(startDate, endDate);
    const prevEnd = shiftDate(startDate, -1);
    const prevStart = shiftDate(prevEnd, -(periodLength - 1));

    // Run all queries in parallel
    const [
      queriesData,
      pagesData,
      totalsData,
      dailyData,
      countryData,
      deviceData,
      prevTotalsData,
      allKeywordsData,
    ] = await Promise.all([
      gscQuery(apiBase, authHeaders, { startDate, endDate, dimensions: ["query"], rowLimit: 100, dataState: "final" }),
      gscQuery(apiBase, authHeaders, { startDate, endDate, dimensions: ["page"], rowLimit: 50, dataState: "final" }),
      gscQuery(apiBase, authHeaders, { startDate, endDate, dataState: "final" }),
      gscQuery(apiBase, authHeaders, { startDate, endDate, dimensions: ["date"], rowLimit: 500, dataState: "final" }),
      gscQuery(apiBase, authHeaders, { startDate, endDate, dimensions: ["country"], rowLimit: 25, dataState: "final" }),
      gscQuery(apiBase, authHeaders, { startDate, endDate, dimensions: ["device"], rowLimit: 5, dataState: "final" }),
      gscQuery(apiBase, authHeaders, { startDate: prevStart, endDate: prevEnd, dataState: "final" }),
      // For position distribution buckets — fetch top 1000 keywords
      gscQuery(apiBase, authHeaders, { startDate, endDate, dimensions: ["query"], rowLimit: 1000, dataState: "final" }),
    ]);

    const topQueries = (queriesData.rows || []).map((row: any) => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));

    const topPages = (pagesData.rows || []).map((row: any) => ({
      page: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));

    const totals = (totalsData.rows || []).length > 0
      ? {
          clicks: totalsData.rows[0].clicks,
          impressions: totalsData.rows[0].impressions,
          ctr: totalsData.rows[0].ctr,
          position: totalsData.rows[0].position,
        }
      : { clicks: 0, impressions: 0, ctr: 0, position: 0 };

    const previousTotals = (prevTotalsData.rows || []).length > 0
      ? {
          clicks: prevTotalsData.rows[0].clicks,
          impressions: prevTotalsData.rows[0].impressions,
          ctr: prevTotalsData.rows[0].ctr,
          position: prevTotalsData.rows[0].position,
        }
      : { clicks: 0, impressions: 0, ctr: 0, position: 0 };

    const dailyMetrics = (dailyData.rows || []).map((row: any) => ({
      date: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    })).sort((a: any, b: any) => a.date.localeCompare(b.date));

    const byCountry = (countryData.rows || []).map((row: any) => ({
      country: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));

    const byDevice = (deviceData.rows || []).map((row: any) => ({
      device: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));

    // Position distribution buckets
    const allKeywords = allKeywordsData.rows || [];
    const distribution = {
      top3: 0,
      pos4_10: 0,
      pos11_20: 0,
      pos21_plus: 0,
      total: allKeywords.length,
    };
    for (const row of allKeywords) {
      const p = row.position;
      if (p <= 3) distribution.top3++;
      else if (p <= 10) distribution.pos4_10++;
      else if (p <= 20) distribution.pos11_20++;
      else distribution.pos21_plus++;
    }

    return new Response(
      JSON.stringify({
        topQueries,
        topPages,
        totals,
        previousTotals,
        previousPeriod: { startDate: prevStart, endDate: prevEnd },
        dailyMetrics,
        byCountry,
        byDevice,
        distribution,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("GSC error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
