import { supabase } from "@/integrations/supabase/client";

export interface LoginLog {
  email: string;
  timestamp: string;
  success: boolean;
}

const SESSION_KEY = "dw_dashboard_session";

export async function authenticate(email: string, password: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke("dashboard-auth", {
      body: { email, password },
    });

    const success = !error && data?.success === true;

    if (success) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        email: data.email,
        token: data.token,
        loginAt: new Date().toISOString(),
      }));
    }

    return success;
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  return !!sessionStorage.getItem(SESSION_KEY);
}

export function getCurrentUser(): string | null {
  const session = sessionStorage.getItem(SESSION_KEY);
  if (!session) return null;
  return JSON.parse(session).email;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getLoginLogs(): LoginLog[] {
  return [];
}
