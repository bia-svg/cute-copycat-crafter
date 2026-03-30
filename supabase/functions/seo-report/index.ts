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
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

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
  if (!tokenRes.ok) throw new Error(`Token exchange failed: ${JSON.stringify(tokenData)}`);
  return tokenData.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    if (!serviceAccountJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not configured");

    const serviceAccount = JSON.parse(serviceAccountJson);
    const accessToken = await getAccessToken(serviceAccount);
    const projectId = serviceAccount.project_id;

    const { topQueries, topPages, sitePages } = await req.json();

    if (!topQueries || !Array.isArray(topQueries)) {
      throw new Error("topQueries is required");
    }

    const prompt = `You are an SEO expert analyzing Google Search Console data for a hypnotherapy practice website (david-j-woods.com).

The practice offers:
- Smoking cessation (Raucherentwöhnung)
- Anxiety & phobias (Ängste & Phobien)
- Weight loss (Abnehmen)
- Stress & burnout
- Depression & trauma
- Children & teens therapy
- Corporate coaching
- Hypnotherapy training/certification (Ausbildung) - teaching Aktiv-Hypnose©
- Seminars

The site serves Germany and Switzerland markets, in German and English.

Here are the top 50 search queries bringing traffic:
${JSON.stringify(topQueries, null, 2)}

Here are the top pages by search performance:
${JSON.stringify(topPages, null, 2)}

Existing pages on the site: ${JSON.stringify(sitePages || [])}

Please analyze this data and provide:

1. **Quick Wins** (3-5): Keywords with high impressions but low CTR or position 5-20 that could be optimized with small changes (title tags, meta descriptions, content updates).

2. **New Page Opportunities** (3-5): Keywords or topics that are driving impressions but have no dedicated page. Suggest specific page URLs, titles, and content outlines.

3. **Content Gaps**: Topics related to the practice that aren't showing up at all but should be targeted.

4. **Position Tracking Alerts**: Keywords that dropped or are at risk (position > 10 with good impressions).

5. **Actionable Recommendations**: Prioritized list of 5 specific actions to take this month.

Format your response as a structured JSON with these sections. Use German for page titles/URLs since the primary market is DACH. Include English suggestions for the /en/ versions where relevant.

Return ONLY valid JSON with this structure:
{
  "quickWins": [{"keyword": "", "currentPosition": 0, "impressions": 0, "ctr": 0, "action": "", "expectedImpact": ""}],
  "newPages": [{"suggestedUrl": "", "title": "", "targetKeywords": [], "contentOutline": "", "estimatedTraffic": ""}],
  "contentGaps": [{"topic": "", "reasoning": "", "suggestedApproach": ""}],
  "positionAlerts": [{"keyword": "", "position": 0, "impressions": 0, "risk": ""}],
  "recommendations": [{"priority": 1, "action": "", "expectedResult": "", "effort": ""}],
  "summary": ""
}`;

    // Use Vertex AI Gemini API via service account
    const vertexUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/gemini-2.5-flash:generateContent`;

    const aiRes = await fetch(vertexUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      throw new Error(`Vertex AI error [${aiRes.status}]: ${errText}`);
    }

    const aiData = await aiRes.json();
    const content = aiData.candidates?.[0]?.content?.parts?.[0]?.text;

    let report;
    try {
      report = JSON.parse(content);
    } catch {
      report = { raw: content, parseError: true };
    }

    return new Response(JSON.stringify({ report }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("SEO report error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
