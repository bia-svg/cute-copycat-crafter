export interface DailyTraffic {
  date: string;
  organic: number;
  paid: number;
  direct: number;
  referral: number;
  social: number;
  total: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface TopPage {
  path: string;
  label: string;
  views: number;
  avgTimeSeconds: number;
}

export interface CampaignData {
  id: string;
  name: string;
  status: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  currencyCode?: string;
}

export interface DailyAds {
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

export interface LeadRecord {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  concern: string | null;
  form_type: string;
  postal_code: string | null;
  city: string | null;
  country: string | null;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  tracking_code: string | null;
  converted: boolean;
  notes: string | null;
  language: string | null;
}

export interface WhatsAppClick {
  id: string;
  clicked_at: string;
  page_path: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export interface GSCQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCTotals {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCDailyMetric {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCPage {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCSegment {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCCountrySegment extends GSCSegment {
  country: string;
}

export interface GSCDeviceSegment extends GSCSegment {
  device: string;
}

export interface GSCDistribution {
  top3: number;
  pos4_10: number;
  pos11_20: number;
  pos21_plus: number;
  total: number;
}

export interface SEOSnapshot {
  id: string;
  snapshot_date: string;
  period_start: string;
  period_end: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  keywords_top3: number;
  keywords_4_10: number;
  keywords_11_20: number;
  keywords_21_plus: number;
  total_keywords: number;
}

export interface CampaignPageEntry {
  campaign: string;
  source: string;
  medium: string;
  landingPage: string;
  sessions: number;
  conversions: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface CampaignPageFlowEntry {
  campaign: string;
  source: string;
  pagePath: string;
  pageViews: number;
  engagementDuration: number;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatCurrency(value: number, currency = "CHF"): string {
  return `${currency} ${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
