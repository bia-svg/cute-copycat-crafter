import type { Language, Country } from "@/contexts/LanguageContext";

type PageKey =
  | "home" | "smoking" | "anxiety" | "weight" | "stress"
  | "depression" | "children" | "training" | "seminarSchedule" | "corporate"
  | "about" | "testimonials" | "successStories" | "media"
  | "contact" | "appointmentConfirmation" | "cityZurich" | "cityAugsburg" | "locations"
  | "impressum" | "privacy" | "terms" | "blog";

const slugMap: Record<PageKey, string> = {
  home: "",
  smoking: "raucherentwoehnung",
  anxiety: "aengste-phobien",
  weight: "abnehmen",
  stress: "stress-burnout",
  depression: "depressionen-traumata",
  children: "kinder-jugendliche",
  training: "ausbildung",
  seminarSchedule: "seminar-ablauf",
  corporate: "firmen-coaching",
  about: "ueber-uns",
  testimonials: "kundenmeinungen",
  successStories: "erfolgsberichte",
  media: "tv-medien",
  contact: "erstgespraech",
  cityZurich: "hypnose-zuerich",
  cityAugsburg: "hypnose-augsburg",
  locations: "standorte",
  impressum: "impressum",
  privacy: "datenschutz",
  terms: "agb",
  blog: "blog",
};

export function getPath(page: PageKey, language: Language, country: Country): string {
  const slug = slugMap[page];
  return `/${language}/${country}${slug ? `/${slug}` : ""}`;
}
