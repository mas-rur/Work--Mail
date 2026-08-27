"use client";

import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { checkClientCompatibility } from "@/lib/email-compat";
import { CheckIcon, AlertIconEl } from "@/components/icons";
import { cn } from "@/lib/utils";

function ClientFrame({
  chrome,
  children,
}: {
  chrome: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
      {chrome}
      <div className="h-[360px] overflow-hidden bg-white">{children}</div>
    </div>
  );
}

function PreviewFrame({ html }: { html: string }) {
  return (
    <iframe
      title="Email preview"
      srcDoc={html || "<p style='font-family:sans-serif;color:#9AA0AC;padding:16px;'>Nothing to preview yet — write a message first.</p>"}
      sandbox=""
      className="h-full w-full"
    />
  );
}

export function ClientPreviewDialog({
  open,
  onOpenChange,
  html,
  subject,
  from,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  html: string;
  subject: string;
  from: string;
}) {
  const notes = useMemo(() => checkClientCompatibility(html), [html]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preview across clients</DialogTitle>
          <DialogDescription>
            Your HTML rendered in this browser, framed to resemble each
            client's layout — not each client's real rendering engine. For
            exact-pixel testing, send yourself a test email too.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="gmail">
          <TabsList>
            <TabsTrigger value="gmail">Gmail</TabsTrigger>
            <TabsTrigger value="outlook">Outlook</TabsTrigger>
            <TabsTrigger value="apple">Apple Mail</TabsTrigger>
          </TabsList>

          <TabsContent value="gmail">
            <ClientFrame
              chrome={
                <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-xs font-semibold text-accent">
                    {(from[0] || "?").toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {subject || "(no subject)"}
                    </p>
                    <p className="truncate text-xs text-ink-faint">{from}</p>
                  </div>
                </div>
              }
            >
              <PreviewFrame html={html} />
            </ClientFrame>
          </TabsContent>

          <TabsContent value="outlook">
            <ClientFrame
              chrome={
                <div className="border-b border-line bg-surface px-4 py-3">
                  <p className="truncate text-sm font-semibold text-ink">
                    {subject || "(no subject)"}
                  </p>
                  <p className="truncate text-xs text-ink-faint">From: {from}</p>
                </div>
              }
            >
              <PreviewFrame html={html} />
            </ClientFrame>
          </TabsContent>

          <TabsContent value="apple">
            <ClientFrame
              chrome={
                <div className="border-b border-line bg-white px-4 py-2.5">
                  <div className="mb-2 flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-stamp/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                  </div>
                  <p className="truncate text-sm font-medium text-ink">
                    {subject || "(no subject)"}
                  </p>
                  <p className="truncate text-xs text-ink-faint">{from}</p>
                </div>
              }
            >
              <PreviewFrame html={html} />
            </ClientFrame>
          </TabsContent>
        </Tabs>

        <div className="rounded-lg border border-line bg-surface/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
            Outlook compatibility notes
          </p>
          <ul className="mt-3 space-y-2">
            {notes.map((n) => (
              <li key={n.label} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                    n.ok ? "bg-success-soft text-success" : "bg-warn-soft text-warn"
                  )}
                >
                  {n.ok ? <CheckIcon size={11} strokeWidth={2.2} /> : <AlertIconEl size={11} />}
                </span>
                <span className="text-xs leading-relaxed text-ink-muted">
                  <span className="font-medium text-ink">{n.label}.</span> {n.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
