import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[12px] font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent-soft text-accent-ink",
        success: "border-transparent bg-success-soft text-success",
        warn: "border-transparent bg-warn-soft text-warn",
        stamp: "border-transparent bg-stamp-soft text-stamp",
        outline: "border-line bg-white text-ink-muted",
        neutral: "border-transparent bg-surface text-ink-muted",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
