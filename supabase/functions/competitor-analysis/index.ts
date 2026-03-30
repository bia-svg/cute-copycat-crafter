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

    const { topQueries } = await req.json();

    if (!topQueries || !Array.isArray(topQueries) || topQueries.length === 0) {
      throw new Error("topQueries is required and must not be empty");
    }

    const topKeywords = topQueries.slice(0, 30).map((q: any) => q.query);

    const prompt = `You are an expert SEO competitor analyst for the hypnotherapy market in DACH (Germany, Austria, Switzerland).

The website david-j-woods.com offers:
- Hypnotherapy sessions (smoking, anxiety, weight loss, stress, depression, children)
- Aktiv-Hypnose© training/certification (Ausbildung) in Augsburg, Zürich, Eschenbach
- Corporate coaching & seminars
- Serves DE and CH markets

Here are the top keywords this website ranks for in Google:
${JSON.stringify(topKeywords)}

Based on your knowledge of the DACH hypnotherapy market, provide a comprehensive competitor analysis. For each competitor:
1. Their website URL
2. Which of these keywords they likely rank for
3. Their estimated position range for those keywords
4. Their pricing (if known from your training data — typical session prices, seminar prices)
5. Their country/city
6. Their key differentiators and strengths
7. Opportunities where david-j-woods.com can outperform them

Also identify:
- Market gaps that no competitor is filling
- Pricing benchmarks for the DACH hypnotherapy market
- Content strategies competitors use that work well

Return ONLY valid JSON:
{
  "competitors": [
    {
      "name": "",
      "website": "",
      "country": "",
      "city": "",
      "sharedKeywords": [""],
      "estimatedPositions": {"keyword": "position range"},
      "pricing": {
        "sessionPrice": "",
        "seminarPrice": "",
        "currency": ""
      },
      "strengths": [""],
      "weaknesses": [""],
      "threatLevel": "high|medium|low"
    }
  ],
  "marketGaps": [
    {"gap": "", "opportunity": "", "difficulty": "easy|medium|hard"}
  ],
  "pricingBenchmarks": {
    "sessionRange": {"min": "", "max": "", "average": "", "currency": ""},
    "seminarRange": {"min": "", "max": "", "average": "", "currency": ""},
    "trainingRange": {"min": "", "max": "", "average": "", "currency": ""}
  },
  "contentStrategies": [
    {"strategy": "", "usedBy": [""], "effectiveness": ""}
  ],
  "summary": "",
  "lastUpdated": "AI analysis based on training data — not real-time SERP data"
}`;

    const vertexUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/gemini-2.5-flash:generateContent`;

    const aiRes = await fetch(vertexUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: prompt }] },
        ],
        generationConfig: {
          temperature: 0.4,
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

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      analysis = { raw: content, parseError: true };
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Competitor analysis error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
