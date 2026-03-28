import { useState, useEffect, useCallback } from "react";
import { trackFormConversion } from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, MapPin, Clock, Shield } from "lucide-react";
import { toast } from "sonner";

/* ── Seminar dates (shared with Ausbildung) ── */
const SEMINAR_DATES_CH = [
  { date: "Mo-Sa, 15.-20. Juni 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach" },
  { date: "Mo-Sa, 07.-12. Sept. 2026", location: "\"Fit+Gsund\" Churzhaslen 3, 8733 Eschenbach" },
];
const SEMINAR_DATES_DE = [
  { date: "Mo-Sa, 11.-16. Mai 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg" },
  { date: "Mo-Sa, 06.-11. Juli 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg" },
  { date: "Mo-Sa, 14.-19. Sept. 2026", location: "Das Hotel am Alten Park, Fröhlich Str. 17, Augsburg" },
];

type FormType = "session" | "seminar";

/* ── Country phone codes — sorted alphabetically by ISO 2-letter code ── */
const PHONE_COUNTRIES = [
  { code: "+93", iso: "AF", flag: "🇦🇫", name: "Afghanistan", maxDigits: 9, placeholder: "70 123 4567" },
  { code: "+355", iso: "AL", flag: "🇦🇱", name: "Albanien", maxDigits: 9, placeholder: "66 123 4567" },
  { code: "+376", iso: "AD", flag: "🇦🇩", name: "Andorra", maxDigits: 6, placeholder: "312 345" },
  { code: "+244", iso: "AO", flag: "🇦🇴", name: "Angola", maxDigits: 9, placeholder: "923 123 456" },
  { code: "+54", iso: "AR", flag: "🇦🇷", name: "Argentinien", maxDigits: 10, placeholder: "11 1234 5678" },
  { code: "+61", iso: "AU", flag: "🇦🇺", name: "Australien", maxDigits: 9, placeholder: "412 345 678" },
  { code: "+43", iso: "AT", flag: "🇦🇹", name: "Österreich", maxDigits: 10, placeholder: "664 1234567" },
  { code: "+973", iso: "BH", flag: "🇧🇭", name: "Bahrain", maxDigits: 8, placeholder: "3600 1234" },
  { code: "+880", iso: "BD", flag: "🇧🇩", name: "Bangladesch", maxDigits: 10, placeholder: "1812 345678" },
  { code: "+375", iso: "BY", flag: "🇧🇾", name: "Belarus", maxDigits: 9, placeholder: "25 123 4567" },
  { code: "+32", iso: "BE", flag: "🇧🇪", name: "Belgien", maxDigits: 9, placeholder: "470 12 34 56" },
  { code: "+591", iso: "BO", flag: "🇧🇴", name: "Bolivien", maxDigits: 8, placeholder: "7123 4567" },
  { code: "+387", iso: "BA", flag: "🇧🇦", name: "Bosnien", maxDigits: 8, placeholder: "61 234 567" },
  { code: "+55", iso: "BR", flag: "🇧🇷", name: "Brasilien", maxDigits: 11, placeholder: "11 91234 5678" },
  { code: "+359", iso: "BG", flag: "🇧🇬", name: "Bulgarien", maxDigits: 9, placeholder: "87 123 4567" },
  { code: "+237", iso: "CM", flag: "🇨🇲", name: "Kamerun", maxDigits: 9, placeholder: "671 23 45 67" },
  { code: "+56", iso: "CL", flag: "🇨🇱", name: "Chile", maxDigits: 9, placeholder: "9 1234 5678" },
  { code: "+86", iso: "CN", flag: "🇨🇳", name: "China", maxDigits: 11, placeholder: "131 2345 6789" },
  { code: "+57", iso: "CO", flag: "🇨🇴", name: "Kolumbien", maxDigits: 10, placeholder: "301 234 5678" },
  { code: "+506", iso: "CR", flag: "🇨🇷", name: "Costa Rica", maxDigits: 8, placeholder: "8312 3456" },
  { code: "+225", iso: "CI", flag: "🇨🇮", name: "Elfenbeinküste", maxDigits: 10, placeholder: "01 23 45 6789" },
  { code: "+385", iso: "HR", flag: "🇭🇷", name: "Kroatien", maxDigits: 9, placeholder: "91 234 5678" },
  { code: "+53", iso: "CU", flag: "🇨🇺", name: "Kuba", maxDigits: 8, placeholder: "5 123 4567" },
  { code: "+357", iso: "CY", flag: "🇨🇾", name: "Zypern", maxDigits: 8, placeholder: "96 123456" },
  { code: "+420", iso: "CZ", flag: "🇨🇿", name: "Tschechien", maxDigits: 9, placeholder: "601 123 456" },
  { code: "+243", iso: "CD", flag: "🇨🇩", name: "Kongo (DR)", maxDigits: 9, placeholder: "991 234 567" },
  { code: "+45", iso: "DK", flag: "🇩🇰", name: "Dänemark", maxDigits: 8, placeholder: "20 12 34 56" },
  { code: "+1809", iso: "DO", flag: "🇩🇴", name: "Dominik. Republik", maxDigits: 7, placeholder: "234 5678" },
  { code: "+593", iso: "EC", flag: "🇪🇨", name: "Ecuador", maxDigits: 9, placeholder: "99 123 4567" },
  { code: "+20", iso: "EG", flag: "🇪🇬", name: "Ägypten", maxDigits: 10, placeholder: "100 123 4567" },
  { code: "+503", iso: "SV", flag: "🇸🇻", name: "El Salvador", maxDigits: 8, placeholder: "7012 3456" },
  { code: "+372", iso: "EE", flag: "🇪🇪", name: "Estland", maxDigits: 8, placeholder: "5123 4567" },
  { code: "+251", iso: "ET", flag: "🇪🇹", name: "Äthiopien", maxDigits: 9, placeholder: "91 123 4567" },
  { code: "+679", iso: "FJ", flag: "🇫🇯", name: "Fidschi", maxDigits: 7, placeholder: "701 2345" },
  { code: "+358", iso: "FI", flag: "🇫🇮", name: "Finnland", maxDigits: 10, placeholder: "50 123 4567" },
  { code: "+33", iso: "FR", flag: "🇫🇷", name: "Frankreich", maxDigits: 9, placeholder: "6 12 34 56 78" },
  { code: "+49", iso: "DE", flag: "🇩🇪", name: "Deutschland", maxDigits: 11, placeholder: "171 1234567" },
  { code: "+233", iso: "GH", flag: "🇬🇭", name: "Ghana", maxDigits: 9, placeholder: "23 123 4567" },
  { code: "+30", iso: "GR", flag: "🇬🇷", name: "Griechenland", maxDigits: 10, placeholder: "691 234 5678" },
  { code: "+502", iso: "GT", flag: "🇬🇹", name: "Guatemala", maxDigits: 8, placeholder: "5123 4567" },
  { code: "+509", iso: "HT", flag: "🇭🇹", name: "Haiti", maxDigits: 8, placeholder: "34 12 3456" },
  { code: "+504", iso: "HN", flag: "🇭🇳", name: "Honduras", maxDigits: 8, placeholder: "9123 4567" },
  { code: "+852", iso: "HK", flag: "🇭🇰", name: "Hongkong", maxDigits: 8, placeholder: "5123 4567" },
  { code: "+36", iso: "HU", flag: "🇭🇺", name: "Ungarn", maxDigits: 9, placeholder: "20 123 4567" },
  { code: "+354", iso: "IS", flag: "🇮🇸", name: "Island", maxDigits: 7, placeholder: "611 1234" },
  { code: "+91", iso: "IN", flag: "🇮🇳", name: "Indien", maxDigits: 10, placeholder: "91234 56789" },
  { code: "+62", iso: "ID", flag: "🇮🇩", name: "Indonesien", maxDigits: 11, placeholder: "812 345 6789" },
  { code: "+98", iso: "IR", flag: "🇮🇷", name: "Iran", maxDigits: 10, placeholder: "912 345 6789" },
  { code: "+964", iso: "IQ", flag: "🇮🇶", name: "Irak", maxDigits: 10, placeholder: "790 123 4567" },
  { code: "+353", iso: "IE", flag: "🇮🇪", name: "Irland", maxDigits: 9, placeholder: "85 123 4567" },
  { code: "+972", iso: "IL", flag: "🇮🇱", name: "Israel", maxDigits: 9, placeholder: "50 123 4567" },
  { code: "+39", iso: "IT", flag: "🇮🇹", name: "Italien", maxDigits: 10, placeholder: "312 345 6789" },
  { code: "+1876", iso: "JM", flag: "🇯🇲", name: "Jamaika", maxDigits: 7, placeholder: "210 1234" },
  { code: "+81", iso: "JP", flag: "🇯🇵", name: "Japan", maxDigits: 10, placeholder: "90 1234 5678" },
  { code: "+962", iso: "JO", flag: "🇯🇴", name: "Jordanien", maxDigits: 9, placeholder: "79 123 4567" },
  { code: "+855", iso: "KH", flag: "🇰🇭", name: "Kambodscha", maxDigits: 9, placeholder: "91 234 567" },
  { code: "+254", iso: "KE", flag: "🇰🇪", name: "Kenia", maxDigits: 9, placeholder: "712 345678" },
  { code: "+383", iso: "XK", flag: "🇽🇰", name: "Kosovo", maxDigits: 8, placeholder: "44 123 456" },
  { code: "+965", iso: "KW", flag: "🇰🇼", name: "Kuwait", maxDigits: 8, placeholder: "500 12345" },
  { code: "+996", iso: "KG", flag: "🇰🇬", name: "Kirgisistan", maxDigits: 9, placeholder: "700 123 456" },
  { code: "+856", iso: "LA", flag: "🇱🇦", name: "Laos", maxDigits: 10, placeholder: "20 12 345 678" },
  { code: "+371", iso: "LV", flag: "🇱🇻", name: "Lettland", maxDigits: 8, placeholder: "21 234 567" },
  { code: "+961", iso: "LB", flag: "🇱🇧", name: "Libanon", maxDigits: 8, placeholder: "71 123 456" },
  { code: "+218", iso: "LY", flag: "🇱🇾", name: "Libyen", maxDigits: 9, placeholder: "91 234 5678" },
  { code: "+423", iso: "LI", flag: "🇱🇮", name: "Liechtenstein", maxDigits: 7, placeholder: "660 1234" },
  { code: "+370", iso: "LT", flag: "🇱🇹", name: "Litauen", maxDigits: 8, placeholder: "612 34567" },
  { code: "+352", iso: "LU", flag: "🇱🇺", name: "Luxemburg", maxDigits: 9, placeholder: "621 123 456" },
  { code: "+389", iso: "MK", flag: "🇲🇰", name: "Nordmazedonien", maxDigits: 8, placeholder: "70 123 456" },
  { code: "+60", iso: "MY", flag: "🇲🇾", name: "Malaysia", maxDigits: 10, placeholder: "12 345 6789" },
  { code: "+356", iso: "MT", flag: "🇲🇹", name: "Malta", maxDigits: 8, placeholder: "7912 3456" },
  { code: "+52", iso: "MX", flag: "🇲🇽", name: "Mexiko", maxDigits: 10, placeholder: "55 1234 5678" },
  { code: "+373", iso: "MD", flag: "🇲🇩", name: "Moldawien", maxDigits: 8, placeholder: "621 12 345" },
  { code: "+377", iso: "MC", flag: "🇲🇨", name: "Monaco", maxDigits: 8, placeholder: "6 12 34 56" },
  { code: "+976", iso: "MN", flag: "🇲🇳", name: "Mongolei", maxDigits: 8, placeholder: "8812 3456" },
  { code: "+382", iso: "ME", flag: "🇲🇪", name: "Montenegro", maxDigits: 8, placeholder: "67 123 456" },
  { code: "+212", iso: "MA", flag: "🇲🇦", name: "Marokko", maxDigits: 9, placeholder: "612 345678" },
  { code: "+258", iso: "MZ", flag: "🇲🇿", name: "Mosambik", maxDigits: 9, placeholder: "82 123 4567" },
  { code: "+95", iso: "MM", flag: "🇲🇲", name: "Myanmar", maxDigits: 9, placeholder: "9 1234 5678" },
  { code: "+977", iso: "NP", flag: "🇳🇵", name: "Nepal", maxDigits: 10, placeholder: "984 123 4567" },
  { code: "+31", iso: "NL", flag: "🇳🇱", name: "Niederlande", maxDigits: 9, placeholder: "6 12345678" },
  { code: "+64", iso: "NZ", flag: "🇳🇿", name: "Neuseeland", maxDigits: 9, placeholder: "21 123 4567" },
  { code: "+505", iso: "NI", flag: "🇳🇮", name: "Nicaragua", maxDigits: 8, placeholder: "8123 4567" },
  { code: "+234", iso: "NG", flag: "🇳🇬", name: "Nigeria", maxDigits: 10, placeholder: "802 123 4567" },
  { code: "+47", iso: "NO", flag: "🇳🇴", name: "Norwegen", maxDigits: 8, placeholder: "412 34 567" },
  { code: "+968", iso: "OM", flag: "🇴🇲", name: "Oman", maxDigits: 8, placeholder: "9212 3456" },
  { code: "+92", iso: "PK", flag: "🇵🇰", name: "Pakistan", maxDigits: 10, placeholder: "301 234 5678" },
  { code: "+507", iso: "PA", flag: "🇵🇦", name: "Panama", maxDigits: 8, placeholder: "6123 4567" },
  { code: "+595", iso: "PY", flag: "🇵🇾", name: "Paraguay", maxDigits: 9, placeholder: "961 123456" },
  { code: "+51", iso: "PE", flag: "🇵🇪", name: "Peru", maxDigits: 9, placeholder: "912 345 678" },
  { code: "+63", iso: "PH", flag: "🇵🇭", name: "Philippinen", maxDigits: 10, placeholder: "917 123 4567" },
  { code: "+48", iso: "PL", flag: "🇵🇱", name: "Polen", maxDigits: 9, placeholder: "512 345 678" },
  { code: "+351", iso: "PT", flag: "🇵🇹", name: "Portugal", maxDigits: 9, placeholder: "912 345 678" },
  { code: "+974", iso: "QA", flag: "🇶🇦", name: "Katar", maxDigits: 8, placeholder: "3312 3456" },
  { code: "+40", iso: "RO", flag: "🇷🇴", name: "Rumänien", maxDigits: 9, placeholder: "721 123 456" },
  { code: "+7", iso: "RU", flag: "🇷🇺", name: "Russland", maxDigits: 10, placeholder: "912 345 6789" },
  { code: "+250", iso: "RW", flag: "🇷🇼", name: "Ruanda", maxDigits: 9, placeholder: "78 123 4567" },
  { code: "+378", iso: "SM", flag: "🇸🇲", name: "San Marino", maxDigits: 10, placeholder: "66 12 34 567" },
  { code: "+966", iso: "SA", flag: "🇸🇦", name: "Saudi-Arabien", maxDigits: 9, placeholder: "50 123 4567" },
  { code: "+221", iso: "SN", flag: "🇸🇳", name: "Senegal", maxDigits: 9, placeholder: "70 123 45 67" },
  { code: "+381", iso: "RS", flag: "🇷🇸", name: "Serbien", maxDigits: 9, placeholder: "60 123 4567" },
  { code: "+65", iso: "SG", flag: "🇸🇬", name: "Singapur", maxDigits: 8, placeholder: "9123 4567" },
  { code: "+421", iso: "SK", flag: "🇸🇰", name: "Slowakei", maxDigits: 9, placeholder: "901 123 456" },
  { code: "+386", iso: "SI", flag: "🇸🇮", name: "Slowenien", maxDigits: 8, placeholder: "31 234 567" },
  { code: "+27", iso: "ZA", flag: "🇿🇦", name: "Südafrika", maxDigits: 9, placeholder: "71 123 4567" },
  { code: "+82", iso: "KR", flag: "🇰🇷", name: "Südkorea", maxDigits: 10, placeholder: "10 1234 5678" },
  { code: "+34", iso: "ES", flag: "🇪🇸", name: "Spanien", maxDigits: 9, placeholder: "612 345 678" },
  { code: "+94", iso: "LK", flag: "🇱🇰", name: "Sri Lanka", maxDigits: 9, placeholder: "71 234 5678" },
  { code: "+249", iso: "SD", flag: "🇸🇩", name: "Sudan", maxDigits: 9, placeholder: "91 123 4567" },
  { code: "+46", iso: "SE", flag: "🇸🇪", name: "Schweden", maxDigits: 9, placeholder: "70 123 45 67" },
  { code: "+41", iso: "CH", flag: "🇨🇭", name: "Schweiz", maxDigits: 9, placeholder: "79 123 45 67" },
  { code: "+886", iso: "TW", flag: "🇹🇼", name: "Taiwan", maxDigits: 9, placeholder: "912 345 678" },
  { code: "+992", iso: "TJ", flag: "🇹🇯", name: "Tadschikistan", maxDigits: 9, placeholder: "91 123 4567" },
  { code: "+255", iso: "TZ", flag: "🇹🇿", name: "Tansania", maxDigits: 9, placeholder: "621 234 567" },
  { code: "+66", iso: "TH", flag: "🇹🇭", name: "Thailand", maxDigits: 9, placeholder: "81 234 5678" },
  { code: "+1868", iso: "TT", flag: "🇹🇹", name: "Trinidad & Tobago", maxDigits: 7, placeholder: "291 1234" },
  { code: "+216", iso: "TN", flag: "🇹🇳", name: "Tunesien", maxDigits: 8, placeholder: "20 123 456" },
  { code: "+90", iso: "TR", flag: "🇹🇷", name: "Türkei", maxDigits: 10, placeholder: "501 234 5678" },
  { code: "+993", iso: "TM", flag: "🇹🇲", name: "Turkmenistan", maxDigits: 8, placeholder: "65 12 3456" },
  { code: "+256", iso: "UG", flag: "🇺🇬", name: "Uganda", maxDigits: 9, placeholder: "712 345678" },
  { code: "+380", iso: "UA", flag: "🇺🇦", name: "Ukraine", maxDigits: 9, placeholder: "50 123 4567" },
  { code: "+971", iso: "AE", flag: "🇦🇪", name: "VAE", maxDigits: 9, placeholder: "50 123 4567" },
  { code: "+44", iso: "GB", flag: "🇬🇧", name: "Großbritannien", maxDigits: 10, placeholder: "7911 123456" },
  { code: "+1", iso: "US", flag: "🇺🇸", name: "USA / Kanada", maxDigits: 10, placeholder: "202 555 0123" },
  { code: "+598", iso: "UY", flag: "🇺🇾", name: "Uruguay", maxDigits: 8, placeholder: "94 123 456" },
  { code: "+998", iso: "UZ", flag: "🇺🇿", name: "Usbekistan", maxDigits: 9, placeholder: "91 123 4567" },
  { code: "+58", iso: "VE", flag: "🇻🇪", name: "Venezuela", maxDigits: 10, placeholder: "412 123 4567" },
  { code: "+84", iso: "VN", flag: "🇻🇳", name: "Vietnam", maxDigits: 9, placeholder: "91 234 56 78" },
  { code: "+260", iso: "ZM", flag: "🇿🇲", name: "Sambia", maxDigits: 9, placeholder: "95 512 3456" },
  { code: "+263", iso: "ZW", flag: "🇿🇼", name: "Simbabwe", maxDigits: 9, placeholder: "71 234 5678" },
  { code: "+213", iso: "DZ", flag: "🇩🇿", name: "Algerien", maxDigits: 9, placeholder: "551 23 45 67" },
].sort((a, b) => a.iso.localeCompare(b.iso));

