import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, PieChart, Pie, Cell,
} from "recharts";
import {
  Users, Eye, Clock, TrendingDown, MessageCircle, FileText,
  Smartphone, Globe, MousePointer, Languages, ArrowRight, ArrowLeft, Zap,
} from "lucide-react";
import { format, parseISO, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";

interface Props { startDate: string; endDate: string }

interface GAData {
  dailyData: any[];
  topPages: any[];
  channelBreakdown: any[];
  deviceBreakdown: { device: string; sessions: number; users: number }[];
  browserBreakdown: { browser: string; sessions: number }[];
  languageBreakdown: { language: string; sessions: number; avgSessionDuration: number }[];
  newVsReturning: { new: number; returning: number };
}

function pageName(path: string): string {
  const p = path.split("?")[0];
  const map: Record<string, string> = {
    "/": "Home (DE)",
    "/en": "Home (EN)",
    "/raucherentwoehnung": "Stop Smoking (DE)",
    "/stop-smoking": "Stop Smoking (EN)",
    "/abnehmen": "Weight Loss (DE)",
    "/weight-loss": "Weight Loss (EN)",
    "/aengste-phobien": "Anxiety (DE)",
    "/anxiety-phobias": "Anxiety (EN)",
    "/stress-burnout": "Stress & Burnout",
    "/depressionen-traumata": "Depression & Trauma (DE)",
    "/depression-trauma": "Depression & Trauma (EN)",
  };
  return map[p] || p;
}

const PRIORITY = ["raucher", "smoking", "abnehmen", "weight", "angst", "anxiet"];

function pctChange(curr: number, prev: number): { val: string; up: boolean } {
  if (!prev) return { val: "—", up: true };
  const c = ((curr - prev) / prev) * 100;
  return { val: `${c >= 0 ? "+" : ""}${c.toFixed(1)}%`, up: c >= 0 };
}

function inferLang(path: string): "de" | "en" {
  const en = ["/en", "/stop-smoking", "/weight-loss", "/anxiety-phobias", "/depression-trauma", "/adults", "/children-teens", "/about-us", "/training", "/testimonials"];
  return en.some(p => path.startsWith(p)) ? "en" : "de";
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#6b7280"];

export default function WebsitePerformanceTab({ startDate, endDate }: Props) {
  const [data, setData] = useState<GAData | null>(null);
  const [prevData, setPrevData] = useState<GAData | null>(null);
  const [waClicks, setWaClicks] = useState<{ clicked_at: string; page_path: string | null; user_agent: string | null }[]>([]);
  const [leads, setLeads] = useState<{ created_at: string; form_type: string; language: string | null; utm_content: string | null }[]>([]);
  const [formLogs, setFormLogs] = useState<{ created_at: string; form_type: string; status: string; page_path: string | null }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const session = sessionStorage.getItem("dw_dashboard_session");
        const sd = session ? JSON.parse(session) : null;

        // Compute previous-period range of equal length
        const start = parseISO(startDate);
        const end = parseISO(endDate);
        const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
        const prevEnd = format(subDays(start, 1), "yyyy-MM-dd");
        const prevStart = format(subDays(start, days), "yyyy-MM-dd");

        const [gaRes, gaPrevRes, waRes, leadsRes, formLogsRes] = await Promise.all([
          supabase.functions.invoke("google-analytics", { body: { startDate, endDate } }),
          supabase.functions.invoke("google-analytics", { body: { startDate: prevStart, endDate: prevEnd } }),
          sd?.token && sd?.email
            ? supabase.functions.invoke("fetch-whatsapp-clicks", { body: { startDate, endDate, token: sd.token, email: sd.email } })
            : Promise.resolve({ data: { clicks: [] } } as any),
          sd?.token && sd?.email
            ? supabase.functions.invoke("fetch-leads", { body: { startDate, endDate, token: sd.token, email: sd.email } })
            : Promise.resolve({ data: { leads: [] } } as any),
          sd?.token && sd?.email
            ? supabase.functions.invoke("fetch-form-logs", { body: { token: sd.token, email: sd.email } })
            : Promise.resolve({ data: { logs: [] } } as any),
        ]);

        if (gaRes.data && !gaRes.data.error) setData(gaRes.data as GAData);
        if (gaPrevRes.data && !gaPrevRes.data.error) setPrevData(gaPrevRes.data as GAData);
        setWaClicks(((waRes as any).data?.clicks) || []);
        setLeads(((leadsRes as any).data?.leads) || []);
        setFormLogs(((formLogsRes as any).data?.logs) || []);
      } catch (e) {
        console.error("Website performance load error:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [startDate, endDate]);

  // Aggregate metrics
  const m = useMemo(() => {
    const sum = (arr: any[]) => arr.reduce((a, d) => ({
      sessions: a.sessions + (d.sessions || 0),
      users: a.users + (d.visitors || 0),
      pageViews: a.pageViews + (d.pageViews || 0),
      bounceSum: a.bounceSum + (d.bounceRate || 0) * (d.sessions || 0),
      durSum: a.durSum + (d.avgSessionDuration || 0) * (d.sessions || 0),
    }), { sessions: 0, users: 0, pageViews: 0, bounceSum: 0, durSum: 0 });
    const c = sum(data?.dailyData || []);
    const p = sum(prevData?.dailyData || []);
    return {
      sessions: c.sessions,
      prevSessions: p.sessions,
      users: c.users,
      pageViews: c.pageViews,
      bounceRate: c.sessions ? (c.bounceSum / c.sessions) * 100 : 0,
      avgDuration: c.sessions ? c.durSum / c.sessions : 0,
    };
  }, [data, prevData]);

  // Language split (from GA4 'language' field — 'de', 'de-de', 'en', 'en-us'...)
  const langSplit = useMemo(() => {
    const groups: Record<string, { sessions: number; durSum: number }> = { de: { sessions: 0, durSum: 0 }, en: { sessions: 0, durSum: 0 }, other: { sessions: 0, durSum: 0 } };
    (data?.languageBreakdown || []).forEach(l => {
      const k = l.language?.toLowerCase().startsWith("de") ? "de"
        : l.language?.toLowerCase().startsWith("en") ? "en" : "other";
      groups[k].sessions += l.sessions;
      groups[k].durSum += l.avgSessionDuration * l.sessions;
    });
    const total = Object.values(groups).reduce((a, g) => a + g.sessions, 0) || 1;
    return [
      { name: "DE", value: groups.de.sessions, pct: (groups.de.sessions / total) * 100, avgTime: groups.de.sessions ? groups.de.durSum / groups.de.sessions : 0 },
      { name: "EN", value: groups.en.sessions, pct: (groups.en.sessions / total) * 100, avgTime: groups.en.sessions ? groups.en.durSum / groups.en.sessions : 0 },
      { name: "Other", value: groups.other.sessions, pct: (groups.other.sessions / total) * 100, avgTime: groups.other.sessions ? groups.other.durSum / groups.other.sessions : 0 },
    ].filter(x => x.value > 0);
  }, [data]);

  // Top pages enriched
  const topPages = useMemo(() => {
    return (data?.topPages || []).slice(0, 15).map((p: any) => ({
      ...p,
      label: pageName(p.path),
      priority: PRIORITY.some(k => p.path.toLowerCase().includes(k)),
    }));
  }, [data]);

  // WhatsApp by page / device / language
  const waByPage = useMemo(() => {
    const map: Record<string, number> = {};
    waClicks.forEach(w => { const k = w.page_path || "(unknown)"; map[k] = (map[k] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 15);
  }, [waClicks]);

  const waByDevice = useMemo(() => {
    const map = { mobile: 0, desktop: 0, tablet: 0 };
    waClicks.forEach(w => {
      const ua = w.user_agent || "";
      if (/iPad|Tablet/i.test(ua)) map.tablet++;
      else if (/Mobi|Android/i.test(ua)) map.mobile++;
      else map.desktop++;
    });
    return [
      { name: "Mobile", value: map.mobile },
      { name: "Desktop", value: map.desktop },
      { name: "Tablet", value: map.tablet },
    ];
  }, [waClicks]);

  const waByLang = useMemo(() => {
    const map = { de: 0, en: 0 };
    waClicks.forEach(w => { map[inferLang(w.page_path || "/")]++; });
    return [{ name: "DE", value: map.de }, { name: "EN", value: map.en }];
  }, [waClicks]);

  // Form submissions — combine leads (language) + form_submissions_log (page_path)
  const formStats = useMemo(() => {
    const total = leads.length;
    const byLang = { de: 0, en: 0 };
    leads.forEach(l => {
      if (l.language?.toLowerCase().startsWith("en")) byLang.en++; else byLang.de++;
    });

    // Group successful submissions by page_path within the selected date range
    const startMs = parseISO(startDate).getTime();
    const endMs = parseISO(endDate).getTime() + 86400000;
    const byPageMap: Record<string, number> = {};
    const byTypeMap: Record<string, number> = {};
    formLogs
      .filter(l => {
        const t = new Date(l.created_at).getTime();
        return t >= startMs && t <= endMs && l.status === "success";
      })
      .forEach(l => {
        const p = l.page_path || "(unknown)";
        byPageMap[p] = (byPageMap[p] || 0) + 1;
        byTypeMap[l.form_type] = (byTypeMap[l.form_type] || 0) + 1;
      });
    return {
      total,
      byLang,
      byPage: Object.entries(byPageMap).sort((a, b) => b[1] - a[1]).slice(0, 12),
      byType: Object.entries(byTypeMap).sort((a, b) => b[1] - a[1]),
    };
  }, [leads, formLogs, startDate, endDate]);

  const sessChange = pctChange(m.sessions, m.prevSessions);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading website performance…</div>;

  return (
    <div className="space-y-5">
      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-white border-gray-200"><CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1"><Users className="w-4 h-4 text-gray-500"/><span className="text-xs uppercase text-gray-500 font-medium">Sessions</span></div>
          <div className="text-2xl font-bold">{m.sessions.toLocaleString()}</div>
          <div className={`text-xs mt-1 ${sessChange.up ? "text-emerald-600" : "text-red-600"}`}>{sessChange.val} vs previous</div>
        </CardContent></Card>
        <Card className="bg-white border-gray-200"><CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-gray-500"/><span className="text-xs uppercase text-gray-500 font-medium">Avg. Session</span></div>
          <div className="text-2xl font-bold">{(m.avgDuration / 60).toFixed(1)}m</div>
        </CardContent></Card>
        <Card className="bg-white border-gray-200"><CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1"><TrendingDown className="w-4 h-4 text-gray-500"/><span className="text-xs uppercase text-gray-500 font-medium">Bounce Rate</span></div>
          <div className="text-2xl font-bold">{m.bounceRate.toFixed(1)}%</div>
        </CardContent></Card>
        <Card className="bg-white border-gray-200"><CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1"><Users className="w-4 h-4 text-gray-500"/><span className="text-xs uppercase text-gray-500 font-medium">New / Returning</span></div>
          <div className="text-2xl font-bold">{data?.newVsReturning?.new || 0} / {data?.newVsReturning?.returning || 0}</div>
        </CardContent></Card>
      </div>

      {/* Language split + Device + Browser */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1"><Languages className="w-4 h-4"/> Language Split</CardTitle></CardHeader>
          <CardContent>
            {langSplit.length === 0 ? <p className="text-sm text-gray-400 py-4">No data.</p> : (
              <ChartContainer config={{}} className="h-[200px] w-full">
                <PieChart>
                  <Pie data={langSplit} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                    {langSplit.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ChartContainer>
            )}
            <div className="mt-2 space-y-1 text-xs text-gray-600">
              {langSplit.map(l => (
                <div key={l.name} className="flex justify-between"><span>{l.name}</span><span>{l.pct.toFixed(0)}% • {(l.avgTime/60).toFixed(1)}m</span></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1"><Smartphone className="w-4 h-4"/> Device</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px] w-full">
              <BarChart data={data?.deviceBreakdown || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sessions" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1"><Globe className="w-4 h-4"/> Browser</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px] w-full">
              <BarChart data={(data?.browserBreakdown || []).slice(0, 6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="browser" tick={{ fontSize: 11 }} width={70} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sessions" fill="#10b981" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top pages */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700">Top Pages — what visitors actually read</CardTitle></CardHeader>
        <CardContent>
          {topPages.length === 0 ? <p className="text-sm text-gray-400 py-4 text-center">No data.</p> : (
            <Table>
              <TableHeader><TableRow>
                <TableHead>Page</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Avg Time</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {topPages.map((p: any) => (
                  <TableRow key={p.path} className={p.priority ? "bg-amber-50" : ""}>
                    <TableCell className="font-medium text-sm">
                      {p.priority && <span className="inline-block mr-2 text-amber-600">★</span>}
                      {p.label}
                      <span className="block text-xs text-gray-400">{p.path}</span>
                    </TableCell>
                    <TableCell className="text-right">{p.views}</TableCell>
                    <TableCell className="text-right">{p.avgTimeSeconds}s</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <p className="text-xs text-gray-400 mt-2">★ Priority services: Stop Smoking · Weight Loss · Anxiety</p>
        </CardContent>
      </Card>

      {/* WhatsApp section */}
      <Card className="bg-white border-emerald-200 border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
            <MessageCircle className="w-4 h-4"/> WhatsApp Clicks — Conversion Tracking
            <span className="ml-auto text-2xl font-bold text-emerald-600">{waClicks.length}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">By Page</p>
              {waByPage.length === 0 ? <p className="text-xs text-gray-400">No clicks yet.</p> : (
                <div className="space-y-1 text-xs">
                  {waByPage.map(([path, count]) => (
                    <div key={path} className="flex justify-between border-b border-gray-100 py-1">
                      <span className="truncate pr-2">{pageName(path)}</span>
                      <span className="font-semibold text-emerald-700">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">By Device</p>
              <ChartContainer config={{}} className="h-[200px] w-full">
                <PieChart>
                  <Pie data={waByDevice} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={60} label>
                    {waByDevice.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="bottom" height={24} iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ChartContainer>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">By Language</p>
              <ChartContainer config={{}} className="h-[200px] w-full">
                <PieChart>
                  <Pie data={waByLang} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={60} label>
                    {waByLang.map((_, i) => <Cell key={i} fill={COLORS[i + 1]} />)}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="bottom" height={24} iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form submissions */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4"/> Contact Form Submissions
            <span className="ml-auto text-2xl font-bold text-gray-900">{formStats.total}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-semibold text-gray-600 mb-2">By Language</p>
              <div className="flex justify-between border-b py-1"><span>DE</span><span className="font-semibold">{formStats.byLang.de}</span></div>
              <div className="flex justify-between border-b py-1"><span>EN</span><span className="font-semibold">{formStats.byLang.en}</span></div>
            </div>
            <div>
              <p className="font-semibold text-gray-600 mb-2">By Form Type</p>
              {formStats.byType.length === 0 ? <p className="text-gray-400">No submissions.</p> : formStats.byType.map(([t, c]) => (
                <div key={t} className="flex justify-between border-b py-1"><span className="capitalize">{t}</span><span className="font-semibold">{c}</span></div>
              ))}
            </div>
            <div>
              <p className="font-semibold text-gray-600 mb-2">Origin Page (where submitted)</p>
              {formStats.byPage.length === 0 ? <p className="text-gray-400">No page data yet.</p> : formStats.byPage.map(([p, c]) => (
                <div key={p} className="flex justify-between border-b py-1"><span className="truncate pr-2" title={p}>{pageName(p)}</span><span className="font-semibold">{c}</span></div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">"Origin page" = path the visitor was on when they submitted (footer form, dedicated /erstgespraech, service pages, etc.).</p>
        </CardContent>
      </Card>

      {/* Heatmap placeholder */}
      <Card className="bg-white border-gray-200 border-dashed">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1"><MousePointer className="w-4 h-4"/> Heatmap</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">Microsoft Clarity is integrated and tracks heatmaps + session recordings, including mobile.</p>
          <a href="https://clarity.microsoft.com/" target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">→ Open Clarity Dashboard</a>
        </CardContent>
      </Card>
    </div>
  );
}
