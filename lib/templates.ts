export type TemplateVariable = {
  key: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
};

export type EmailTemplate = {
  id: string;
  name: string;
  category: string;
  description: string;
  subject: string;
  html: string;
  variables: TemplateVariable[];
};

const wrap = (inner: string) => `
<div style="max-width:480px;margin:0 auto;padding:32px 28px;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#12141A;">
${inner}
<p style="margin-top:32px;padding-top:20px;border-top:1px solid #E7E7E2;font-size:12px;color:#9AA0AC;">
Sent by {{company_name}} — {{company_url}}
</p>
</div>`.trim();

const button = (label: string, url: string) => `
<a href="${url}" style="display:inline-block;margin-top:20px;padding:11px 22px;background:#2A3EFF;color:#FFFFFF;font-size:14px;font-weight:600;text-decoration:none;border-radius:6px;">${label}</a>`;

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Welcome email",
    category: "Onboarding",
    description: "Greet a new user right after signup.",
    subject: "Welcome to {{product_name}}, {{name}}!",
    html: wrap(`
<h2 style="margin:0 0 12px;font-size:20px;">Welcome aboard, {{name}} 👋</h2>
<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#4B5160;">
Thanks for signing up for {{product_name}}. We're glad you're here — here's how to get started.
</p>
${button("Get started", "{{cta_url}}")}
    `),
    variables: [
      { key: "name", label: "Recipient name", placeholder: "Alex" },
      { key: "product_name", label: "Product name", placeholder: "Acme" },
      { key: "cta_url", label: "Get started link", placeholder: "https://app.acme.com/onboarding" },
      { key: "company_name", label: "Company name", placeholder: "Acme Inc." },
      { key: "company_url", label: "Company URL", placeholder: "acme.com" },
    ],
  },
  {
    id: "otp",
    name: "OTP / verification code",
    category: "Security",
    description: "One-time code for login or verification.",
    subject: "Your verification code: {{otp_code}}",
    html: wrap(`
<h2 style="margin:0 0 12px;font-size:20px;">Verify it's you</h2>
<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4B5160;">
Hi {{name}}, use this code to finish signing in:
</p>
<div style="text-align:center;padding:18px;background:#F6F6F3;border-radius:8px;">
  <span style="font-family:'IBM Plex Mono',monospace;font-size:28px;font-weight:600;letter-spacing:6px;color:#12141A;">{{otp_code}}</span>
</div>
<p style="margin:16px 0 0;font-size:12px;color:#9AA0AC;">
This code expires in {{expires_in}}. If you didn't request this, you can ignore this email.
</p>
    `),
    variables: [
      { key: "name", label: "Recipient name", placeholder: "Alex" },
      { key: "otp_code", label: "Code", placeholder: "482913" },
      { key: "expires_in", label: "Expires in", placeholder: "10 minutes" },
      { key: "company_name", label: "Company name", placeholder: "Acme Inc." },
      { key: "company_url", label: "Company URL", placeholder: "acme.com" },
    ],
  },
  {
    id: "invoice",
    name: "Invoice",
    category: "Billing",
    description: "Notify a customer that a new invoice is ready.",
    subject: "Invoice {{invoice_number}} from {{company_name}}",
    html: wrap(`
<h2 style="margin:0 0 12px;font-size:20px;">Invoice ${"{{invoice_number}}"}</h2>
<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4B5160;">
Hi {{name}}, your invoice is ready.
</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
  <tr><td style="padding:8px 0;color:#6B7280;">Amount due</td><td style="padding:8px 0;text-align:right;font-weight:600;">{{amount}}</td></tr>
  <tr style="border-top:1px solid #E7E7E2;"><td style="padding:8px 0;color:#6B7280;">Due date</td><td style="padding:8px 0;text-align:right;">{{due_date}}</td></tr>
</table>
${button("View invoice", "{{invoice_url}}")}
    `),
    variables: [
      { key: "name", label: "Recipient name", placeholder: "Alex" },
      { key: "invoice_number", label: "Invoice number", placeholder: "INV-1042" },
      { key: "amount", label: "Amount", placeholder: "$49.00" },
      { key: "due_date", label: "Due date", placeholder: "Sep 10, 2026" },
      { key: "invoice_url", label: "Invoice link", placeholder: "https://acme.com/invoices/1042" },
      { key: "company_name", label: "Company name", placeholder: "Acme Inc." },
      { key: "company_url", label: "Company URL", placeholder: "acme.com" },
    ],
  },
  {
    id: "password-reset",
    name: "Password reset",
    category: "Security",
    description: "Let a user reset a forgotten password.",
    subject: "Reset your password",
    html: wrap(`
<h2 style="margin:0 0 12px;font-size:20px;">Reset your password</h2>
<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#4B5160;">
Hi {{name}}, we got a request to reset your password. Click below to choose a new one.
</p>
${button("Reset password", "{{reset_url}}")}
<p style="margin:16px 0 0;font-size:12px;color:#9AA0AC;">
This link expires in {{expires_in}}. If you didn't request this, your password is still safe — just ignore this email.
</p>
    `),
    variables: [
      { key: "name", label: "Recipient name", placeholder: "Alex" },
      { key: "reset_url", label: "Reset link", placeholder: "https://acme.com/reset/abc123" },
      { key: "expires_in", label: "Expires in", placeholder: "1 hour" },
      { key: "company_name", label: "Company name", placeholder: "Acme Inc." },
      { key: "company_url", label: "Company URL", placeholder: "acme.com" },
    ],
  },
  {
    id: "payment-confirmation",
    name: "Payment confirmation",
    category: "Billing",
    description: "Confirm a successful payment or order.",
    subject: "Payment confirmed — {{order_id}}",
    html: wrap(`
<h2 style="margin:0 0 12px;font-size:20px;">Payment confirmed ✅</h2>
<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4B5160;">
Thanks, {{name}} — we've received your payment.
</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
  <tr><td style="padding:8px 0;color:#6B7280;">Order</td><td style="padding:8px 0;text-align:right;">{{order_id}}</td></tr>
  <tr style="border-top:1px solid #E7E7E2;"><td style="padding:8px 0;color:#6B7280;">Amount</td><td style="padding:8px 0;text-align:right;font-weight:600;">{{amount}}</td></tr>
  <tr style="border-top:1px solid #E7E7E2;"><td style="padding:8px 0;color:#6B7280;">Date</td><td style="padding:8px 0;text-align:right;">{{date}}</td></tr>
</table>
    `),
    variables: [
      { key: "name", label: "Recipient name", placeholder: "Alex" },
      { key: "order_id", label: "Order ID", placeholder: "ORD-88291" },
      { key: "amount", label: "Amount", placeholder: "$49.00" },
      { key: "date", label: "Date", placeholder: "Aug 26, 2026" },
      { key: "company_name", label: "Company name", placeholder: "Acme Inc." },
      { key: "company_url", label: "Company URL", placeholder: "acme.com" },
    ],
  },
  {
    id: "contact-form",
    name: "Contact form submission",
    category: "Internal",
    description: "Notify your team when someone submits a contact form.",
    subject: "New contact form submission from {{sender_name}}",
    html: wrap(`
<h2 style="margin:0 0 12px;font-size:20px;">New message from your site</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px;">
  <tr><td style="padding:6px 12px 6px 0;color:#6B7280;white-space:nowrap;">From</td><td style="padding:6px 0;">{{sender_name}} ({{sender_email}})</td></tr>
</table>
<p style="margin:0;padding:14px;background:#F6F6F3;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap;">{{message}}</p>
    `),
    variables: [
      { key: "sender_name", label: "Sender name", placeholder: "Jamie Lee" },
      { key: "sender_email", label: "Sender email", placeholder: "jamie@example.com" },
      { key: "message", label: "Message", placeholder: "Hi, I had a question about..." },
      { key: "company_name", label: "Company name", placeholder: "Acme Inc." },
      { key: "company_url", label: "Company URL", placeholder: "acme.com" },
    ],
  },
  {
    id: "developer-notification",
    name: "Developer notification",
    category: "Internal",
    description: "Alert your team about a system event.",
    subject: "[{{severity}}] {{event_name}}",
    html: wrap(`
<h2 style="margin:0 0 12px;font-size:20px;">{{event_name}}</h2>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:14px;">
  <tr><td style="padding:6px 12px 6px 0;color:#6B7280;white-space:nowrap;">Severity</td><td style="padding:6px 0;font-weight:600;">{{severity}}</td></tr>
  <tr style="border-top:1px solid #E7E7E2;"><td style="padding:6px 12px 6px 0;color:#6B7280;white-space:nowrap;">Time</td><td style="padding:6px 0;">{{timestamp}}</td></tr>
</table>
<pre style="margin:0;padding:14px;background:#12141A;color:#E7E7E2;border-radius:8px;font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;white-space:pre-wrap;">{{details}}</pre>
    `),
    variables: [
      { key: "event_name", label: "Event name", placeholder: "Deploy failed" },
      { key: "severity", label: "Severity", placeholder: "Critical" },
      { key: "timestamp", label: "Timestamp", placeholder: "2026-08-26 14:32 UTC" },
      { key: "details", label: "Details", placeholder: "Build #482 failed at step: migrate" },
      { key: "company_name", label: "Company name", placeholder: "Acme Inc." },
      { key: "company_url", label: "Company URL", placeholder: "acme.com" },
    ],
  },
];

export function applyVariables(template: string, values: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? `{{${key}}}`);
}
