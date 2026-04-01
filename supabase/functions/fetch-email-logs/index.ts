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
    const { token, email } = await req.json();

    if (!token || !email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
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
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase
      .from("email_send_log")
      .select("id, message_id, template_name, recipient_email, status, error_message, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw error;

    // Also fetch login logs
    const { data: loginLogs, error: loginErr } = await supabase
      .from("dashboard_login_logs")
      .select("id, email, success, ip_address, user_agent, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (loginErr) console.error("Login logs fetch error:", loginErr);

    return new Response(JSON.stringify({ logs: data, loginLogs: loginLogs || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("fetch-email-logs error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
