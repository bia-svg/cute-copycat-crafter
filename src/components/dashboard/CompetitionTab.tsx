import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Sparkles, Loader2, Globe, Target, DollarSign, Shield, Lightbulb, AlertTriangle, Download } from "lucide-react";
import { exportCompetitionReport } from "@/lib/exportPdf";
import { supabase } from "@/integrations/supabase/client";
import type { GSCQuery } from "@/data/dashboardMockData";

interface CompetitionTabProps {
  gscQueries: GSCQuery[];
}

interface Competitor {
  name: string;
  website: string;
  country: string;
  city: string;
  sharedKeywords: string[];
  estimatedPositions: Record<string, string>;
  pricing: {
    sessionPrice: string;
    seminarPrice: string;
    currency: string;
  };
  strengths: string[];
  weaknesses: string[];
  threatLevel: "high" | "medium" | "low";
}

interface CompetitorAnalysis {
  competitors: Competitor[];
  marketGaps: { gap: string; opportunity: string; difficulty: string }[];
  pricingBenchmarks: {
    sessionRange: { min: string; max: string; average: string; currency: string };
    seminarRange: { min: string; max: string; average: string; currency: string };
    trainingRange: { min: string; max: string; average: string; currency: string };
  };
  contentStrategies: { strategy: string; usedBy: string[]; effectiveness: string }[];
  summary: string;
  lastUpdated: string;
}

const threatColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function CompetitionTab({ gscQueries }: CompetitionTabProps) {
  const [analysis, setAnalysis] = useState<CompetitorAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("competitor-analysis", {
        body: { topQueries: gscQueries },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err?.message || "Failed to run competitor analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-500" /> Competitor Analysis
              </CardTitle>
              <p className="text-xs text-gray-400 mt-1">
                AI-powered analysis based on your GSC keywords · Not real-time SERP data
              </p>
            </div>
            <div className="flex items-center gap-2">
              {analysis && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => exportCompetitionReport(analysis)}
                  className="text-xs"
                >
                  <Download className="w-3 h-3 mr-1" /> Export PDF
                </Button>
              )}
              <Button
                size="sm"
                onClick={runAnalysis}
                disabled={loading || gscQueries.length === 0}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
              >
                {loading ? (
                  <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Analyzing...</>
                ) : (
                  <><Sparkles className="w-3 h-3 mr-1" /> Run Analysis</>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {!analysis && !loading && !error && (
            <p className="text-sm text-gray-400 py-6 text-center">
              Click "Run Analysis" to discover who's ranking for your keywords, their pricing, and market opportunities.
            </p>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <>
          {/* Summary */}
          {analysis.summary && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-sm text-indigo-800">{analysis.summary}</p>
              {analysis.lastUpdated && (
                <p className="text-xs text-indigo-500 mt-2 italic">{analysis.lastUpdated}</p>
              )}
            </div>
          )}

          {/* Competitors Table */}
          {analysis.competitors?.length > 0 && (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Competitors ({analysis.competitors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.competitors.map((comp, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-gray-900">{comp.name}</h4>
                            <Badge className={`text-xs border ${threatColors[comp.threatLevel] || threatColors.low}`}>
                              {comp.threatLevel} threat
                            </Badge>
                          </div>
                          <a href={`https://${comp.website}`} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline font-mono">
                            {comp.website}
                          </a>
                          <p className="text-xs text-gray-500 mt-0.5">
                            📍 {comp.city}, {comp.country}
                          </p>
                        </div>
                        {comp.pricing && (
                          <div className="text-right text-xs">
                            {comp.pricing.sessionPrice && (
                              <p className="text-gray-600">Session: <span className="font-semibold">{comp.pricing.sessionPrice}</span></p>
                            )}
                            {comp.pricing.seminarPrice && (
                              <p className="text-gray-600">Seminar: <span className="font-semibold">{comp.pricing.seminarPrice}</span></p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Shared Keywords */}
                      {comp.sharedKeywords?.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">Shared keywords:</p>
                          <div className="flex flex-wrap gap-1">
                            {comp.sharedKeywords.map((kw, j) => (
                              <Badge key={j} variant="outline" className="text-xs">
                                {kw}
                                {comp.estimatedPositions?.[kw] && (
                                  <span className="ml-1 text-gray-400">#{comp.estimatedPositions[kw]}</span>
                                )}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {comp.strengths?.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-emerald-700 mb-1">✅ Strengths</p>
                            <ul className="text-xs text-gray-600 space-y-0.5">
                              {comp.strengths.map((s, j) => <li key={j}>• {s}</li>)}
                            </ul>
                          </div>
                        )}
                        {comp.weaknesses?.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-red-700 mb-1">⚠️ Weaknesses</p>
                            <ul className="text-xs text-gray-600 space-y-0.5">
                              {comp.weaknesses.map((w, j) => <li key={j}>• {w}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pricing Benchmarks */}
          {analysis.pricingBenchmarks && (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Market Pricing Benchmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Service</TableHead>
                        <TableHead className="text-xs text-right">Min</TableHead>
                        <TableHead className="text-xs text-right">Average</TableHead>
                        <TableHead className="text-xs text-right">Max</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { label: "Session", data: analysis.pricingBenchmarks.sessionRange },
                        { label: "Seminar", data: analysis.pricingBenchmarks.seminarRange },
                        { label: "Training/Ausbildung", data: analysis.pricingBenchmarks.trainingRange },
                      ].map((row, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-sm font-medium">{row.label}</TableCell>
                          <TableCell className="text-sm text-right">{row.data?.min || "—"}</TableCell>
                          <TableCell className="text-sm text-right font-semibold">{row.data?.average || "—"}</TableCell>
                          <TableCell className="text-sm text-right">{row.data?.max || "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Market Gaps */}
          {analysis.marketGaps?.length > 0 && (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" /> Market Gaps & Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.marketGaps.map((gap, i) => (
                    <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-gray-800">{gap.gap}</p>
                        <Badge variant="outline" className="text-xs capitalize">{gap.difficulty}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">→ {gap.opportunity}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Strategies */}
          {analysis.contentStrategies?.length > 0 && (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" /> Competitor Content Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.contentStrategies.map((cs, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-800">{cs.strategy}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Used by: {cs.usedBy?.join(", ")} · Effectiveness: {cs.effectiveness}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
