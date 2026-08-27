"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { EMAIL_TEMPLATES, applyVariables, type EmailTemplate } from "@/lib/templates";
import {
  UserIconEl,
  LockIcon,
  ReceiptIcon,
  KeyIcon,
  VerifiedIconEl,
  MailIcon,
  BellIconEl,
  ArrowRightIconEl,
} from "@/components/icons";

const TEMPLATE_ICONS: Record<string, typeof UserIconEl> = {
  welcome: UserIconEl,
  otp: LockIcon,
  invoice: ReceiptIcon,
  "password-reset": KeyIcon,
  "payment-confirmation": VerifiedIconEl,
  "contact-form": MailIcon,
  "developer-notification": BellIconEl,
};

export function TemplateGallery({
  onUseTemplate,
}: {
  onUseTemplate: (subject: string, html: string) => void;
}) {
  const [active, setActive] = useState<EmailTemplate | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  const openTemplate = (t: EmailTemplate) => {
    setActive(t);
    const defaults: Record<string, string> = {};
    t.variables.forEach((v) => {
      defaults[v.key] = v.defaultValue ?? "";
    });
    setValues(defaults);
  };

  const insert = () => {
    if (!active) return;
    const filled: Record<string, string> = {};
    active.variables.forEach((v) => {
      filled[v.key] = values[v.key]?.trim() || v.placeholder;
    });
    onUseTemplate(
      applyVariables(active.subject, filled),
      applyVariables(active.html, filled)
    );
    setActive(null);
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EMAIL_TEMPLATES.map((t) => {
          const Icon = TEMPLATE_ICONS[t.id] ?? MailIcon;
          return (
            <Card key={t.id} className="flex flex-col transition-shadow hover:shadow-pop">
              <CardContent className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent">
                    <Icon size={17} />
                  </span>
                  <Badge variant="outline">{t.category}</Badge>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {t.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {t.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => openTemplate(t)}
                >
                  Use template
                  <ArrowRightIconEl size={14} />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.name}</DialogTitle>
                <DialogDescription>
                  Fill in what you know — anything left blank uses the
                  placeholder shown, so you can adjust it later in Compose.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2 sm:grid-cols-2">
                {active.variables.map((v) => (
                  <div key={v.key}>
                    <Label htmlFor={`tv-${v.key}`}>{v.label}</Label>
                    <Input
                      id={`tv-${v.key}`}
                      className="mt-1.5"
                      value={values[v.key] ?? ""}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [v.key]: e.target.value }))
                      }
                      placeholder={v.placeholder}
                    />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={insert}>Insert into Compose</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
