"use client";

import { useEffect, useState } from "react";
import { historyStore, type SentEmail } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { InboxIcon, TrashIcon, ClockIcon } from "@/components/icons";

function formatWhen(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function SentHistory() {
  const [items, setItems] = useState<SentEmail[] | null>(null);

  useEffect(() => {
    setItems(historyStore.getAll());
  }, []);

  const remove = (id: string) => {
    historyStore.remove(id);
    setItems(historyStore.getAll());
  };

  const clearAll = () => {
    historyStore.clear();
    setItems([]);
  };

  if (items === null) return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ink-muted">
          {items.length} email{items.length === 1 ? "" : "s"} — stored only in
          this browser.
        </p>
        {items.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-stamp hover:bg-stamp-soft">
                <TrashIcon size={15} />
                Clear history
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear all sent history?</DialogTitle>
                <DialogDescription>
                  This removes every logged email from this browser's local
                  storage. It does not affect anything already delivered, and
                  can't be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={clearAll}>
                    Clear everything
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-line py-16 text-center">
          <InboxIcon size={28} className="text-ink-faint" />
          <p className="text-sm text-ink-muted">
            Nothing sent yet — messages you send will show up here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line">
          {items.map((item) => (
            <li key={item.id} className="group flex items-start gap-4 bg-white p-4">
              <span
                className={
                  item.status === "sent"
                    ? "mt-1 h-2 w-2 shrink-0 rounded-full bg-success"
                    : "mt-1 h-2 w-2 shrink-0 rounded-full bg-stamp"
                }
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-medium text-ink">
                    {item.subject || "(no subject)"}
                  </p>
                  <Badge variant={item.status === "sent" ? "success" : "stamp"}>
                    {item.status === "sent" ? "Sent" : "Failed"}
                  </Badge>
                </div>
                <p className="mt-1 truncate font-mono text-xs text-ink-muted">
                  {item.from} → {item.to}
                </p>
                {item.status === "failed" && item.error && (
                  <p className="mt-1 text-xs text-stamp">{item.error}</p>
                )}
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-ink-faint">
                  <ClockIcon size={12} />
                  {formatWhen(item.sentAt)}
                </p>
              </div>
              <button
                onClick={() => remove(item.id)}
                aria-label="Delete from history"
                className="shrink-0 rounded-md p-1.5 text-ink-faint opacity-0 transition-opacity hover:bg-surface hover:text-stamp group-hover:opacity-100"
              >
                <TrashIcon size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
