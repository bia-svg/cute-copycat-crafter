import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { isAuthenticated, logout, getCurrentUser, getLoginLogs } from "@/lib/dashboardAuth";
import { useDashboardData, DATE_PRESETS } from "@/hooks/useDashboardData";
import { formatTime, formatCurrency } from "@/data/dashboardMockData";
import type { DailyTraffic, WhatsAppClick } from "@/data/dashboardMockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  Users, FileText, TrendingUp, LogOut, Clock,
  Eye, DollarSign, Target, ArrowUpRight, ArrowDownRight,
  Leaf, Zap, MousePointer, BarChart3, Globe, MessageCircle
} from "lucide-react";
import { format, parseISO, startOfMonth } from "date-fns";

/* ═══════ Metric Card ═══════ */
function MetricCard({ title, value, icon: Icon, subtitle, color = "text-gray-900" }: {
  title: string; value: string | number; icon: any; subtitle?: string; color?: string;
}) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</span>
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <Icon className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        <div className={`text-2xl font-bold ${color}`}>
          {typeof value === "number" ? value.toLocaleString("en-US") : value}
        </div>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

/* ═══════ Aggregate by month ═══════ */
function aggregateByMonth(data: DailyTraffic[]) {
  const months: Record<string, { date: string; organic: number; paid: number; direct: number; total: number }> = {};
  data.forEach(d => {
    const key = format(startOfMonth(parseISO(d.date)), "yyyy-MM");
    if (!months[key]) months[key] = { date: key, organic: 0, paid: 0, direct: 0, total: 0 };
    months[key].organic += d.organic;
    months[key].paid += d.paid;
    months[key].direct += d.direct;
    months[key].total += d.total;
  });
  return Object.values(months).sort((a, b) => a.date.localeCompare(b.date));
}

