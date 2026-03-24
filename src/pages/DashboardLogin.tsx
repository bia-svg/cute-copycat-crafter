import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "@/lib/dashboardAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle } from "lucide-react";

export default function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const success = authenticate(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[hsl(220,15%,10%)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[hsl(220,15%,13%)] border-[hsl(220,15%,20%)] text-white">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl text-white">Dashboard Login</CardTitle>
          <p className="text-sm text-[hsl(220,10%,55%)]">Interner Bereich — Nur autorisierte Benutzer</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-3 rounded">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm text-[hsl(220,10%,65%)]">E-Mail</label>
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
              <label className="text-sm text-[hsl(220,10%,65%)]">Passwort</label>
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
              {loading ? "Wird geladen..." : "Anmelden"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
