import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SLACK_GATEWAY = "https://connector-gateway.lovable.dev/slack/api";
const SLACK_CHANNEL = "C0APK18VAR2";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lead } = await req.json();
    if (!lead) throw new Error("Missing lead data");

    // 1) Send email to info@david-j-woods.com via Supabase (simple SMTP-like approach)
    //    We'll use a Supabase Edge Function to format and relay
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // For now, email notification is handled by storing the lead.
    // TODO: Add email sending when email domain is configured.

    // 2) Send Slack notification
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");

    if (LOVABLE_API_KEY && SLACK_API_KEY) {
      const typeEmoji = lead.form_type === "seminar" ? "🎓" : "🧠";
      const sourceLabel = lead.utm_source ? `${lead.utm_source}/${lead.utm_medium || "—"}` : (lead.source || "direct");

      const slackMessage = {
        channel: SLACK_CHANNEL,
        text: `${typeEmoji} New Lead: ${lead.name}`,
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: `${typeEmoji} New ${lead.form_type === "seminar" ? "Seminar" : "Session"} Lead` },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name:*\n${lead.name}` },
              { type: "mrkdwn", text: `*Email:*\n${lead.email}` },
              { type: "mrkdwn", text: `*Phone:*\n${lead.phone || "—"}` },
              { type: "mrkdwn", text: `*Type:*\n${lead.form_type}` },
              { type: "mrkdwn", text: `*Concern:*\n${lead.concern || "—"}` },
              { type: "mrkdwn", text: `*Location:*\n${lead.city || "—"} ${lead.postal_code || ""}` },
            ],
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Source:*\n${sourceLabel}` },
              { type: "mrkdwn", text: `*Campaign:*\n${lead.utm_campaign || "—"}` },
            ],
          },
          {
            type: "context",
            elements: [
              { type: "mrkdwn", text: `🕐 ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}` },
            ],
          },
        ],
      };

      const slackRes = await fetch(`${SLACK_GATEWAY}/chat.postMessage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": SLACK_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slackMessage),
      });

      const slackData = await slackRes.json();
      if (!slackRes.ok || !slackData.ok) {
        console.error("Slack notification failed:", slackData);
      }
    } else {
      console.warn("Slack keys not configured, skipping notification");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("notify-lead error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
