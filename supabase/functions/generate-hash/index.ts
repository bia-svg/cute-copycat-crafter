import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const email = Deno.env.get("DASHBOARD_LOGIN_EMAIL") || "";
  const password = Deno.env.get("DASHBOARD_LOGIN_PASSWORD") || "";

  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");

  const usersJson = JSON.stringify([{ email: email.toLowerCase().trim(), hash }]);

  return new Response(JSON.stringify({ email, hash, usersJson }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
