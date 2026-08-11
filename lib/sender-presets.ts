export type SenderPreset = {
  prefix: string;
  label: string;
  hint: string;
};

// Shown as suggestions under the From field, ranked roughly by how often
// they're used. Users can still type any prefix they want.
export const SENDER_PRESETS: SenderPreset[] = [
  { prefix: "noreply", label: "No-Reply", hint: "One-way, automated mail" },
  { prefix: "support", label: "Support", hint: "Customer support replies" },
  { prefix: "info", label: "Info", hint: "General inquiries" },
  { prefix: "hello", label: "Hello", hint: "Friendly, general-purpose" },
  { prefix: "contact", label: "Contact", hint: "Contact-form replies" },
  { prefix: "sales", label: "Sales", hint: "Leads and quotes" },
  { prefix: "billing", label: "Billing", hint: "Invoices and receipts" },
  { prefix: "admin", label: "Admin", hint: "Account and admin notices" },
  { prefix: "team", label: "Team", hint: "Updates from the team" },
  { prefix: "help", label: "Help", hint: "Help-desk messages" },
  { prefix: "news", label: "News", hint: "Newsletters and announcements" },
  { prefix: "alerts", label: "Alerts", hint: "System and status alerts" },
];

export function filterPresets(query: string): SenderPreset[] {
  const q = query.trim().toLowerCase();
  if (!q) return SENDER_PRESETS;
  return SENDER_PRESETS.filter(
    (p) =>
      p.prefix.includes(q) ||
      p.label.toLowerCase().includes(q) ||
      p.hint.toLowerCase().includes(q)
  );
}
