"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { settingsStore } from "@/lib/storage";
import { SNIPPET_LANGUAGES, maskKey } from "@/lib/code-snippets";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CopyIcon, CheckIcon, SendIcon, RefreshIcon, AlertIconEl, EyeIcon, EyeOffIcon } from "@/components/icons";

export function ApiPlayground() {
  const [apiKey, setApiKey] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("user@example.com");
  const [subject, setSubject] = useState("Hello from WorkMail");
  const [html, setHtml] = useState("<p>Hello! This is a test email.</p>");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [revealKey, setRevealKey] = useState(false);

  useEffect(() => {
    setApiKey(settingsStore.getApiKey());
    const domain = settingsStore.getDomain();
    setFrom(domain ? `hello@${domain}` : "hello@yourdomain.com");
  }, []);

  const params = useMemo(
    () => ({
      apiKey: revealKey ? apiKey : maskKey(apiKey),
      from,
      to,
      subject,
      html,
    }),
    [apiKey, from, to, subject, html, revealKey]
  );

  // Copying should always paste usable code, even while the on-screen
  // version is masked for screen-share safety.
  const realParams = useMemo(
    () => ({ apiKey, from, to, subject, html }),
    [apiKey, from, to, subject, html]
  );

  const copy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
    } catch {
      toast.error("Couldn't copy — select and copy manually");
    }
  };

  const sendRequest = async () => {
    if (!apiKey) {
      toast.error("Add your Resend API key in Settings first");
      return;
    }
    if (!from || !to || !subject) {
      toast.error("From, To and Subject are required");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, from, to, subject, html, text: "" }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Request failed");
        return;
      }
      toast.success("Sent — check the recipient inbox");
    } catch {
      toast.error("Network error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
            Request
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="pg-from">From</Label>
              <Input
                id="pg-from"
                className="mt-1.5 font-mono"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="hello@yourdomain.com"
              />
            </div>
            <div>
              <Label htmlFor="pg-to">To</Label>
              <Input
                id="pg-to"
                className="mt-1.5 font-mono"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="pg-subject">Subject</Label>
            <Input
              id="pg-subject"
              className="mt-1.5"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pg-html">HTML body</Label>
            <Textarea
              id="pg-html"
              className="mt-1.5 min-h-[160px] font-mono text-xs"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div className="flex items-center justify-between border-t border-line pt-4">
            <p className="flex items-start gap-1.5 text-xs text-ink-faint">
              <AlertIconEl size={13} className="mt-0.5 shrink-0" />
              Sending here uses your saved key, same as Compose.
            </p>
            <Button onClick={sendRequest} disabled={sending}>
              {sending ? (
                <RefreshIcon size={15} className="animate-spin" />
              ) : (
                <SendIcon size={15} />
              )}
              {sending ? "Sending…" : "Send this request"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
              Equivalent code
            </p>
            <button
              type="button"
              onClick={() => setRevealKey((r) => !r)}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-faint hover:text-ink"
            >
              {revealKey ? <EyeOffIcon size={13} /> : <EyeIcon size={13} />}
              {revealKey ? "Hide API key" : "Reveal API key"}
            </button>
          </div>
          {!revealKey && (
            <p className="mb-4 flex items-start gap-1.5 text-xs text-ink-faint">
              <AlertIconEl size={13} className="mt-0.5 shrink-0" />
              Your key is hidden on screen — safe to share this view. Copy
              still pastes the real, working code.
            </p>
          )}
          <Tabs defaultValue="curl">
            <TabsList className="flex-wrap">
              {SNIPPET_LANGUAGES.map((l) => (
                <TabsTrigger key={l.id} value={l.id}>
                  {l.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {SNIPPET_LANGUAGES.map((l) => {
              const displayCode = l.generate(params);
              const realCode = l.generate(realParams);
              return (
                <TabsContent key={l.id} value={l.id} className="mt-4">
                  <div className="relative">
                    <pre className="max-h-[360px] overflow-auto rounded-md bg-ink px-4 py-3.5 font-mono text-[12.5px] leading-relaxed text-white/90">
                      {displayCode}
                    </pre>
                    <button
                      onClick={() => copy(l.id, realCode)}
                      className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                      aria-label="Copy code"
                    >
                      {copiedId === l.id ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                    </button>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
