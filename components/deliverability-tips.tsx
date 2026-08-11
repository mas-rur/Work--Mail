import { cn } from "@/lib/utils";
import { CheckIcon, AlertIconEl } from "@/components/icons";

type Check = {
  label: string;
  ok: boolean;
  detail: string;
};

export function DeliverabilityTips({
  domainVerified,
  hasSubject,
  subjectTooShoutyOrSpammy,
  hasPlainText,
  hasReplyContent,
}: {
  domainVerified: boolean;
  hasSubject: boolean;
  subjectTooShoutyOrSpammy: boolean;
  hasPlainText: boolean;
  hasReplyContent: boolean;
}) {
  const checks: Check[] = [
    {
      label: "Sending domain is verified in Resend",
      ok: domainVerified,
      detail: domainVerified
        ? "SPF and DKIM are set up for this domain."
        : "Unverified domains are far more likely to land in spam.",
    },
    {
      label: "Subject line looks clean",
      ok: hasSubject && !subjectTooShoutyOrSpammy,
      detail: !hasSubject
        ? "Add a subject line."
        : subjectTooShoutyOrSpammy
        ? "ALL CAPS or excess punctuation (!!!) can trigger filters."
        : "No obvious spam triggers detected.",
    },
    {
      label: "Plain-text version included",
      ok: hasPlainText,
      detail: hasPlainText
        ? "Sending HTML with a text fallback, as most inboxes expect."
        : "Write a message body so a plain-text version can be generated.",
    },
    {
      label: "Message has real content",
      ok: hasReplyContent,
      detail: hasReplyContent
        ? "Body isn't empty or link-only."
        : "Very short or link-only emails are more likely to be flagged.",
    },
  ];

  return (
    <div className="rounded-lg border border-line bg-surface/60 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
        Deliverability checklist
      </p>
      <ul className="mt-3 space-y-2.5">
        {checks.map((c) => (
          <li key={c.label} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                c.ok ? "bg-success-soft text-success" : "bg-warn-soft text-warn"
              )}
            >
              {c.ok ? <CheckIcon size={11} strokeWidth={2.2} /> : <AlertIconEl size={11} />}
            </span>
            <span className="text-xs leading-relaxed text-ink-muted">
              <span className="font-medium text-ink">{c.label}.</span>{" "}
              {c.detail}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
        This is guidance, not a guarantee — final inbox placement also
        depends on your sending reputation and each recipient's filters.
      </p>
    </div>
  );
}
