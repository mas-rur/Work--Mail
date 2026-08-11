import { cn } from "@/lib/utils";

/**
 * WorkMail's mark: a stamped postmark ring, drawn in code so it stays crisp
 * at any size and needs no image asset.
 *
 * To use your own artwork instead: drop `logo.png` into /public and replace
 * the <PostmarkMark /> below with:
 *   <img src="/logo.png" alt="WorkMail" className={sizeClass} />
 */
export function PostmarkMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "postmark inline-flex shrink-0 items-center justify-center text-accent",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function Logo({
  className,
  wordmarkClassName,
  showWordmark = true,
}: {
  className?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <PostmarkMark className="h-7 w-7" />
      {showWordmark && (
        <span
          className={cn(
            "font-display text-[17px] font-semibold tracking-tight text-ink",
            wordmarkClassName
          )}
        >
          WorkMail
        </span>
      )}
    </span>
  );
}
