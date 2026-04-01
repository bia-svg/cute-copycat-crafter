import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Hash password using Web Crypto API (SHA-256)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action } = body;

    // Password reset request
    if (action === "request_reset") {
      const { email } = body;
      if (!email) {
        return new Response(JSON.stringify({ error: "Missing email" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const usersJson = Deno.env.get("DASHBOARD_USERS");
      if (!usersJson) throw new Error("DASHBOARD_USERS not configured");
      const users: Array<{ email: string; hash: string }> = JSON.parse(usersJson);
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

      // Always return success to prevent email enumeration
      if (!user) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Generate a temporary password (6 chars)
      const tempPassword = Array.from(crypto.getRandomValues(new Uint8Array(3)))
        .map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();

      // Hash and update the user's password in-memory
      // Note: For now, we'll send the temp password via response (to be emailed later when email infra is ready)
      // The actual email sending will be added once email domain is configured
      console.log(`Password reset requested for ${email}. Temp password would be: ${tempPassword}`);

      return new Response(JSON.stringify({
        success: true,
        message: "If the email exists, a reset link has been sent.",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default: login
    const { email, password } = body;
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build list of allowed users from env vars
    const users = [];
    const e1 = Deno.env.get("DASHBOARD_LOGIN_EMAIL");
    const p1 = Deno.env.get("DASHBOARD_LOGIN_PASSWORD");
    if (e1 && p1) users.push({ email: e1, password: p1 });

    const e2 = Deno.env.get("DASHBOARD_LOGIN_EMAIL_2");
    const p2 = Deno.env.get("DASHBOARD_LOGIN_PASSWORD_2");
    if (e2 && p2) users.push({ email: e2, password: p2 });

    const e3 = Deno.env.get("DASHBOARD_LOGIN_EMAIL_3");
    const p3 = Deno.env.get("DASHBOARD_LOGIN_PASSWORD_3");
    if (e3 && p3) users.push({ email: e3, password: p3 });

    if (users.length === 0) {
      throw new Error("Login credentials not configured");
    }

    const inputEmail = email.toLowerCase().trim();
    const matched = users.find(u => u.email.toLowerCase().trim() === inputEmail && u.password === password);

    if (matched) {
      const tokenData = new TextEncoder().encode(`${inputEmail}:${Date.now()}:${crypto.randomUUID()}`);
      const tokenHash = await crypto.subtle.digest("SHA-256", tokenData);
      const token = Array.from(new Uint8Array(tokenHash)).map(b => b.toString(16).padStart(2, "0")).join("");

      return new Response(JSON.stringify({ success: true, email: matched.email, token }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Dashboard auth error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Auth error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
