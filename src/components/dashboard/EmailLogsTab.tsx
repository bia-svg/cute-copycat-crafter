import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser } from "@/lib/dashboardAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle, CheckCircle2, Clock, Ban, XCircle } from "lucide-react";
import { format } from "date-fns";

interface EmailLog {
  id: string;
  message_id: string | null;
  template_name: string;
  recipient_email: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  sent: { label: "Sent", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  failed: { label: "Failed", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  dlq: { label: "Failed (DLQ)", color: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle },
  suppressed: { label: "Suppressed", color: "bg-gray-100 text-gray-600 border-gray-200", icon: Ban },
  bounced: { label: "Bounced", color: "bg-orange-50 text-orange-700 border-orange-200", icon: AlertTriangle },
  complained: { label: "Complained", color: "bg-purple-50 text-purple-700 border-purple-200", icon: AlertTriangle },
};

export default function EmailLogsTab() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [templateFilter, setTemplateFilter] = useState<string>("all");

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const email = getCurrentUser();
      const { data, error: fetchError } = await supabase.functions.invoke("fetch-email-logs", {
        body: { token: "dashboard", email },
      });

      if (fetchError) {
        setError(fetchError.message);
        return;
      }
      if (data?.error) {
        setError(data.error);
        return;
      }
      setLogs((data?.logs as EmailLog[]) || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  // Deduplicate by message_id (keep latest status per message_id)
  const dedupedLogs = useMemo(() => {
    const byMessageId = new Map<string, EmailLog>();
    for (const log of logs) {
      const key = log.message_id || log.id;
      const existing = byMessageId.get(key);
      if (!existing || new Date(log.created_at) > new Date(existing.created_at)) {
        byMessageId.set(key, log);
      }
    }
    return Array.from(byMessageId.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [logs]);

  const templates = useMemo(() => {
    const set = new Set(dedupedLogs.map(l => l.template_name));
    return Array.from(set).sort();
  }, [dedupedLogs]);

  const filtered = useMemo(() => {
    return dedupedLogs.filter(l => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (templateFilter !== "all" && l.template_name !== templateFilter) return false;
      return true;
    });
  }, [dedupedLogs, statusFilter, templateFilter]);

  // Stats
  const stats = useMemo(() => {
    const s = { total: 0, sent: 0, failed: 0, pending: 0, suppressed: 0 };
    dedupedLogs.forEach(l => {
      s.total++;
      if (l.status === "sent") s.sent++;
      else if (l.status === "failed" || l.status === "dlq") s.failed++;
      else if (l.status === "pending") s.pending++;
      else if (l.status === "suppressed") s.suppressed++;
    });
    return s;
  }, [dedupedLogs]);

  const formatDate = (d: string) => {
    return new Date(d).toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      day: "2-digit", month: "2-digit", year: "2-digit",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total, color: "text-gray-900" },
          { label: "Sent", value: stats.sent, color: "text-emerald-600" },
          { label: "Pending", value: stats.pending, color: "text-amber-600" },
          { label: "Failed", value: stats.failed, color: "text-red-600" },
          { label: "Suppressed", value: stats.suppressed, color: "text-gray-500" },
        ].map(s => (
          <Card key={s.label} className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="text-xs border border-gray-200 rounded-md px-3 py-1.5 bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="sent">Sent</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="dlq">DLQ</option>
          <option value="suppressed">Suppressed</option>
        </select>
        <select
          value={templateFilter}
          onChange={e => setTemplateFilter(e.target.value)}
          className="text-xs border border-gray-200 rounded-md px-3 py-1.5 bg-white"
        >
          <option value="all">All Templates</option>
          {templates.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <Button size="sm" variant="outline" onClick={fetchLogs} disabled={loading} className="text-xs">
          <RefreshCw className={`w-3 h-3 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
        <span className="text-xs text-gray-400">{filtered.length} emails</span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100">
                  <TableHead className="text-gray-500 text-xs">Time (CET)</TableHead>
                  <TableHead className="text-gray-500 text-xs">Template</TableHead>
                  <TableHead className="text-gray-500 text-xs">Recipient</TableHead>
                  <TableHead className="text-gray-500 text-xs text-center">Status</TableHead>
                  <TableHead className="text-gray-500 text-xs">Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-400 py-12">
                      No email logs found.
                    </TableCell>
                  </TableRow>
                )}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-400 py-12">
                      Loading...
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map(log => {
                  const cfg = STATUS_CONFIG[log.status] || STATUS_CONFIG.failed;
                  const Icon = cfg.icon;
                  return (
                    <TableRow key={log.id} className="border-gray-100 hover:bg-gray-50">
                      <TableCell className="text-xs text-gray-700 whitespace-nowrap">
                        {formatDate(log.created_at)}
                      </TableCell>
                      <TableCell className="text-xs text-gray-700">
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">{log.template_name}</code>
                      </TableCell>
                      <TableCell className="text-xs text-gray-700 max-w-[200px] truncate">
                        {log.recipient_email}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${cfg.color} border text-[10px] inline-flex items-center gap-1`}>
                          <Icon className="w-3 h-3" /> {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-red-600 max-w-[250px] truncate">
                        {log.error_message || "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
