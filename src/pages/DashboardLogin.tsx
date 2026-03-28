import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "@/lib/dashboardAuth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle, ArrowLeft, Mail } from "lucide-react";

export default function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await authenticate(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    setError("");
    setInfo("");

    try {
      await supabase.functions.invoke("dashboard-auth", {
        body: { action: "request_reset", email },
      });
      setInfo("If this email is registered, you will receive reset instructions. Please contact your administrator.");
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(220,15%,10%)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)] text-white">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            {showForgot ? <Mail className="w-6 h-6 text-primary" /> : <Lock className="w-6 h-6 text-primary" />}
          </div>
          <CardTitle className="text-xl text-white">{showForgot ? "Reset Password" : "Dashboard Login"}</CardTitle>
          <p className="text-sm text-[hsl(220,10%,55%)]">
            {showForgot ? "Enter your email to receive reset instructions" : "Internal area — Authorized users only"}
          </p>
        </CardHeader>
        <CardContent>
          {showForgot ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
              {info && (
                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 p-3 rounded">
                  <Mail className="w-4 h-4 shrink-0" /> {info}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm text-[hsl(220,10%,65%)]">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com" required
                  className="bg-[hsl(220,15%,16%)] border-[hsl(220,15%,22%)] text-white placeholder:text-[hsl(220,10%,40%)]" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                {loading ? "Sending..." : "Send Reset Instructions"}
              </Button>
              <button type="button" onClick={() => { setShowForgot(false); setError(""); setInfo(""); }}
                className="flex items-center gap-1 text-sm text-[hsl(220,10%,55%)] hover:text-white transition-colors mx-auto">
                <ArrowLeft className="w-3 h-3" /> Back to Login
              </button>
            </form>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm text-[hsl(220,10%,65%)]">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="bg-[hsl(220,15%,16%)] border-[hsl(220,15%,22%)] text-white placeholder:text-[hsl(220,10%,40%)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[hsl(220,10%,65%)]">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-[hsl(220,15%,16%)] border-[hsl(220,15%,22%)] text-white placeholder:text-[hsl(220,10%,40%)]"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
              {loading ? "Loading..." : "Sign In"}
            </Button>
            <button type="button" onClick={() => { setShowForgot(true); setError(""); }}
              className="text-sm text-[hsl(220,10%,55%)] hover:text-white transition-colors mx-auto block">
              Forgot password?
            </button>
          </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
