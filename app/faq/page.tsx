import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SUPPORT_EMAIL } from "@/lib/site";
import { ChevronDownIcon } from "@/components/icons";

export const metadata = {
  title: "FAQ — WorkMail",
  description: "Answers to common questions about WorkMail.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is WorkMail?",
    a: (
      <p>
        WorkMail is a compose window for your own Resend account. You bring
        your own Resend API key, pick a sending address on your verified
        domain, write the email, and send — the request goes straight
        through your key to Resend. WorkMail isn't an email provider itself.
      </p>
    ),
  },
  {
    q: "Do I need a Resend account?",
    a: (
      <p>
        Yes. WorkMail sends every email through{" "}
        <a href="https://resend.com" target="_blank" rel="noreferrer">
          Resend
        </a>
        , using your own API key. If you don't have a Resend account yet,
        you'll need to create one and verify a sending domain before you can
        send from WorkMail.
      </p>
    ),
  },
  {
    q: "Is my API key safe?",
    a: (
      <p>
        Your key is stored only in your browser's local storage. When you
        send an email or sync your domains, WorkMail's server relays that
        one request to Resend using your key and does not log, cache, or
        store it anywhere. See the{" "}
        <a href="/privacy">Privacy Policy</a> for details.
      </p>
    ),
  },
  {
    q: "Which sending addresses can I use?",
    a: (
      <p>
        Any prefix on a domain you've verified in Resend —{" "}
        <span className="font-mono">noreply@</span>,{" "}
        <span className="font-mono">support@</span>,{" "}
        <span className="font-mono">info@</span>, or a custom prefix you
        type yourself. WorkMail suggests common ones as you type, but
        doesn't restrict you to that list.
      </p>
    ),
  },
  {
    q: "How do I verify a domain?",
    a: (
      <p>
        Domain verification happens in Resend, not in WorkMail — add and
        verify your domain from your Resend dashboard, then use{" "}
        <span className="font-mono">Sync domains from Resend</span> in
        WorkMail's Settings tab to pull it in.
      </p>
    ),
  },
  {
    q: "Will my emails land in the inbox instead of spam?",
    a: (
      <p>
        WorkMail's compose form flags things it can actually check — domain
        verification, a plain-text version, subject lines that look clean —
        but no tool can guarantee inbox placement. That also depends on your
        domain's sending reputation and each recipient's own filters.
      </p>
    ),
  },
  {
    q: "Does WorkMail cost anything?",
    a: (
      <p>
        WorkMail itself doesn't charge for sending. You're using your own
        Resend account, so any costs are whatever Resend's pricing applies
        to your usage — check{" "}
        <a href="https://resend.com/pricing" target="_blank" rel="noreferrer">
          Resend's pricing
        </a>{" "}
        directly.
      </p>
    ),
  },
  {
    q: "Where is my sent history stored?",
    a: (
      <p>
        In your browser's local storage, nothing else. You can delete
        individual entries from the History tab, or clear everything at
        once from Settings.
      </p>
    ),
  },
  {
    q: "What happens if I clear my browser data?",
    a: (
      <p>
        Your saved API key, domain, and sent history all disappear —
        they're not backed up anywhere else. You'll need to paste your key
        in again next time.
      </p>
    ),
  },
  {
    q: "Is WorkMail affiliated with Resend?",
    a: <p>No. WorkMail is an independent tool built on top of Resend's API.</p>,
  },
  {
    q: "How do I get help?",
    a: (
      <p>
        Email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we'll get
        back to you.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-16">
        <span className="font-mono text-xs uppercase tracking-wide text-accent">
          Support
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Can't find what you're looking for? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent underline underline-offset-2">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>

        <div className="mt-8 divide-y divide-line rounded-lg border border-line bg-white">
          {FAQS.map((item) => (
            <details key={item.q} className="group px-5 py-4 open:pb-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink">
                {item.q}
                <ChevronDownIcon
                  size={16}
                  className="shrink-0 text-ink-faint transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
