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
    scope: "https://www.googleapis.com/auth/analytics.readonly",
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

    const propertyId = Deno.env.get("GA4_PROPERTY_ID");
    if (!propertyId) throw new Error("GA4_PROPERTY_ID not configured");

    const serviceAccount = JSON.parse(serviceAccountJson);
    const accessToken = await getAccessToken(serviceAccount);

    const { startDate = "90daysAgo", endDate = "today" } = await req.json().catch(() => ({}));

    const apiBase = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
    const authHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    // Report 1: Daily traffic overview
    const reportRes = await fetch(apiBase, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
    });

    const reportData = await reportRes.json();
    if (!reportRes.ok) {
      throw new Error(`GA4 API error [${reportRes.status}]: ${JSON.stringify(reportData)}`);
    }

    const dailyData = (reportData.rows || []).map((row: any) => ({
      date: `${row.dimensionValues[0].value.slice(0, 4)}-${row.dimensionValues[0].value.slice(4, 6)}-${row.dimensionValues[0].value.slice(6, 8)}`,
      visitors: parseInt(row.metricValues[0].value, 10),
      sessions: parseInt(row.metricValues[1].value, 10),
      pageViews: parseInt(row.metricValues[2].value, 10),
      avgSessionDuration: parseFloat(row.metricValues[3].value),
      bounceRate: parseFloat(row.metricValues[4].value),
    }));

    // Report 2: Top pages
    const pagesRes = await fetch(apiBase, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "userEngagementDuration" },
        ],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 15,
      }),
    });

    const pagesData = await pagesRes.json();
    if (!pagesRes.ok) {
      throw new Error(`GA4 Pages API error [${pagesRes.status}]: ${JSON.stringify(pagesData)}`);
    }

    const topPages = (pagesData.rows || []).map((row: any) => {
      const views = parseInt(row.metricValues[0].value, 10);
      const engagementSec = parseFloat(row.metricValues[1].value);
      return {
        path: row.dimensionValues[0].value,
        views,
        avgTimeSeconds: views > 0 ? Math.round(engagementSec / views) : 0,
      };
    });

    // Report 3: Traffic by channel (organic vs paid vs direct)
    const channelRes = await fetch(apiBase, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "date" }, { name: "sessionDefaultChannelGroup" }],
        metrics: [
          { name: "sessions" },
          { name: "activeUsers" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
    });

    const channelData = await channelRes.json();
    let channelBreakdown: any[] = [];
    
    if (channelRes.ok && channelData.rows) {
      // Group by date
      const byDate: Record<string, any> = {};
      for (const row of channelData.rows) {
        const rawDate = row.dimensionValues[0].value;
        const date = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;
        const channel = row.dimensionValues[1].value;
        const sessions = parseInt(row.metricValues[0].value, 10);
        const users = parseInt(row.metricValues[1].value, 10);

        if (!byDate[date]) {
          byDate[date] = { date, organic: 0, paid: 0, direct: 0, referral: 0, social: 0, other: 0 };
        }

        const lc = channel.toLowerCase();
        if (lc.includes("organic")) byDate[date].organic += sessions;
        else if (lc.includes("paid")) byDate[date].paid += sessions;
        else if (lc.includes("direct")) byDate[date].direct += sessions;
        else if (lc.includes("referral")) byDate[date].referral += sessions;
        else if (lc.includes("social")) byDate[date].social += sessions;
        else byDate[date].other += sessions;
      }
      channelBreakdown = Object.values(byDate).sort((a: any, b: any) => a.date.localeCompare(b.date));
    }

    return new Response(JSON.stringify({ dailyData, topPages, channelBreakdown }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("GA4 error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
