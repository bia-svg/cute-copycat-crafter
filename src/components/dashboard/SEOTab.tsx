import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import {
  Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer,
  ComposedChart, Bar, BarChart, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import {
  Search, TrendingUp, TrendingDown, Sparkles, Loader2, AlertTriangle,
  ArrowUpRight, FileText, Download, Trophy, Globe, Smartphone, Target, History, Zap
} from "lucide-react";
import { exportSEOReport } from "@/lib/exportPdf";
import { supabase } from "@/integrations/supabase/client";
import type {
  GSCQuery, GSCTotals, GSCDailyMetric, GSCPage,
  GSCCountrySegment, GSCDeviceSegment, GSCDistribution, SEOSnapshot
} from "@/data/dashboardMockData";
import { format, parseISO } from "date-fns";

interface SEOTabProps {
  gscQueries: GSCQuery[];
  gscTotals: GSCTotals | null;
  gscPreviousTotals: GSCTotals | null;
  gscPreviousPeriod: { startDate: string; endDate: string } | null;
  gscDailyMetrics: GSCDailyMetric[];
  gscTopPages: GSCPage[];
  gscByCountry: GSCCountrySegment[];
  gscByDevice: GSCDeviceSegment[];
  gscDistribution: GSCDistribution | null;
  seoSnapshots: SEOSnapshot[];
  gscError: string | null;
  gscLive: boolean;
}

interface SEOReport {
  quickWins: { keyword: string; currentPosition: number; impressions: number; ctr: number; action: string; expectedImpact: string }[];
  newPages: { suggestedUrl: string; title: string; targetKeywords: string[]; contentOutline: string; estimatedTraffic: string }[];
  contentGaps: { topic: string; reasoning: string; suggestedApproach: string }[];
  positionAlerts: { keyword: string; position: number; impressions: number; risk: string }[];
  recommendations: { priority: number; action: string; expectedResult: string; effort: string }[];
  summary: string;
}

const COUNTRY_NAMES: Record<string, string> = {
  deu: "Germany", che: "Switzerland", aut: "Austria",
  usa: "United States", gbr: "United Kingdom", fra: "France",
  ita: "Italy", esp: "Spain", nld: "Netherlands", bra: "Brazil",
  prt: "Portugal", pol: "Poland", bel: "Belgium",
};
const DEVICE_LABELS: Record<string, string> = {
  DESKTOP: "Desktop", MOBILE: "Mobile", TABLET: "Tablet",
};
const DEVICE_COLORS: Record<string, string> = {
  DESKTOP: "#2563eb", MOBILE: "#10b981", TABLET: "#f59e0b",
};

function Delta({ current, previous, lowerIsBetter = false, format: fmt = "int", suffix = "" }: {
  current: number; previous: number; lowerIsBetter?: boolean; format?: "int" | "pct" | "decimal"; suffix?: string;
}) {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return <span className="text-xs text-gray-400">new</span>;
  const diff = current - previous;
  const pct = (diff / previous) * 100;
  const isPositive = lowerIsBetter ? diff < 0 : diff > 0;
  const Icon = diff > 0 ? TrendingUp : TrendingDown;
  const color = isPositive ? "text-emerald-600" : diff === 0 ? "text-gray-400" : "text-red-500";
  const display =
    fmt === "pct" ? `${diff > 0 ? "+" : ""}${(diff * 100).toFixed(2)}pp` :
    fmt === "decimal" ? `${diff > 0 ? "+" : ""}${diff.toFixed(1)}` :
    `${diff > 0 ? "+" : ""}${diff.toLocaleString()}`;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3" />
      {display}{suffix} <span className="text-gray-400 font-normal">({pct > 0 ? "+" : ""}{pct.toFixed(0)}%)</span>
    </span>
  );
}

