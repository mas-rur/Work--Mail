import Link from "next/link";
import { Logo } from "@/components/logo";
import { SUPPORT_EMAIL } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <Logo />
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-faint">
              Your Api, Your Email
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
            <Link href="/app" className="hover:text-ink">
              Open WorkMail
            </Link>
            <Link href="/faq" className="hover:text-ink">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms of Use
            </Link>
            <a
              href="https://resend.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              Resend
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-line pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-ink-faint">
            © {year} WorkMail. Support:{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-ink-muted hover:text-ink"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-faint">
            <span>Powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mecozx.png" alt="Mecozx" className="h-4 w-auto opacity-80" />
          </div>
        </div>
      </div>
    </footer>
  );
}
