import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import type { DailyTraffic, TopPage, CampaignData, DailyAds, LeadRecord, WhatsAppClick, GSCQuery, GSCTotals } from "@/data/dashboardMockData";

export interface DateRange {
  label: string;
  startDate: string;
  endDate: string;
}

export const DATE_PRESETS: DateRange[] = [
  {
    label: "This Month",
    startDate: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "Last Month",
    startDate: format(startOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"),
    endDate: format(endOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd"),
  },
  {
    label: "Last 7 Days",
    startDate: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "Last 30 Days",
    startDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
  {
    label: "Last 90 Days",
    startDate: format(subDays(new Date(), 90), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
];

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
  "/erwachsene": "Adults",
  "/firmen-coaching": "Corporate Coaching",
};

export interface DashboardState {
  trafficByDay: DailyTraffic[];
  topPages: TopPage[];
  campaigns: CampaignData[];
  dailyAds: DailyAds[];
  leads: LeadRecord[];
  whatsappClicks: WhatsAppClick[];
  gscQueries: GSCQuery[];
  gscTotals: GSCTotals | null;
  gscError: string | null;
  gscLive: boolean;
  loading: boolean;
  gaError: string | null;
  adsError: string | null;
  gaLive: boolean;
  adsLive: boolean;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

export function useDashboardData(): DashboardState {
  const [dateRange, setDateRange] = useState<DateRange>(DATE_PRESETS[4]); // Last 90 Days
  const [trafficByDay, setTrafficByDay] = useState<DailyTraffic[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [dailyAds, setDailyAds] = useState<DailyAds[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [whatsappClicks, setWhatsappClicks] = useState<WhatsAppClick[]>([]);
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
        body: { startDate: dateRange.startDate, endDate: dateRange.endDate },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      // Process channel breakdown into daily traffic
      const channelData = data.channelBreakdown || [];
      const dailyRaw = data.dailyData || [];

      // Build map from channel breakdown (sessions by channel)
      const channelMap: Record<string, DailyTraffic> = {};
      for (const row of channelData) {
        channelMap[row.date] = {
          date: row.date,
          organic: row.organic || 0,
          paid: row.paid || 0,
          direct: row.direct || 0,
          referral: row.referral || 0,
          social: row.social || 0,
          total: (row.organic || 0) + (row.paid || 0) + (row.direct || 0) + (row.referral || 0) + (row.social || 0) + (row.other || 0),
          sessions: 0,
          pageViews: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
        };
      }

      // Merge with daily overview data — use sessions as total to stay consistent with channel breakdown
      for (const d of dailyRaw) {
        if (channelMap[d.date]) {
          channelMap[d.date].sessions = d.sessions || 0;
          channelMap[d.date].pageViews = d.pageViews || 0;
          channelMap[d.date].bounceRate = d.bounceRate || 0;
          channelMap[d.date].avgSessionDuration = d.avgSessionDuration || 0;
          // Keep total from channel sum (sessions by channel) — NOT from activeUsers
        } else {
          channelMap[d.date] = {
            date: d.date,
            organic: 0,
            paid: 0,
            direct: 0,
            referral: 0,
            social: 0,
            total: d.sessions || 0,
            sessions: d.sessions || 0,
            pageViews: d.pageViews || 0,
            bounceRate: d.bounceRate || 0,
            avgSessionDuration: d.avgSessionDuration || 0,
          };
        }
      }

      const traffic = Object.values(channelMap).sort((a, b) => a.date.localeCompare(b.date));
      setTrafficByDay(traffic);

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
      setTrafficByDay([]);
      setTopPages([]);
    }

    // Fetch Google Ads data
    try {
      const { data, error: fnError } = await supabase.functions.invoke("google-ads", {
        body: { startDate: dateRange.startDate, endDate: dateRange.endDate },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setCampaigns(data.campaigns || []);
      setDailyAds(data.dailyAds || []);
      setAdsLive(true);
    } catch (err: any) {
      console.error("Google Ads fetch failed:", err);
      setAdsError(err?.message || "Failed to fetch Google Ads data");
      setCampaigns([]);
      setDailyAds([]);
    }

    // Fetch leads via secure edge function
    try {
      const session = sessionStorage.getItem("dw_dashboard_session");
      const sessionData = session ? JSON.parse(session) : null;
      if (sessionData?.email && sessionData?.token) {
        const { data, error: fnError } = await supabase.functions.invoke("fetch-leads", {
          body: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            token: sessionData.token,
            email: sessionData.email,
          },
        });
        if (fnError) throw fnError;
        setLeads((data?.leads as LeadRecord[]) || []);
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.error("Leads fetch failed:", err);
      setLeads([]);
    }

    // Fetch WhatsApp clicks via secure edge function
    try {
      const session = sessionStorage.getItem("dw_dashboard_session");
      const sessionData = session ? JSON.parse(session) : null;
      if (sessionData?.email && sessionData?.token) {
        const { data: waRes, error: waErr } = await supabase.functions.invoke("fetch-whatsapp-clicks", {
          body: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            token: sessionData.token,
            email: sessionData.email,
          },
        });
        if (waErr) throw waErr;
        setWhatsappClicks((waRes?.clicks as WhatsAppClick[]) || []);
      } else {
        setWhatsappClicks([]);
      }
    } catch (err) {
      console.error("WhatsApp clicks fetch failed:", err);
      setWhatsappClicks([]);
    }

    setLoading(false);
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    trafficByDay,
    topPages,
    campaigns,
    dailyAds,
    leads,
    whatsappClicks,
    loading,
    gaError,
    adsError,
    gaLive,
    adsLive,
    dateRange,
    setDateRange,
  };
}
