import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

async function sha256(s: string): Promise<string> {
  const data = new TextEncoder().encode(s);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function getAllowedEmails(): string[] {
  const list: string[] = [];
  for (const k of ["DASHBOARD_LOGIN_EMAIL", "DASHBOARD_LOGIN_EMAIL_2", "DASHBOARD_LOGIN_EMAIL_3"]) {
    const v = Deno.env.get(k);
    if (v) list.push(v.toLowerCase().trim());
  }
  return list;
}

function getEnvPasswordFor(email: string): string | null {
  const pairs: Array<[string, string]> = [
    ["DASHBOARD_LOGIN_EMAIL", "DASHBOARD_LOGIN_PASSWORD"],
    ["DASHBOARD_LOGIN_EMAIL_2", "DASHBOARD_LOGIN_PASSWORD_2"],
    ["DASHBOARD_LOGIN_EMAIL_3", "DASHBOARD_LOGIN_PASSWORD_3"],
  ];
  for (const [ek, pk] of pairs) {
    const e = Deno.env.get(ek);
    if (e && e.toLowerCase().trim() === email) return Deno.env.get(pk) || null;
  }
  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const sb = createClient(supabaseUrl, serviceKey);

  try {
    const body = await req.json();
    const { action } = body;

    // ---------- Request password reset ----------
    if (action === "request_reset") {
      const emailRaw = (body.email || "").toString().toLowerCase().trim();
      if (!emailRaw) {
        return new Response(JSON.stringify({ error: "Missing email" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const allowed = getAllowedEmails();
      const isKnown = allowed.includes(emailRaw);

      // Always return success (no enumeration)
      if (isKnown) {
        // Generate token
        const tokenBytes = new Uint8Array(32);
        crypto.getRandomValues(tokenBytes);
        const token = Array.from(tokenBytes).map(b => b.toString(16).padStart(2, "0")).join("");
        const tokenHash = await sha256(token);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1h

        await sb.from("dashboard_password_resets").insert({
          email: emailRaw,
          token_hash: tokenHash,
          expires_at: expiresAt,
        });

        const origin = req.headers.get("origin") || "https://david-j-woods.com";
        const resetUrl = `${origin}/dashboard/reset-password?token=${token}&email=${encodeURIComponent(emailRaw)}`;

        // Send email via send-transactional-email (verify_jwt=true → use anon/publishable key)
        try {
          const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || "";
          const sendRes = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${anonKey}`,
              "apikey": anonKey,
            },
            body: JSON.stringify({
              templateName: "dashboard-password-reset",
              recipientEmail: emailRaw,
              idempotencyKey: `dashboard-reset-${tokenHash.slice(0, 16)}`,
              templateData: { resetUrl, email: emailRaw },
            }),
          });
          if (!sendRes.ok) {
            const txt = await sendRes.text();
            console.error("Reset email send failed:", sendRes.status, txt);
          }
        } catch (mailErr) {
          console.error("Reset email send error:", mailErr);
        }
      } else {
        console.log(`Reset requested for unknown email: ${emailRaw}`);
      }

      return new Response(JSON.stringify({
        success: true,
        message: "If this email is registered, you will receive reset instructions.",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ---------- Confirm reset (set new password) ----------
    if (action === "confirm_reset") {
      const emailRaw = (body.email || "").toString().toLowerCase().trim();
      const token = (body.token || "").toString();
      const newPassword = (body.newPassword || "").toString();

      if (!emailRaw || !token || !newPassword) {
        return new Response(JSON.stringify({ error: "Missing fields" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (newPassword.length < 8) {
        return new Response(JSON.stringify({ error: "Password must be at least 8 characters." }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const tokenHash = await sha256(token);
      const { data: resetRow } = await sb
        .from("dashboard_password_resets")
        .select("id, email, expires_at, used_at")
        .eq("token_hash", tokenHash)
        .maybeSingle();

      if (!resetRow || resetRow.email !== emailRaw || resetRow.used_at || new Date(resetRow.expires_at) < new Date()) {
        return new Response(JSON.stringify({ error: "Invalid or expired reset link." }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const passwordHash = await sha256(newPassword);
      await sb.from("dashboard_password_overrides").upsert({
        email: emailRaw, password_hash: passwordHash, updated_at: new Date().toISOString(),
      });
      await sb.from("dashboard_password_resets")
        .update({ used_at: new Date().toISOString() })
        .eq("id", resetRow.id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ---------- Default: login ----------
    const { email, password } = body;
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const inputEmail = email.toString().toLowerCase().trim();
    const allowed = getAllowedEmails();
    let matched = false;

    if (allowed.includes(inputEmail)) {
      // Check override (newest password)
      const { data: override } = await sb
        .from("dashboard_password_overrides")
        .select("password_hash")
        .eq("email", inputEmail)
        .maybeSingle();

      if (override) {
        const inputHash = await sha256(password);
        matched = override.password_hash === inputHash;
      } else {
        const envPwd = getEnvPasswordFor(inputEmail);
        matched = !!envPwd && envPwd === password;
      }
    }

    // Log attempt
    const userAgent = req.headers.get("user-agent") || null;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("cf-connecting-ip") || null;
    try {
      await sb.from("dashboard_login_logs").insert({
        email: inputEmail, success: matched, ip_address: ip, user_agent: userAgent,
      });
    } catch (e) { console.error("login log fail", e); }

    if (matched) {
      const tokenData = new TextEncoder().encode(`${inputEmail}:${Date.now()}:${crypto.randomUUID()}`);
      const tokenHash = await crypto.subtle.digest("SHA-256", tokenData);
      const token = Array.from(new Uint8Array(tokenHash)).map(b => b.toString(16).padStart(2, "0")).join("");
      return new Response(JSON.stringify({ success: true, email: inputEmail, token }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Dashboard auth error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Auth error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
