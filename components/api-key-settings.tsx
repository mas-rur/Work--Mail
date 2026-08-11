"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { settingsStore, clearAllLocalData } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { KeyIcon, EyeIcon, EyeOffIcon, RefreshIcon, DomainIconEl, VerifiedIconEl, TrashIcon } from "@/components/icons";

type DomainEntry = { name: string; status: string };

export function ApiKeySettings({
  onDomainsChange,
}: {
  onDomainsChange?: (domains: string[]) => void;
}) {
  const [apiKey, setApiKey] = useState("");
  const [reveal, setReveal] = useState(false);
  const [domains, setDomains] = useState<DomainEntry[]>([]);
  const [defaultDomain, setDefaultDomain] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setApiKey(settingsStore.getApiKey());
    setDefaultDomain(settingsStore.getDomain());
    const cached = settingsStore.getVerifiedDomains();
    if (cached.length) {
      setDomains(cached.map((name) => ({ name, status: "verified" })));
    }
  }, []);

  const saveKey = () => {
    settingsStore.setApiKey(apiKey.trim());
    toast.success("API key saved to this browser");
  };

  const syncDomains = async () => {
    const key = apiKey.trim();
    if (!key) {
      toast.error("Enter your Resend API key first");
      return;
    }
    settingsStore.setApiKey(key);
    setLoading(true);
    try {
      const res = await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: key }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not fetch domains");
        return;
      }
      const list: DomainEntry[] = data.domains || [];
      setDomains(list);
      const verifiedNames = list
        .filter((d) => d.status === "verified")
        .map((d) => d.name);
      settingsStore.setVerifiedDomains(verifiedNames);
      onDomainsChange?.(verifiedNames);
      if (!defaultDomain && verifiedNames[0]) {
        setDefaultDomain(verifiedNames[0]);
        settingsStore.setDomain(verifiedNames[0]);
      }
      toast.success(
        list.length ? `Found ${list.length} domain(s)` : "Connected — no domains added yet"
      );
    } catch {
      toast.error("Network error reaching WorkMail's relay");
    } finally {
      setLoading(false);
    }
  };

  const pickDefault = (name: string) => {
    setDefaultDomain(name);
    settingsStore.setDomain(name);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyIcon size={18} className="text-accent" />
            Resend API key
          </CardTitle>
          <CardDescription>
            Stored only in this browser's local storage, and sent to Resend
            through WorkMail's relay only when you send or sync domains.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key">API key</Label>
            <div className="mt-1.5 flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="api-key"
                  type={reveal ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="re_xxxxxxxxxxxxxxxxxxxx"
                  className="pr-10 font-mono"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setReveal((r) => !r)}
                  aria-label={reveal ? "Hide key" : "Show key"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                >
                  {reveal ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              </div>
              <Button variant="outline" onClick={saveKey}>
                Save
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-ink-faint">
              Find this in your Resend dashboard under API Keys.
            </p>
          </div>
          <Button onClick={syncDomains} disabled={loading} className="w-full">
            <RefreshIcon size={15} className={loading ? "animate-spin" : ""} />
            {loading ? "Syncing…" : "Sync domains from Resend"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DomainIconEl size={18} className="text-accent" />
            Domains
          </CardTitle>
          <CardDescription>
            Pick the domain WorkMail uses by default in the compose form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {domains.length === 0 ? (
            <p className="rounded-md border border-dashed border-line px-3 py-6 text-center text-sm text-ink-faint">
              No domains synced yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {domains.map((d) => (
                <li key={d.name}>
                  <button
                    onClick={() => pickDefault(d.name)}
                    className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                      defaultDomain === d.name
                        ? "border-accent bg-accent-soft"
                        : "border-line hover:bg-surface"
                    }`}
                  >
                    <span className="font-mono text-ink">{d.name}</span>
                    <Badge variant={d.status === "verified" ? "success" : "warn"}>
                      {d.status === "verified" && <VerifiedIconEl size={11} />}
                      {d.status}
                    </Badge>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-stamp">
            <TrashIcon size={18} />
            Local data
          </CardTitle>
          <CardDescription>
            Everything WorkMail knows — your key, domain, and sent history —
            lives in this browser only. Clear it whenever you like.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Clear all local data</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear all local data?</DialogTitle>
                <DialogDescription>
                  This removes your saved API key, domain, and entire sent
                  history from this browser. Nothing on Resend is affected.
                  This can't be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      clearAllLocalData();
                      setApiKey("");
                      setDomains([]);
                      setDefaultDomain("");
                      toast.success("Local data cleared");
                    }}
                  >
                    Clear everything
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