export default function Erstgespraech() {
  const { language, country, t, isSwiss, isInternational, showCH, showDE } = useLanguage();
  const isEN = language === "en";
  const isDE = language === "de";
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [formType, setFormType] = useState<FormType>(
    searchParams.get("type") === "seminar" ? "seminar" : "session"
  );
  const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "");
  const [selectedConcern, setSelectedConcern] = useState(searchParams.get("concern") || "");

  // Phone country code — CH pre-selected for Swiss site, DE for German site
  const defaultPhoneCountry = country === "ch" ? "+41" : "+49";
  const [phoneCountry, setPhoneCountry] = useState(defaultPhoneCountry);
  const [phoneNumber, setPhoneNumber] = useState("");

  const selectedPhoneCountry = PHONE_COUNTRIES.find(c => c.code === phoneCountry) || PHONE_COUNTRIES[0];

  const handlePhoneChange = useCallback((value: string) => {
    // Only allow digits and spaces
    const cleaned = value.replace(/[^\d\s]/g, "");
    const digitsOnly = cleaned.replace(/\s/g, "");
    if (digitsOnly.length <= selectedPhoneCountry.maxDigits) {
      setPhoneNumber(cleaned);
    }
  }, [selectedPhoneCountry.maxDigits]);

  useEffect(() => {
    if (searchParams.get("type") === "seminar") {
      setFormType("seminar");
      if (searchParams.get("date")) setSelectedDate(searchParams.get("date") || "");
    }
  }, [searchParams]);

  const allDates = [
    ...(showCH ? SEMINAR_DATES_CH : []),
    ...(showDE ? SEMINAR_DATES_DE : []),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      toast.error(isEN ? "Please accept the privacy policy to continue." : "Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.");
      return;
    }

    // Collect form data from the form elements
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const postalCity = (formData.get("postalCode") as string) || "";
    const message = (formData.get("message") as string) || "";
    const bestTime = (formData.get("bestTime") as string) || "";
    const location = (formData.get("location") as string) || "";
    const seminarCountry = (formData.get("seminarCountry") as string) || "";

    // Extract UTM params from URL
    const utmSource = searchParams.get("utm_source") || null;
    const utmMedium = searchParams.get("utm_medium") || null;
    const utmCampaign = searchParams.get("utm_campaign") || null;
    const utmContent = searchParams.get("utm_content") || null;
    const utmTerm = searchParams.get("utm_term") || null;

    const source = utmMedium === "cpc" || utmSource === "google" ? "paid" : utmSource ? "referral" : "organic";

    const leadData = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone: `${phoneCountry} ${phoneNumber}`.trim(),
      concern: formType === "session" ? selectedConcern : "seminar",
      form_type: formType,
      postal_code: postalCity.split(/\s+/)[0] || null,
      city: postalCity.split(/\s+/).slice(1).join(" ") || (formType === "seminar" ? seminarCountry : location) || null,
      country: country.toUpperCase(),
      source,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      notes: [bestTime && `Best time: ${bestTime}`, message].filter(Boolean).join(" | ") || null,
    };

    try {
      // Save to database
      const { error: dbError } = await supabase.from("leads").insert(leadData);
      if (dbError) console.error("Lead save error:", dbError);

      // Notify (email + Slack)
      await supabase.functions.invoke("notify-lead", { body: { lead: leadData } });
    } catch (err) {
      console.error("Lead notification error:", err);
    }

    trackFormConversion(formType, formType === "seminar" ? selectedDate : undefined);
    setSubmitted(true);
    toast.success(isEN ? "Thank you! We will contact you shortly." : "Vielen Dank! Wir melden uns in Kürze bei Ihnen.");
  };

  const inputClasses = "w-full border border-border px-3 py-2.5 text-sm bg-white focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors";

  const basePath = getPath("home", language, country);

  return (
    <>
      <SEO {...pageSEO.contact} pageKey="contact" />
      <Breadcrumbs items={[
        { name: "Home", path: basePath },
        { name: isEN ? "Free Discovery Call" : "Erstgespräch", path: getPath("contact", language, country) },
      ]} />

      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Info */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-4">
                {formType === "seminar"
                  ? (isEN ? "Register for Seminar" : "Seminar-Anmeldung")
                  : (isEN ? "Book Your Free Discovery Call" : "Kostenloses Erstgespräch vereinbaren")}
              </h1>
              <p className="text-base text-foreground leading-relaxed mb-6">
                {formType === "seminar"
                  ? (isEN
                    ? "Register for the Aktiv-Hypnose© training seminar. We will confirm your spot and send you all details."
                    : "Melden Sie sich für das Aktiv-Hypnose© Ausbildungsseminar an. Wir bestätigen Ihren Platz und senden Ihnen alle Details.")
                  : (isEN
                    ? "Do you have questions or would you like to learn more about our method? Book a free and non-binding discovery call now. We take time for you and advise you individually."
                    : "Haben Sie Fragen oder möchten Sie mehr über unsere Methode erfahren? Vereinbaren Sie jetzt ein kostenloses und unverbindliches Erstgespräch. Wir nehmen uns Zeit für Sie und beraten Sie individuell.")}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" /><span>{isEN ? "Free and non-binding" : "Kostenlos und unverbindlich"}</span></div>
                <div className="flex items-center gap-3 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" /><span>{isEN ? "Personal consultation" : "Persönliche Beratung"}</span></div>
                <div className="flex items-center gap-3 text-sm"><CheckCircle className="w-4 h-4 text-[#2E7D32] shrink-0" /><span>{isEN ? "Over 40 years of experience" : "Über 40 Jahre Erfahrung"}</span></div>
                <div className="flex items-center gap-3 text-sm"><Clock className="w-4 h-4 text-[#2E7D32] shrink-0" /><span>{isEN ? "Response within 24 hours" : "Antwort innerhalb von 24 Stunden"}</span></div>
              </div>

              {/* Contact Info Card */}
              <div className="border border-border p-4 bg-[#f4f3ef] space-y-3">
                <h3 className="font-semibold text-sm text-[#1B3A5C]">{isEN ? "Direct Contact" : "Direkter Kontakt"}</h3>
                {showCH && (
                  <a href="tel:+41791318878" className="flex items-center gap-2 text-sm hover:text-[#1B3A5C] transition-colors">
                    <Phone className="w-4 h-4 text-[#1B3A5C]" /> +41 79 131 88 78
                  </a>
                )}
                {showDE && (
                  <a href="tel:+491719539922" className="flex items-center gap-2 text-sm hover:text-[#1B3A5C] transition-colors">
                    <Phone className="w-4 h-4 text-[#1B3A5C]" /> +49 171 9539922
                  </a>
                )}
                {showCH && (
                  <>
                    {isInternational && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">🇨🇭 {isDE ? "Schweiz" : "Switzerland"}</p>}
                    <a href="https://maps.google.com/?q=5+Elements+TCM+GmbH,+Usteristrasse+23,+8001+Zürich" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm hover:text-[#2E7D32] transition-colors">
                      <MapPin className="w-4 h-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                      5 Elements TCM GmbH, Beim Löwenplatz, Usteristrasse 23, 8001 Zürich
                    </a>
                    <a href="https://maps.google.com/?q=Fit+und+Gesund+Center,+Churzhaslen+3,+8733+Eschenbach" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm hover:text-[#2E7D32] transition-colors">
                      <MapPin className="w-4 h-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                      Fit+Gsund, Churzhaslen 3, 8733 Eschenbach (am Zürichsee)
                    </a>
                  </>
                )}
                {showDE && (
                  <>
                    {isInternational && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">🇩🇪 {isDE ? "Deutschland" : "Germany"}</p>}
                    <a href="https://maps.google.com/?q=Regus,+Viktoria+Str.+3b,+86150+Augsburg" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm hover:text-[#2E7D32] transition-colors">
                      <MapPin className="w-4 h-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                      {isDE ? "Sitzungen" : "Sessions"}: Regus, Viktoria Str. 3b, 2. OG, 86150 Augsburg
                    </a>
                    <a href="https://maps.google.com/?q=Hotel+am+Alten+Park,+Fröhlich+Str.+17,+86150+Augsburg" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm hover:text-[#2E7D32] transition-colors">
                      <MapPin className="w-4 h-4 text-[#1B3A5C] mt-0.5 shrink-0" />
                      {isDE ? "Seminare" : "Seminars"}: Hotel am Alten Park, Fröhlich Str. 17, 86150 Augsburg
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Right — Form */}
            <div className="border border-border p-5 sm:p-6 bg-[#f4f3ef]">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-[#2E7D32] mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-[#1B3A5C] mb-2">{isEN ? "Thank You!" : "Vielen Dank!"}</h2>
                  <p className="text-muted-foreground">{isEN ? "We will contact you shortly." : "Wir melden uns in Kürze bei Ihnen."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-lg font-bold text-[#1B3A5C] mb-2">{isEN ? "Contact Form" : "Kontaktformular"}</h2>

                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "First Name" : "Vorname"} *</label>
                      <input type="text" name="firstName" required autoComplete="given-name" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Last Name" : "Nachname"} *</label>
                      <input type="text" name="lastName" required autoComplete="family-name" className={inputClasses} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">E-Mail *</label>
                    <input type="email" name="email" required autoComplete="email" className={inputClasses} />
                  </div>

                  {/* Phone + PLZ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Phone" : "Telefonnummer"} *</label>
                      <div className="flex">
                        <select
                          value={phoneCountry}
                          onChange={(e) => { setPhoneCountry(e.target.value); setPhoneNumber(""); }}
                          className="border border-r-0 border-border px-2 py-2.5 text-sm bg-white focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C] outline-none transition-colors rounded-none w-[100px] shrink-0"
                        >
                          {PHONE_COUNTRIES.map(c => (
                            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder={selectedPhoneCountry.placeholder}
                          maxLength={selectedPhoneCountry.maxDigits + 4}
                          className={`${inputClasses} border-l-0`}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {isEN ? `Max ${selectedPhoneCountry.maxDigits} digits` : `Max. ${selectedPhoneCountry.maxDigits} Ziffern`}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Postal Code / City" : "PLZ / Ortschaft"}</label>
                      <input type="text" name="postalCode" autoComplete="postal-code" className={inputClasses} />
                    </div>
                  </div>

                  {/* ── Type Toggle: Session vs Seminar ── */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">
                      {isEN ? "What are you interested in?" : "Wofür interessieren Sie sich?"} *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormType("session")}
                        className={`px-4 py-2.5 text-sm font-medium border transition-colors ${
                          formType === "session"
                            ? "bg-[#1B3A5C] text-white border-[#1B3A5C]"
                            : "bg-white text-foreground border-border hover:border-[#1B3A5C]"
                        }`}
                      >
                        {isEN ? "Therapy Session" : "Therapie-Sitzung"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormType("seminar")}
                        className={`px-4 py-2.5 text-sm font-medium border transition-colors ${
                          formType === "seminar"
                            ? "bg-[#1B3A5C] text-white border-[#1B3A5C]"
                            : "bg-white text-foreground border-border hover:border-[#1B3A5C]"
                        }`}
                      >
                        {isEN ? "Seminar / Training" : "Seminar / Ausbildung"}
                      </button>
                    </div>
                  </div>

                  {/* ── Conditional Fields ── */}
                  {formType === "session" ? (
                    <>
                      {/* Topic / Service Selection */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "What is your concern?" : "Was ist Ihr Anliegen?"} *</label>
                        <select required className={inputClasses} value={selectedConcern} onChange={(e) => setSelectedConcern(e.target.value)}>
                          <option value="">{isEN ? "Please select..." : "Bitte wählen..."}</option>
                          <option value="smoking">{isEN ? "Stop Smoking" : "Raucherentwöhnung"}</option>
                          <option value="anxiety">{isEN ? "Anxiety & Phobias" : "Ängste & Phobien"}</option>
                          <option value="weight">{isEN ? "Weight Loss" : "Abnehmen"}</option>
                          <option value="stress">{isEN ? "Stress & Burnout" : "Stress & Burnout"}</option>
                          <option value="depression">{isEN ? "Depression & Trauma" : "Depressionen & Traumata"}</option>
                          <option value="children">{isEN ? "Children & Teens" : "Kinder & Jugendliche"}</option>
                          <option value="corporate">{isEN ? "Corporate Coaching" : "Firmencoaching"}</option>
                          <option value="other">{isEN ? "Other" : "Sonstiges"}</option>
                        </select>
                      </div>

                      {/* Preferred Location */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Preferred Location" : "Bevorzugter Standort"}</label>
                        <select name="location" className={inputClasses}>
                          <option value="">{isEN ? "Please select..." : "Bitte wählen..."}</option>
                          <option value="zurich">Zürich — 5 Elements TCM (CH)</option>
                          <option value="eschenbach">Eschenbach — Fit und Gesund (CH)</option>
                          <option value="augsburg">Augsburg — Regus HELIO (DE)</option>
                          <option value="online">{isEN ? "Online Session" : "Online-Sitzung"}</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Country / Location */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          {isEN ? "Country" : "Land"} *
                        </label>
                        <select
                          name="seminarCountry"
                          required
                          className={inputClasses}
                        >
                          <option value="">{isEN ? "Please select..." : "Bitte wählen..."}</option>
                          <option value="ch">🇨🇭 {isEN ? "Switzerland" : "Schweiz"}</option>
                          <option value="de">🇩🇪 {isEN ? "Germany" : "Deutschland"}</option>
                          <option value="at">🇦🇹 {isEN ? "Austria" : "Österreich"}</option>
                          <option value="other">{isEN ? "Other" : "Anderes Land"}</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Best time to reach */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Best time to reach you?" : "Wann sind Sie am besten erreichbar?"}</label>
                    <input type="text" name="bestTime" placeholder={isEN ? "e.g. mornings, after 14:00" : "z.B. vormittags, nach 14:00 Uhr"} className={inputClasses} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">{isEN ? "Message" : "Kommentar oder Nachricht"}</label>
                    <textarea name="message" rows={4} className={`${inputClasses} resize-none`} />
                  </div>

                  {/* ── DSGVO / GDPR Opt-in Toggle ── */}
                  <div className="border border-border bg-white p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={gdprConsent}
                          onClick={() => setGdprConsent(!gdprConsent)}
                          className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${gdprConsent ? "bg-[#2E7D32] border-[#2E7D32]" : "bg-white border-border hover:border-[#1B3A5C]"}`}
                        >
                          {gdprConsent && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div>
                        <p className="text-xs text-foreground leading-relaxed">
                          {isEN ? (
                            <>
                              I agree that my personal data will be processed for the purpose of contacting me. I have read and accept the{" "}
                              <Link to={getPath("privacy", language, country)} className="text-[#1B3A5C] underline hover:text-[#2E7D32]">privacy policy</Link>. *
                            </>
                          ) : (
                            <>
                              Ich bin damit einverstanden, dass meine personenbezogenen Daten zum Zweck der Kontaktaufnahme verarbeitet werden. Ich habe die{" "}
                              <Link to={getPath("privacy", language, country)} className="text-[#1B3A5C] underline hover:text-[#2E7D32]">Datenschutzerklärung</Link> gelesen und akzeptiere diese. *
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-3.5 h-3.5 text-[#2E7D32]" />
                      {isEN ? "Your data is processed in accordance with GDPR." : "Ihre Daten werden DSGVO-konform verarbeitet."}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!gdprConsent}
                    className={`w-full font-semibold py-3 text-white transition-colors ${gdprConsent ? "bg-[#2E7D32] hover:bg-[#1B5E20]" : "bg-gray-400 cursor-not-allowed"}`}
                  >
                    {formType === "seminar"
                      ? (isEN ? "Register for Seminar" : "Seminar-Anmeldung absenden")
                      : (isEN ? "Send Request" : "Absenden")}
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center">
                    {isEN
                      ? "Your data will only be used to process your request. We will not share your data with third parties."
                      : "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Wir geben Ihre Daten nicht an Dritte weiter."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
