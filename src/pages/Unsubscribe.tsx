import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setStatus("loading");
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-background min-h-[60vh] flex items-center justify-center py-16">
      <div className="container-main max-w-md text-center">
        {status === "loading" && (
          <Loader2 className="w-10 h-10 text-muted-foreground mx-auto animate-spin" />
        )}

        {status === "valid" && (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-4">E-Mail-Abmeldung</h1>
            <p className="text-muted-foreground mb-6">
              Möchten Sie sich wirklich von unseren E-Mails abmelden?
            </p>
            <Button onClick={handleUnsubscribe} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Abmeldung bestätigen
            </Button>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="w-14 h-14 text-cta mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Erfolgreich abgemeldet</h1>
            <p className="text-muted-foreground">
              Sie erhalten keine weiteren E-Mails von uns.
            </p>
          </>
        )}

        {status === "already" && (
          <>
            <CheckCircle2 className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Bereits abgemeldet</h1>
            <p className="text-muted-foreground">
              Sie haben sich bereits von unseren E-Mails abgemeldet.
            </p>
          </>
        )}

        {status === "invalid" && (
          <>
            <XCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Ungültiger Link</h1>
            <p className="text-muted-foreground">
              Dieser Abmeldelink ist ungültig oder abgelaufen.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Fehler</h1>
            <p className="text-muted-foreground">
              Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
