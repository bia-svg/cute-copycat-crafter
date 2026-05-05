import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function DashboardResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token || !email) setError("Invalid reset link.");
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("dashboard-auth", {
        body: { action: "confirm_reset", email, token, newPassword: password },
      });
      if (fnErr || (data as any)?.error) {
        setError((data as any)?.error || "Could not reset password.");
      } else {
        setDone(true);
        setTimeout(() => navigate("/dashboard/login"), 2000);
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Reset Password | David J. Woods</title>
      </Helmet>
      <div className="min-h-screen bg-[hsl(220,15%,10%)] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)] text-white">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-white">Set New Password</CardTitle>
            <p className="text-sm text-[hsl(220,10%,55%)]">{email}</p>
          </CardHeader>
          <CardContent>
            {done ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 p-3 rounded">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> Password updated. Redirecting…
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm text-[hsl(220,10%,65%)]">New password (min 8 chars)</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" required minLength={8}
                    className="bg-[hsl(220,15%,16%)] border-[hsl(220,15%,22%)] text-white placeholder:text-[hsl(220,10%,40%)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[hsl(220,10%,65%)]">Confirm password</label>
                  <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••" required minLength={8}
                    className="bg-[hsl(220,15%,16%)] border-[hsl(220,15%,22%)] text-white placeholder:text-[hsl(220,10%,40%)]" />
                </div>
                <Button type="submit" disabled={loading || !token || !email}
                  className="w-full bg-primary hover:bg-primary/90">
                  {loading ? "Saving..." : "Update Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
