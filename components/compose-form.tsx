"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { settingsStore, historyStore } from "@/lib/storage";
import { FromAddressSelect } from "@/components/from-address-select";
import { RichTextEditor, type RichTextEditorHandle } from "@/components/rich-text-editor";
import { DeliverabilityTips } from "@/components/deliverability-tips";
import { ClientPreviewDialog } from "@/components/compose/client-preview-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertIconEl, SendIcon, EyeIcon, RefreshIcon } from "@/components/icons";

export type TemplateSeed = { subject: string; html: string; seq: number };

export function ComposeForm({
  domains,
  defaultDomain,
  hasApiKey,
  templateSeed,
  onGoToSettings,
}: {
  domains: string[];
  defaultDomain: string;
  hasApiKey: boolean;
  templateSeed?: TemplateSeed | null;
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
  const [sendingTest, setSendingTest] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // `defaultDomain` arrives from a localStorage read in the parent, which
  // resolves a tick after mount — pick it up once it does, but don't
  // clobber anything the person has already typed.
  useEffect(() => {
    if (defaultDomain && !domain) setDomain(defaultDomain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDomain]);

  useEffect(() => {
    setTestEmail(settingsStore.getTestEmail());
  }, []);

  const editorRef = useRef<RichTextEditorHandle>(null);

  // Applying a template writes straight into the (largely uncontrolled)
  // rich text editor via its imperative handle, then syncs local state.
  useEffect(() => {
    if (!templateSeed) return;
    setSubject(templateSeed.subject);
    editorRef.current?.setHtml(templateSeed.html);
    setBodyHtml(editorRef.current?.getHtml() ?? templateSeed.html);
    setBodyText(editorRef.current?.getText() ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateSeed?.seq]);

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

  const doSend = async (overrideTo: string, subjectPrefix = "") => {
    const apiKey = settingsStore.getApiKey();
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey,
        from,
        to: overrideTo,
        subject: `${subjectPrefix}${subject}`,
        html: bodyHtml,
        text: bodyText,
        replyTo: replyTo.trim() || undefined,
      }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
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
      const { ok, data } = await doSend(to.trim());

      if (!ok) {
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

  const handleSendTest = async () => {
    const apiKey = settingsStore.getApiKey();
    if (!apiKey) {
      toast.error("Add your Resend API key in Settings first");
      onGoToSettings();
      return;
    }
    if (!testEmail.trim()) {
      toast.error("Add your test email in Settings first");
      onGoToSettings();
      return;
    }
    if (!domain) {
      toast.error("Enter a sending domain");
      return;
    }

    setSendingTest(true);
    try {
      const { ok, data } = await doSend(testEmail.trim(), "[Test] ");
      if (!ok) {
        toast.error(data.error || "Test send failed");
        return;
      }
      toast.success(`Test sent to ${testEmail.trim()}`);
    } catch {
      toast.error("Network error — the test email was not sent");
    } finally {
      setSendingTest(false);
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

        <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPreviewOpen(true)}
            >
              <EyeIcon size={14} />
              Preview
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSendTest}
              disabled={sendingTest}
            >
              {sendingTest ? (
                <RefreshIcon size={14} className="animate-spin" />
              ) : (
                <SendIcon size={14} />
              )}
              {sendingTest ? "Sending…" : "Send test to myself"}
            </Button>
          </div>
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

      <ClientPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        html={bodyHtml}
        subject={subject}
        from={from}
      />
    </div>
  );
}
