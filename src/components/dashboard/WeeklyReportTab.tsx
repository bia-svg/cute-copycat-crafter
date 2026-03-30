import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Loader2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, startOfWeek, endOfWeek, eachWeekOfInterval } from "date-fns";
import type { DailyTraffic, DailyAds, LeadRecord, GSCDailyMetric } from "@/data/dashboardMockData";
import { exportWeeklyReport } from "@/lib/exportPdf";

interface WeeklyReportTabProps {
  trafficByDay: DailyTraffic[];
  dailyAds: DailyAds[];
  leads: LeadRecord[];
  gscDailyMetrics: GSCDailyMetric[];
  dateRange: { startDate: string; endDate: string };
}

interface WeeklyRow {
  weekLabel: string;
  weekStart: string;
  sessions: number;
  spend: number;
  leads: number;
  cpl: number;
  avgPosition: number;
}

export default function WeeklyReportTab({ trafficByDay, dailyAds, leads, gscDailyMetrics, dateRange }: WeeklyReportTabProps) {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const weeklyData = useMemo(() => {
    if (!trafficByDay.length) return [];

    const start = parseISO(dateRange.startDate);
    const end = parseISO(dateRange.endDate);
    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

    // Index ads by date
    const adsMap: Record<string, DailyAds> = {};
    dailyAds.forEach(d => { adsMap[d.date] = d; });

    // Index GSC by date
    const gscMap: Record<string, GSCDailyMetric> = {};
    gscDailyMetrics.forEach(d => { gscMap[d.date] = d; });

    // Index leads by date
    const leadsByDate: Record<string, number> = {};
    leads.forEach(l => {
      const d = l.created_at ? format(parseISO(l.created_at), "yyyy-MM-dd") : null;
      if (d) leadsByDate[d] = (leadsByDate[d] || 0) + 1;
    });

    // Index sessions by date
    const sessionsByDate: Record<string, number> = {};
    trafficByDay.forEach(d => { sessionsByDate[d.date] = d.sessions || d.total; });

    const rows: WeeklyRow[] = weeks.map(weekStart => {
      const wEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const clampedEnd = wEnd > end ? end : wEnd;
      const label = `${format(weekStart, "dd/MM")} – ${format(clampedEnd, "dd/MM")}`;

      let sessions = 0, spend = 0, leadCount = 0;
      const positions: number[] = [];

      // Iterate days in week
      let cursor = new Date(weekStart);
      while (cursor <= clampedEnd) {
        const key = format(cursor, "yyyy-MM-dd");
        sessions += sessionsByDate[key] || 0;
        spend += adsMap[key]?.spend || 0;
        leadCount += leadsByDate[key] || 0;
        if (gscMap[key]?.position) positions.push(gscMap[key].position);
        cursor.setDate(cursor.getDate() + 1);
      }

      const avgPos = positions.length > 0 ? positions.reduce((a, b) => a + b, 0) / positions.length : 0;

      return {
        weekLabel: label,
        weekStart: format(weekStart, "yyyy-MM-dd"),
        sessions,
        spend: Math.round(spend * 100) / 100,
        leads: leadCount,
        cpl: leadCount > 0 ? Math.round((spend / leadCount) * 100) / 100 : 0,
        avgPosition: Math.round(avgPos * 10) / 10,
      };
    });

    return rows;
  }, [trafficByDay, dailyAds, leads, gscDailyMetrics, dateRange]);

  // Totals
  const totals = useMemo(() => {
    const t = weeklyData.reduce((acc, w) => ({
      sessions: acc.sessions + w.sessions,
      spend: acc.spend + w.spend,
      leads: acc.leads + w.leads,
    }), { sessions: 0, spend: 0, leads: 0 });
    const positions = weeklyData.filter(w => w.avgPosition > 0).map(w => w.avgPosition);
    return {
      ...t,
      cpl: t.leads > 0 ? Math.round((t.spend / t.leads) * 100) / 100 : 0,
      avgPosition: positions.length > 0 ? Math.round((positions.reduce((a, b) => a + b, 0) / positions.length) * 10) / 10 : 0,
    };
  }, [weeklyData]);

  const runAnalysis = async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    try {
      const prompt = `You are a digital marketing analyst for David J. Woods, a hypnotherapy practice in Switzerland (Zurich/Eschenbach) and Germany (Augsburg).

Analyze this weekly performance data and provide a concise executive summary in English for the client report.

Weekly data (${dateRange.startDate} to ${dateRange.endDate}):
${JSON.stringify(weeklyData, null, 2)}

Totals: Sessions=${totals.sessions}, Spend=EUR  ${totals.spend}, Leads=${totals.leads}, CPL=EUR  ${totals.cpl}, Avg Position=${totals.avgPosition}

Provide:
1. **Performance Summary** (2-3 sentences on overall trends)
2. **Key Highlights** (bullet points of what went well)
3. **Areas of Concern** (bullet points of what needs attention)
4. **Recommendations** (2-3 actionable next steps)

Keep it professional, data-driven, and under 300 words.`;

      const { data, error } = await supabase.functions.invoke("seo-report", {
        body: { customPrompt: prompt },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const content = data?.rawText || data?.report?.summary || JSON.stringify(data?.report || data, null, 2);
      setAiAnalysis(typeof content === "string" ? content : JSON.stringify(content, null, 2));
    } catch (err: any) {
      console.error("Weekly analysis failed:", err);
      setAnalysisError(err?.message || "Failed to generate analysis");
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleExport = () => {
    exportWeeklyReport(weeklyData, totals, aiAnalysis, dateRange);
  };

  return (
    <div className="space-y-5">
      {/* Weekly Metrics Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Weekly Performance — {dateRange.startDate} → {dateRange.endDate}
          </CardTitle>
          <Button size="sm" variant="outline" onClick={handleExport} className="gap-1">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="text-gray-500">Week</TableHead>
                  <TableHead className="text-gray-500 text-right">Sessions</TableHead>
                  <TableHead className="text-gray-500 text-right">Investment (EUR)</TableHead>
                  <TableHead className="text-gray-500 text-right">Leads</TableHead>
                  <TableHead className="text-gray-500 text-right">CPL (EUR)</TableHead>
                  <TableHead className="text-gray-500 text-right">Avg Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklyData.map((w, i) => (
                  <TableRow key={i} className="border-gray-100">
                    <TableCell className="font-medium text-gray-900">{w.weekLabel}</TableCell>
                    <TableCell className="text-right text-gray-900">{w.sessions}</TableCell>
                    <TableCell className="text-right text-gray-900">{w.spend > 0 ? `€ ${w.spend.toLocaleString()}` : "—"}</TableCell>
                    <TableCell className="text-right">
                      {w.leads > 0 ? (
                        <span className="text-emerald-700 font-medium">{w.leads}</span>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-gray-700">
                      {w.cpl > 0 ? `€ ${w.cpl.toLocaleString()}` : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      {w.avgPosition > 0 ? (
                        <Badge variant="outline" className={
                          w.avgPosition <= 10 ? "border-emerald-200 text-emerald-700" :
                          w.avgPosition <= 20 ? "border-amber-200 text-amber-700" :
                          "border-gray-200 text-gray-500"
                        }>
                          {w.avgPosition}
                        </Badge>
                      ) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Totals row */}
                <TableRow className="border-gray-100 bg-gray-50 font-bold">
                  <TableCell className="text-gray-900 font-bold">Total / Average</TableCell>
                  <TableCell className="text-right text-gray-900 font-bold">{totals.sessions}</TableCell>
                  <TableCell className="text-right text-gray-900 font-bold">
                    {totals.spend > 0 ? `€ ${totals.spend.toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell className="text-right text-emerald-700 font-bold">{totals.leads}</TableCell>
                  <TableCell className="text-right text-gray-900 font-bold">
                    {totals.cpl > 0 ? `€ ${totals.cpl.toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {totals.avgPosition > 0 ? totals.avgPosition : "—"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              AI Performance Analysis
            </CardTitle>
            <p className="text-xs text-gray-400 mt-1">AI-generated insights based on weekly data</p>
          </div>
          <Button size="sm" onClick={runAnalysis} disabled={analysisLoading || weeklyData.length === 0} className="gap-1">
            {analysisLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <TrendingUp className="w-3.5 h-3.5" />}
            {analysisLoading ? "Analyzing..." : "Generate Analysis"}
          </Button>
        </CardHeader>
        <CardContent>
          {analysisError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-3">
              {analysisError}
            </div>
          )}
          {aiAnalysis ? (
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-4 border border-gray-100">
              {aiAnalysis}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              Click "Generate Analysis" to get AI-powered insights on your weekly performance.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
