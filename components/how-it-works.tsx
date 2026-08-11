const STEPS = [
  {
    n: "01",
    title: "Connect your Resend key",
    description:
      "Paste the API key from your Resend dashboard. WorkMail calls Resend's domains endpoint to pull in every domain you've already verified.",
  },
  {
    n: "02",
    title: "Pick an address and write",
    description:
      "Choose a prefix — noreply, support, info, or your own — pair it with a verified domain, and write in the built-in editor.",
  },
  {
    n: "03",
    title: "Send, straight through Resend",
    description:
      "WorkMail relays the request to Resend's API using your key. The message is logged to your local history and lands in the inbox.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line">
      <div className="container py-20">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-wide text-accent">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Three steps, every time
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <span className="font-display text-4xl font-semibold text-line">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
