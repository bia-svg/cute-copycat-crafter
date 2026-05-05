import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import type { DashboardState } from "@/hooks/useDashboardData";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dashboard-ai-chat`;

const QUICK_PROMPTS = [
  "Give me a full performance summary for this period",
  "Which pages drive the most WhatsApp clicks?",
  "Where do visitors submit the most forms?",
  "What's my Cost per Terminbestätigung this period?",
  "Compare DE vs EN traffic and conversions",
  "What are the top 3 things I should improve right now?",
];

function topN(map: Record<string, number>, n = 10): [string, number][] {
  return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, n);
}

function buildDashboardContext(
  state: DashboardState,
  extras: { formLogs: Array<{ page_path: string | null; form_type: string; status: string; created_at: string }> },
): string {
  const { trafficByDay, topPages, campaigns, leads, whatsappClicks, gscQueries, gscTotals, gscTopPages, gscByCountry, gscByDevice, dateRange } = state as any;

  const totalSessions = trafficByDay.reduce((s: number, d: any) => s + d.total, 0);
  const totalOrganic = trafficByDay.reduce((s: number, d: any) => s + d.organic, 0);
  const totalPaid = trafficByDay.reduce((s: number, d: any) => s + d.paid, 0);
  const totalDirect = trafficByDay.reduce((s: number, d: any) => s + d.direct, 0);
  const totalPageViews = trafficByDay.reduce((s: number, d: any) => s + (d.pageViews || 0), 0);
  const avgBounce = trafficByDay.length > 0 ? (trafficByDay.reduce((s: number, d: any) => s + (d.bounceRate || 0), 0) / trafficByDay.length).toFixed(1) : "N/A";

  const adSpend = campaigns.reduce((s: number, c: any) => s + c.spend, 0);
  const adClicks = campaigns.reduce((s: number, c: any) => s + c.clicks, 0);
  const adImpressions = campaigns.reduce((s: number, c: any) => s + c.impressions, 0);
  const adConversions = campaigns.reduce((s: number, c: any) => s + c.conversions, 0);
  const currency = campaigns.find((c: any) => c.currencyCode)?.currencyCode || "CHF";

  const sessionLeads = leads.filter((l: any) => l.form_type === "session").length;
  const seminarLeads = leads.filter((l: any) => l.form_type === "seminar").length;
  const paidLeads = leads.filter((l: any) => l.utm_medium === "cpc" || l.utm_medium === "ppc" || l.utm_source === "google" || l.source === "paid").length;
  const terminCount = leads.filter((l: any) => (l.concern || "").toLowerCase().includes("terminbestätigung")).length;
  const formLeadCount = leads.length - terminCount;

  // Filter form logs to date range
  const startMs = new Date(dateRange.startDate).getTime();
  const endMs = new Date(dateRange.endDate).getTime() + 86400000;
  const formLogsInRange = extras.formLogs.filter(l => {
    const t = new Date(l.created_at).getTime();
    return t >= startMs && t <= endMs && l.status === "success";
  });
  const formByPage: Record<string, number> = {};
  const formByType: Record<string, number> = {};
  const formByLang = { de: 0, en: 0 };
  formLogsInRange.forEach(l => {
    const p = l.page_path || "(unknown)";
    formByPage[p] = (formByPage[p] || 0) + 1;
    formByType[l.form_type] = (formByType[l.form_type] || 0) + 1;
    if (/^\/en(\/|$)/i.test(p)) formByLang.en++; else formByLang.de++;
  });

  // WhatsApp aggregations
  const waByPage: Record<string, number> = {};
  const waByLang = { de: 0, en: 0 };
  whatsappClicks.forEach((c: any) => {
    const p = c.page_path || "(unknown)";
    waByPage[p] = (waByPage[p] || 0) + 1;
    if (/^\/en(\/|$)/i.test(p)) waByLang.en++; else waByLang.de++;
  });

  let ctx = `DATE RANGE: ${dateRange.startDate} to ${dateRange.endDate}

TRAFFIC OVERVIEW (GA4):
- Total Sessions: ${totalSessions}
- Organic: ${totalOrganic} | Paid: ${totalPaid} | Direct: ${totalDirect}
- Page Views: ${totalPageViews}
- Avg Bounce Rate: ${avgBounce}%

LEADS (${leads.length} total in DB):
- Form Leads (lead-form submissions): ${formLeadCount}
- Terminbestätigung (paid sessions confirmed): ${terminCount}
- form_type=session: ${sessionLeads} | form_type=seminar: ${seminarLeads}
- From paid campaigns (utm): ${paidLeads}

WHATSAPP CLICKS (${whatsappClicks.length} total):
- DE pages: ${waByLang.de} | EN pages: ${waByLang.en}
- Top pages by WhatsApp click:
${topN(waByPage, 12).map(([p, c]) => `  • ${p}: ${c}`).join("\n") || "  (none)"}

