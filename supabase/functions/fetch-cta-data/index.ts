import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { token, email, days = 30 } = await req.json();

    // Verify dashboard session
    if (!token || !email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const users: string[] = [];
    const e1 = Deno.env.get("DASHBOARD_LOGIN_EMAIL");
    if (e1) users.push(e1.toLowerCase().trim());
    const e2 = Deno.env.get("DASHBOARD_LOGIN_EMAIL_2");
    if (e2) users.push(e2.toLowerCase().trim());
    const e3 = Deno.env.get("DASHBOARD_LOGIN_EMAIL_3");
    if (e3) users.push(e3.toLowerCase().trim());

    if (!users.includes(email.toLowerCase().trim())) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const since = new Date(Date.now() - days * 86400000).toISOString();

    const [viewsRes, clicksRes] = await Promise.all([
      supabase
        .from("page_views")
        .select("page_path, viewed_at")
        .gte("viewed_at", since)
        .order("viewed_at", { ascending: true }),
      supabase
        .from("cta_clicks")
        .select("page_path, destination, clicked_at")
        .gte("clicked_at", since)
        .order("clicked_at", { ascending: true }),
    ]);

    if (viewsRes.error) throw viewsRes.error;
    if (clicksRes.error) throw clicksRes.error;

    return new Response(JSON.stringify({ views: viewsRes.data || [], clicks: clicksRes.data || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
