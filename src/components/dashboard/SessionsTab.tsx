import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, differenceInDays, differenceInHours } from "date-fns";
import type { LeadRecord } from "@/data/dashboardMockData";
import { Users, CalendarCheck, Clock, ArrowRight } from "lucide-react";

const CONFIRMATION_CONCERN = "Terminbestätigung / Sitzung";

interface SessionsTabProps {
  leads: LeadRecord[];
}

interface MatchedSession {
  email: string;
  name: string;
  country: string;
  leadDate: Date;
  confirmationDate: Date | null;
  daysBetween: number | null;
  hoursBetween: number | null;
  concern: string;
  leadId: string;
  confirmationId: string | null;
}

export default function SessionsTab({ leads }: SessionsTabProps) {
  const { matched, unmatchedLeads, unmatchedConfirmations, stats } = useMemo(() => {
    // Separate free consultations from confirmations
    const freeConsultations = leads.filter(
      l => l.form_type === "session" && l.concern !== CONFIRMATION_CONCERN
    );
    const confirmations = leads.filter(
      l => l.form_type === "session" && l.concern === CONFIRMATION_CONCERN
    );

    // Build confirmation map by email
    const confirmationByEmail: Record<string, LeadRecord> = {};
    confirmations.forEach(c => {
      const key = c.email.toLowerCase();
      // Keep earliest confirmation per email
      if (!confirmationByEmail[key] || new Date(c.created_at) < new Date(confirmationByEmail[key].created_at)) {
        confirmationByEmail[key] = c;
      }
    });

    // Match leads with confirmations
    const matched: MatchedSession[] = [];
    const matchedConfEmails = new Set<string>();

    freeConsultations.forEach(lead => {
      const key = lead.email.toLowerCase();
      const conf = confirmationByEmail[key];
      const leadDate = new Date(lead.created_at);

      if (conf) {
        const confDate = new Date(conf.created_at);
        matchedConfEmails.add(key);
        matched.push({
          email: lead.email,
          name: lead.name,
          country: lead.country || "—",
          leadDate,
          confirmationDate: confDate,
          daysBetween: differenceInDays(confDate, leadDate),
          hoursBetween: differenceInHours(confDate, leadDate),
          concern: lead.concern || "—",
          leadId: lead.id,
          confirmationId: conf.id,
        });
      } else {
        matched.push({
          email: lead.email,
          name: lead.name,
          country: lead.country || "—",
          leadDate,
          confirmationDate: null,
          daysBetween: null,
          hoursBetween: null,
          concern: lead.concern || "—",
          leadId: lead.id,
          confirmationId: null,
        });
      }
    });

    // Confirmations without a prior free consultation
    const unmatchedConfirmations = confirmations.filter(
      c => !matchedConfEmails.has(c.email.toLowerCase())
    );

    const totalLeads = freeConsultations.length;
    const totalConfirmed = matched.filter(m => m.confirmationDate).length;
    const totalDirectConfirmations = unmatchedConfirmations.length;
    const avgDays = matched
      .filter(m => m.daysBetween !== null)
      .reduce((sum, m) => sum + (m.daysBetween || 0), 0) / (totalConfirmed || 1);

    return {
      matched: matched.sort((a, b) => b.leadDate.getTime() - a.leadDate.getTime()),
      unmatchedLeads: matched.filter(m => !m.confirmationDate),
      unmatchedConfirmations,
      stats: { totalLeads, totalConfirmed, totalDirectConfirmations, avgDays },
    };
  }, [leads]);

  function formatTimeBetween(hours: number | null, days: number | null) {
    if (hours === null || days === null) return "—";
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  }

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Free Consultations</span>
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalLeads}</div>
            <p className="text-xs text-gray-400 mt-1">Erstgespräch submissions</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Confirmed Sessions</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-600">{stats.totalConfirmed + stats.totalDirectConfirmations}</div>
            <p className="text-xs text-gray-400 mt-1">Terminbestätigung submitted</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Conversion Rate</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalLeads > 0
                ? `${((stats.totalConfirmed / stats.totalLeads) * 100).toFixed(1)}%`
                : "—"}
            </div>
            <p className="text-xs text-gray-400 mt-1">Lead → Confirmed</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg. Time to Confirm</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-amber-600">
              {stats.totalConfirmed > 0 ? `${stats.avgDays.toFixed(1)}d` : "—"}
            </div>
            <p className="text-xs text-gray-400 mt-1">From lead to confirmation</p>
          </CardContent>
        </Card>
      </div>

      {/* Matched Sessions Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">
            Lead → Session Confirmation Pipeline ({matched.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {matched.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center">No session leads yet.</p>
          ) : (
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="text-gray-500 text-xs">Name</TableHead>
                    <TableHead className="text-gray-500 text-xs">Email</TableHead>
                    <TableHead className="text-gray-500 text-xs">Country</TableHead>
                    <TableHead className="text-gray-500 text-xs">Concern</TableHead>
                    <TableHead className="text-gray-500 text-xs">Lead Date</TableHead>
                    <TableHead className="text-gray-500 text-xs">Confirmed Date</TableHead>
                    <TableHead className="text-gray-500 text-xs text-center">Time Gap</TableHead>
                    <TableHead className="text-gray-500 text-xs text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matched.map(m => (
                    <TableRow key={m.leadId} className="border-gray-100 hover:bg-gray-50">
                      <TableCell className="text-gray-900 text-xs font-medium whitespace-nowrap">{m.name}</TableCell>
                      <TableCell className="text-blue-700 text-xs">{m.email}</TableCell>
                      <TableCell className="text-gray-700 text-xs">{m.country}</TableCell>
                      <TableCell className="text-gray-700 text-xs">{m.concern}</TableCell>
                      <TableCell className="text-gray-700 text-xs whitespace-nowrap">
                        {format(m.leadDate, "dd/MM/yy HH:mm")}
                      </TableCell>
                      <TableCell className="text-gray-700 text-xs whitespace-nowrap">
                        {m.confirmationDate ? format(m.confirmationDate, "dd/MM/yy HH:mm") : "—"}
                      </TableCell>
                      <TableCell className="text-center text-xs font-medium">
                        {m.confirmationDate ? (
                          <span className="text-emerald-700">{formatTimeBetween(m.hoursBetween, m.daysBetween)}</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {m.confirmationDate ? (
                          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">Confirmed</Badge>
                        ) : (
                          <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-xs">Pending</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Direct Confirmations (no prior free consultation) */}
      {unmatchedConfirmations.length > 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Direct Session Confirmations — no prior free consultation ({unmatchedConfirmations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="text-gray-500 text-xs">Name</TableHead>
                    <TableHead className="text-gray-500 text-xs">Email</TableHead>
                    <TableHead className="text-gray-500 text-xs">Country</TableHead>
                    <TableHead className="text-gray-500 text-xs">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unmatchedConfirmations.map(c => (
                    <TableRow key={c.id} className="border-gray-100 hover:bg-gray-50">
                      <TableCell className="text-gray-900 text-xs font-medium">{c.name}</TableCell>
                      <TableCell className="text-blue-700 text-xs">{c.email}</TableCell>
                      <TableCell className="text-gray-700 text-xs">{c.country || "—"}</TableCell>
                      <TableCell className="text-gray-700 text-xs whitespace-nowrap">
                        {format(new Date(c.created_at), "dd/MM/yy HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