const COLORS = {
  organic: "#10b981",
  paid: "#3b82f6",
  direct: "#6b7280",
  referral: "#f59e0b",
  social: "#8b5cf6",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (!isAuthenticated()) navigate("/dashboard/login", { replace: true });
  }, [navigate]);

  const {
    trafficByDay, topPages, campaigns, dailyAds, leads, whatsappClicks,
    loading, gaError, adsError, gaLive, adsLive,
    dateRange, setDateRange,
  } = useDashboardData();

  /* ═══════ Computed metrics ═══════ */
  const totals = useMemo(() => {
    const t = trafficByDay.reduce((acc, d) => ({
      organic: acc.organic + d.organic,
      paid: acc.paid + d.paid,
      direct: acc.direct + d.direct,
      total: acc.total + d.total,
      sessions: acc.sessions + d.sessions,
      pageViews: acc.pageViews + d.pageViews,
    }), { organic: 0, paid: 0, direct: 0, total: 0, sessions: 0, pageViews: 0 });
    return t;
  }, [trafficByDay]);

  const adsTotals = useMemo(() => {
    return campaigns.reduce((acc, c) => ({
      spend: acc.spend + c.spend,
      clicks: acc.clicks + c.clicks,
      impressions: acc.impressions + c.impressions,
      conversions: acc.conversions + c.conversions,
    }), { spend: 0, clicks: 0, impressions: 0, conversions: 0 });
  }, [campaigns]);

  const leadStats = useMemo(() => {
    const sessionLeads = leads.filter(l => l.form_type === "session").length;
    const seminarLeads = leads.filter(l => l.form_type === "seminar").length;
    const organicLeads = leads.filter(l => !l.utm_source || l.source === "organic").length;
    const paidLeads = leads.filter(l => l.utm_source === "google" || l.source === "paid").length;
    const byPostalCode = leads.reduce((acc, l) => {
      const key = l.postal_code || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return { sessionLeads, seminarLeads, organicLeads, paidLeads, total: leads.length, byPostalCode };
  }, [leads]);

  const organicCVR = totals.organic > 0 ? ((leadStats.organicLeads / totals.organic) * 100).toFixed(2) : "—";
  const paidCVR = totals.paid > 0 ? ((leadStats.paidLeads / totals.paid) * 100).toFixed(2) : "—";
  const costPerSession = leadStats.sessionLeads > 0 ? adsTotals.spend / leadStats.sessionLeads : 0;
  const costPerSeminar = leadStats.seminarLeads > 0 ? adsTotals.spend / leadStats.seminarLeads : 0;

  const monthlyData = useMemo(() => aggregateByMonth(trafficByDay), [trafficByDay]);

  const loginLogs = getLoginLogs();
  const currentUserEmail = getCurrentUser();
  const displayName = currentUserEmail?.includes("david") ? "David" : currentUserEmail?.includes("bia") ? "Bia" : currentUserEmail?.split("@")[0] ?? "";

  if (!isAuthenticated()) return null;

  const chartConfig = {
    organic: { label: "Organic", color: COLORS.organic },
    paid: { label: "Paid", color: COLORS.paid },
    direct: { label: "Direct", color: COLORS.direct },
    total: { label: "Total", color: "#1f2937" },
  };

  const postalData = Object.entries(leadStats.byPostalCode)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Analytics Dashboard | David J. Woods</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h1>
                {(gaLive || adsLive) ? (
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">● Live</Badge>
                ) : (
                  <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-xs">Connecting...</Badge>
                )}
              </div>
              <p className="text-xs text-gray-400">David J. Woods — Internal Marketing Analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{displayName}</span>
              <Button size="sm" variant="outline" onClick={() => { logout(); navigate("/dashboard/login"); }}
                className="text-gray-500 hover:text-gray-900">
                <LogOut className="w-4 h-4 mr-1" /> Sign Out
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto px-4 py-5 space-y-5">
          {/* Date Range + Errors */}
          <div className="flex flex-wrap items-center gap-2">
            {DATE_PRESETS.map(preset => (
              <button
                key={preset.label}
                onClick={() => setDateRange(preset)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  dateRange.label === preset.label
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {preset.label}
              </button>
            ))}
            <span className="text-xs text-gray-400 ml-2">
              {dateRange.startDate} → {dateRange.endDate}
            </span>
          </div>

          {gaError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              <strong>GA4:</strong> {gaError}
            </div>
          )}
          {adsError && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
              <strong>Google Ads:</strong> {adsError}
            </div>
          )}

          {loading && (
            <div className="text-center py-12 text-gray-400">Loading data...</div>
          )}

          {/* Tabs */}
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-gray-500">Overview</TabsTrigger>
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-gray-500">Campaigns</TabsTrigger>
              <TabsTrigger value="leads" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-gray-500">Leads</TabsTrigger>
              <TabsTrigger value="data" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-gray-500">Data Export</TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-gray-500">Logs</TabsTrigger>
            </TabsList>

            {/* ═══════ OVERVIEW TAB ═══════ */}
            <TabsContent value="overview" className="space-y-5 mt-4">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <MetricCard title="Total Visitors" value={totals.total} icon={Users} />
                <MetricCard title="Organic" value={totals.organic} icon={Leaf} color="text-emerald-600" />
                <MetricCard title="Paid" value={totals.paid} icon={Zap} color="text-blue-600" />
                <MetricCard title="Sessions" value={totals.sessions} icon={BarChart3} />
                <MetricCard title="WhatsApp Clicks" value={whatsappClicks.length} icon={MessageCircle} color="text-green-600" />
              </div>

              {/* Traffic by Day — Organic vs Paid */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Daily Traffic — Organic vs Paid</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <AreaChart data={trafficByDay}>
                      <defs>
                        <linearGradient id="fillOrg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={COLORS.organic} stopOpacity={0.2} />
                          <stop offset="100%" stopColor={COLORS.organic} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="fillPaid" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={COLORS.paid} stopOpacity={0.2} />
                          <stop offset="100%" stopColor={COLORS.paid} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} tickFormatter={v => format(parseISO(v), "dd/MM")} />
                      <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="organic" stroke={COLORS.organic} fill="url(#fillOrg)" strokeWidth={2} name="Organic" />
                      <Area type="monotone" dataKey="paid" stroke={COLORS.paid} fill="url(#fillPaid)" strokeWidth={2} name="Paid" />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Monthly Comparison + Conversion Rates */}
              <div className="grid lg:grid-cols-2 gap-4">
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Monthly Traffic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[220px] w-full">
                      <BarChart data={monthlyData}>
                        <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                        <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="organic" fill={COLORS.organic} stackId="a" radius={[0, 0, 0, 0]} name="Organic" />
                        <Bar dataKey="paid" fill={COLORS.paid} stackId="a" radius={[3, 3, 0, 0]} name="Paid" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Conversion Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                        <p className="text-xs text-emerald-600 font-medium mb-1">Organic CVR</p>
                        <p className="text-3xl font-bold text-emerald-700">{organicCVR}%</p>
                        <p className="text-xs text-emerald-500 mt-1">{leadStats.organicLeads} leads / {totals.organic} visitors</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-medium mb-1">Paid CVR</p>
                        <p className="text-3xl font-bold text-blue-700">{paidCVR}%</p>
                        <p className="text-xs text-blue-500 mt-1">{leadStats.paidLeads} leads / {totals.paid} visitors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Pages */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Eye className="w-4 h-4" /> Top Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-100">
                        <TableHead className="text-gray-500">Page</TableHead>
                         <TableHead className="text-gray-500">Views</TableHead>
                        <TableHead className="text-gray-500 text-right">Avg. Engagement</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topPages.map(page => (
                        <TableRow key={page.path} className="border-gray-100 hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">
                            {page.label}
                            <span className="text-gray-400 text-xs ml-2">{page.path}</span>
                          </TableCell>
                          <TableCell className="text-right text-gray-900">{page.views.toLocaleString("en-US")}</TableCell>
                          <TableCell className="text-right text-gray-600 flex items-center justify-end gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />{formatTime(page.avgTimeSeconds)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ═══════ CAMPAIGNS TAB ═══════ */}
            <TabsContent value="campaigns" className="space-y-5 mt-4">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <MetricCard title="Total Spend" value={formatCurrency(adsTotals.spend)} icon={DollarSign} />
                <MetricCard title="Impressions" value={adsTotals.impressions} icon={Eye} />
                <MetricCard title="Clicks" value={adsTotals.clicks} icon={MousePointer} />
                <MetricCard title="Avg CPC" value={adsTotals.clicks > 0 ? formatCurrency(adsTotals.spend / adsTotals.clicks) : "—"} icon={Target} />
                <MetricCard title="CTR" value={adsTotals.impressions > 0 ? `${((adsTotals.clicks / adsTotals.impressions) * 100).toFixed(2)}%` : "—"} icon={TrendingUp} />
              </div>

              {/* Lead cost metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <MetricCard title="Session Leads" value={leadStats.sessionLeads} icon={FileText} color="text-emerald-600" />
                <MetricCard title="Seminar Leads" value={leadStats.seminarLeads} icon={FileText} color="text-blue-600" />
                <MetricCard title="Cost / Session Lead" value={costPerSession > 0 ? formatCurrency(costPerSession) : "—"} icon={DollarSign} />
                <MetricCard title="Cost / Seminar Lead" value={costPerSeminar > 0 ? formatCurrency(costPerSeminar) : "—"} icon={DollarSign} />
              </div>

              {/* Daily spend chart */}
              {dailyAds.length > 0 && (
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Daily Ad Spend & Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{
                      spend: { label: "Spend (CHF)", color: COLORS.paid },
                      clicks: { label: "Clicks", color: COLORS.organic },
                    }} className="h-[220px] w-full">
                      <LineChart data={dailyAds}>
                        <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} tickFormatter={v => format(parseISO(v), "dd/MM")} />
                        <YAxis yAxisId="left" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line yAxisId="left" type="monotone" dataKey="spend" stroke={COLORS.paid} strokeWidth={2} dot={false} name="Spend" />
                        <Line yAxisId="right" type="monotone" dataKey="clicks" stroke={COLORS.organic} strokeWidth={2} dot={false} name="Clicks" />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {/* Campaign table */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  {campaigns.length === 0 ? (
                    <p className="text-gray-400 text-sm py-8 text-center">No campaign data available for this period.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-100">
                            <TableHead className="text-gray-500">Campaign</TableHead>
                            <TableHead className="text-gray-500 text-right">Spend</TableHead>
                            <TableHead className="text-gray-500 text-right">Impressions</TableHead>
                            <TableHead className="text-gray-500 text-right">Clicks</TableHead>
                            <TableHead className="text-gray-500 text-right">CTR</TableHead>
                            <TableHead className="text-gray-500 text-right">CPC</TableHead>
                            <TableHead className="text-gray-500 text-right">Conv.</TableHead>
                            <TableHead className="text-gray-500 text-right">CPA</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {campaigns.map(c => (
                            <TableRow key={c.id} className="border-gray-100 hover:bg-gray-50">
                              <TableCell className="font-medium text-gray-900">
                                {c.name}
                                <Badge variant="outline" className="ml-2 text-xs">{c.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right text-gray-900">{formatCurrency(c.spend)}</TableCell>
                              <TableCell className="text-right text-gray-700">{c.impressions.toLocaleString()}</TableCell>
                              <TableCell className="text-right text-gray-700">{c.clicks.toLocaleString()}</TableCell>
                              <TableCell className="text-right text-gray-700">
                                {c.impressions > 0 ? `${((c.clicks / c.impressions) * 100).toFixed(2)}%` : "—"}
                              </TableCell>
                              <TableCell className="text-right text-gray-700">
                                {c.clicks > 0 ? formatCurrency(c.spend / c.clicks) : "—"}
                              </TableCell>
                              <TableCell className="text-right text-gray-900 font-medium">{Math.round(c.conversions)}</TableCell>
                              <TableCell className="text-right text-gray-700">
                                {c.conversions > 0 ? formatCurrency(c.spend / c.conversions) : "—"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ═══════ LEADS TAB ═══════ */}
            <TabsContent value="leads" className="space-y-5 mt-4">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <MetricCard title="Total Leads" value={leadStats.total} icon={Users} />
                <MetricCard title="Session Leads" value={leadStats.sessionLeads} icon={FileText} color="text-emerald-600" />
                <MetricCard title="Seminar Leads" value={leadStats.seminarLeads} icon={FileText} color="text-blue-600" />
                <MetricCard title="Organic Leads" value={leadStats.organicLeads} icon={Leaf} color="text-emerald-600" />
                <MetricCard title="Paid Leads" value={leadStats.paidLeads} icon={Zap} color="text-blue-600" />
              </div>

              {/* Leads Per Day Chart */}
              {leads.length > 0 && (() => {
                const byDay: Record<string, { date: string; session: number; seminar: number; total: number }> = {};
                leads.forEach(l => {
                  const d = format(new Date(l.created_at), "yyyy-MM-dd");
                  if (!byDay[d]) byDay[d] = { date: d, session: 0, seminar: 0, total: 0 };
                  byDay[d].total++;
                  if (l.form_type === "seminar") byDay[d].seminar++;
                  else byDay[d].session++;
                });
                const dailyLeads = Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));
                return (
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700">Leads Per Day</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{
                        session: { label: "Session", color: COLORS.organic },
                        seminar: { label: "Seminar", color: COLORS.paid },
                      }} className="h-[220px] w-full">
                        <BarChart data={dailyLeads}>
                          <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                          <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} tickFormatter={v => format(parseISO(v), "dd/MM")} />
                          <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} allowDecimals={false} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="session" fill={COLORS.organic} stackId="a" radius={[0, 0, 0, 0]} name="Session" />
                          <Bar dataKey="seminar" fill={COLORS.paid} stackId="a" radius={[3, 3, 0, 0]} name="Seminar" />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                );
              })()}

              {/* GDPR-compliant leads table — personal data masked */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-700">Leads Log (GDPR Safe)</CardTitle>
                    <Badge variant="outline" className="text-xs text-gray-500">Personal data masked</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {leads.length === 0 ? (
                    <p className="text-gray-400 text-sm py-8 text-center">
                      No leads recorded yet. Leads will appear here once the contact form stores submissions.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-100">
                            <TableHead className="text-gray-500">Date</TableHead>
                            <TableHead className="text-gray-500">Name</TableHead>
                            <TableHead className="text-gray-500">Concern</TableHead>
                            <TableHead className="text-gray-500">Type</TableHead>
                            <TableHead className="text-gray-500">Source</TableHead>
                            <TableHead className="text-gray-500">Campaign</TableHead>
                            <TableHead className="text-gray-500">Region</TableHead>
                            <TableHead className="text-gray-500 text-center">Converted</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leads.slice(0, 50).map(l => {
                            // Mask name: "Max Mustermann" → "M. M."
                            const nameParts = (l.name || "").split(" ");
                            const maskedName = nameParts.map(p => p.charAt(0).toUpperCase() + ".").join(" ");
                            // Region from postal code prefix + country
                            const region = [l.postal_code ? l.postal_code.slice(0, 2) + "xxx" : null, l.country].filter(Boolean).join(", ");

                            return (
                              <TableRow key={l.id} className="border-gray-100 hover:bg-gray-50">
                                <TableCell className="text-gray-700 text-sm">{format(new Date(l.created_at), "dd/MM/yy HH:mm")}</TableCell>
                                <TableCell className="text-gray-900 font-medium">{maskedName || "—"}</TableCell>
                                <TableCell className="text-gray-700 text-sm">{l.concern || "—"}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`text-xs ${l.form_type === "session" ? "text-emerald-700 border-emerald-200" : "text-blue-700 border-blue-200"}`}>
                                    {l.form_type}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`text-xs ${l.source === "organic" ? "text-emerald-700" : l.source === "paid" ? "text-blue-700" : "text-gray-500"}`}>
                                    {l.source}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-gray-600 text-xs">{l.utm_campaign || "—"}</TableCell>
                                <TableCell className="text-gray-700 text-sm">{region || "—"}</TableCell>
                                <TableCell className="text-center">
                                  {l.converted ? (
                                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">Yes</Badge>
                                  ) : (
                                    <Badge className="bg-gray-50 text-gray-500 border border-gray-200 text-xs">No</Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* WhatsApp Clicks */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp Clicks ({whatsappClicks.length})
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {whatsappClicks.length === 0 ? (
                    <p className="text-gray-400 text-sm py-4 text-center">No WhatsApp clicks recorded yet.</p>
                  ) : (() => {
                    const waByDay: Record<string, { date: string; organic: number; paid: number; direct: number; total: number }> = {};
                    whatsappClicks.forEach(w => {
                      const d = format(new Date(w.clicked_at), "yyyy-MM-dd");
                      if (!waByDay[d]) waByDay[d] = { date: d, organic: 0, paid: 0, direct: 0, total: 0 };
                      waByDay[d].total++;
                      if (w.utm_source === "google" || w.utm_medium === "cpc") waByDay[d].paid++;
                      else if (!w.utm_source) waByDay[d].organic++;
                      else waByDay[d].direct++;
                    });
                    const dailyWA = Object.values(waByDay).sort((a, b) => a.date.localeCompare(b.date));

                    const waByPage: Record<string, number> = {};
                    whatsappClicks.forEach(w => {
                      const p = w.page_path || "unknown";
                      waByPage[p] = (waByPage[p] || 0) + 1;
                    });
                    const pageData = Object.entries(waByPage)
                      .map(([page, count]) => ({ page, count }))
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 10);

                    return (
                      <div className="space-y-4">
                        <ChartContainer config={{
                          organic: { label: "Organic", color: COLORS.organic },
                          paid: { label: "Paid", color: COLORS.paid },
                        }} className="h-[180px] w-full">
                          <BarChart data={dailyWA}>
                            <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} tickFormatter={v => format(parseISO(v), "dd/MM")} />
                            <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} allowDecimals={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="organic" fill={COLORS.organic} stackId="a" name="Organic" />
                            <Bar dataKey="paid" fill={COLORS.paid} stackId="a" radius={[3, 3, 0, 0]} name="Paid" />
                          </BarChart>
                        </ChartContainer>

                        <Table>
                          <TableHeader>
                            <TableRow className="border-gray-100">
                              <TableHead className="text-gray-500">Page</TableHead>
                              <TableHead className="text-gray-500 text-right">Clicks</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pageData.map(row => (
                              <TableRow key={row.page} className="border-gray-100">
                                <TableCell className="text-gray-900 text-sm">{row.page}</TableCell>
                                <TableCell className="text-right text-gray-900 font-medium">{row.count}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        {/* Full daily breakdown table */}
                        {(() => {
                          const dayMap: Record<string, { date: string; total: number; organic: number; paid: number; direct: number; pages: Record<string, number>; sources: Record<string, number>; mediums: Record<string, number>; campaigns: Record<string, number> }> = {};
                          whatsappClicks.forEach(w => {
                            const d = format(new Date(w.clicked_at), "yyyy-MM-dd");
                            if (!dayMap[d]) dayMap[d] = { date: d, total: 0, organic: 0, paid: 0, direct: 0, pages: {}, sources: {}, mediums: {}, campaigns: {} };
                            const row = dayMap[d];
                            row.total++;
                            if (w.utm_source === "google" || w.utm_medium === "cpc") row.paid++;
                            else if (!w.utm_source) row.organic++;
                            else row.direct++;
                            const pg = w.page_path || "(none)";
                            row.pages[pg] = (row.pages[pg] || 0) + 1;
                            const src = w.utm_source || "(none)";
                            row.sources[src] = (row.sources[src] || 0) + 1;
                            const med = w.utm_medium || "(none)";
                            row.mediums[med] = (row.mediums[med] || 0) + 1;
                            const cmp = w.utm_campaign || "(none)";
                            row.campaigns[cmp] = (row.campaigns[cmp] || 0) + 1;
                          });
                          const rows = Object.values(dayMap).sort((a, b) => b.date.localeCompare(a.date));
                          const topVal = (map: Record<string, number>) => {
                            const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
                            return entries.length > 0 ? `${entries[0][0]} (${entries[0][1]})` : "-";
                          };
                          return (
                            <div className="mt-4">
                              <p className="text-xs font-medium text-gray-500 mb-2">Daily Breakdown</p>
                              <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="border-gray-100">
                                      <TableHead className="text-gray-500 text-xs">Date</TableHead>
                                      <TableHead className="text-gray-500 text-xs text-right">Total</TableHead>
                                      <TableHead className="text-gray-500 text-xs text-right">Organic</TableHead>
                                      <TableHead className="text-gray-500 text-xs text-right">Paid</TableHead>
                                      <TableHead className="text-gray-500 text-xs text-right">Direct</TableHead>
                                      <TableHead className="text-gray-500 text-xs">Top Page</TableHead>
                                      <TableHead className="text-gray-500 text-xs">Top Source</TableHead>
                                      <TableHead className="text-gray-500 text-xs">Top Medium</TableHead>
                                      <TableHead className="text-gray-500 text-xs">Top Campaign</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {rows.map(r => (
                                      <TableRow key={r.date} className="border-gray-100">
                                        <TableCell className="text-gray-900 text-xs whitespace-nowrap">{format(parseISO(r.date), "dd/MM/yy")}</TableCell>
                                        <TableCell className="text-right text-gray-900 text-xs font-medium">{r.total}</TableCell>
                                        <TableCell className="text-right text-gray-900 text-xs">{r.organic}</TableCell>
                                        <TableCell className="text-right text-gray-900 text-xs">{r.paid}</TableCell>
                                        <TableCell className="text-right text-gray-900 text-xs">{r.direct}</TableCell>
                                        <TableCell className="text-gray-600 text-xs truncate max-w-[120px]">{topVal(r.pages)}</TableCell>
                                        <TableCell className="text-gray-600 text-xs truncate max-w-[100px]">{topVal(r.sources)}</TableCell>
                                        <TableCell className="text-gray-600 text-xs truncate max-w-[100px]">{topVal(r.mediums)}</TableCell>
                                        <TableCell className="text-gray-600 text-xs truncate max-w-[100px]">{topVal(r.campaigns)}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Leads by Postal Code */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Leads by Region
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {postalData.length === 0 ? (
                    <p className="text-gray-400 text-sm py-4 text-center">No regional data yet.</p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="overflow-y-auto max-h-[300px]">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-gray-100">
                              <TableHead className="text-gray-500">Postal Prefix</TableHead>
                              <TableHead className="text-gray-500 text-right">Leads</TableHead>
                              <TableHead className="text-gray-500 text-right">Share</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {postalData.map(row => (
                              <TableRow key={row.code} className="border-gray-100">
                                <TableCell className="font-mono text-gray-900">{row.code}</TableCell>
                                <TableCell className="text-right text-gray-900 font-medium">{row.count}</TableCell>
                                <TableCell className="text-right text-gray-500">
                                  {leadStats.total > 0 ? `${((row.count / leadStats.total) * 100).toFixed(1)}%` : "—"}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="flex items-center justify-center">
                        <ChartContainer config={{ count: { label: "Leads", color: COLORS.paid } }} className="h-[280px] w-full">
                          <BarChart data={postalData.slice(0, 10)} layout="vertical">
                            <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                            <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                            <YAxis dataKey="code" type="category" tick={{ fill: "#374151", fontSize: 11 }} width={80} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill={COLORS.paid} radius={[0, 4, 4, 0]} name="Leads" />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ═══════ DATA EXPORT TAB ═══════ */}
            <TabsContent value="data" className="mt-4">
              {(() => {
                // Build a unified daily map combining all data sources
                const allDates = new Set<string>();
                trafficByDay.forEach(d => allDates.add(d.date));
                dailyAds.forEach(d => allDates.add(d.date));
                leads.forEach(l => { if (l.created_at) allDates.add(format(new Date(l.created_at), "yyyy-MM-dd")); });
                whatsappClicks.forEach(w => allDates.add(format(new Date(w.clicked_at), "yyyy-MM-dd")));

                // Aggregate leads by day
                const leadsByDay: Record<string, number> = {};
                leads.forEach(l => {
                  if (!l.created_at) return;
                  const d = format(new Date(l.created_at), "yyyy-MM-dd");
                  leadsByDay[d] = (leadsByDay[d] || 0) + 1;
                });

                // Aggregate WA clicks by day
                const waByDay: Record<string, number> = {};
                whatsappClicks.forEach(w => {
                  const d = format(new Date(w.clicked_at), "yyyy-MM-dd");
                  waByDay[d] = (waByDay[d] || 0) + 1;
                });

                // Traffic map
                const trafficMap: Record<string, DailyTraffic> = {};
                trafficByDay.forEach(d => { trafficMap[d.date] = d; });

                // Ads map
                const adsMap: Record<string, typeof dailyAds[0]> = {};
                dailyAds.forEach(d => { adsMap[d.date] = d; });

                const sortedDates = Array.from(allDates).sort((a, b) => b.localeCompare(a));

                const rows = sortedDates.map(date => {
                  const t = trafficMap[date];
                  const a = adsMap[date];
                  return {
                    date,
                    visitors: t?.total || 0,
                    organic: t?.organic || 0,
                    paid: t?.paid || 0,
                    direct: t?.direct || 0,
                    referral: t?.referral || 0,
                    social: t?.social || 0,
                    sessions: t?.sessions || 0,
                    pageViews: t?.pageViews || 0,
                    bounceRate: t?.bounceRate || 0,
                    avgDuration: t?.avgSessionDuration || 0,
                    adsImpressions: a?.impressions || 0,
                    adsClicks: a?.clicks || 0,
                    adsSpend: a?.spend || 0,
                    adsConversions: a?.conversions || 0,
                    leads: leadsByDay[date] || 0,
                    whatsapp: waByDay[date] || 0,
                  };
                });

                const exportCSV = () => {
                  const headers = ["Date","Visitors","Organic","Paid","Direct","Referral","Social","Sessions","PageViews","BounceRate","AvgDuration(s)","Ads Impressions","Ads Clicks","Ads Spend","Ads Conversions","Leads","WhatsApp Clicks"];
                  const csvRows = [headers.join(",")];
                  rows.forEach(r => {
                    csvRows.push([
                      r.date, r.visitors, r.organic, r.paid, r.direct, r.referral, r.social,
                      r.sessions, r.pageViews, r.bounceRate.toFixed(1), r.avgDuration.toFixed(0),
                      r.adsImpressions, r.adsClicks, r.adsSpend.toFixed(2), r.adsConversions,
                      r.leads, r.whatsapp
                    ].join(","));
                  });
                  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `dashboard-export-${dateRange.startDate}-${dateRange.endDate}.csv`;
                  link.click();
                  URL.revokeObjectURL(url);
                };

                return (
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <FileText className="w-4 h-4" /> Complete Daily Data ({rows.length} days)
                        </CardTitle>
                        <Button size="sm" variant="outline" onClick={exportCSV} className="text-xs">
                          Export CSV
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-gray-100">
                              <TableHead className="text-gray-500 text-xs sticky left-0 bg-white z-10">Date</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Visitors</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Organic</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Paid</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Direct</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Referral</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Social</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Sessions</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Views</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Bounce%</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Avg Dur.</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Ad Impr.</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Ad Clicks</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Ad Spend</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Ad Conv.</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">Leads</TableHead>
                              <TableHead className="text-gray-500 text-xs text-right">WA Clicks</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {rows.map(r => (
                              <TableRow key={r.date} className="border-gray-100 hover:bg-gray-50">
                                <TableCell className="text-gray-900 text-xs font-medium whitespace-nowrap sticky left-0 bg-white">{format(parseISO(r.date), "dd/MM/yy")}</TableCell>
                                <TableCell className="text-right text-gray-900 text-xs font-medium">{r.visitors}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.organic}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.paid}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.direct}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.referral}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.social}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.sessions}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.pageViews}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.bounceRate.toFixed(1)}%</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{formatTime(Math.round(r.avgDuration))}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.adsImpressions}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.adsClicks}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.adsSpend.toFixed(0)}</TableCell>
                                <TableCell className="text-right text-gray-700 text-xs">{r.adsConversions}</TableCell>
                                <TableCell className="text-right text-gray-900 text-xs font-medium">{r.leads || ""}</TableCell>
                                <TableCell className="text-right text-gray-900 text-xs font-medium">{r.whatsapp || ""}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </TabsContent>

            {/* ═══════ LOGS TAB ═══════ */}
            <TabsContent value="logs" className="mt-4">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Login History</CardTitle>
                </CardHeader>
                <CardContent>
                  {loginLogs.length === 0 ? (
                    <p className="text-gray-400 text-sm py-8 text-center">No login entries yet.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-100">
                          <TableHead className="text-gray-500">Time</TableHead>
                          <TableHead className="text-gray-500">Email</TableHead>
                          <TableHead className="text-gray-500 text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loginLogs.map((log, i) => (
                          <TableRow key={i} className="border-gray-100 hover:bg-gray-50">
                            <TableCell className="text-gray-900">{format(new Date(log.timestamp), "dd/MM/yyyy HH:mm:ss")}</TableCell>
                            <TableCell className="text-gray-700">{log.email}</TableCell>
                            <TableCell className="text-center">
                              {log.success ? (
                                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">Success</Badge>
                              ) : (
                                <Badge className="bg-red-50 text-red-700 border border-red-200 text-xs">Failed</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
