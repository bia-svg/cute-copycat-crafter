import { subDays, format } from "date-fns";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Seed-based random for consistent data
function seededRand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export interface DailyMetric {
  date: string;
  visitors: number;
  formSubmissions: number;
  whatsappClicks: number;
  conversions: number;
}

export interface TopPage {
  path: string;
  label: string;
  views: number;
  avgTimeSeconds: number;
}

export interface Campaign {
  id: string;
  name: string;
  source: "google_ads" | "organic" | "direct" | "referral";
  spend: number;
  clicks: number;
  leads: number;
  conversions: number;
  utm_campaign?: string;
}

export interface FormSubmission {
  id: string;
  code: string;
  date: string;
  name: string;
  email: string;
  concern: string;
  source: string;
  utm_campaign: string | null;
  converted: boolean;
}

// Generate 90 days of data
export function generateDailyData(): DailyMetric[] {
  return Array.from({ length: 90 }, (_, i) => {
    const seed = i * 7 + 42;
    const dayOfWeek = new Date(subDays(new Date(), 89 - i)).getDay();
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.6 : 1;
    return {
      date: format(subDays(new Date(), 89 - i), "yyyy-MM-dd"),
      visitors: Math.round((80 + seededRand(seed) * 150) * weekendFactor),
      formSubmissions: Math.round((2 + seededRand(seed + 1) * 10) * weekendFactor),
      whatsappClicks: Math.round((3 + seededRand(seed + 2) * 18) * weekendFactor),
      conversions: Math.round((0 + seededRand(seed + 3) * 4) * weekendFactor),
    };
  });
}

export const topPages: TopPage[] = [
  { path: "/raucherentwoehnung", label: "Raucherentwöhnung", views: 3420, avgTimeSeconds: 204 },
  { path: "/aengste-phobien", label: "Ängste & Phobien", views: 2180, avgTimeSeconds: 178 },
  { path: "/abnehmen", label: "Abnehmen", views: 1950, avgTimeSeconds: 165 },
  { path: "/", label: "Startseite", views: 4800, avgTimeSeconds: 45 },
  { path: "/stress-burnout", label: "Stress & Burnout", views: 1420, avgTimeSeconds: 192 },
  { path: "/erstgespraech", label: "Erstgespräch (Form)", views: 1380, avgTimeSeconds: 310 },
  { path: "/ueber-uns", label: "Über uns", views: 980, avgTimeSeconds: 132 },
  { path: "/kinder-jugendliche", label: "Kinder & Jugendliche", views: 870, avgTimeSeconds: 156 },
  { path: "/ausbildung", label: "Ausbildung", views: 650, avgTimeSeconds: 245 },
  { path: "/kundenmeinungen", label: "Kundenmeinungen", views: 520, avgTimeSeconds: 98 },
];

export const campaigns: Campaign[] = [
  { id: "c1", name: "Raucherentwöhnung CH", source: "google_ads", spend: 1850, clicks: 920, leads: 38, conversions: 12, utm_campaign: "rauch_ch_2026" },
  { id: "c2", name: "Ängste Phobien DE", source: "google_ads", spend: 1200, clicks: 580, leads: 22, conversions: 7, utm_campaign: "angst_de_2026" },
  { id: "c3", name: "Abnehmen Zürich", source: "google_ads", spend: 980, clicks: 410, leads: 18, conversions: 5, utm_campaign: "abnehmen_zh_2026" },
  { id: "c4", name: "Brand CH", source: "google_ads", spend: 650, clicks: 340, leads: 8, conversions: 3, utm_campaign: "brand_ch_2026" },
  { id: "c5", name: "Organic Search", source: "organic", spend: 0, clicks: 2800, leads: 45, conversions: 15, utm_campaign: undefined },
  { id: "c6", name: "Direct Traffic", source: "direct", spend: 0, clicks: 1200, leads: 12, conversions: 4, utm_campaign: undefined },
  { id: "c7", name: "Referral", source: "referral", spend: 0, clicks: 380, leads: 5, conversions: 2, utm_campaign: undefined },
];

const concerns = ["Raucherentwöhnung", "Ängste & Phobien", "Abnehmen", "Stress & Burnout", "Kinder & Jugendliche", "Depressionen"];
const names = ["Anna Müller", "Thomas Weber", "Sarah Fischer", "Michael Schneider", "Laura Braun", "Peter Hoffmann", "Julia Wagner", "Stefan Keller", "Maria Huber", "David Meier"];

export function generateFormSubmissions(): FormSubmission[] {
  return Array.from({ length: 48 }, (_, i) => {
    const seed = i * 13 + 7;
    const daysAgo = Math.floor(seededRand(seed) * 60);
    const campaignIndex = Math.floor(seededRand(seed + 1) * campaigns.length);
    const camp = campaigns[campaignIndex];
    return {
      id: `fs-${i}`,
      code: `DW-${format(subDays(new Date(), daysAgo), "yyMM")}-${String(i + 1).padStart(3, "0")}`,
      date: format(subDays(new Date(), daysAgo), "yyyy-MM-dd"),
      name: names[Math.floor(seededRand(seed + 2) * names.length)],
      email: `lead${i + 1}@example.com`,
      concern: concerns[Math.floor(seededRand(seed + 3) * concerns.length)],
      source: camp.source,
      utm_campaign: camp.utm_campaign || null,
      converted: seededRand(seed + 4) > 0.65,
    };
  }).sort((a, b) => b.date.localeCompare(a.date));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
