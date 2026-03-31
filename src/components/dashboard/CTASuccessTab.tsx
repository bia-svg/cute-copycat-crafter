import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { MousePointer, Eye, TrendingUp } from "lucide-react";
import { format, parseISO } from "date-fns";

interface ViewRecord { page_path: string; viewed_at: string }
interface ClickRecord { page_path: string; destination: string; clicked_at: string }

/** Friendly page name from path */
function pageName(path: string): string {
  const slug = path.split("/").pop() || path;
  const names: Record<string, string> = {
    "raucherentwoehnung": "Raucherentwöhnung",
    "stop-smoking": "Stop Smoking",
    "abnehmen": "Abnehmen",
    "weight-loss": "Weight Loss",
    "aengste-phobien": "Ängste & Phobien",
    "anxiety-phobias": "Anxiety & Phobias",
    "stress-burnout": "Stress & Burnout",
    "depressionen-traumata": "Depressionen & Traumata",
    "depression-trauma": "Depression & Trauma",
    "erwachsene": "Erwachsene",
    "adults": "Adults",
    "kinder-jugendliche": "Kinder & Jugendliche",
    "children-teens": "Children & Teens",
  };
  return names[slug] || slug;
}

export default function CTASuccessTab() {
  const [views, setViews] = useState<ViewRecord[]>([]);
  const [clicks, setClicks] = useState<ClickRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const session = sessionStorage.getItem("dw_dashboard_session");
        const token = session ? JSON.parse(session).token : "";
        const { data, error } = await supabase.functions.invoke("fetch-cta-data", {
          headers: { Authorization: `Bearer ${token}` },
          body: null,
        });
        if (error) throw error;
        setViews(data.views || []);
        setClicks(data.clicks || []);
      } catch (e) {
        console.error("CTA data load error:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Aggregate by page
  const byPage = useMemo(() => {
    const map: Record<string, { views: number; clicks: number }> = {};
    views.forEach(v => {
      const key = v.page_path;
      if (!map[key]) map[key] = { views: 0, clicks: 0 };
      map[key].views++;
    });
    clicks.forEach(c => {
      const key = c.page_path;
      if (!map[key]) map[key] = { views: 0, clicks: 0 };
      map[key].clicks++;
    });
    return Object.entries(map)
      .map(([path, d]) => ({
        page: pageName(path),
        path,
        views: d.views,
        clicks: d.clicks,
        rate: d.views > 0 ? ((d.clicks / d.views) * 100).toFixed(1) : "0.0",
      }))
      .sort((a, b) => b.views - a.views);
  }, [views, clicks]);

  // Aggregate by day
  const byDay = useMemo(() => {
    const map: Record<string, { views: number; clicks: number }> = {};
    views.forEach(v => {
      const day = format(parseISO(v.viewed_at), "yyyy-MM-dd");
      if (!map[day]) map[day] = { views: 0, clicks: 0 };
      map[day].views++;
    });
    clicks.forEach(c => {
      const day = format(parseISO(c.clicked_at), "yyyy-MM-dd");
      if (!map[day]) map[day] = { views: 0, clicks: 0 };
      map[day].clicks++;
    });
    return Object.entries(map)
      .map(([date, d]) => ({ date: format(parseISO(date), "dd/MM"), views: d.views, clicks: d.clicks }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [views, clicks]);

  const totalViews = views.length;
  const totalClicks = clicks.length;
  const overallRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading CTA data…</div>;
  }

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-500 uppercase">Page Views</span>
            </div>
            <div className="text-2xl font-bold">{totalViews}</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <MousePointer className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-500 uppercase">CTA Clicks</span>
            </div>
            <div className="text-2xl font-bold">{totalClicks}</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-500 uppercase">CTR</span>
            </div>
            <div className="text-2xl font-bold">{overallRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart by day */}
      {byDay.length > 0 && (
        <Card className="bg-white border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Views vs CTA Clicks — Daily</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ views: { label: "Views", color: "#3b82f6" }, clicks: { label: "CTA Clicks", color: "#10b981" } }} className="h-[280px] w-full">
              <BarChart data={byDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="views" fill="#3b82f6" name="Page Views" radius={[2, 2, 0, 0]} />
                <Bar dataKey="clicks" fill="#10b981" name="CTA Clicks" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Table by page */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-700">CTA Performance by Page</CardTitle>
        </CardHeader>
        <CardContent>
          {byPage.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No data yet. Views and clicks will appear here once visitors interact with service pages.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">CTA Clicks</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byPage.map((row) => (
                  <TableRow key={row.path}>
                    <TableCell className="font-medium text-sm">{row.page}</TableCell>
                    <TableCell className="text-right">{row.views}</TableCell>
                    <TableCell className="text-right">{row.clicks}</TableCell>
                    <TableCell className="text-right font-semibold">{row.rate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