export default function SEOTab({
  gscQueries, gscTotals, gscPreviousTotals, gscPreviousPeriod,
  gscDailyMetrics, gscTopPages, gscByCountry, gscByDevice, gscDistribution,
  seoSnapshots, gscError, gscLive
}: SEOTabProps) {
  const [report, setReport] = useState<SEOReport | null>(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const generateReport = async () => {
    setReportLoading(true);
    setReportError(null);
    try {
      const sitePages = [
        "/", "/raucherentwoehnung", "/aengste-phobien", "/abnehmen",
        "/stress-burnout", "/depressionen-traumata", "/kinder-jugendliche",
        "/erstgespraech", "/ueber-uns", "/ausbildung", "/kundenmeinungen",
        "/firmen-coaching", "/standorte", "/blog", "/buch", "/tv-medien",
        "/seminar-anmeldung", "/erwachsene",
      ];
      const { data, error } = await supabase.functions.invoke("seo-report", {
        body: { topQueries: gscQueries, topPages: gscTopPages, sitePages },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setReport(data.report);
    } catch (err: any) {
      setReportError(err?.message || "Failed to generate report");
    } finally {
      setReportLoading(false);
    }
  };

  // Daily chart data
  const chartData = gscDailyMetrics.map(d => ({
    date: d.date,
    label: (() => { try { return format(parseISO(d.date), "MMM d"); } catch { return d.date; } })(),
    clicks: d.clicks,
    impressions: d.impressions,
    position: Math.round(d.position * 10) / 10,
  }));

  const chartConfig = {
    clicks: { label: "Clicks", color: "#2563eb" },
    impressions: { label: "Impressions", color: "#94a3b8" },
    position: { label: "Avg Position", color: "#f59e0b" },
  };

  // Auto Quick Wins (no AI): pos 4-15, impressions >= 50, CTR < 3%
  const autoQuickWins = useMemo(() => {
    return gscQueries
      .filter(q => q.position >= 4 && q.position <= 15 && q.impressions >= 50 && q.ctr < 0.03)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 15)
      .map(q => ({
        ...q,
        potentialClicks: Math.round(q.impressions * 0.05) - q.clicks, // assume ~5% CTR achievable
      }))
      .filter(q => q.potentialClicks > 0);
  }, [gscQueries]);

  // Distribution chart data
  const distData = gscDistribution ? [
    { name: "Top 3", value: gscDistribution.top3, color: "#10b981" },
    { name: "4-10", value: gscDistribution.pos4_10, color: "#3b82f6" },
    { name: "11-20", value: gscDistribution.pos11_20, color: "#f59e0b" },
    { name: "21+", value: gscDistribution.pos21_plus, color: "#94a3b8" },
  ] : [];

  // Snapshot history chart
  const historyData = seoSnapshots.map(s => ({
    date: s.snapshot_date,
    label: (() => { try { return format(parseISO(s.snapshot_date), "MMM d"); } catch { return s.snapshot_date; } })(),
    clicks: s.clicks,
    impressions: s.impressions,
    position: Math.round(s.position * 10) / 10,
    top3: s.keywords_top3,
    pos4_10: s.keywords_4_10,
    pos11_20: s.keywords_11_20,
    pos21_plus: s.keywords_21_plus,
  }));

  return (
    <div className="space-y-5">
      {gscError && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
          <strong>Search Console:</strong> {gscError}
        </div>
      )}

      {/* Totals with deltas vs previous period */}
      {gscTotals && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Search Clicks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{gscTotals.clicks.toLocaleString()}</p>
              {gscPreviousTotals && <div className="mt-1"><Delta current={gscTotals.clicks} previous={gscPreviousTotals.clicks} /></div>}
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Impressions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{gscTotals.impressions.toLocaleString()}</p>
              {gscPreviousTotals && <div className="mt-1"><Delta current={gscTotals.impressions} previous={gscPreviousTotals.impressions} /></div>}
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg CTR</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{(gscTotals.ctr * 100).toFixed(2)}%</p>
              {gscPreviousTotals && <div className="mt-1"><Delta current={gscTotals.ctr} previous={gscPreviousTotals.ctr} format="pct" /></div>}
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg Position</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{gscTotals.position.toFixed(1)}</p>
              {gscPreviousTotals && <div className="mt-1"><Delta current={gscTotals.position} previous={gscPreviousTotals.position} lowerIsBetter format="decimal" /></div>}
            </CardContent>
          </Card>
        </div>
      )}

      {gscPreviousPeriod && (
        <p className="text-xs text-gray-400 -mt-3">
          Compared to previous period: {gscPreviousPeriod.startDate} → {gscPreviousPeriod.endDate}
        </p>
      )}


      {/* Clicks vs Position Over Time Chart */}
      {chartData.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Search Performance Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 11 }}
                    label={{ value: "Clicks / Impressions", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "#6b7280" } }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    reversed
                    domain={[1, "auto"]}
                    tick={{ fontSize: 11 }}
                    label={{ value: "Position", angle: 90, position: "insideRight", style: { fontSize: 10, fill: "#6b7280" } }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar
                    yAxisId="left"
                    dataKey="impressions"
                    fill="#e2e8f0"
                    name="Impressions"
                    radius={[2, 2, 0, 0]}
                    opacity={0.6}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="clicks"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                    name="Clicks"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="position"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="5 3"
                    dot={false}
                    name="Avg Position"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Top Queries Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Search className="w-4 h-4" /> Top Search Queries
          </CardTitle>
          {gscLive && <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">● GSC Live</Badge>}
        </CardHeader>
        <CardContent>
          {gscQueries.length === 0 && !gscError ? (
            <p className="text-sm text-gray-400 py-4 text-center">No search data available for this period.</p>
          ) : (
            <div className="max-h-[400px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Query</TableHead>
                    <TableHead className="text-xs text-right">Clicks</TableHead>
                    <TableHead className="text-xs text-right">Impressions</TableHead>
                    <TableHead className="text-xs text-right">CTR</TableHead>
                    <TableHead className="text-xs text-right">Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gscQueries.map((q, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm font-medium">{q.query}</TableCell>
                      <TableCell className="text-sm text-right">{q.clicks}</TableCell>
                      <TableCell className="text-sm text-right">{q.impressions.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-right">{(q.ctr * 100).toFixed(1)}%</TableCell>
                      <TableCell className="text-sm text-right">
                        <span className={q.position <= 3 ? "text-emerald-600 font-semibold" : q.position <= 10 ? "text-blue-600" : "text-amber-600"}>
                          {q.position.toFixed(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Pages with CTR / Position */}
      {gscTopPages.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Top Pages — CTR & Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[420px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Page</TableHead>
                    <TableHead className="text-xs text-right">Clicks</TableHead>
                    <TableHead className="text-xs text-right">Impressions</TableHead>
                    <TableHead className="text-xs text-right">CTR</TableHead>
                    <TableHead className="text-xs text-right">Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gscTopPages.map((p, i) => {
                    let pagePath = p.page;
                    try { pagePath = new URL(p.page).pathname; } catch { /* keep raw */ }
                    const ctrLow = p.ctr < 0.02 && p.position <= 15;
                    return (
                      <TableRow key={i}>
                        <TableCell className="text-sm font-medium max-w-[300px] truncate" title={p.page}>
                          <span className="font-mono text-xs">{pagePath}</span>
                        </TableCell>
                        <TableCell className="text-sm text-right">{p.clicks}</TableCell>
                        <TableCell className="text-sm text-right">{p.impressions.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-right">
                          <span className={ctrLow ? "text-amber-600 font-semibold" : "text-gray-700"}>
                            {(p.ctr * 100).toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-right">
                          <span className={p.position <= 3 ? "text-emerald-600 font-semibold" : p.position <= 10 ? "text-blue-600" : "text-amber-600"}>
                            {p.position.toFixed(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Pages with <span className="text-amber-600 font-medium">amber CTR</span> rank well (pos ≤ 15) but underperform on clicks — prime targets to rewrite title/meta.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Auto Quick Wins (no AI) */}
      {autoQuickWins.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" /> Auto Quick Wins
              <Badge variant="outline" className="text-xs ml-1">{autoQuickWins.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500 mb-3">
              Keywords ranking <strong>4–15</strong> with <strong>50+ impressions</strong> but <strong>CTR &lt; 3%</strong>. Highest-impact CTR opportunities — rewrite title/meta to push them up.
            </p>
            <div className="max-h-[400px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Keyword</TableHead>
                    <TableHead className="text-xs text-right">Pos</TableHead>
                    <TableHead className="text-xs text-right">Impr.</TableHead>
                    <TableHead className="text-xs text-right">CTR</TableHead>
                    <TableHead className="text-xs text-right">Clicks</TableHead>
                    <TableHead className="text-xs text-right">Potential +Clicks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {autoQuickWins.map((q, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm font-medium">{q.query}</TableCell>
                      <TableCell className="text-sm text-right text-amber-600">{q.position.toFixed(1)}</TableCell>
                      <TableCell className="text-sm text-right">{q.impressions.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-right">{(q.ctr * 100).toFixed(2)}%</TableCell>
                      <TableCell className="text-sm text-right">{q.clicks}</TableCell>
                      <TableCell className="text-sm text-right">
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">+{q.potentialClicks}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Position Distribution + Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {gscDistribution && gscDistribution.total > 0 && (
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Target className="w-4 h-4" /> Keyword Position Distribution
                <Badge variant="outline" className="text-xs ml-1">{gscDistribution.total} kw</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distData} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={50} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {distData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="grid grid-cols-4 gap-2 mt-2 text-center">
                {distData.map(d => (
                  <div key={d.name}>
                    <p className="text-xs text-gray-500">{d.name}</p>
                    <p className="text-sm font-semibold" style={{ color: d.color }}>{d.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {gscByDevice.length > 0 && (
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> Clicks by Device
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gscByDevice.map(d => ({ name: DEVICE_LABELS[d.device] || d.device, value: d.clicks }))}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label={(e: any) => `${e.name}: ${e.value}`}
                    >
                      {gscByDevice.map((d, i) => (
                        <Cell key={i} fill={DEVICE_COLORS[d.device] || "#6b7280"} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
                {gscByDevice.map(d => (
                  <div key={d.device}>
                    <p className="text-gray-500">{DEVICE_LABELS[d.device] || d.device}</p>
                    <p className="text-gray-700">CTR {(d.ctr * 100).toFixed(2)}%</p>
                    <p className="text-gray-400">Pos {d.position.toFixed(1)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Country breakdown */}
      {gscByCountry.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Top Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Country</TableHead>
                  <TableHead className="text-xs text-right">Clicks</TableHead>
                  <TableHead className="text-xs text-right">Impressions</TableHead>
                  <TableHead className="text-xs text-right">CTR</TableHead>
                  <TableHead className="text-xs text-right">Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gscByCountry.slice(0, 10).map((c, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm font-medium uppercase">
                      {COUNTRY_NAMES[c.country] || c.country}
                    </TableCell>
                    <TableCell className="text-sm text-right">{c.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-right">{c.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-right">{(c.ctr * 100).toFixed(2)}%</TableCell>
                    <TableCell className="text-sm text-right">{c.position.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Long-term snapshot history */}
      {historyData.length > 0 ? (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <History className="w-4 h-4" /> Long-Term SEO Evolution
              <Badge variant="outline" className="text-xs ml-1">{historyData.length} snapshots</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500 mb-3">
              Weekly snapshots (rolling 28-day window) — tracks evolution beyond Search Console's 16-month limit.
            </p>
            <ChartContainer config={chartConfig} className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" reversed domain={[1, "auto"]} tick={{ fontSize: 11 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar yAxisId="left" dataKey="clicks" fill="#2563eb" name="Clicks" radius={[2, 2, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="position" stroke="#f59e0b" strokeWidth={2} dot name="Avg Position" />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4">
              <p className="text-xs font-medium text-gray-600 mb-1">Keywords by ranking band over time</p>
              <ChartContainer config={{}} className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historyData} stackOffset="expand">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 11 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area type="monotone" dataKey="top3" stackId="1" stroke="#10b981" fill="#10b981" name="Top 3" />
                    <Area type="monotone" dataKey="pos4_10" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="4-10" />
                    <Area type="monotone" dataKey="pos11_20" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="11-20" />
                    <Area type="monotone" dataKey="pos21_plus" stackId="1" stroke="#94a3b8" fill="#94a3b8" name="21+" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <History className="w-5 h-5 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">
              No long-term snapshots yet. The first weekly snapshot will be saved on Monday at 03:00 UTC.
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Each snapshot captures a rolling 28-day window of GSC metrics for permanent history.
            </p>
          </CardContent>
        </Card>
      )}

      {/* AI Report Section */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" /> AI SEO Report
            </CardTitle>
            <div className="flex items-center gap-2">
              {report && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => exportSEOReport(report, gscTotals)}
                  className="text-xs"
                >
                  <Download className="w-3 h-3 mr-1" /> Export PDF
                </Button>
              )}
              <Button
                size="sm"
                onClick={generateReport}
                disabled={reportLoading || gscQueries.length === 0}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
              >
                {reportLoading ? (
                  <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Analyzing...</>
                ) : (
                  <><Sparkles className="w-3 h-3 mr-1" /> Generate Report</>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {reportError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">
              {reportError}
            </div>
          )}

          {!report && !reportLoading && (
            <p className="text-sm text-gray-400 py-6 text-center">
              Click "Generate Report" to get AI-powered SEO insights based on your Search Console data.
            </p>
          )}

          {report && (
            <div className="space-y-6">
              {/* Summary */}
              {report.summary && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-800">{report.summary}</p>
                </div>
              )}

              {/* Quick Wins */}
              {report.quickWins?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Quick Wins
                  </h4>
                  <div className="space-y-2">
                    {report.quickWins.map((qw, i) => (
                      <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">"{qw.keyword}"</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Position: {qw.currentPosition?.toFixed(1)} · Impressions: {qw.impressions?.toLocaleString()} · CTR: {((qw.ctr || 0) * 100).toFixed(1)}%
                            </p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">{qw.expectedImpact}</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">→ {qw.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Page Opportunities */}
              {report.newPages?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-blue-500" /> New Page Opportunities
                  </h4>
                  <div className="space-y-2">
                    {report.newPages.map((np, i) => (
                      <div key={i} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-800">{np.title}</p>
                        <p className="text-xs text-blue-600 font-mono mt-0.5">{np.suggestedUrl}</p>
                        <p className="text-xs text-gray-600 mt-1">{np.contentOutline}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {np.targetKeywords?.map((kw, j) => (
                            <Badge key={j} variant="outline" className="text-xs">{kw}</Badge>
                          ))}
                        </div>
                        {np.estimatedTraffic && (
                          <p className="text-xs text-blue-700 mt-1 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> Est. traffic: {np.estimatedTraffic}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Position Alerts */}
              {report.positionAlerts?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Position Alerts
                  </h4>
                  <div className="space-y-2">
                    {report.positionAlerts.map((pa, i) => (
                      <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800">"{pa.keyword}"</p>
                          <p className="text-xs text-gray-500 mt-0.5">Position: {pa.position?.toFixed(1)} · Impressions: {pa.impressions?.toLocaleString()}</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-700 text-xs">{pa.risk}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {report.recommendations?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">📋 Monthly Action Plan</h4>
                  <div className="space-y-2">
                    {report.recommendations.map((rec, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {rec.priority}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{rec.action}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Expected: {rec.expectedResult} · Effort: {rec.effort}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content Gaps */}
              {report.contentGaps?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">🔍 Content Gaps</h4>
                  <div className="space-y-2">
                    {report.contentGaps.map((cg, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-800">{cg.topic}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{cg.reasoning}</p>
                        <p className="text-xs text-gray-600 mt-1">→ {cg.suggestedApproach}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
