import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Search, TrendingUp, Sparkles, Loader2, AlertTriangle, ArrowUpRight, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { GSCQuery, GSCTotals } from "@/data/dashboardMockData";

interface SEOTabProps {
  gscQueries: GSCQuery[];
  gscTotals: GSCTotals | null;
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

export default function SEOTab({ gscQueries, gscTotals, gscError, gscLive }: SEOTabProps) {
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
        body: { topQueries: gscQueries, topPages: [], sitePages },
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

  return (
    <div className="space-y-5">
      {gscError && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
          <strong>Search Console:</strong> {gscError}
        </div>
      )}

      {/* Totals */}
      {gscTotals && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Search Clicks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{gscTotals.clicks.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Impressions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{gscTotals.impressions.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg CTR</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{(gscTotals.ctr * 100).toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg Position</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{gscTotals.position.toFixed(1)}</p>
            </CardContent>
          </Card>
        </div>
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

      {/* AI Report Section */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" /> AI SEO Report
            </CardTitle>
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
