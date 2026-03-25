import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DailyMetric, TopPage, Campaign, FormSubmission } from "@/data/dashboardMockData";

interface DashboardData {
  dailyData: DailyMetric[];
  topPages: TopPage[];
  campaigns: Campaign[];
  submissions: FormSubmission[];
  loading: boolean;
  gaError: string | null;
  adsError: string | null;
  gaLive: boolean;
  adsLive: boolean;
}

const pathLabels: Record<string, string> = {
  "/": "Startseite",
  "/raucherentwoehnung": "Raucherentwöhnung",
  "/aengste-phobien": "Ängste & Phobien",
  "/abnehmen": "Abnehmen",
  "/stress-burnout": "Stress & Burnout",
  "/depressionen-traumata": "Depressionen & Traumata",
  "/kinder-jugendliche": "Kinder & Jugendliche",
  "/erstgespraech": "Erstgespräch (Form)",
  "/ueber-uns": "Über uns",
  "/ausbildung": "Ausbildung",
  "/kundenmeinungen": "Kundenmeinungen",
  "/erwachsene": "Erwachsene",
  "/firmen-coaching": "Firmen-Coaching",
};

export function useDashboardData(): DashboardData {
  const [dailyData, setDailyData] = useState<DailyMetric[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [gaError, setGaError] = useState<string | null>(null);
  const [adsError, setAdsError] = useState<string | null>(null);
  const [gaLive, setGaLive] = useState(false);
  const [adsLive, setAdsLive] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setGaError(null);
    setAdsError(null);

    // Fetch GA4 data
    try {
      const { data, error: fnError } = await supabase.functions.invoke("google-analytics", {
        body: { startDate: "90daysAgo", endDate: "today" },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setDailyData(
        (data.dailyData || []).map((d: any) => ({
          date: d.date,
          visitors: d.visitors || 0,
          formSubmissions: d.sessions || 0,
          whatsappClicks: d.pageViews || 0,
          conversions: 0,
        }))
      );
      setTopPages(
        (data.topPages || []).map((p: any) => ({
          path: p.path,
          label: pathLabels[p.path] || p.path,
          views: p.views,
          avgTimeSeconds: p.avgTimeSeconds,
        }))
      );
      setGaLive(true);
    } catch (err: any) {
      console.error("GA4 fetch failed:", err);
      setGaError(err?.message || "Failed to fetch GA4 data");
      setDailyData([]);
      setTopPages([]);
    }

    // Fetch Google Ads data
    try {
      const { data, error: fnError } = await supabase.functions.invoke("google-ads", {
        body: {},
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setCampaigns(
        (data.campaigns || []).map((c: any) => ({
          id: c.id,
          name: c.name,
          source: "google_ads" as const,
          spend: c.spend || 0,
          clicks: c.clicks || 0,
          leads: Math.round(c.conversions || 0),
          conversions: Math.round(c.conversions || 0),
          utm_campaign: c.name?.toLowerCase().replace(/\s+/g, "_"),
        }))
      );
      setAdsLive(true);
    } catch (err: any) {
      console.error("Google Ads fetch failed:", err);
      setAdsError(err?.message || "Failed to fetch Google Ads data");
      setCampaigns([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { dailyData, topPages, campaigns, submissions: [], loading, gaError, adsError, gaLive, adsLive };
}
