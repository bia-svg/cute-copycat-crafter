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

    const body = await req.json();
    const { topQueries, topPages, sitePages, customPrompt } = body;

    // If customPrompt is provided, use it directly (for weekly report AI analysis)
    let prompt: string;
    if (customPrompt) {
      prompt = customPrompt;
    } else {
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
