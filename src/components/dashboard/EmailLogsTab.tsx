import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUser } from "@/lib/dashboardAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle, CheckCircle2, Clock, Ban, XCircle, FileText, LogIn } from "lucide-react";

interface EmailLog {
  id: string;
  message_id: string | null;
  template_name: string;
  recipient_email: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

interface FormLog {
  id: string;
  form_type: string;
  status: string;
  error_message: string | null;
  form_data: any;
  page_path: string | null;
  created_at: string;
}

interface LoginLog {
  id: string;
  email: string;
  success: boolean;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const EMAIL_STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  sent: { label: "Sent", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  failed: { label: "Failed", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  dlq: { label: "Failed (DLQ)", color: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle },
  suppressed: { label: "Suppressed", color: "bg-gray-100 text-gray-600 border-gray-200", icon: Ban },
  bounced: { label: "Bounced", color: "bg-orange-50 text-orange-700 border-orange-200", icon: AlertTriangle },
  complained: { label: "Complained", color: "bg-purple-50 text-purple-700 border-purple-200", icon: AlertTriangle },
};

const FORM_STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  success: { label: "Success", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  error: { label: "Error", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  validation_error: { label: "Validation", color: "bg-amber-50 text-amber-700 border-amber-200", icon: AlertTriangle },
};

type ViewMode = "forms" | "emails" | "logins";

export default function EmailLogsTab() {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [formLogs, setFormLogs] = useState<FormLog[]>([]);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("forms");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const email = getCurrentUser();
      const [emailRes, formRes] = await Promise.all([
        supabase.functions.invoke("fetch-email-logs", { body: { token: "dashboard", email } }),
        supabase.functions.invoke("fetch-form-logs", { body: { token: "dashboard", email } }),
      ]);

      if (emailRes.error) setError(emailRes.error.message);
      else if (emailRes.data?.error) setError(emailRes.data.error);
      else setEmailLogs((emailRes.data?.logs as EmailLog[]) || []);

      // Store login logs from the same response
      if (emailRes.data?.loginLogs) {
        setLoginLogs(emailRes.data.loginLogs as LoginLog[]);
      }

      if (formRes.error) console.error("Form logs error:", formRes.error);
      else if (formRes.data?.error) console.error("Form logs error:", formRes.data.error);
      else setFormLogs((formRes.data?.logs as FormLog[]) || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  // Deduplicate email logs by message_id
  const dedupedEmails = useMemo(() => {
    const byMessageId = new Map<string, EmailLog>();
    for (const log of emailLogs) {
      const key = log.message_id || log.id;
      const existing = byMessageId.get(key);
      if (!existing || new Date(log.created_at) > new Date(existing.created_at)) {
        byMessageId.set(key, log);
      }
    }
    return Array.from(byMessageId.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [emailLogs]);

  // Filtered
  const filteredEmails = useMemo(() => {
    if (statusFilter === "all") return dedupedEmails;
    return dedupedEmails.filter(l => l.status === statusFilter);
  }, [dedupedEmails, statusFilter]);

  const filteredForms = useMemo(() => {
    if (statusFilter === "all") return formLogs;
    return formLogs.filter(l => l.status === statusFilter);
  }, [formLogs, statusFilter]);

  // Stats
  const formStats = useMemo(() => {
    const s = { total: formLogs.length, success: 0, error: 0 };
    formLogs.forEach(l => {
      if (l.status === "success") s.success++;
      else s.error++;
    });
    return s;
  }, [formLogs]);

  const emailStats = useMemo(() => {
    const s = { total: 0, sent: 0, failed: 0, pending: 0, suppressed: 0 };
    dedupedEmails.forEach(l => {
      s.total++;
      if (l.status === "sent") s.sent++;
      else if (l.status === "failed" || l.status === "dlq") s.failed++;
      else if (l.status === "pending") s.pending++;
      else if (l.status === "suppressed") s.suppressed++;
    });
    return s;
  }, [dedupedEmails]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      day: "2-digit", month: "2-digit", year: "2-digit",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="space-y-4">
      {/* View toggle */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={viewMode === "forms" ? "default" : "outline"}
          onClick={() => { setViewMode("forms"); setStatusFilter("all"); }}
          className="text-xs"
        >
          <FileText className="w-3 h-3 mr-1" /> Form Submissions
          {formStats.error > 0 && (
            <span className="ml-1.5 bg-red-500 text-white rounded-full px-1.5 text-[10px] font-bold">{formStats.error}</span>
          )}
        </Button>
        <Button
          size="sm"
          variant={viewMode === "emails" ? "default" : "outline"}
          onClick={() => { setViewMode("emails"); setStatusFilter("all"); }}
          className="text-xs"
        >
          📧 Email Delivery
        </Button>
        <div className="flex-1" />
        <Button size="sm" variant="outline" onClick={fetchLogs} disabled={loading} className="text-xs">
          <RefreshCw className={`w-3 h-3 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      {/* Stats */}
      {viewMode === "forms" ? (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Attempts", value: formStats.total, color: "text-gray-900" },
            { label: "Success", value: formStats.success, color: "text-emerald-600" },
            { label: "Errors", value: formStats.error, color: "text-red-600" },
          ].map(s => (
            <Card key={s.label} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</p>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Total", value: emailStats.total, color: "text-gray-900" },
            { label: "Sent", value: emailStats.sent, color: "text-emerald-600" },
            { label: "Pending", value: emailStats.pending, color: "text-amber-600" },
            { label: "Failed", value: emailStats.failed, color: "text-red-600" },
            { label: "Suppressed", value: emailStats.suppressed, color: "text-gray-500" },
          ].map(s => (
            <Card key={s.label} className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{s.label}</p>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-3">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="text-xs border border-gray-200 rounded-md px-3 py-1.5 bg-white"
        >
          <option value="all">All Statuses</option>
          {viewMode === "forms" ? (
            <>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="validation_error">Validation Error</option>
            </>
          ) : (
            <>
              <option value="sent">Sent</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="dlq">DLQ</option>
              <option value="suppressed">Suppressed</option>
            </>
          )}
        </select>
        <span className="text-xs text-gray-400">
          {viewMode === "forms" ? filteredForms.length : filteredEmails.length} entries
        </span>
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
            {viewMode === "forms" ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="text-gray-500 text-xs">Time (CET)</TableHead>
                    <TableHead className="text-gray-500 text-xs">Form</TableHead>
                    <TableHead className="text-gray-500 text-xs">Page</TableHead>
                    <TableHead className="text-gray-500 text-xs text-center">Status</TableHead>
                    <TableHead className="text-gray-500 text-xs">Error / Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-400 py-12">
                        No form submissions logged yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-400 py-12">Loading...</TableCell>
                    </TableRow>
                  )}
                  {filteredForms.map(log => {
                    const cfg = FORM_STATUS_CONFIG[log.status] || FORM_STATUS_CONFIG.error;
                    const Icon = cfg.icon;
                    return (
                      <TableRow key={log.id} className={`border-gray-100 hover:bg-gray-50 ${log.status !== "success" ? "bg-red-50/30" : ""}`}>
                        <TableCell className="text-xs text-gray-700 whitespace-nowrap">
                          {formatDate(log.created_at)}
                        </TableCell>
                        <TableCell className="text-xs text-gray-700">
                          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">{log.form_type}</code>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500 max-w-[150px] truncate">
                          {log.page_path || "—"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${cfg.color} border text-[10px] inline-flex items-center gap-1`}>
                            <Icon className="w-3 h-3" /> {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-red-600 max-w-[300px]">
                          {log.error_message ? (
                            <span className="font-medium">{log.error_message}</span>
                          ) : log.form_data?.name ? (
                            <span className="text-gray-500">{log.form_data.name}</span>
                          ) : "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
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
                  {filteredEmails.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-400 py-12">
                        No email logs found.
                      </TableCell>
                    </TableRow>
                  )}
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-400 py-12">Loading...</TableCell>
                    </TableRow>
                  )}
                  {filteredEmails.map(log => {
                    const cfg = EMAIL_STATUS_CONFIG[log.status] || EMAIL_STATUS_CONFIG.failed;
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
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
