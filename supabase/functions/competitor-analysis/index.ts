import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

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

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      throw new Error(`AI Gateway error [${aiRes.status}]: ${errText}`);
    }

    const aiData = await aiRes.json();
    const content = aiData.choices?.[0]?.message?.content;

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
