import { useMemo, useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LeadRecord } from "@/data/dashboardMockData";
import { DollarSign, CalendarCheck, GraduationCap, Users, TrendingUp, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser } from "@/lib/dashboardAuth";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";

const CONFIRMATION_CONCERN = "Terminbestätigung / Sitzung";

// Pricing
const SESSION_PRICE_CH = 750;
const SESSION_PRICE_DE = 650;
const SEMINAR_PRICE_CH = 2990; // Early bird (regular: 3290)
const SEMINAR_PRICE_DE = 2490; // Early bird (regular: 2790)
const SEMINAR_REGULAR_CH = 3290;
const SEMINAR_REGULAR_DE = 2790;

// Month options for session goals
function getMonthOptions() {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = subMonths(now, i);
    months.push({
      value: format(d, "yyyy-MM"),
      label: format(d, "MMMM yyyy"),
      start: format(startOfMonth(d), "yyyy-MM-dd"),
      end: format(endOfMonth(d), "yyyy-MM-dd"),
    });
  }
  return months;
}

interface ResultsTabProps {
  leads: LeadRecord[];
}

export default function ResultsTab({ leads }: ResultsTabProps) {
  // Month filter for session goals
  const monthOptions = useMemo(() => getMonthOptions(), []);
  const [sessionGoalMonth, setSessionGoalMonth] = useState(monthOptions[0].value);

  // Fetch ALL seminar leads (unfiltered) for seminar goals
  const [allSeminarLeads, setAllSeminarLeads] = useState<LeadRecord[]>([]);
  useEffect(() => {
    const session = sessionStorage.getItem("dw_dashboard_session");
    const sessionData = session ? JSON.parse(session) : null;
    if (sessionData?.email && sessionData?.token) {
      supabase.functions.invoke("fetch-leads", {
        body: {
          startDate: "2024-01-01",
          endDate: format(new Date(), "yyyy-MM-dd"),
          token: sessionData.token,
          email: sessionData.email,
          formType: "seminar",
        },
      }).then(({ data }) => {
        setAllSeminarLeads((data?.leads as LeadRecord[]) || []);
      }).catch(() => {
        // Fallback: use filtered leads
        setAllSeminarLeads(leads.filter(l => l.form_type === "seminar"));
      });
    }
  }, []);

  // Fetch seminar capacity config
  const [capacityData, setCapacityData] = useState<{ seminar_date: string; seminar_country: string; max_capacity: number }[]>([]);
  useEffect(() => {
    supabase.from("seminar_capacity").select("seminar_date, seminar_country, max_capacity").then(({ data }) => {
      if (data) setCapacityData(data);
    });
  }, []);

  const { sessionStats, seminarStats, totalRevenue } = useMemo(() => {
    // Session confirmations only (Terminbestätigung)
    const confirmedSessions = leads.filter(
      l => l.form_type === "session" && l.concern === CONFIRMATION_CONCERN
    );

    const sessionsCH = confirmedSessions.filter(l => l.country === "CH").length;
    const sessionsDE = confirmedSessions.filter(l => l.country === "DE").length;
    const sessionsOther = confirmedSessions.length - sessionsCH - sessionsDE;

    const sessionRevenueCHF = sessionsCH * SESSION_PRICE_CH;
    const sessionRevenueEUR = sessionsDE * SESSION_PRICE_DE;

    // Seminar registrations
    const seminars = leads.filter(l => l.form_type === "seminar");

    // Group seminars by country + seminar date (from notes)
    const seminarGroups: Record<string, { country: string; date: string; count: number; price: number; currency: string }> = {};
    seminars.forEach(s => {
      const country = s.country || "Unknown";
      // Extract seminar date from notes if available
      const dateMatch = s.notes?.match(/Seminar[:\s]+([^|]+)/i) || s.notes?.match(/Datum[:\s]+([^|]+)/i);
      const seminarDate = dateMatch ? dateMatch[1].trim() : "TBD";
      const key = `${country}__${seminarDate}`;
      const isCH = country === "CH";

      if (!seminarGroups[key]) {
        seminarGroups[key] = {
          country,
          date: seminarDate,
          count: 0,
          price: isCH ? SEMINAR_PRICE_CH : SEMINAR_PRICE_DE,
          currency: isCH ? "CHF" : "€",
        };
      }
      seminarGroups[key].count++;
    });

    const seminarList = Object.values(seminarGroups).sort((a, b) => a.country.localeCompare(b.country));
    const seminarRevenueCHF = seminars.filter(s => s.country === "CH").length * SEMINAR_PRICE_CH;
    const seminarRevenueEUR = seminars.filter(s => s.country !== "CH").length * SEMINAR_PRICE_DE;

    return {
      sessionStats: {
        total: confirmedSessions.length,
        ch: sessionsCH,
        de: sessionsDE,
        other: sessionsOther,
        revenueCHF: sessionRevenueCHF,
        revenueEUR: sessionRevenueEUR,
      },
      seminarStats: {
        total: seminars.length,
        groups: seminarList,
        revenueCHF: seminarRevenueCHF,
        revenueEUR: seminarRevenueEUR,
      },
      totalRevenue: {
        chf: sessionRevenueCHF + seminarRevenueCHF,
        eur: sessionRevenueEUR + seminarRevenueEUR,
      },
    };
  }, [leads]);

  function MetricCard({ title, value, subtitle, icon: Icon, color = "text-gray-900" }: {
    title: string; value: string; subtitle?: string; icon: any; color?: string;
  }) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</span>
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Icon className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${color}`}>{value}</div>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </CardContent>
      </Card>
    );
  }

  // Session goals — filtered by selected month
  const sessionGoals = useMemo(() => {
    const selected = monthOptions.find(m => m.value === sessionGoalMonth);
    if (!selected) return { de: 0, ch: 0 };
    const confirmedInMonth = leads.filter(l => {
      if (l.form_type !== "session" || l.concern !== CONFIRMATION_CONCERN) return false;
      const d = l.created_at ? l.created_at.slice(0, 10) : "";
      return d >= selected.start && d <= selected.end;
    });
    return {
      de: confirmedInMonth.filter(l => l.country === "DE").length,
      ch: confirmedInMonth.filter(l => l.country === "CH").length,
    };
  }, [leads, sessionGoalMonth, monthOptions]);

  // Seminar goals — ALL registrations (not date-filtered)
  const seminarGoals = useMemo(() => {
    const seminars = allSeminarLeads.length > 0 ? allSeminarLeads : leads.filter(l => l.form_type === "seminar");
    return {
      de: seminars.filter(l => l.country === "DE" || (l.city || "").toLowerCase().includes("deutschland")).length,
      ch: seminars.filter(l => l.country === "CH" || (l.city || "").toLowerCase().includes("schweiz")).length,
    };
  }, [allSeminarLeads, leads]);

  const allGoals = [
    { label: "Sessions DE", current: sessionGoals.de, target: 40, icon: "🇩🇪", color: "text-blue-700", type: "session" as const },
    { label: "Sessions CH", current: sessionGoals.ch, target: 20, icon: "🇨🇭", color: "text-emerald-700", type: "session" as const },
    { label: "Seminar DE", current: seminarGoals.de, target: 14, icon: "🇩🇪", color: "text-blue-700", type: "seminar" as const },
    { label: "Seminar CH", current: seminarGoals.ch, target: 24, icon: "🇨🇭", color: "text-emerald-700", type: "seminar" as const },
  ];

  return (
    <div className="space-y-5">
      {/* ═══════ GOALS ═══════ */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                Conversion Goals
              </CardTitle>
              <p className="text-xs text-gray-400 mt-1">Sessions = monthly goal · Seminars = total per edition (all-time)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Session month:</span>
              <Select value={sessionGoalMonth} onValueChange={setSessionGoalMonth}>
                <SelectTrigger className="w-[160px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map(m => (
                    <SelectItem key={m.value} value={m.value} className="text-xs">{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {allGoals.map((g, i) => {
              const pct = Math.min(100, Math.round((g.current / g.target) * 100));
              const isComplete = g.current >= g.target;
              return (
                <div key={i} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{g.icon}</span>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{g.label}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-gray-200 text-gray-400">
                      {g.type === "session" ? "monthly" : "all-time"}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-2xl font-bold ${isComplete ? "text-emerald-600" : g.color}`}>{g.current}</span>
                    <span className="text-sm text-gray-400">/ {g.target}</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">
                    {isComplete ? "✓ Goal reached!" : `${pct}% — ${g.target - g.current} remaining`}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Confirmed Sessions"
          value={String(sessionStats.total)}
          subtitle={`CH: ${sessionStats.ch} | DE: ${sessionStats.de}`}
          icon={CalendarCheck}
          color="text-emerald-600"
        />
        <MetricCard
          title="Seminar Registrations"
          value={String(seminarStats.total)}
          icon={GraduationCap}
          color="text-blue-600"
        />
        <MetricCard
          title="Projected CHF"
          value={`CHF ${totalRevenue.chf.toLocaleString()}`}
          subtitle="Sessions + Seminars (CH)"
          icon={DollarSign}
          color="text-emerald-700"
        />
        <MetricCard
          title="Projected EUR"
          value={`€${totalRevenue.eur.toLocaleString()}`}
          subtitle="Sessions + Seminars (DE)"
          icon={DollarSign}
          color="text-blue-700"
        />
      </div>

      {/* ═══════ SESSION REVENUE ═══════ */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
            Session Revenue — Terminbestätigung only
          </CardTitle>
          <p className="text-xs text-gray-400">Free consultation forms (Erstgespräch) are NOT counted as revenue.</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="text-gray-500">Country</TableHead>
                  <TableHead className="text-gray-500 text-right">Confirmed Sessions</TableHead>
                  <TableHead className="text-gray-500 text-right">Price / Session</TableHead>
                  <TableHead className="text-gray-500 text-right">Projected Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-gray-100">
                  <TableCell className="font-medium text-gray-900">🇨🇭 Switzerland</TableCell>
                  <TableCell className="text-right text-gray-900 font-medium">{sessionStats.ch}</TableCell>
                  <TableCell className="text-right text-gray-700">CHF 750</TableCell>
                  <TableCell className="text-right text-emerald-700 font-bold">CHF {sessionStats.revenueCHF.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow className="border-gray-100">
                  <TableCell className="font-medium text-gray-900">🇩🇪 Germany</TableCell>
                  <TableCell className="text-right text-gray-900 font-medium">{sessionStats.de}</TableCell>
                  <TableCell className="text-right text-gray-700">€650</TableCell>
                  <TableCell className="text-right text-blue-700 font-bold">€{sessionStats.revenueEUR.toLocaleString()}</TableCell>
                </TableRow>
                {sessionStats.other > 0 && (
                  <TableRow className="border-gray-100">
                    <TableCell className="font-medium text-gray-900">Other</TableCell>
                    <TableCell className="text-right text-gray-900 font-medium">{sessionStats.other}</TableCell>
                    <TableCell className="text-right text-gray-500">—</TableCell>
                    <TableCell className="text-right text-gray-500">—</TableCell>
                  </TableRow>
                )}
                <TableRow className="border-gray-100 bg-gray-50">
                  <TableCell className="font-bold text-gray-900">Total Sessions</TableCell>
                  <TableCell className="text-right text-gray-900 font-bold">{sessionStats.total}</TableCell>
                  <TableCell className="text-right text-gray-500">—</TableCell>
                  <TableCell className="text-right font-bold">
                    {sessionStats.revenueCHF > 0 && <span className="text-emerald-700">CHF {sessionStats.revenueCHF.toLocaleString()}</span>}
                    {sessionStats.revenueCHF > 0 && sessionStats.revenueEUR > 0 && <span className="text-gray-400"> + </span>}
                    {sessionStats.revenueEUR > 0 && <span className="text-blue-700">€{sessionStats.revenueEUR.toLocaleString()}</span>}
                    {sessionStats.total === 0 && <span className="text-gray-400">—</span>}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ═══════ SEMINAR REVENUE ═══════ */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Seminar Revenue — by Country & Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="text-gray-500">Country</TableHead>
                  <TableHead className="text-gray-500">Seminar Date</TableHead>
                  <TableHead className="text-gray-500 text-right">Registrations</TableHead>
                  <TableHead className="text-gray-500 text-right">Price / Seat</TableHead>
                  <TableHead className="text-gray-500 text-right">Projected Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {seminarStats.groups.length === 0 ? (
                  <>
                    <TableRow className="border-gray-100">
                      <TableCell className="font-medium text-gray-900">🇨🇭 Switzerland</TableCell>
                      <TableCell className="text-gray-400">—</TableCell>
                      <TableCell className="text-right text-gray-900 font-medium">0</TableCell>
                      <TableCell className="text-right text-gray-700">
                        <span className="text-gray-400 line-through text-xs mr-1">CHF 3.290.-</span> CHF 2.990.-
                      </TableCell>
                      <TableCell className="text-right text-gray-400">CHF 0</TableCell>
                    </TableRow>
                    <TableRow className="border-gray-100">
                      <TableCell className="font-medium text-gray-900">🇩🇪 Germany</TableCell>
                      <TableCell className="text-gray-400">—</TableCell>
                      <TableCell className="text-right text-gray-900 font-medium">0</TableCell>
                      <TableCell className="text-right text-gray-700">
                        <span className="text-gray-400 line-through text-xs mr-1">€2.790,-</span> €2.490,-
                      </TableCell>
                      <TableCell className="text-right text-gray-400">€0</TableCell>
                    </TableRow>
                  </>
                ) : (
                  seminarStats.groups.map((g, i) => (
                    <TableRow key={i} className="border-gray-100">
                      <TableCell className="font-medium text-gray-900">
                        {g.country === "CH" ? "🇨🇭" : "🇩🇪"} {g.country}
                      </TableCell>
                      <TableCell className="text-gray-700">{g.date}</TableCell>
                      <TableCell className="text-right text-gray-900 font-medium">{g.count}</TableCell>
                      <TableCell className="text-right text-gray-700">{g.currency} {g.price.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-bold">
                        <span className={g.country === "CH" ? "text-emerald-700" : "text-blue-700"}>
                          {g.currency} {(g.count * g.price).toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <TableRow className="border-gray-100 bg-gray-50">
                  <TableCell className="font-bold text-gray-900" colSpan={2}>Total Seminars</TableCell>
                  <TableCell className="text-right text-gray-900 font-bold">{seminarStats.total}</TableCell>
                  <TableCell className="text-right text-gray-500">—</TableCell>
                  <TableCell className="text-right font-bold">
                    {seminarStats.revenueCHF > 0 && <span className="text-emerald-700">CHF {seminarStats.revenueCHF.toLocaleString()}</span>}
                    {seminarStats.revenueCHF > 0 && seminarStats.revenueEUR > 0 && <span className="text-gray-400"> + </span>}
                    {seminarStats.revenueEUR > 0 && <span className="text-blue-700">€{seminarStats.revenueEUR.toLocaleString()}</span>}
                    {seminarStats.total === 0 && <span className="text-gray-400">—</span>}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ═══════ SEMINAR CAPACITY STATUS ═══════ */}
      {capacityData.length > 0 && (() => {
        // Count registrations per seminar date+country from leads
        const seminars = leads.filter(l => l.form_type === "seminar");
        const regCounts: Record<string, number> = {};
        seminars.forEach(s => {
          // Determine country: city="Schweiz" -> ch, city="Deutschland" -> de, or fallback to country field
          const cityLower = (s.city || "").toLowerCase();
          const countryLower = (s.country || "").toLowerCase();
          const semCountry = cityLower.includes("schweiz") ? "ch" : cityLower.includes("deutschland") ? "de" : countryLower === "ch" ? "ch" : "de";
          const dateMatch = s.notes?.match(/Seminar[:\s]+([^|]+)/i);
          const semDate = dateMatch ? dateMatch[1].trim() : "";
          if (semDate) {
            const key = `${semCountry}__${semDate}`;
            regCounts[key] = (regCounts[key] || 0) + 1;
          }
        });

        return (
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                Seminar Capacity Status
              </CardTitle>
              <p className="text-xs text-gray-400">Internal only — not shown to the public</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-100">
                      <TableHead className="text-gray-500">Country</TableHead>
                      <TableHead className="text-gray-500">Seminar Date</TableHead>
                      <TableHead className="text-gray-500 text-right">Registered</TableHead>
                      <TableHead className="text-gray-500 text-right">Max</TableHead>
                      <TableHead className="text-gray-500 text-right">Available</TableHead>
                      <TableHead className="text-gray-500">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capacityData
                      .sort((a, b) => a.seminar_country.localeCompare(b.seminar_country) || a.seminar_date.localeCompare(b.seminar_date))
                      .map((cap, i) => {
                        const key = `${cap.seminar_country}__${cap.seminar_date}`;
                        const registered = regCounts[key] || 0;
                        const available = Math.max(0, cap.max_capacity - registered);
                        const isCH = cap.seminar_country === "ch";
                        const greenThreshold = isCH ? 13 : 8;
                        const isGreen = available >= greenThreshold;
                        const isRed = available === 0;
                        const isOrange = !isGreen && !isRed;

                        let statusLabel = "";
                        let statusClass = "";
                        if (isGreen) {
                          statusLabel = "Places Available";
                          statusClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
                        } else if (isOrange) {
                          statusLabel = "Limited Places";
                          statusClass = "bg-amber-50 text-amber-700 border-amber-200";
                        } else {
                          statusLabel = "Fully Booked – Waiting List";
                          statusClass = "bg-red-50 text-red-700 border-red-200";
                        }

                        return (
                          <TableRow key={i} className="border-gray-100">
                            <TableCell className="font-medium text-gray-900">
                              {isCH ? "🇨🇭 CH" : "🇩🇪 DE"}
                            </TableCell>
                            <TableCell className="text-gray-700 text-sm">{cap.seminar_date}</TableCell>
                            <TableCell className="text-right text-gray-900 font-medium">{registered}</TableCell>
                            <TableCell className="text-right text-gray-500">{cap.max_capacity}</TableCell>
                            <TableCell className="text-right text-gray-900 font-medium">{available}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`text-xs ${statusClass}`}>
                                {statusLabel}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* ═══════ COMMISSION (Bia only) ═══════ */}
      {(() => {
        const currentUser = getCurrentUser();
        const isBia = currentUser?.toLowerCase().includes("bia");
        if (!isBia) return null;

        const COMMISSION_RATE = 0.10;
        const MIN_REGISTRATIONS = 5;

        // Calculate commission per seminar group
        const commissionData = seminarStats.groups.map(g => {
          const triggered = g.count >= MIN_REGISTRATIONS;
          const seminarRevenue = g.count * g.price;
          const commission = triggered ? seminarRevenue * COMMISSION_RATE : 0;
          return { ...g, triggered, seminarRevenue, commission };
        });

        const totalCommissionCHF = commissionData
          .filter(c => c.country === "CH")
          .reduce((sum, c) => sum + c.commission, 0);
        const totalCommissionEUR = commissionData
          .filter(c => c.country !== "CH")
          .reduce((sum, c) => sum + c.commission, 0);

        return (
          <Card className="bg-white border border-amber-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                Commission Overview — 10% Seminar Revenue
              </CardTitle>
              <p className="text-xs text-gray-400">Triggers at ≥{MIN_REGISTRATIONS} registrations per seminar. Only visible to you.</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-100">
                      <TableHead className="text-gray-500">Country</TableHead>
                      <TableHead className="text-gray-500">Seminar</TableHead>
                      <TableHead className="text-gray-500 text-right">Registrations</TableHead>
                      <TableHead className="text-gray-500 text-right">Seminar Revenue</TableHead>
                      <TableHead className="text-gray-500 text-center">Triggered?</TableHead>
                      <TableHead className="text-gray-500 text-right">Commission (10%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissionData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-400 py-6">
                          No seminar registrations yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      commissionData.map((c, i) => (
                        <TableRow key={i} className="border-gray-100">
                          <TableCell className="font-medium text-gray-900">
                            {c.country === "CH" ? "🇨🇭" : "🇩🇪"} {c.country}
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm">{c.date}</TableCell>
                          <TableCell className="text-right text-gray-900 font-medium">
                            {c.count}
                            {c.count < MIN_REGISTRATIONS && (
                              <span className="text-xs text-gray-400 ml-1">({MIN_REGISTRATIONS - c.count} more needed)</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right text-gray-700">
                            {c.currency} {c.seminarRevenue.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className={`text-xs ${
                              c.triggered
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-gray-50 text-gray-400 border-gray-200"
                            }`}>
                              {c.triggered ? "✓ Yes" : "✗ No"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {c.triggered ? (
                              <span className="text-amber-700">{c.currency} {c.commission.toLocaleString()}</span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                    {(totalCommissionCHF > 0 || totalCommissionEUR > 0) && (
                      <TableRow className="border-gray-100 bg-amber-50">
                        <TableCell className="font-bold text-amber-800" colSpan={5}>Total Commission</TableCell>
                        <TableCell className="text-right font-bold">
                          {totalCommissionCHF > 0 && <span className="text-amber-700">CHF {totalCommissionCHF.toLocaleString()}</span>}
                          {totalCommissionCHF > 0 && totalCommissionEUR > 0 && <span className="text-gray-400"> + </span>}
                          {totalCommissionEUR > 0 && <span className="text-amber-700">€{totalCommissionEUR.toLocaleString()}</span>}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* ═══════ PRICING REFERENCE ═══════ */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Pricing Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
              <p className="text-xs text-emerald-600 font-medium">Session CH</p>
              <p className="text-lg font-bold text-emerald-700">CHF 750</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
              <p className="text-xs text-blue-600 font-medium">Session DE</p>
              <p className="text-lg font-bold text-blue-700">€650</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
              <p className="text-xs text-emerald-600 font-medium">Seminar CH</p>
               <p className="text-xs text-emerald-500 line-through">CHF 3.290.-</p>
               <p className="text-lg font-bold text-emerald-700">CHF 2.990.-</p>
              <p className="text-[10px] text-emerald-600">Early Bird</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
              <p className="text-xs text-blue-600 font-medium">Seminar DE</p>
               <p className="text-xs text-blue-500 line-through">€2.790,-</p>
               <p className="text-lg font-bold text-blue-700">€2.490,-</p>
              <p className="text-[10px] text-blue-600">Early Bird</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 italic">
            Note: Revenue calculated at Early Bird price. Regular prices: CHF 3.290.- (CH) / €2.790,- (DE). Free consultations NOT counted.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
