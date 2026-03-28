import type { Language, Country } from "@/contexts/LanguageContext";

type PageKey =
  | "home" | "smoking" | "anxiety" | "weight" | "stress"
  | "depression" | "children" | "adults" | "training" | "seminarSchedule" | "corporate"
  | "corporateErfolg" | "corporateResilienz" | "corporateStress" | "corporateNichtraucher"
  | "about" | "testimonials" | "successStories" | "media"
  | "contact" | "appointmentConfirmation" | "cityZurich" | "cityAugsburg" | "locations"
  | "impressum" | "privacy" | "terms" | "blog" | "book";

const slugMapDE: Record<PageKey, string> = {
  home: "",
  smoking: "raucherentwoehnung",
  anxiety: "aengste-phobien",
  weight: "abnehmen",
  stress: "stress-burnout",
  depression: "depressionen-traumata",
  children: "kinder-jugendliche",
  adults: "erwachsene",
  training: "ausbildung",
  seminarSchedule: "seminar-ablauf",
  corporate: "firmen-coaching",
  corporateErfolg: "firmen-coaching/erfolgs-training",
  corporateResilienz: "firmen-coaching/resilienz-verstaerken",
  corporateStress: "firmen-coaching/stress-praevention",
  corporateNichtraucher: "firmen-coaching/nichtraucher-seminare",
  about: "ueber-uns",
  testimonials: "kundenmeinungen",
  successStories: "erfolgsberichte",
  media: "tv-medien",
  contact: "erstgespraech",
  appointmentConfirmation: "terminbestaetigung",
  cityZurich: "hypnose-zuerich",
  cityAugsburg: "hypnose-augsburg",
  locations: "standorte",
  impressum: "impressum",
  privacy: "datenschutz",
  terms: "agb",
  blog: "blog",
  book: "buch-go-inside",
};

const slugMapEN: Record<PageKey, string> = {
  home: "",
  smoking: "stop-smoking",
  anxiety: "anxiety-phobias",
  weight: "weight-loss",
  stress: "stress-burnout",
  depression: "depression-trauma",
  children: "children-teens",
  adults: "adults",
  training: "training",
  seminarSchedule: "seminar-schedule",
  corporate: "business-coaching",
  corporateErfolg: "business-coaching/success-training",
  corporateResilienz: "business-coaching/resilience-building",
  corporateStress: "business-coaching/stress-prevention",
  corporateNichtraucher: "business-coaching/non-smoker-seminars",
  about: "about-us",
  testimonials: "testimonials",
  successStories: "success-stories",
  media: "tv-media",
  contact: "consultation",
  appointmentConfirmation: "appointment-confirmation",
  cityZurich: "hypnosis-zurich",
  cityAugsburg: "hypnosis-augsburg",
  locations: "locations",
  impressum: "imprint",
  privacy: "privacy-policy",
  terms: "terms",
  blog: "blog",
  book: "book-go-inside",
};

export function getPath(page: PageKey, language: Language, country: Country): string {
  const slugMap = language === "en" ? slugMapEN : slugMapDE;
  const slug = slugMap[page];
  return `/${language}/${country}${slug ? `/${slug}` : ""}`;
}
