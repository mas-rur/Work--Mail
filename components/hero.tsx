import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIconEl, VerifiedIconEl } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container grid gap-16 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <Badge variant="neutral" className="mb-6 font-mono uppercase tracking-wide">
            Templates · API Playground · Testing
          </Badge>
          <h1 className="text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            The control center for your application's email.
          </h1>
          <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-ink-muted">
            Compose from{" "}
            <span className="font-mono text-accent">noreply@</span>,{" "}
            <span className="font-mono text-accent">support@</span>,{" "}
            <span className="font-mono text-accent">info@</span> — start
            from a template, test how it renders, or drop straight into the
            API Playground for cURL, JavaScript, Python, PHP, Node.js and
            React. All through your own Resend key.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/app">
                Open WorkMail
                <ArrowRightIconEl size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-wide text-ink-faint">
            Your Api, Your Email
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-sm text-ink-muted">
            <li className="flex items-center gap-2">
              <VerifiedIconEl size={16} className="text-success" />
              Your API key stays in your browser's local storage
            </li>
            <li className="flex items-center gap-2">
              <VerifiedIconEl size={16} className="text-success" />
              Nothing is stored on WorkMail's servers — there isn't a database
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-xl border border-line bg-white p-5 shadow-pop">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
              <div className="flex gap-1">
                <span className="rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-ink">
                  Compose
                </span>
                <span className="px-2 py-1 text-[11px] font-medium text-ink-faint">
                  Templates
                </span>
                <span className="px-2 py-1 text-[11px] font-medium text-ink-faint">
                  Playground
                </span>
              </div>
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-md border border-line bg-surface px-3 py-2">
                <span className="text-ink-faint">From</span>
                <span className="font-mono text-ink">
                  support<span className="text-accent">@</span>yourdomain.com
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-line px-3 py-2">
                <span className="text-ink-faint">To</span>
                <span className="text-ink">customer@gmail.com</span>
              </div>
              <div className="rounded-md border border-line px-3 py-2">
                <span className="text-ink-faint">Subject</span>
                <p className="mt-0.5 text-ink">Your order has shipped</p>
              </div>
              <div className="rounded-md border border-line px-3 py-3 text-ink-muted">
                Hi there — great news, your order is on its way and should
                arrive in 2–3 business days.
              </div>
            </div>
          </div>

          {/* Signature element: the postmark stamp lands as the hero loads. */}
          <div className="absolute -right-6 -top-6 flex h-24 w-24 rotate-[-8deg] animate-stamp-down items-center justify-center rounded-full border-2 border-stamp bg-white text-stamp shadow-pop">
            <div className="postmark flex h-16 w-16 flex-col items-center justify-center text-[10px] font-semibold uppercase leading-tight tracking-wide">
              <span>Sent via</span>
              <span className="font-mono text-[11px]">Resend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
