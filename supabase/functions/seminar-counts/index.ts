import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, serviceKey);

    // Count seminar registrations grouped by country (extracted from city field)
    // city = "Schweiz" → CH, city = "Deutschland" → DE
    // notes contains the seminar date string
    const { data: leads, error } = await sb
      .from("leads")
      .select("city, notes")
      .eq("form_type", "seminar");

    if (error) throw error;

    // Parse counts per seminar edition (date + country)
    const counts: Record<string, number> = {};
    for (const lead of leads || []) {
      const country = lead.city === "Schweiz" ? "ch" : lead.city === "Deutschland" ? "de" : null;
      if (!country || !lead.notes) continue;
      // Extract seminar date from notes - format: "... | Seminar: Mo-Sa, 11.-16. Mai 2026 | ..."
      const match = lead.notes.match(/Seminar:\s*([^|]+)/);
      if (match) {
        const key = `${country}::${match[1].trim()}`;
        counts[key] = (counts[key] || 0) + 1;
      }
    }

    return new Response(JSON.stringify({ counts }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
