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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Sparkles, Loader2, Map, Route, Brain, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { CampaignPageEntry, CampaignPageFlowEntry, LeadRecord } from "@/data/dashboardMockData";

interface Props {
  campaignPages: CampaignPageEntry[];
  campaignPageFlow: CampaignPageFlowEntry[];
  leads: LeadRecord[];
  dateLabel: string;
}

const pathLabels: Record<string, string> = {
  "/": "Home",
  "/raucherentwoehnung": "Stop Smoking",
  "/aengste-phobien": "Anxiety & Phobias",
  "/abnehmen": "Weight Loss",
  "/stress-burnout": "Stress & Burnout",
  "/depressionen-traumata": "Depression & Trauma",
  "/kinder-jugendliche": "Children & Teens",
  "/erstgespraech": "Contact Form",
  "/ueber-uns": "About Us",
  "/ausbildung": "Training",
  "/kundenmeinungen": "Testimonials",
  "/firmen-coaching": "Corporate Coaching",
};

function labelPath(p: string) {
  // Normalize: remove /de/ch or /de/de prefix
  const normalized = p.replace(/^\/(de|en)\/(ch|de)/, "").replace(/\/$/, "") || "/";
  return pathLabels[normalized] || p;
}

export default function CampaignIntelligence({ campaignPages, campaignPageFlow, leads, dateLabel }: Props) {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Get unique campaigns
  const campaigns = useMemo(() => {
    const set = new Set<string>();
    campaignPages.forEach(e => { if (e.campaign !== "(not set)") set.add(e.campaign); });
    campaignPageFlow.forEach(e => { if (e.campaign !== "(not set)") set.add(e.campaign); });
    return Array.from(set).sort();
  }, [campaignPages, campaignPageFlow]);

  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const activeCampaign = selectedCampaign || campaigns[0] || null;

  // Landing pages for selected campaign
  const landingPages = useMemo(() => {
    if (!activeCampaign) return [];
    return campaignPages
      .filter(e => e.campaign === activeCampaign)
      .sort((a, b) => b.sessions - a.sessions);
  }, [campaignPages, activeCampaign]);

  // Page flow for selected campaign
  const pageFlow = useMemo(() => {
    if (!activeCampaign) return [];
    return campaignPageFlow
      .filter(e => e.campaign === activeCampaign)
      .sort((a, b) => b.pageViews - a.pageViews)
      .slice(0, 20);
  }, [campaignPageFlow, activeCampaign]);

  // Chart data for page views
  const chartData = useMemo(() => {
    return pageFlow.map(p => ({
      page: labelPath(p.pagePath),
      pageViews: p.pageViews,
      avgTime: p.pageViews > 0 ? Math.round(p.engagementDuration / p.pageViews) : 0,
    }));
  }, [pageFlow]);

  // Run AI analysis
  const runAnalysis = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiAnalysis(null);
    try {
      const paidLeads = leads.filter(l =>
        l.utm_medium === "cpc" || l.utm_medium === "ppc" || l.source === "paid"
      );

      const prompt = `You are a digital marketing and CRO (Conversion Rate Optimization) expert analyzing campaign navigation behavior for a hypnotherapy practice website (david-j-woods.com).

Period: ${dateLabel}

## Campaign Landing Pages (where users arrive)
${JSON.stringify(landingPages.slice(0, 20), null, 2)}

## Pages Visited by Campaign Users (navigation flow)
${JSON.stringify(pageFlow, null, 2)}

## All Campaigns Summary
${JSON.stringify(campaignPages.reduce((acc, e) => {
  if (!acc[e.campaign]) acc[e.campaign] = { sessions: 0, conversions: 0, bounceRate: 0, count: 0 };
  acc[e.campaign].sessions += e.sessions;
  acc[e.campaign].conversions += e.conversions;
  acc[e.campaign].bounceRate += e.bounceRate;
  acc[e.campaign].count += 1;
  return acc;
}, {} as Record<string, any>), null, 2)}

## Paid Leads (${paidLeads.length} total)
Top UTM campaigns: ${JSON.stringify(paidLeads.reduce((acc, l) => {
  const c = l.utm_campaign || "(unknown)";
  acc[c] = (acc[c] || 0) + 1;
  return acc;
}, {} as Record<string, number>))}

Please analyze this data and provide:

1. **🎯 Landing Page Performance**: Which landing pages convert best? Which have high bounce rates?

2. **🗺️ Navigation Patterns**: How do users navigate after landing? What pages do they visit most? Are they reaching the contact form (/erstgespraech)?

3. **⚠️ Drop-off Points**: Where are users leaving? Which pages have low engagement?

4. **💡 Conversion Optimization**: Specific, actionable recommendations to improve conversion rates. Consider:
   - CTA placement and messaging
   - Page flow optimization
   - Content gaps
   - A/B test suggestions

5. **📊 Campaign-Specific Insights**: Which campaigns drive the most engaged users? Which need optimization?

6. **🔄 Quick Wins**: 3-5 immediate actions that could increase conversions this month.

Format your response in clear markdown with headers, bullet points, and bold for key insights. Write in English. Be specific and data-driven.`;

      const { data, error } = await supabase.functions.invoke("seo-report", {
        body: { customPrompt: prompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setAiAnalysis(data.rawText || "No analysis generated.");
    } catch (err: any) {
      console.error("AI analysis error:", err);
      setAiError(err?.message || "Failed to generate analysis");
    } finally {
      setAiLoading(false);
    }
  };

  if (campaignPages.length === 0 && campaignPageFlow.length === 0) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="py-12 text-center">
          <Brain className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No campaign navigation data available for this period.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Campaign Intelligence</h3>
          <Badge variant="outline" className="text-xs text-purple-600 border-purple-200 bg-purple-50">
            GA4 Navigation Data
          </Badge>
        </div>
        <Button
          onClick={runAnalysis}
          disabled={aiLoading}
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {aiLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
          AI Analysis
        </Button>
      </div>

      {/* Campaign Selector */}
      {campaigns.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {campaigns.map(c => (
            <Button
              key={c}
              size="sm"
              variant={activeCampaign === c ? "default" : "outline"}
              className={activeCampaign === c ? "bg-gray-900 text-white" : "text-gray-600"}
              onClick={() => setSelectedCampaign(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Landing Pages */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" /> Landing Pages
            </CardTitle>
            <p className="text-xs text-gray-400">Where users from this campaign land first</p>
          </CardHeader>
          <CardContent>
            {landingPages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No landing page data</p>
            ) : (
              <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-100">
                      <TableHead className="text-gray-500 text-xs">Page</TableHead>
                      <TableHead className="text-gray-500 text-xs text-right">Sessions</TableHead>
                      <TableHead className="text-gray-500 text-xs text-right">Bounce</TableHead>
                      <TableHead className="text-gray-500 text-xs text-right">Avg Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {landingPages.map((lp, i) => (
                      <TableRow key={i} className="border-gray-100">
                        <TableCell className="text-xs font-medium text-gray-900 max-w-[200px] truncate" title={lp.landingPage}>
                          {labelPath(lp.landingPage)}
                        </TableCell>
                        <TableCell className="text-xs text-right text-gray-700">{lp.sessions}</TableCell>
                        <TableCell className="text-xs text-right">
                          <span className={lp.bounceRate > 0.7 ? "text-red-600 font-medium" : lp.bounceRate > 0.5 ? "text-amber-600" : "text-emerald-600"}>
                            {(lp.bounceRate * 100).toFixed(0)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-right text-gray-700">
                          {Math.floor(lp.avgSessionDuration / 60)}:{String(Math.floor(lp.avgSessionDuration % 60)).padStart(2, "0")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pages Visited (Flow) */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Route className="w-4 h-4 text-emerald-500" /> Pages Visited
            </CardTitle>
            <p className="text-xs text-gray-400">All pages viewed by users from this campaign</p>
          </CardHeader>
          <CardContent>
            {pageFlow.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No page flow data</p>
            ) : (
              <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-100">
                      <TableHead className="text-gray-500 text-xs">Page</TableHead>
                      <TableHead className="text-gray-500 text-xs text-right">Views</TableHead>
                      <TableHead className="text-gray-500 text-xs text-right">Avg Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageFlow.map((pf, i) => {
                      const avgTime = pf.pageViews > 0 ? Math.round(pf.engagementDuration / pf.pageViews) : 0;
                      const isContactPage = pf.pagePath.includes("erstgespraech");
                      return (
                        <TableRow key={i} className={`border-gray-100 ${isContactPage ? "bg-emerald-50" : ""}`}>
                          <TableCell className="text-xs font-medium text-gray-900 max-w-[200px] truncate" title={pf.pagePath}>
                            {isContactPage && <span className="text-emerald-600 mr-1">🎯</span>}
                            {labelPath(pf.pagePath)}
                          </TableCell>
                          <TableCell className="text-xs text-right text-gray-700">{pf.pageViews}</TableCell>
                          <TableCell className="text-xs text-right text-gray-700">
                            {Math.floor(avgTime / 60)}:{String(avgTime % 60).padStart(2, "0")}
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
      </div>

      {/* Page Views Chart */}
      {chartData.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Page Views Distribution — {activeCampaign}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              pageViews: { label: "Page Views", color: "#8b5cf6" },
            }} className="h-[250px] w-full">
              <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
                <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <YAxis type="category" dataKey="page" tick={{ fill: "#6b7280", fontSize: 10 }} width={110} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="pageViews" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Page Views" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Navigation Flow Summary */}
      {landingPages.length > 0 && pageFlow.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              User Journey — {activeCampaign}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {landingPages.slice(0, 3).map((lp, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    🛬 {labelPath(lp.landingPage)} ({lp.sessions})
                  </Badge>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                </div>
              ))}
              {pageFlow
                .filter(pf => !landingPages.some(lp => lp.landingPage === pf.pagePath))
                .slice(0, 4)
                .map((pf, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs text-gray-600">
                      {labelPath(pf.pagePath)} ({pf.pageViews})
                    </Badge>
                    {i < 3 && <ArrowRight className="w-3 h-3 text-gray-400" />}
                  </div>
                ))}
              {pageFlow.some(pf => pf.pagePath.includes("erstgespraech")) && (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                  🎯 Contact Form
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Analysis */}
      {aiError && (
        <Card className="bg-red-50 border border-red-200 shadow-sm">
          <CardContent className="py-4">
            <p className="text-red-600 text-sm">⚠️ {aiError}</p>
          </CardContent>
        </Card>
      )}

      {aiAnalysis && (
        <Card className="bg-white border border-purple-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Conversion Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
              {aiAnalysis.split("\n").map((line, i) => {
                if (line.startsWith("## ")) return <h3 key={i} className="text-base font-semibold text-gray-900 mt-4 mb-2">{line.replace("## ", "")}</h3>;
                if (line.startsWith("### ")) return <h4 key={i} className="text-sm font-semibold text-gray-800 mt-3 mb-1">{line.replace("### ", "")}</h4>;
                if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-gray-900 mt-2">{line.replace(/\*\*/g, "")}</p>;
                if (line.startsWith("- ")) return <p key={i} className="ml-4 text-sm">• {line.replace("- ", "")}</p>;
                if (line.trim() === "") return <br key={i} />;
                return <p key={i} className="text-sm">{line}</p>;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
