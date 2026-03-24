// Simple client-side auth for internal dashboard
// Will be upgraded to Supabase auth later

interface DashboardUser {
  email: string;
  passwordHash: string; // Simple hash for now
}

// Simple hash function (NOT production-grade - will move to server-side)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

const USERS: DashboardUser[] = [
  { email: "info@david-j-woods.com", passwordHash: simpleHash("!AZUYavG1%K1fRahJRGsZeDg") },
  { email: "contato@biamendes.com", passwordHash: simpleHash("!AZUYavG1%K1fRahJRGsZFED") },
];

export interface LoginLog {
  email: string;
  timestamp: string;
  success: boolean;
}

const SESSION_KEY = "dw_dashboard_session";
const LOGS_KEY = "dw_dashboard_logs";

export function authenticate(email: string, password: string): boolean {
  const user = USERS.find(u => u.email === email.toLowerCase().trim());
  const success = !!user && user.passwordHash === simpleHash(password);
  
  addLoginLog(email.toLowerCase().trim(), success);
  
  if (success) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email: user!.email, loginAt: new Date().toISOString() }));
  }
  
  return success;
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

function addLoginLog(email: string, success: boolean): void {
  const logs = getLoginLogs();
  logs.unshift({ email, timestamp: new Date().toISOString(), success });
  // Keep last 100 logs
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs.slice(0, 100)));
}

export function getLoginLogs(): LoginLog[] {
  try {
    return JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
  } catch {
    return [];
  }
}
