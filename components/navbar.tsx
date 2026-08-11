import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label="WorkMail home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Features
          </a>
          <a
            href="https://resend.com/docs"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Resend docs
          </a>
        </nav>
        <Button asChild size="sm">
          <Link href="/app">Open WorkMail</Link>
        </Button>
      </div>
    </header>
  );
}
