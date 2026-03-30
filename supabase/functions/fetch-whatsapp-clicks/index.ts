import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { startDate, endDate, token, email } = await req.json();

    if (!token || !email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the user is a valid dashboard user
    const users: string[] = [];
    const e1 = Deno.env.get("DASHBOARD_LOGIN_EMAIL");
    if (e1) users.push(e1.toLowerCase().trim());
    const e2 = Deno.env.get("DASHBOARD_LOGIN_EMAIL_2");
    if (e2) users.push(e2.toLowerCase().trim());
    const e3 = Deno.env.get("DASHBOARD_LOGIN_EMAIL_3");
    if (e3) users.push(e3.toLowerCase().trim());

    if (!users.includes(email.toLowerCase().trim())) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Only return non-PII columns (exclude user_agent per DSGVO)
    const { data, error } = await supabase
      .from("whatsapp_clicks")
      .select("id, clicked_at, page_path, utm_source, utm_medium, utm_campaign")
      .gte("clicked_at", startDate)
      .lte("clicked_at", endDate + "T23:59:59")
      .order("clicked_at", { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ clicks: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("fetch-whatsapp-clicks error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
