import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  generateDailyData, topPages as mockTopPages, campaigns as mockCampaigns,
  generateFormSubmissions, type DailyMetric, type TopPage, type Campaign, type FormSubmission
} from "@/data/dashboardMockData";

interface GAData {
  dailyData: DailyMetric[];
  topPages: TopPage[];
}

interface AdsData {
  campaigns: Campaign[];
}

interface DashboardData {
  dailyData: DailyMetric[];
  topPages: TopPage[];
  campaigns: Campaign[];
  submissions: FormSubmission[];
  loading: boolean;
  error: string | null;
  isLive: boolean;
}

// Map top pages path to readable labels
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
  const [submissions] = useState<FormSubmission[]>(() => generateFormSubmissions());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    let gaSuccess = false;
    let adsSuccess = false;

    // Fetch GA4 data
    try {
      const { data, error: fnError } = await supabase.functions.invoke("google-analytics", {
        body: { startDate: "90daysAgo", endDate: "today" },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      const gaData = data as GAData;

      // Map GA4 daily data to our DailyMetric format
      const mapped: DailyMetric[] = gaData.dailyData.map((d: any) => ({
        date: d.date,
        visitors: d.visitors || 0,
        formSubmissions: 0, // GA4 doesn't track form submissions by default
        whatsappClicks: 0,
        conversions: 0,
      }));

      setDailyData(mapped);
      setTopPages(
        gaData.topPages.map((p: any) => ({
          path: p.path,
          label: pathLabels[p.path] || p.path,
          views: p.views,
          avgTimeSeconds: p.avgTimeSeconds,
        }))
      );
      gaSuccess = true;
    } catch (err) {
      console.warn("GA4 fetch failed, using mock data:", err);
      setDailyData(generateDailyData());
      setTopPages(mockTopPages);
    }

    // Fetch Google Ads data
    try {
      const { data, error: fnError } = await supabase.functions.invoke("google-ads", {
        body: {},
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      const adsData = data as AdsData;

      const mapped: Campaign[] = adsData.campaigns.map((c: any) => ({
        id: c.id,
        name: c.name,
        source: "google_ads" as const,
        spend: c.spend || 0,
        clicks: c.clicks || 0,
        leads: Math.round(c.conversions || 0),
        conversions: Math.round(c.conversions || 0),
        utm_campaign: c.name?.toLowerCase().replace(/\s+/g, "_"),
      }));

      setCampaigns(mapped);
      adsSuccess = true;
    } catch (err) {
      console.warn("Google Ads fetch failed, using mock data:", err);
      setCampaigns(mockCampaigns);
    }

    setIsLive(gaSuccess || adsSuccess);
    if (!gaSuccess && !adsSuccess) {
      setError("Could not connect to Google APIs. Showing demo data.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { dailyData, topPages, campaigns, submissions, loading, error, isLive };
}
