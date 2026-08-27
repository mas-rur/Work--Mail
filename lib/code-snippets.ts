export type SnippetParams = {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
};

const PLACEHOLDER_KEY = "re_xxxxxxxxxxxxxxxxxxxxxxxx";

function key(apiKey: string) {
  return apiKey.trim() || PLACEHOLDER_KEY;
}

export function maskKey(apiKey: string) {
  const trimmed = apiKey.trim();
  if (!trimmed) return PLACEHOLDER_KEY;
  if (trimmed.length <= 10) return "*".repeat(trimmed.length);
  return `${trimmed.slice(0, 6)}${"*".repeat(Math.max(trimmed.length - 10, 4))}${trimmed.slice(-4)}`;
}

function shellSingleQuoteEscape(value: string) {
  return value.replace(/'/g, `'\\''`);
}

function phpSingleQuoteEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

export function curlSnippet(p: SnippetParams) {
  const body = JSON.stringify(
    { from: p.from, to: p.to, subject: p.subject, html: p.html },
    null,
    2
  );
  return `curl -X POST https://api.resend.com/emails \\
  -H "Authorization: Bearer ${key(p.apiKey)}" \\
  -H "Content-Type: application/json" \\
  -d '${shellSingleQuoteEscape(body)}'`;
}

export function javascriptSnippet(p: SnippetParams) {
  return `const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: "Bearer ${key(p.apiKey)}",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: ${JSON.stringify(p.from)},
    to: ${JSON.stringify(p.to)},
    subject: ${JSON.stringify(p.subject)},
    html: ${JSON.stringify(p.html)},
  }),
});

const data = await response.json();`;
}

export function pythonSnippet(p: SnippetParams) {
  return `import requests

response = requests.post(
    "https://api.resend.com/emails",
    headers={
        "Authorization": "Bearer ${key(p.apiKey)}",
        "Content-Type": "application/json",
    },
    json={
        "from": ${JSON.stringify(p.from)},
        "to": ${JSON.stringify(p.to)},
        "subject": ${JSON.stringify(p.subject)},
        "html": ${JSON.stringify(p.html)},
    },
)

print(response.json())`;
}

export function phpSnippet(p: SnippetParams) {
  return `<?php
$payload = [
    'from' => '${phpSingleQuoteEscape(p.from)}',
    'to' => '${phpSingleQuoteEscape(p.to)}',
    'subject' => '${phpSingleQuoteEscape(p.subject)}',
    'html' => '${phpSingleQuoteEscape(p.html)}',
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ${phpSingleQuoteEscape(key(p.apiKey))}',
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;`;
}

export function nodeSnippet(p: SnippetParams) {
  return `import { Resend } from "resend";

const resend = new Resend("${key(p.apiKey)}");

await resend.emails.send({
  from: ${JSON.stringify(p.from)},
  to: ${JSON.stringify(p.to)},
  subject: ${JSON.stringify(p.subject)},
  html: ${JSON.stringify(p.html)},
});`;
}

export function reactSnippet(p: SnippetParams) {
  return `// Never call Resend directly from browser code — your API key would
// be visible to anyone. Post to your own backend route instead, and send
// from there (see the Node.js tab for that part).

async function sendEmail() {
  await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: ${JSON.stringify(p.from)},
      to: ${JSON.stringify(p.to)},
      subject: ${JSON.stringify(p.subject)},
      html: ${JSON.stringify(p.html)},
    }),
  });
}`;
}

export const SNIPPET_LANGUAGES = [
  { id: "curl", label: "cURL", generate: curlSnippet, lang: "bash" },
  { id: "javascript", label: "JavaScript", generate: javascriptSnippet, lang: "javascript" },
  { id: "python", label: "Python", generate: pythonSnippet, lang: "python" },
  { id: "php", label: "PHP", generate: phpSnippet, lang: "php" },
  { id: "node", label: "Node.js", generate: nodeSnippet, lang: "javascript" },
  { id: "react", label: "React", generate: reactSnippet, lang: "jsx" },
] as const;
