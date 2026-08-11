import {
  ApiIconEl,
  AtIconEl,
  VerifiedIconEl,
  BoltIconEl,
} from "@/components/icons";
import { TrashIcon, ShieldIcon } from "@/components/icons";

const FEATURES = [
  {
    icon: ApiIconEl,
    title: "Your own Resend key",
    description:
      "Paste your Resend API key once. It's used to call Resend directly and is never written to a database — WorkMail doesn't have one.",
  },
  {
    icon: AtIconEl,
    title: "Address suggestions as you type",
    description:
      "Start typing a prefix and WorkMail suggests noreply, support, info, sales, billing and more — matched to your verified domain.",
  },
  {
    icon: VerifiedIconEl,
    title: "Verified domains, pulled live",
    description:
      "WorkMail asks Resend which of your domains are verified and lets you pick from that list, so you're never guessing.",
  },
  {
    icon: BoltIconEl,
    title: "Built for deliverability",
    description:
      "Every send includes a plain-text version alongside HTML, and a checklist flags anything that tends to trip spam filters.",
  },
  {
    icon: TrashIcon,
    title: "Local send history",
    description:
      "Sent mail is logged in your browser only — reopen it anytime, or clear the whole history with one click.",
  },
  {
    icon: ShieldIcon,
    title: "Nothing leaves your browser at rest",
    description:
      "Your key, domain and history live in localStorage. Close the tab, clear the data, and WorkMail forgets everything.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="border-b border-line bg-surface/60">
      <div className="container py-20">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-wide text-accent">
            Features
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Everything a transactional inbox needs
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="bg-white p-6">
              <feature.icon size={22} className="text-accent" />
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
