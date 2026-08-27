"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Logo } from "@/components/logo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ComposeForm, type TemplateSeed } from "@/components/compose-form";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { ApiPlayground } from "@/components/playground/api-playground";
import { SentHistory } from "@/components/sent-history";
import { ApiKeySettings } from "@/components/api-key-settings";
import { settingsStore, tourStore } from "@/lib/storage";
import { ArrowLeftIconEl, SearchIconEl } from "@/components/icons";

function buildTour() {
  return driver({
    showProgress: true,
    animate: true,
    overlayColor: "#12141A",
    popoverClass: "workmail-driver-popover",
    steps: [
      {
        element: "#tour-logo",
        popover: {
          title: "Welcome to WorkMail",
          description:
            "The control center for your application's email. Quick tour — six stops.",
          side: "bottom",
        },
      },
      {
        element: "#tour-tab-settings",
        popover: {
          title: "1. Connect your key",
          description:
            "Start in Settings and paste your Resend API key, then sync your verified domains.",
          side: "bottom",
        },
      },
      {
        element: "#tour-tab-templates",
        popover: {
          title: "2. Start from a template",
          description:
            "Welcome emails, OTPs, invoices, password resets and more — fill in a few fields and drop them into Compose.",
          side: "bottom",
        },
      },
      {
        element: "#tour-from",
        popover: {
          title: "3. Pick an address",
          description:
            "Type a prefix and WorkMail suggests noreply, support, info and more — paired with your domain.",
          side: "top",
        },
      },
      {
        element: "#tour-send",
        popover: {
          title: "4. Send, test, or preview",
          description:
            "Send for real, fire a one-click test to yourself, or preview how it renders across Gmail, Outlook and Apple Mail.",
          side: "top",
        },
      },
      {
        element: "#tour-tab-playground",
        popover: {
          title: "5. The API Playground",
          description:
            "Build a request and get matching cURL, JavaScript, Python, PHP, Node.js and React code — or send it directly.",
          side: "bottom",
        },
      },
      {
        element: "#tour-tab-history",
        popover: {
          title: "Local history",
          description:
            "Every send is logged here, only in this browser. Clear it anytime from Settings.",
          side: "bottom",
        },
      },
    ],
  });
}

export function AppShell() {
  const [tab, setTab] = useState("compose");
  const [hasApiKey, setHasApiKey] = useState(false);
  const [domains, setDomains] = useState<string[]>([]);
  const [defaultDomain, setDefaultDomain] = useState("");
  const [templateSeed, setTemplateSeed] = useState<TemplateSeed | null>(null);
  const tourRef = useRef<ReturnType<typeof buildTour> | null>(null);

  useEffect(() => {
    setHasApiKey(settingsStore.hasApiKey());
    setDomains(settingsStore.getVerifiedDomains());
    setDefaultDomain(settingsStore.getDomain());
  }, [tab]);

  useEffect(() => {
    if (!tourStore.hasSeenTour()) {
      const t = setTimeout(() => runTour(), 700);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runTour = () => {
    setTab("compose");
    tourStore.markSeen();
    setTimeout(() => {
      tourRef.current = buildTour();
      tourRef.current.drive();
    }, 60);
  };

  const useTemplate = (subject: string, html: string) => {
    setTemplateSeed((prev) => ({ subject, html, seq: (prev?.seq ?? 0) + 1 }));
    setTab("compose");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="Back to WorkMail home">
              <ArrowLeftIconEl size={16} className="text-ink-faint hover:text-ink" />
            </Link>
            <span id="tour-logo">
              <Logo />
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={runTour}>
            <SearchIconEl size={14} />
            Take the tour
          </Button>
        </div>
      </header>

      <main className="container py-10">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger id="tour-tab-compose" value="compose">
              Compose
            </TabsTrigger>
            <TabsTrigger id="tour-tab-templates" value="templates">
              Templates
            </TabsTrigger>
            <TabsTrigger id="tour-tab-playground" value="playground">
              API Playground
            </TabsTrigger>
            <TabsTrigger id="tour-tab-history" value="history">
              History
            </TabsTrigger>
            <TabsTrigger id="tour-tab-settings" value="settings">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <ComposeForm
              domains={domains}
              defaultDomain={defaultDomain}
              hasApiKey={hasApiKey}
              templateSeed={templateSeed}
              onGoToSettings={() => setTab("settings")}
            />
          </TabsContent>

          <TabsContent value="templates">
            <TemplateGallery onUseTemplate={useTemplate} />
          </TabsContent>

          <TabsContent value="playground">
            <ApiPlayground />
          </TabsContent>

          <TabsContent value="history">
            <SentHistory />
          </TabsContent>

          <TabsContent value="settings">
            <ApiKeySettings
              onDomainsChange={(d) => {
                setDomains(d);
                setHasApiKey(true);
              }}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
