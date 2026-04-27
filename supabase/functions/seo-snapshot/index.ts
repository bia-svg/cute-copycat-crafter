// Weekly SEO snapshot — captures GSC metrics into seo_snapshots table for long-term history.
// Triggered by pg_cron every Monday at 03:00 UTC.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function shiftDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) throw new Error("Supabase env vars missing");

    const supabase = createClient(supabaseUrl, serviceKey);

    // Snapshot of last 28 days (rolling window — recommended by Google for stable trend tracking)
    const today = new Date().toISOString().slice(0, 10);
    const endDate = shiftDate(today, -3); // GSC has ~3 day lag
    const startDate = shiftDate(endDate, -27);

    // Call GSC function
    const { data: gsc, error: gscErr } = await supabase.functions.invoke("google-search-console", {
      body: { startDate, endDate },
    });
    if (gscErr) throw gscErr;
    if (gsc?.error) throw new Error(gsc.error);

    const snapshotDate = today;
    const totals = gsc.totals || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const dist = gsc.distribution || { top3: 0, pos4_10: 0, pos11_20: 0, pos21_plus: 0, total: 0 };

    const row = {
      snapshot_date: snapshotDate,
      period_start: startDate,
      period_end: endDate,
      clicks: Math.round(totals.clicks || 0),
      impressions: Math.round(totals.impressions || 0),
      ctr: Number((totals.ctr || 0).toFixed(6)),
      position: Number((totals.position || 0).toFixed(3)),
      keywords_top3: dist.top3,
      keywords_4_10: dist.pos4_10,
      keywords_11_20: dist.pos11_20,
      keywords_21_plus: dist.pos21_plus,
      total_keywords: dist.total,
      top_queries: (gsc.topQueries || []).slice(0, 25),
      top_pages: (gsc.topPages || []).slice(0, 25),
      metadata: {
        previousTotals: gsc.previousTotals,
        byCountry: gsc.byCountry,
        byDevice: gsc.byDevice,
      },
    };

    // Upsert by snapshot_date (avoid duplicates if cron retries)
    const { error: upsertErr } = await supabase
      .from("seo_snapshots")
      .upsert(row as never, { onConflict: "snapshot_date" });

    if (upsertErr) throw upsertErr;

    return new Response(
      JSON.stringify({ success: true, snapshot_date: snapshotDate, period: `${startDate} → ${endDate}` }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("SEO snapshot error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
