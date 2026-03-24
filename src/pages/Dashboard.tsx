import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getCurrentUser, getLoginLogs } from "@/lib/dashboardAuth";
import {
  generateDailyData, topPages, campaigns, generateFormSubmissions,
  formatTime, type DailyMetric, type FormSubmission
} from "@/data/dashboardMockData";
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
  ResponsiveContainer, LineChart, Line
} from "recharts";
import {
  Users, FileText, MessageCircle, TrendingUp, LogOut, Clock,
  Eye, DollarSign, Target, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { format, subDays, startOfWeek, startOfMonth, parseISO } from "date-fns";

type Period = "daily" | "weekly" | "monthly" | "total";

function aggregateByWeek(data: DailyMetric[]): DailyMetric[] {
  const weeks: Record<string, DailyMetric> = {};
  data.forEach(d => {
    const key = format(startOfWeek(parseISO(d.date), { weekStartsOn: 1 }), "yyyy-MM-dd");
    if (!weeks[key]) weeks[key] = { date: key, visitors: 0, formSubmissions: 0, whatsappClicks: 0, conversions: 0 };
    weeks[key].visitors += d.visitors;
    weeks[key].formSubmissions += d.formSubmissions;
    weeks[key].whatsappClicks += d.whatsappClicks;
    weeks[key].conversions += d.conversions;
  });
  return Object.values(weeks).sort((a, b) => a.date.localeCompare(b.date));
}

function aggregateByMonth(data: DailyMetric[]): DailyMetric[] {
  const months: Record<string, DailyMetric> = {};
  data.forEach(d => {
    const key = format(startOfMonth(parseISO(d.date)), "yyyy-MM");
    if (!months[key]) months[key] = { date: key, visitors: 0, formSubmissions: 0, whatsappClicks: 0, conversions: 0 };
    months[key].visitors += d.visitors;
    months[key].formSubmissions += d.formSubmissions;
    months[key].whatsappClicks += d.whatsappClicks;
    months[key].conversions += d.conversions;
  });
  return Object.values(months).sort((a, b) => a.date.localeCompare(b.date));
}

function MetricCard({ title, value, icon: Icon, change, prefix }: {
  title: string; value: string | number; icon: any; change?: number; prefix?: string;
}) {
  return (
    <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)] text-white">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[hsl(220,10%,55%)]">{title}</span>
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="text-2xl font-bold">{prefix}{typeof value === "number" ? value.toLocaleString("en-US") : value}</div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 mt-1 text-xs ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
            {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change).toFixed(1)}% vs. previous period
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>("daily");
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (!isAuthenticated()) navigate("/dashboard/login", { replace: true });
  }, [navigate]);

  const rawData = useMemo(() => generateDailyData(), []);
  const submissions = useMemo(() => generateFormSubmissions(), []);

  const chartData = useMemo(() => {
    if (period === "weekly") return aggregateByWeek(rawData);
    if (period === "monthly") return aggregateByMonth(rawData);
    return rawData;
  }, [rawData, period]);

  const totals = useMemo(() => {
    return rawData.reduce((acc, d) => ({
      visitors: acc.visitors + d.visitors,
      formSubmissions: acc.formSubmissions + d.formSubmissions,
      whatsappClicks: acc.whatsappClicks + d.whatsappClicks,
      conversions: acc.conversions + d.conversions,
    }), { visitors: 0, formSubmissions: 0, whatsappClicks: 0, conversions: 0 });
  }, [rawData]);

  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
  const totalLeads = totals.formSubmissions + totals.whatsappClicks;
  const conversionRate = totalLeads > 0 ? ((totals.conversions / totalLeads) * 100).toFixed(1) : "0";

  const loginLogs = getLoginLogs();
  const currentUserEmail = getCurrentUser();
  const displayName = currentUserEmail?.includes("david") ? "David" : currentUserEmail?.includes("bia") ? "Bia" : currentUserEmail?.split("@")[0] ?? "";

  if (!isAuthenticated()) return null;

  const chartConfig = {
    visitors: { label: "Visitors", color: "hsl(213, 53%, 45%)" },
    formSubmissions: { label: "Forms", color: "hsl(123, 46%, 45%)" },
    whatsappClicks: { label: "WhatsApp", color: "hsl(142, 70%, 45%)" },
    conversions: { label: "Conversions", color: "hsl(45, 90%, 55%)" },
  };

  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)] text-white">
      {/* Header */}
      <div className="border-b border-[hsl(220,15%,15%)] bg-[hsl(220,15%,10%)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">David Woods — Dashboard</h1>
            <p className="text-xs text-[hsl(220,10%,45%)]">Internal Analytics & Campaign Tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[hsl(220,10%,50%)]">{displayName}</span>
            <Button size="sm" variant="ghost" onClick={() => { logout(); navigate("/dashboard/login"); }}
              className="text-[hsl(220,10%,55%)] hover:text-white hover:bg-[hsl(220,15%,15%)]">
              <LogOut className="w-4 h-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <TabsList className="bg-[hsl(220,15%,13%)] border border-[hsl(220,15%,20%)]">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white text-[hsl(220,10%,55%)]">Overview</TabsTrigger>
              <TabsTrigger value="campaigns" className="data-[state=active]:bg-primary data-[state=active]:text-white text-[hsl(220,10%,55%)]">Campaigns</TabsTrigger>
              <TabsTrigger value="submissions" className="data-[state=active]:bg-primary data-[state=active]:text-white text-[hsl(220,10%,55%)]">Leads</TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-primary data-[state=active]:text-white text-[hsl(220,10%,55%)]">Logs</TabsTrigger>
            </TabsList>

            {tab !== "logs" && (
              <div className="flex gap-1 bg-[hsl(220,15%,13%)] border border-[hsl(220,15%,20%)] rounded-md p-1">
                {(["daily", "weekly", "monthly", "total"] as Period[]).map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${period === p ? "bg-primary text-white" : "text-[hsl(220,10%,55%)] hover:text-white"}`}>
                    {p === "daily" ? "Daily" : p === "weekly" ? "Weekly" : p === "monthly" ? "Monthly" : "All Time"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6 mt-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard title="Visitors" value={totals.visitors} icon={Users} change={8.3} />
              <MetricCard title="Form Leads" value={totals.formSubmissions} icon={FileText} change={12.5} />
              <MetricCard title="WhatsApp Clicks" value={totals.whatsappClicks} icon={MessageCircle} change={-2.1} />
              <MetricCard title="Conversion Rate" value={`${conversionRate}%`} icon={TrendingUp} change={3.7} />
            </div>

            {/* Charts */}
            {period !== "total" && (
              <div className="grid lg:grid-cols-2 gap-4">
                {/* Visitors Chart */}
                <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-[hsl(220,10%,65%)] font-medium">Visitors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[220px] w-full">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(213, 53%, 45%)" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="hsl(213, 53%, 45%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="hsl(220,15%,18%)" strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fill: "hsl(220,10%,45%)", fontSize: 10 }} tickFormatter={v => format(parseISO(v), "dd.MM")} />
                        <YAxis tick={{ fill: "hsl(220,10%,45%)", fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="visitors" stroke="hsl(213, 53%, 45%)" fill="url(#fillVisitors)" strokeWidth={2} />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Form Submissions Chart */}
                <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-[hsl(220,10%,65%)] font-medium">Form Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[220px] w-full">
                      <BarChart data={chartData}>
                        <CartesianGrid stroke="hsl(220,15%,18%)" strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fill: "hsl(220,10%,45%)", fontSize: 10 }} tickFormatter={v => format(parseISO(v), "dd.MM")} />
                        <YAxis tick={{ fill: "hsl(220,10%,45%)", fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="formSubmissions" fill="hsl(123, 46%, 45%)" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* WhatsApp Clicks Chart */}
                <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-[hsl(220,10%,65%)] font-medium">WhatsApp Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[220px] w-full">
                      <BarChart data={chartData}>
                        <CartesianGrid stroke="hsl(220,15%,18%)" strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fill: "hsl(220,10%,45%)", fontSize: 10 }} tickFormatter={v => format(parseISO(v), "dd.MM")} />
                        <YAxis tick={{ fill: "hsl(220,10%,45%)", fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="whatsappClicks" fill="hsl(142, 70%, 45%)" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Conversion Rate Chart */}
                <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-[hsl(220,10%,65%)] font-medium">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[220px] w-full">
                      <LineChart data={chartData.map(d => ({
                        ...d,
                        rate: d.formSubmissions + d.whatsappClicks > 0
                          ? Number(((d.conversions / (d.formSubmissions + d.whatsappClicks)) * 100).toFixed(1))
                          : 0
                      }))}>
                        <CartesianGrid stroke="hsl(220,15%,18%)" strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fill: "hsl(220,10%,45%)", fontSize: 10 }} tickFormatter={v => format(parseISO(v), "dd.MM")} />
                        <YAxis tick={{ fill: "hsl(220,10%,45%)", fontSize: 10 }} unit="%" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="rate" stroke="hsl(45, 90%, 55%)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Top Pages */}
            <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)]">
              <CardHeader>
                <CardTitle className="text-sm text-[hsl(220,10%,65%)] font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[hsl(220,15%,18%)] hover:bg-transparent">
                      <TableHead className="text-[hsl(220,10%,50%)]">Page</TableHead>
                      <TableHead className="text-[hsl(220,10%,50%)] text-right">Views</TableHead>
                      <TableHead className="text-[hsl(220,10%,50%)] text-right">Avg. Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPages.map(page => (
                      <TableRow key={page.path} className="border-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,15%)]">
                        <TableCell className="text-white font-medium">{page.label}<span className="text-[hsl(220,10%,40%)] text-xs ml-2">{page.path}</span></TableCell>
                        <TableCell className="text-right text-white">{page.views.toLocaleString("en-US")}</TableCell>
                        <TableCell className="text-right text-white flex items-center justify-end gap-1"><Clock className="w-3 h-3 text-[hsl(220,10%,45%)]" />{formatTime(page.avgTimeSeconds)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CAMPAIGNS TAB */}
          <TabsContent value="campaigns" className="space-y-6 mt-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard title="Ad Spend" value={totalSpend} icon={DollarSign} prefix="CHF " />
              <MetricCard title="Total Clicks" value={campaigns.reduce((s, c) => s + c.clicks, 0)} icon={Target} />
              <MetricCard title="Total Leads" value={campaigns.reduce((s, c) => s + c.leads, 0)} icon={FileText} />
              <MetricCard title="Cost / Lead" value={`CHF ${(totalSpend / campaigns.reduce((s, c) => s + c.leads, 1)).toFixed(0)}`} icon={TrendingUp} />
            </div>

            <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)]">
              <CardHeader>
                <CardTitle className="text-sm text-[hsl(220,10%,65%)] font-medium">Campaign Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[hsl(220,15%,18%)] hover:bg-transparent">
                      <TableHead className="text-[hsl(220,10%,50%)]">Campaign</TableHead>
                      <TableHead className="text-[hsl(220,10%,50%)]">Source</TableHead>
                      <TableHead className="text-[hsl(220,10%,50%)] text-right">Spend</TableHead>
                      <TableHead className="text-[hsl(220,10%,50%)] text-right">Clicks</TableHead>
                      <TableHead className="text-[hsl(220,10%,50%)] text-right">Leads</TableHead>
                      <TableHead className="text-[hsl(220,10%,50%)] text-right">Conversions</TableHead>
                      <TableHead className="text-[hsl(220,10%,50%)] text-right">CPA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map(c => (
                      <TableRow key={c.id} className="border-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,15%)]">
                        <TableCell className="text-white font-medium">{c.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-xs border-[hsl(220,15%,25%)] ${c.source === "google_ads" ? "text-blue-400" : c.source === "organic" ? "text-green-400" : "text-[hsl(220,10%,55%)]"}`}>
                            {c.source === "google_ads" ? "Google Ads" : c.source === "organic" ? "Organic" : c.source === "direct" ? "Direct" : "Referral"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-white">{c.spend > 0 ? `CHF ${c.spend.toLocaleString("en-US")}` : "—"}</TableCell>
                        <TableCell className="text-right text-white">{c.clicks.toLocaleString("en-US")}</TableCell>
                        <TableCell className="text-right text-white">{c.leads}</TableCell>
                        <TableCell className="text-right text-white">{c.conversions}</TableCell>
                        <TableCell className="text-right text-white">{c.conversions > 0 && c.spend > 0 ? `CHF ${(c.spend / c.conversions).toFixed(0)}` : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LEADS / SUBMISSIONS TAB */}
          <TabsContent value="submissions" className="space-y-6 mt-4">
            <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-[hsl(220,10%,65%)] font-medium">Form Submissions — Tracking Codes</CardTitle>
                  <p className="text-xs text-[hsl(220,10%,40%)]">Code sent in confirmation email</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[hsl(220,15%,18%)] hover:bg-transparent">
                        <TableHead className="text-[hsl(220,10%,50%)]">Code</TableHead>
                        <TableHead className="text-[hsl(220,10%,50%)]">Date</TableHead>
                        <TableHead className="text-[hsl(220,10%,50%)]">Name</TableHead>
                        <TableHead className="text-[hsl(220,10%,50%)]">Topic</TableHead>
                        <TableHead className="text-[hsl(220,10%,50%)]">Source</TableHead>
                        <TableHead className="text-[hsl(220,10%,50%)]">Campaign</TableHead>
                        <TableHead className="text-[hsl(220,10%,50%)] text-center">Converted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map(s => (
                        <TableRow key={s.id} className="border-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,15%)]">
                          <TableCell className="font-mono text-primary text-sm font-semibold">{s.code}</TableCell>
                          <TableCell className="text-white">{format(parseISO(s.date), "dd.MM.yyyy")}</TableCell>
                          <TableCell className="text-white">{s.name}</TableCell>
                          <TableCell className="text-white text-sm">{s.concern}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-xs border-[hsl(220,15%,25%)] ${s.source === "google_ads" ? "text-blue-400" : s.source === "organic" ? "text-green-400" : "text-[hsl(220,10%,55%)]"}`}>
                              {s.source === "google_ads" ? "Ads" : s.source === "organic" ? "Organic" : "Direct"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-[hsl(220,10%,50%)] text-xs">{s.utm_campaign || "—"}</TableCell>
                          <TableCell className="text-center">
                            {s.converted ? (
                              <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">✓ Yes</Badge>
                            ) : (
                              <Badge className="bg-[hsl(220,15%,18%)] text-[hsl(220,10%,45%)] border-0 text-xs">Pending</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LOGS TAB */}
          <TabsContent value="logs" className="mt-4">
            <Card className="bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)]">
              <CardHeader>
                <CardTitle className="text-sm text-[hsl(220,10%,65%)] font-medium">Login History</CardTitle>
              </CardHeader>
              <CardContent>
                {loginLogs.length === 0 ? (
                  <p className="text-[hsl(220,10%,45%)] text-sm py-8 text-center">No login entries yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[hsl(220,15%,18%)] hover:bg-transparent">
                        <TableHead className="text-[hsl(220,10%,50%)]">Time</TableHead>
                        <TableHead className="text-[hsl(220,10%,50%)]">Email</TableHead>
                        <TableHead className="text-[hsl(220,10%,50%)] text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loginLogs.map((log, i) => (
                        <TableRow key={i} className="border-[hsl(220,15%,18%)] hover:bg-[hsl(220,15%,15%)]">
                          <TableCell className="text-white">{format(new Date(log.timestamp), "dd.MM.yyyy HH:mm:ss")}</TableCell>
                          <TableCell className="text-white">{log.email}</TableCell>
                          <TableCell className="text-center">
                            {log.success ? (
                              <Badge className="bg-green-500/20 text-green-400 border-0 text-xs">Success</Badge>
                            ) : (
                              <Badge className="bg-red-500/20 text-red-400 border-0 text-xs">Failed</Badge>
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
  );
}
