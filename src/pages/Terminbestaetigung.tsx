import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useSearchParams } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { CalendarCheck, CalendarIcon, CheckCircle2 } from "lucide-react";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PHONE_COUNTRIES } from "@/data/phoneCountries";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Terminbestaetigung() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [dsgvoChecked, setDsgvoChecked] = useState(false);
  const [agbChecked, setAgbChecked] = useState(false);
  const [paymentChecked, setPaymentChecked] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);

  // Phone country code
  const defaultPhoneCountry = country === "ch" ? "+41" : "+49";
  const [phoneCountry, setPhoneCountry] = useState(defaultPhoneCountry);
  const [phoneNumber, setPhoneNumber] = useState("");
  const selectedPhoneCountry = PHONE_COUNTRIES.find(c => c.code === phoneCountry) || PHONE_COUNTRIES[0];

  const handlePhoneChange = useCallback((value: string) => {
    const cleaned = value.replace(/[^\d\s]/g, "");
    const digitsOnly = cleaned.replace(/\s/g, "");
    if (digitsOnly.length <= selectedPhoneCountry.maxDigits) {
      setPhoneNumber(cleaned);
    }
  }, [selectedPhoneCountry.maxDigits]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = (formData.get("firstName") as string)?.trim() || "";
    const lastName = (formData.get("lastName") as string)?.trim() || "";
    const street = (formData.get("street") as string)?.trim() || "";
    const postalCode = (formData.get("postalCode") as string)?.trim() || "";
    const city = (formData.get("city") as string)?.trim() || "";
    const sessionDate = (formData.get("sessionDate") as string) || "";
    const sessionTime = (formData.get("sessionTime") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const phone = phoneNumber.trim();
    const dob = (formData.get("dob") as string) || "";
    const notes = (formData.get("notes") as string)?.trim() || "";

    if (!firstName || !lastName || !street || !postalCode || !city || !sessionDate || !sessionTime || !email || !phone || !location || !dsgvoChecked || !agbChecked || !paymentChecked) {
      toast.error(isEN ? "Please fill in all required fields and accept all checkboxes." : "Bitte füllen Sie alle Pflichtfelder aus und akzeptieren Sie alle Checkboxen.");
      return;
    }

    setLoading(true);

    const utmSource = searchParams.get("utm_source") || null;
    const utmMedium = searchParams.get("utm_medium") || null;
    const utmCampaign = searchParams.get("utm_campaign") || null;
    const utmContent = searchParams.get("utm_content") || null;
    const utmTerm = searchParams.get("utm_term") || null;
    const source = utmMedium === "cpc" || utmSource === "google" ? "paid" : utmSource ? "referral" : "organic";

    const locationLabels: Record<string, string> = {
      augsburg: "Augsburg – Regus Viktoria Str 3b",
      eschenbach: "Eschenbach – Fit*gsund Churzhaslen 3",
      zurich: "Zürich – 5 Elements TCM, Usteristrasse 23",
    };

    const leadData = {
      name: `${firstName} ${lastName}`,
      email,
      phone: `${phoneCountry} ${phone}`.trim(),
      form_type: "session" as const,
      postal_code: postalCode,
      city,
      country: country.toUpperCase(),
      source,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      concern: "Terminbestätigung",
      notes: [
        `Adresse: ${street}, ${postalCode} ${city}`,
        dob && `Geburtsdatum: ${dob}`,
        `Sitzung: ${sessionDate} ${sessionTime}`,
        `Ort: ${locationLabels[location] || location}`,
        notes && `Notizen: ${notes}`,
      ].filter(Boolean).join(" | "),
    };

    try {
      const { error: dbError } = await supabase.from("leads").insert(leadData);
      if (dbError) {
        console.error("Lead save error:", dbError);
        toast.error(isEN ? "An error occurred. Please try again." : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
        setLoading(false);
        return;
      }

      // Notify (Slack)
      await supabase.functions.invoke("notify-lead", { body: { lead: leadData } });
    } catch (err) {
      console.error("Lead notification error:", err);
    }

    setLoading(false);
    setSubmitted(true);
    toast.success(isEN ? "Appointment confirmed! Thank you." : "Termin bestätigt! Vielen Dank.");
  };

  if (submitted) {
    return (
      <>
        <SEO {...pageSEO.appointmentConfirmation} pageKey="appointmentConfirmation" />
        <section className="bg-background py-16 md:py-24">
          <div className="container-main max-w-2xl text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {isEN ? "Appointment Confirmed!" : "Termin bestätigt!"}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {isEN
                ? "Thank you for confirming your appointment. We look forward to seeing you!"
                : "Vielen Dank für Ihre Terminbestätigung. Wir freuen uns auf Sie!"}
            </p>
            <Link to={getPath("home", language, country)}>
              <Button className="bg-cta hover:bg-cta/90 text-cta-foreground font-semibold">
                {isEN ? "Back to Home" : "Zurück zur Startseite"}
              </Button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO {...pageSEO.appointmentConfirmation} pageKey="appointmentConfirmation" />
      <section className="bg-background py-12 md:py-16">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-10">
          <CalendarCheck className="w-10 h-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Appointment Confirmation" : "Terminbestätigung"}
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <Label className="text-foreground font-semibold">
              {isEN ? "Name" : "Name"} <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Input name="firstName" placeholder={isEN ? "First Name" : "Vorname"} required />
                <p className="text-xs text-muted-foreground mt-1">{isEN ? "First Name" : "Vorname"}</p>
              </div>
              <div>
                <Input name="lastName" placeholder={isEN ? "Last Name" : "Nachname"} required />
                <p className="text-xs text-muted-foreground mt-1">{isEN ? "Last Name" : "Nachname"}</p>
              </div>
            </div>
          </div>

          {/* Address & DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Street & House Number" : "Strasse und Hausnummer"} <span className="text-destructive">*</span>
              </Label>
              <Input name="street" className="mt-2" required />
            </div>
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Date of Birth" : "Geburtsdatum"}
              </Label>
              <Input name="dob" type="date" className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {isEN ? "Optional: For health insurance" : "Optional: Für die Krankenversicherung"}
              </p>
            </div>
          </div>

          {/* ZIP & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Postal Code" : "Postleitzahl"} <span className="text-destructive">*</span>
              </Label>
              <Input name="postalCode" className="mt-2" required />
            </div>
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "City" : "Ort"} <span className="text-destructive">*</span>
              </Label>
              <Input name="city" className="mt-2" required />
            </div>
          </div>

          {/* Session date & time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Session: Date?" : "Sitzung: Datum?"} <span className="text-destructive">*</span>
              </Label>
              <Input name="sessionDate" type="date" className="mt-2" required />
            </div>
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Session: Time from – to?" : "Sitzung: Uhrzeit von bis?"} <span className="text-destructive">*</span>
              </Label>
              <Input name="sessionTime" className="mt-2" placeholder={isEN ? "e.g. 10:00 – 12:00" : "z.B. 10:00 – 12:00"} required />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label className="text-foreground font-semibold">
              {isEN ? "Location of Hypnosis Session:" : "Ort der Hypnosesitzung:"} <span className="text-destructive">*</span>
            </Label>
            <RadioGroup value={location} onValueChange={setLocation} className="mt-3 space-y-3">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="augsburg" id="loc-augsburg" className="mt-0.5" />
                <Label htmlFor="loc-augsburg" className="text-sm text-foreground font-normal cursor-pointer leading-snug">
                  Regus: Viktoria Str 3b. 2 Floor 86150 Augsburg (Am Hauptbahnhof) DE
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="eschenbach" id="loc-eschenbach" className="mt-0.5" />
                <Label htmlFor="loc-eschenbach" className="text-sm text-foreground font-normal cursor-pointer leading-snug">
                  Fit*gsund: Churzhaslen 3. 8733 Eschenbach. (Am Zürichsee) CH
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="zurich" id="loc-zurich" className="mt-0.5" />
                <Label htmlFor="loc-zurich" className="text-sm text-foreground font-normal cursor-pointer leading-snug">
                  Bei 5 Elements TCM GmbH, Beim Löwenplatz Usteristrasse 23, 8001 Zürich Schweiz 🇨🇭
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground font-semibold">
                E-Mail <span className="text-destructive">*</span>
              </Label>
              <Input name="email" type="email" className="mt-2" required />
            </div>
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Phone" : "Telefonnummer"} <span className="text-destructive">*</span>
              </Label>
              <div className="flex mt-2">
                <select
                  value={phoneCountry}
                  onChange={(e) => { setPhoneCountry(e.target.value); setPhoneNumber(""); }}
                  className="border border-r-0 border-input px-2 py-2 text-sm bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors rounded-l-md w-[110px] shrink-0 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_6px_center] pr-5 cursor-pointer"
                >
                  {PHONE_COUNTRIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.iso} {c.code}</option>
                  ))}
                </select>
                <Input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder={selectedPhoneCountry.placeholder}
                  maxLength={selectedPhoneCountry.maxDigits + 4}
                  className="rounded-l-none border-l-0"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {isEN ? `Max ${selectedPhoneCountry.maxDigits} digits` : `Max. ${selectedPhoneCountry.maxDigits} Ziffern`}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-foreground font-semibold">
              {isEN ? "Notes about the appointment" : "Stichpunkte zum Termin"}
            </Label>
            <Textarea name="notes" className="mt-2" rows={4} />
          </div>

          {/* DSGVO Consent */}
          <div className="space-y-4 border border-border rounded-lg p-4 bg-secondary/30">
            <div className="flex items-start gap-3">
              <Checkbox id="dsgvo" checked={dsgvoChecked} onCheckedChange={(v) => setDsgvoChecked(v === true)} />
              <Label htmlFor="dsgvo" className="text-sm text-foreground font-normal cursor-pointer leading-snug">
                {isEN
                  ? "I consent to this website storing my submitted information so that my inquiry can be answered."
                  : "Ich willige ein, dass diese Website meine übermittelten Informationen speichert, sodass meine Anfrage beantwortet werden kann."}{" "}
                <span className="text-destructive">*</span>
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="agb" checked={agbChecked} onCheckedChange={(v) => setAgbChecked(v === true)} />
              <Label htmlFor="agb" className="text-sm text-foreground font-normal cursor-pointer leading-snug">
                {isEN
                  ? "I accept the General Terms and Conditions"
                  : "Ich akzeptiere die Allgemeinen Geschäftsbedingungen"}{" "}
                <span className="text-destructive">*</span>
                <br />
                <Link to={getPath("terms", language, country)} className="text-primary hover:underline text-xs">
                  {isEN ? "View Terms & Conditions" : "Diese können unter david-j-woods.com/agb/ eingesehen werden"}
                </Link>
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="payment" checked={paymentChecked} onCheckedChange={(v) => setPaymentChecked(v === true)} />
              <Label htmlFor="payment" className="text-sm text-foreground font-normal cursor-pointer leading-snug">
                {isEN
                  ? "Our hypnosis sessions are paid on-site in cash."
                  : "Unsere Hypnosesitzungen werden vor Ort in bar bezahlt."}{" "}
                <span className="text-destructive">*</span>
              </Label>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-cta hover:bg-cta/90 text-cta-foreground font-semibold py-3 text-base"
          >
            {loading
              ? (isEN ? "Sending..." : "Wird gesendet...")
              : (isEN ? "Confirm Appointment" : "Termin bestätigen")}
          </Button>
        </form>
      </div>
    </section>
    </>
  );
}
