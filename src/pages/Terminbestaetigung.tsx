import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { getPath } from "@/lib/routes";
import { CalendarCheck } from "lucide-react";
import { useState } from "react";

export default function Terminbestaetigung() {
  const { language, country } = useLanguage();
  const isEN = language === "en";
  const [location, setLocation] = useState("");

  return (
    <>
      <SEO {...pageSEO.appointmentConfirmation} />
      <section className="bg-background py-12 md:py-16">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-10">
          <CalendarCheck className="w-10 h-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "Georgia, serif" }}>
            {isEN ? "Appointment Confirmation" : "Terminbestätigung"}
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Name */}
          <div>
            <Label className="text-foreground font-semibold">
              {isEN ? "Name" : "Name"} <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Input placeholder={isEN ? "First Name" : "Vorname"} required />
                <p className="text-xs text-muted-foreground mt-1">{isEN ? "First Name" : "Vorname"}</p>
              </div>
              <div>
                <Input placeholder={isEN ? "Last Name" : "Nachname"} required />
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
              <Input className="mt-2" required />
            </div>
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Date of Birth" : "Geburtsdatum"}
              </Label>
              <Input type="date" className="mt-2" />
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
              <Input className="mt-2" required />
            </div>
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "City" : "Ort"} <span className="text-destructive">*</span>
              </Label>
              <Input className="mt-2" required />
            </div>
          </div>

          {/* Session date & time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Session: Date?" : "Sitzung: Datum?"} <span className="text-destructive">*</span>
              </Label>
              <Input type="date" className="mt-2" required />
            </div>
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Session: Time from – to?" : "Sitzung: Uhrzeit von bis?"} <span className="text-destructive">*</span>
              </Label>
              <Input className="mt-2" placeholder={isEN ? "e.g. 10:00 – 12:00" : "z.B. 10:00 – 12:00"} required />
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
              <Input type="email" className="mt-2" required />
            </div>
            <div>
              <Label className="text-foreground font-semibold">
                {isEN ? "Phone Number with Area Code" : "Telefonnummer mit Vorwahl"} <span className="text-destructive">*</span>
              </Label>
              <Input type="tel" className="mt-2" required />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-foreground font-semibold">
              {isEN ? "Notes about the appointment" : "Stichpunkte zum Termin"}
            </Label>
            <Textarea className="mt-2" rows={4} />
          </div>

          {/* DSGVO Consent */}
          <div className="space-y-4 border border-border rounded-lg p-4 bg-secondary/30">
            <div className="flex items-start gap-3">
              <Checkbox id="dsgvo" required />
              <Label htmlFor="dsgvo" className="text-sm text-foreground font-normal cursor-pointer leading-snug">
                {isEN
                  ? "I consent to this website storing my submitted information so that my inquiry can be answered."
                  : "Ich willige ein, dass diese Website meine übermittelten Informationen speichert, sodass meine Anfrage beantwortet werden kann."}{" "}
                <span className="text-destructive">*</span>
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="agb" required />
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
              <Checkbox id="payment" required />
              <Label htmlFor="payment" className="text-sm text-foreground font-normal cursor-pointer leading-snug">
                {isEN
                  ? "Our hypnosis sessions are paid on-site in cash."
                  : "Unsere Hypnosesitzungen werden vor Ort in bar bezahlt."}{" "}
                <span className="text-destructive">*</span>
              </Label>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full bg-cta hover:bg-cta/90 text-cta-foreground font-semibold py-3 text-base">
            {isEN ? "Confirm Appointment" : "Termin bestätigen"}
          </Button>
        </form>
      </div>
    </section>
  );
}
