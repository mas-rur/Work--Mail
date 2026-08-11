"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { settingsStore, historyStore } from "@/lib/storage";
import { FromAddressSelect } from "@/components/from-address-select";
import { RichTextEditor, type RichTextEditorHandle } from "@/components/rich-text-editor";
import { DeliverabilityTips } from "@/components/deliverability-tips";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertIconEl, SendIcon } from "@/components/icons";

export function ComposeForm({
  domains,
  defaultDomain,
  hasApiKey,
  onGoToSettings,
}: {
  domains: string[];
  defaultDomain: string;
  hasApiKey: boolean;
  onGoToSettings: () => void;
}) {
  const [prefix, setPrefix] = useState("noreply");
  const [domain, setDomain] = useState(defaultDomain);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [sending, setSending] = useState(false);

  // `defaultDomain` arrives from a localStorage read in the parent, which
  // resolves a tick after mount — pick it up once it does, but don't
  // clobber anything the person has already typed.
  useEffect(() => {
    if (defaultDomain && !domain) setDomain(defaultDomain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDomain]);

  const editorRef = useRef<RichTextEditorHandle>(null);

  const from = `${prefix}@${domain || "yourdomain.com"}`;
  const domainVerified = domains.includes(domain);
  const subjectTooShoutyOrSpammy = useMemo(() => {
    if (!subject) return false;
    const caps = subject.replace(/[^A-Z]/g, "").length;
    const letters = subject.replace(/[^A-Za-z]/g, "").length;
    const shouty = letters > 4 && caps / letters > 0.7;
    const punchy = /!{2,}|\$\$|FREE|WIN NOW/i.test(subject);
    return shouty || punchy;
  }, [subject]);

  const reset = () => {
    setTo("");
    setSubject("");
    setReplyTo("");
    setBodyHtml("");
    setBodyText("");
    editorRef.current?.clear();
  };

  const handleSend = async () => {
    const apiKey = settingsStore.getApiKey();
    if (!apiKey) {
      toast.error("Add your Resend API key in Settings first");
      onGoToSettings();
      return;
    }
    if (!domain) {
      toast.error("Enter a sending domain");
      return;
    }
    if (!to.trim()) {
      toast.error("Add a recipient");
      return;
    }
    if (!subject.trim()) {
      toast.error("Add a subject line");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          from,
          to: to.trim(),
          subject,
          html: bodyHtml,
          text: bodyText,
          replyTo: replyTo.trim() || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        historyStore.add({
          id: crypto.randomUUID(),
          from,
          to: to.trim(),
          subject,
          html: bodyHtml,
          text: bodyText,
          status: "failed",
          error: data.error || "Send failed",
          sentAt: new Date().toISOString(),
        });
        toast.error(data.error || "Resend couldn't send that email");
        return;
      }

      historyStore.add({
        id: data.id || crypto.randomUUID(),
        from,
        to: to.trim(),
        subject,
        html: bodyHtml,
        text: bodyText,
        status: "sent",
        sentAt: new Date().toISOString(),
      });
      toast.success("Email sent");
      reset();
    } catch {
      toast.error("Network error — the email was not sent");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        {!hasApiKey && (
          <button
            onClick={onGoToSettings}
            className="flex w-full items-center gap-2.5 rounded-md border border-warn/40 bg-warn-soft px-3.5 py-2.5 text-left text-sm text-warn transition-colors hover:bg-warn/10"
          >
            <AlertIconEl size={16} />
            Add your Resend API key in Settings before sending.
          </button>
        )}

        <div id="tour-from">
          <FromAddressSelect
            prefix={prefix}
            domain={domain}
            domains={domains}
            onPrefixChange={setPrefix}
            onDomainChange={setDomain}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="customer@example.com"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="reply-to">Reply-To (optional)</Label>
            <Input
              id="reply-to"
              type="email"
              value={replyTo}
              onChange={(e) => setReplyTo(e.target.value)}
              placeholder="team@yourdomain.com"
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Your order has shipped"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label>Message</Label>
          <div className="mt-1.5" id="tour-editor">
            <RichTextEditor
              ref={editorRef}
              onChange={(html, text) => {
                setBodyHtml(html);
                setBodyText(text);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-4">
          <p className="text-xs text-ink-faint">
            Sends through your own Resend account.
          </p>
          <Button id="tour-send" size="lg" onClick={handleSend} disabled={sending}>
            <SendIcon size={16} />
            {sending ? "Sending…" : "Send email"}
          </Button>
        </div>
      </div>

      <DeliverabilityTips
        domainVerified={domainVerified}
        hasSubject={subject.trim().length > 0}
        subjectTooShoutyOrSpammy={subjectTooShoutyOrSpammy}
        hasPlainText={bodyText.trim().length > 0}
        hasReplyContent={bodyText.trim().length > 10}
      />
    </div>
  );
}
