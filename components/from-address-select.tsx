"use client";

import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filterPresets } from "@/lib/sender-presets";
import { AtIconEl, DomainIconEl } from "@/components/icons";
import { cn } from "@/lib/utils";

export function FromAddressSelect({
  prefix,
  domain,
  domains,
  onPrefixChange,
  onDomainChange,
}: {
  prefix: string;
  domain: string;
  domains: string[];
  onPrefixChange: (value: string) => void;
  onDomainChange: (value: string) => void;
}) {
  const [prefixOpen, setPrefixOpen] = useState(false);
  const [domainOpen, setDomainOpen] = useState(false);
  const suggestions = useMemo(() => filterPresets(prefix).slice(0, 6), [prefix]);
  const domainMatches = useMemo(
    () =>
      domains.filter((d) => d.toLowerCase().includes(domain.toLowerCase())),
    [domains, domain]
  );

  return (
    <div>
      <Label htmlFor="from-prefix">From</Label>
      <div className="mt-1.5 flex items-stretch overflow-hidden rounded-md border border-line bg-white focus-within:border-accent focus-within:ring-2 focus-within:ring-accent">
        <Popover open={prefixOpen} onOpenChange={setPrefixOpen}>
          <PopoverAnchor asChild>
            <input
              id="from-prefix"
              value={prefix}
              onChange={(e) => {
                onPrefixChange(e.target.value.replace(/[^a-zA-Z0-9._-]/g, ""));
                setPrefixOpen(true);
              }}
              onFocus={() => setPrefixOpen(true)}
              placeholder="support"
              className="w-32 border-0 bg-transparent px-3 py-2 font-mono text-sm text-ink outline-none placeholder:text-ink-faint sm:w-40"
              autoComplete="off"
            />
          </PopoverAnchor>
          <PopoverContent
            align="start"
            className="w-64 p-1"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {suggestions.length === 0 ? (
              <p className="px-2 py-1.5 text-xs text-ink-faint">
                No suggestions — any prefix works.
              </p>
            ) : (
              suggestions.map((s) => (
                <button
                  key={s.prefix}
                  type="button"
                  onClick={() => {
                    onPrefixChange(s.prefix);
                    setPrefixOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-surface"
                >
                  <span className="font-mono text-ink">{s.prefix}</span>
                  <span className="text-xs text-ink-faint">{s.hint}</span>
                </button>
              ))
            )}
          </PopoverContent>
        </Popover>

        <span className="flex items-center border-x border-line bg-surface px-2 text-ink-faint">
          <AtIconEl size={14} />
        </span>

        <Popover open={domainOpen} onOpenChange={setDomainOpen}>
          <PopoverAnchor asChild>
            <input
              value={domain}
              onChange={(e) => {
                onDomainChange(e.target.value.trim());
                setDomainOpen(true);
              }}
              onFocus={() => setDomainOpen(true)}
              placeholder="yourdomain.com"
              className="flex-1 border-0 bg-transparent px-3 py-2 font-mono text-sm text-ink outline-none placeholder:text-ink-faint"
              autoComplete="off"
            />
          </PopoverAnchor>
          {domains.length > 0 && (
            <PopoverContent
              align="start"
              className="w-64 p-1"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <p className="px-2 pb-1 pt-1 text-[11px] font-medium uppercase tracking-wide text-ink-faint">
                Verified domains
              </p>
              {(domainMatches.length > 0 ? domainMatches : domains).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    onDomainChange(d);
                    setDomainOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-surface",
                    d === domain && "bg-accent-soft text-accent-ink"
                  )}
                >
                  <DomainIconEl size={14} />
                  <span className="font-mono">{d}</span>
                </button>
              ))}
            </PopoverContent>
          )}
        </Popover>
      </div>
      <p className="mt-1.5 text-xs text-ink-faint">
        Sends as{" "}
        <span className="font-mono text-ink-muted">
          {prefix || "prefix"}@{domain || "yourdomain.com"}
        </span>
      </p>
    </div>
  );
}
