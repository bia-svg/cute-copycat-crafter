import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.4/dist/module/lib/cors.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Auth check
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const { email } = JSON.parse(atob(token.split(".")[1] || "{}"));
    const allowed = [
      Deno.env.get("DASHBOARD_LOGIN_EMAIL"),
      Deno.env.get("DASHBOARD_LOGIN_EMAIL_2"),
      Deno.env.get("DASHBOARD_LOGIN_EMAIL_3"),
    ].filter(Boolean);
    if (!allowed.includes(email)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get("days") || "30", 10);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const since = new Date(Date.now() - days * 86400000).toISOString();

    // Fetch page views
    const { data: views, error: viewsErr } = await supabase
      .from("page_views")
      .select("page_path, viewed_at")
      .gte("viewed_at", since)
      .order("viewed_at", { ascending: true });

    if (viewsErr) throw viewsErr;

    // Fetch CTA clicks
    const { data: clicks, error: clicksErr } = await supabase
      .from("cta_clicks")
      .select("page_path, destination, clicked_at")
      .gte("clicked_at", since)
      .order("clicked_at", { ascending: true });

    if (clicksErr) throw clicksErr;

    return new Response(JSON.stringify({ views: views || [], clicks: clicks || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