FORM SUBMISSIONS LOG (${formLogsInRange.length} successful in range):
- DE: ${formByLang.de} | EN: ${formByLang.en}
- By form type: ${topN(formByType, 10).map(([t, c]) => `${t}=${c}`).join(", ") || "(none)"}
- Top origin pages (where visitor submitted from):
${topN(formByPage, 12).map(([p, c]) => `  • ${p}: ${c}`).join("\n") || "  (none)"}

GOOGLE ADS:
- Total Spend: ${currency} ${adSpend.toFixed(0)}
- Clicks: ${adClicks} | Impressions: ${adImpressions}
- Conversions (Ads): ${adConversions}
- Cost per Click: ${adClicks > 0 ? `${currency} ${(adSpend / adClicks).toFixed(2)}` : "N/A"}
- Cost per Form Lead (CPL): ${formLeadCount > 0 ? `${currency} ${(adSpend / formLeadCount).toFixed(0)}` : "N/A"}
- Cost per Terminbestätigung (CPA): ${terminCount > 0 ? `${currency} ${(adSpend / terminCount).toFixed(0)}` : "N/A"}
`;

  if (campaigns.length > 0) {
    ctx += `\nCAMPAIGNS:\n`;
    campaigns.forEach((c: any) => {
      ctx += `- ${c.name} (${c.status}): ${c.clicks} clicks, ${currency} ${c.spend.toFixed(0)} spend, ${c.conversions} conv\n`;
    });
  }

  if (topPages.length > 0) {
    ctx += `\nTOP PAGES (GA4):\n`;
    topPages.slice(0, 20).forEach((p: any) => {
      ctx += `- ${p.label} (${p.path}): ${p.views} views, avg ${Math.floor(p.avgTimeSeconds / 60)}:${String(p.avgTimeSeconds % 60).padStart(2, "0")} time\n`;
    });
  }

  if (gscTotals) {
    ctx += `\nSEARCH CONSOLE TOTALS:\n- Clicks: ${gscTotals.clicks} | Impressions: ${gscTotals.impressions}\n- CTR: ${(gscTotals.ctr * 100).toFixed(1)}% | Avg Position: ${gscTotals.position.toFixed(1)}\n`;
  }

  if (gscQueries.length > 0) {
    ctx += `\nTOP SEARCH QUERIES:\n`;
    gscQueries.slice(0, 25).forEach((q: any) => {
      ctx += `- "${q.query}": ${q.clicks} clicks, ${q.impressions} impr, pos ${q.position.toFixed(1)}\n`;
    });
  }

  if (gscTopPages?.length) {
    ctx += `\nGSC TOP PAGES:\n`;
    gscTopPages.slice(0, 15).forEach((p: any) => {
      ctx += `- ${p.page}: ${p.clicks} clicks, ${p.impressions} impr, pos ${(p.position || 0).toFixed(1)}\n`;
    });
  }

  if (gscByCountry?.length) {
    ctx += `\nGSC BY COUNTRY:\n`;
    gscByCountry.slice(0, 10).forEach((c: any) => {
      ctx += `- ${c.country}: ${c.clicks} clicks, ${c.impressions} impr\n`;
    });
  }

  if (gscByDevice?.length) {
    ctx += `\nGSC BY DEVICE:\n`;
    gscByDevice.forEach((d: any) => {
      ctx += `- ${d.device}: ${d.clicks} clicks, ${d.impressions} impr\n`;
    });
  }

  return ctx;
}

export default function AIChatTab({ dashboardState }: { dashboardState: DashboardState }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formLogs, setFormLogs] = useState<Array<{ created_at: string; form_type: string; status: string; page_path: string | null }>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch form submission logs once
  useEffect(() => {
    (async () => {
      try {
        const sdRaw = sessionStorage.getItem("dashboard_session");
        if (!sdRaw) return;
        const sd = JSON.parse(sdRaw);
        const { data } = await supabase.functions.invoke("fetch-form-logs", {
          body: { token: sd.token, email: sd.email },
        });
        setFormLogs((data as any)?.logs || []);
      } catch (e) { console.error("AIChat formLogs error", e); }
    })();
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const allMessages = [...messages, userMsg];
    const dashboardContext = buildDashboardContext(dashboardState, { formLogs });

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
          dashboardContext,
        }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch { /* ignore */ }
        }
      }
    } catch (err: any) {
      console.error("AI Chat error:", err);
      setMessages(prev => [...prev, { role: "assistant", content: `⚠️ Error: ${err.message || "Failed to get response"}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, dashboardState, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-0 flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: 500 }}>
          {/* Messages area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">AI Marketing Strategist</h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    Ask me anything about your dashboard data. I can analyze trends, suggest improvements, and help you make data-driven decisions.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-left text-xs px-3 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 border border-gray-200 text-gray-800"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-400">Analyzing data...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex gap-2 items-end">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your data..."
                className="resize-none min-h-[44px] max-h-[120px] text-sm border-gray-200 focus-visible:ring-gray-300"
                rows={1}
              />
              <Button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-gray-900 hover:bg-gray-800 h-[44px] w-[44px] flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 text-center">
              AI analyzes your current dashboard data. Responses may not always be accurate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
