import { supabase } from "@/integrations/supabase/client";

/** Track a pageview on a service page (fire-and-forget) */
export function trackPageView(pagePath: string) {
  supabase
    .from("page_views")
    .insert({ page_path: pagePath, user_agent: navigator.userAgent })
    .then(() => {});
}

/** Track a CTA click heading to consultation/erstgespraech */
export function trackCtaClick(pagePath: string, destination: string) {
  supabase
    .from("cta_clicks")
    .insert({ page_path: pagePath, destination, user_agent: navigator.userAgent })
    .then(() => {});
}
