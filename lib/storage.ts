// Everything in this file talks to window.localStorage only.
// WorkMail never sends the API key or sent-mail history anywhere except
// the one /api/send request needed to relay a message through Resend.

export type SentEmail = {
  id: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  status: "sent" | "failed";
  error?: string;
  sentAt: string; // ISO timestamp
};

export type WorkMailSettings = {
  apiKey: string;
  domain: string;
  verifiedDomains: string[];
};

const KEYS = {
  apiKey: "workmail:api-key",
  domain: "workmail:domain",
  verifiedDomains: "workmail:verified-domains",
  history: "workmail:sent-history",
  tourSeen: "workmail:tour-seen",
  testEmail: "workmail:test-email",
} as const;

function isBrowser() {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable — fail silently, sending still works.
  }
}

export const settingsStore = {
  getApiKey: () => read<string>(KEYS.apiKey, ""),
  setApiKey: (key: string) => write(KEYS.apiKey, key),
  clearApiKey: () => window.localStorage.removeItem(KEYS.apiKey),

  getDomain: () => read<string>(KEYS.domain, ""),
  setDomain: (domain: string) => write(KEYS.domain, domain),

  getVerifiedDomains: () => read<string[]>(KEYS.verifiedDomains, []),
  setVerifiedDomains: (domains: string[]) =>
    write(KEYS.verifiedDomains, domains),

  getTestEmail: () => read<string>(KEYS.testEmail, ""),
  setTestEmail: (email: string) => write(KEYS.testEmail, email),

  hasApiKey: () => read<string>(KEYS.apiKey, "").length > 0,
};

export const historyStore = {
  getAll: (): SentEmail[] => read<SentEmail[]>(KEYS.history, []),

  add: (entry: SentEmail) => {
    const current = historyStore.getAll();
    write(KEYS.history, [entry, ...current].slice(0, 200));
  },

  remove: (id: string) => {
    const current = historyStore.getAll();
    write(
      KEYS.history,
      current.filter((e) => e.id !== id)
    );
  },

  clear: () => {
    if (!isBrowser()) return;
    window.localStorage.removeItem(KEYS.history);
  },
};

export const tourStore = {
  hasSeenTour: () => read<boolean>(KEYS.tourSeen, false),
  markSeen: () => write(KEYS.tourSeen, true),
};

export function clearAllLocalData() {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
}
