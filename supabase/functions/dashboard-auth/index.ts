import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get credentials from secrets
    const usersJson = Deno.env.get("DASHBOARD_USERS");
    if (!usersJson) {
      throw new Error("DASHBOARD_USERS secret not configured");
    }

    // Format: [{"email":"x@y.com","hash":"sha256hash"}, ...]
    const users: Array<{ email: string; hash: string }> = JSON.parse(usersJson);

    const inputHash = await hashPassword(password);
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.hash === inputHash
    );

    if (user) {
      // Generate a simple session token
      const tokenData = new TextEncoder().encode(`${user.email}:${Date.now()}:${crypto.randomUUID()}`);
      const tokenHash = await crypto.subtle.digest("SHA-256", tokenData);
      const token = Array.from(new Uint8Array(tokenHash)).map(b => b.toString(16).padStart(2, "0")).join("");

      return new Response(JSON.stringify({ success: true, email: user.email, token }), {
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
