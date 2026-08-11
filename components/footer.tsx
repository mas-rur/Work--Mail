import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container flex flex-col items-center gap-4 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo />
          <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-faint">
            Your Api, Your Email
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-ink-muted">
          <Link href="/app" className="hover:text-ink">
            Open WorkMail
          </Link>
          <a
            href="https://resend.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            Resend
          </a>
        </div>
      </div>
    </footer>
  );
}
