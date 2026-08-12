import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-16">
        <span className="font-mono text-xs uppercase tracking-wide text-accent">
          {updated ? `Last updated ${updated}` : "WorkMail"}
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <div className="prose-legal mt-10">{children}</div>
      </div>
      <Footer />
    </main>
  );
}
