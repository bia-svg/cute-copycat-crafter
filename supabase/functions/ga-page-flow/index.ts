import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function getAccessToken(sa: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const enc = (o: any) => btoa(JSON.stringify(o)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const header = enc({ alg: "RS256", typ: "JWT" });
  const payload = enc({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now, exp: now + 3600,
  });
  const unsigned = `${header}.${payload}`;
  const pem = sa.private_key.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\n/g, "");
  const bin = Uint8Array.from(atob(pem), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", bin, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const jwt = `${unsigned}.${sigB64}`;
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`Token: ${JSON.stringify(d)}`);
  return d.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { pagePath, startDate = "30daysAgo", endDate = "today" } = await req.json();
    if (!pagePath) throw new Error("pagePath required");

    const sa = JSON.parse(Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON")!);
    const propId = Deno.env.get("GA4_PROPERTY_ID")!;
    const token = await getAccessToken(sa);
    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propId}:runReport`;
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    // 1) Page summary (entrances, exits, sessions)
    const summaryRes = await fetch(url, {
      method: "POST", headers,
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "sessions" },
          { name: "entrances" },
          { name: "userEngagementDuration" },
          { name: "bounceRate" },
        ],
        dimensionFilter: { filter: { fieldName: "pagePath", stringFilter: { matchType: "EXACT", value: pagePath } } },
      }),
    });
    const summaryData = await summaryRes.json();
    const sRow = summaryData.rows?.[0];
    const summary = sRow ? {
      pageViews: parseInt(sRow.metricValues[0].value, 10),
      sessions: parseInt(sRow.metricValues[1].value, 10),
      entrances: parseInt(sRow.metricValues[2].value, 10),
      engagementSec: parseFloat(sRow.metricValues[3].value),
      bounceRate: parseFloat(sRow.metricValues[4].value),
    } : null;

    // 2) Where do they go NEXT? — pages whose pageReferrer matches this path
    const nextRes = await fetch(url, {
      method: "POST", headers,
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }, { name: "userEngagementDuration" }],
        dimensionFilter: {
          filter: {
            fieldName: "pageReferrer",
            stringFilter: { matchType: "CONTAINS", value: pagePath },
          },
        },
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 25,
      }),
    });
    const nextData = await nextRes.json();
    const nextPages = (nextData.rows || [])
      .map((r: any) => ({
        path: r.dimensionValues[0].value,
        views: parseInt(r.metricValues[0].value, 10),
        engagementSec: parseFloat(r.metricValues[1].value),
      }))
      .filter((p: any) => p.path !== pagePath);

    // 3) Where did they COME FROM? — top referrer pages landing here
    const fromRes = await fetch(url, {
      method: "POST", headers,
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pageReferrer" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: { filter: { fieldName: "pagePath", stringFilter: { matchType: "EXACT", value: pagePath } } },
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 15,
      }),
    });
    const fromData = await fromRes.json();
    const fromSources = (fromData.rows || []).map((r: any) => ({
      referrer: r.dimensionValues[0].value || "(direct/none)",
      views: parseInt(r.metricValues[0].value, 10),
    }));

    // 4) Events triggered on the page (e.g. whatsapp_click, generate_lead)
    const eventsRes = await fetch(url, {
      method: "POST", headers,
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: { filter: { fieldName: "pagePath", stringFilter: { matchType: "EXACT", value: pagePath } } },
        orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
        limit: 20,
      }),
    });
    const eventsData = await eventsRes.json();
    const events = (eventsData.rows || []).map((r: any) => ({
      name: r.dimensionValues[0].value,
      count: parseInt(r.metricValues[0].value, 10),
    }));

    return new Response(JSON.stringify({ summary, nextPages, fromSources, events }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("ga-page-flow error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
