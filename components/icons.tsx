import type { ReactNode } from "react";
import * as HugeiconsReactModule from "@hugeicons/react";
import {
  ApiIcon,
  AtIcon,
  ArrowRight02Icon,
  ArrowLeft02Icon,
  AlertCircleIcon,
  Cancel01Icon,
  BrowserIcon,
  Settings01Icon,
  UserIcon,
  SearchIcon,
  Notification03Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

// The named export has shifted across @hugeicons/react versions in the
// wild — resolve whichever shape is actually published rather than
// assuming one, so a version bump upstream can't silently break every
// icon in the app again.
const HugeiconsIcon = ((HugeiconsReactModule as unknown as Record<string, unknown>)
  .HugeiconsIcon ??
  (HugeiconsReactModule as unknown as { default?: unknown }).default ??
  (HugeiconsReactModule as unknown as (...args: unknown[]) => unknown)) as React.ComponentType<{
  icon: unknown;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}>;

export type IconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

function huge(icon: typeof ApiIcon) {
  return function HugeWrapped({ className, size = 20, strokeWidth = 1.6 }: IconProps) {
    return (
      <HugeiconsIcon
        icon={icon}
        size={size}
        color="currentColor"
        strokeWidth={strokeWidth}
        className={cn("shrink-0", className)}
      />
    );
  };
}

// Verified against the @hugeicons/core-free-icons export list.
export const ApiIconEl = huge(ApiIcon);
export const AtIconEl = huge(AtIcon);
export const ArrowRightIconEl = huge(ArrowRight02Icon);
export const ArrowLeftIconEl = huge(ArrowLeft02Icon);
export const AlertIconEl = huge(AlertCircleIcon);
export const CloseIconEl = huge(Cancel01Icon);
export const DomainIconEl = huge(BrowserIcon);
export const SettingsIconEl = huge(Settings01Icon);
export const UserIconEl = huge(UserIcon);
export const SearchIconEl = huge(SearchIcon);
export const BellIconEl = huge(Notification03Icon);

// Hand-drawn to match Hugeicons' stroke-rounded, 24x24 grid convention —
// used only where a free-tier export name couldn't be confirmed.
function glyph(paths: ReactNode) {
  return function Glyph({ className, size = 20, strokeWidth = 1.6 }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("shrink-0", className)}
      >
        {paths}
      </svg>
    );
  };
}

export const MailIcon = glyph(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 6.5 12 13l8.5-6.5" />
  </>
);

export const BoltIconEl = glyph(
  <path d="M12.5 3 5 13.5h5.5L11 21l7.5-10.5H13l-.5-7.5z" strokeLinejoin="round" />
);

export const BoldIconEl = glyph(
  <path d="M7 4.5h5.2a3.4 3.4 0 0 1 0 6.8H7zM7 11.3h5.8a3.6 3.6 0 0 1 0 7.2H7z" strokeLinejoin="round" />
);

export const VerifiedIconEl = glyph(
  <>
    <path d="M12 3.5l2 1.7 2.6-.3 1 2.4 2.4 1-.3 2.6 1.7 2-1.7 2 .3 2.6-2.4 1-1 2.4-2.6-.3-2 1.7-2-1.7-2.6.3-1-2.4-2.4-1 .3-2.6-1.7-2 1.7-2-.3-2.6 2.4-1 1-2.4 2.6.3z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4.5" />
  </>
);

export const SendIcon = glyph(
  <path d="M4.5 4.5 20 12 4.5 19.5 7 12.5 14 12l-7-.5-2.5-7z" strokeLinejoin="round" />
);

export const KeyIcon = glyph(
  <>
    <circle cx="8" cy="15" r="4" />
    <path d="M11 12l8-8M16 4l3 3M13 7l2.5 2.5" />
  </>
);

export const ShieldIcon = glyph(
  <path d="M12 3.5 19 6v6c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6l7-2.5z" strokeLinejoin="round" />
);

export const TrashIcon = glyph(
  <>
    <path d="M4.5 7h15" />
    <path d="M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" />
    <path d="M6.5 7l1 12a2 2 0 0 0 2 1.9h5a2 2 0 0 0 2-1.9l1-12" />
  </>
);

export const EyeIcon = glyph(
  <>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.6" />
  </>
);

export const EyeOffIcon = glyph(
  <>
    <path d="M3.5 3.5l17 17" />
    <path d="M10.7 5.6A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15.6 15.6 0 0 1-3.2 4M6.6 6.9C4 8.7 2.5 12 2.5 12S6 18.5 12 18.5a9.6 9.6 0 0 0 3.6-.7" />
    <path d="M9.6 10.4a2.6 2.6 0 0 0 3.7 3.7" />
  </>
);

export const CopyIcon = glyph(
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
  </>
);

export const LockIcon = glyph(
  <>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </>
);

export const LinkIcon = glyph(
  <>
    <path d="M10 14a4.5 4.5 0 0 0 6.4.3l2-2a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1" />
    <path d="M14 10a4.5 4.5 0 0 0-6.4-.3l-2 2a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1" />
  </>
);

export const ListIcon = glyph(
  <>
    <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
    <path d="M9 6h11M9 12h11M9 18h11" />
  </>
);

export const NumberedListIcon = glyph(
  <>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <path d="M4 4.5h1v3M4 7.5h1.6" />
    <path d="M4 11.2c0-.6.5-1 1-1s1 .4 1 .9-.3.7-1 1.3l-1 1h2" />
    <path d="M4.2 17c.2-.3.5-.4.9-.4.5 0 .9.3.9.7s-.4.6-.8.7c.5.1.9.3.9.8s-.4.7-1 .7c-.4 0-.7-.1-.9-.4" />
  </>
);

export const ItalicIcon = glyph(
  <path d="M11 4.5h6M7 19.5h6M14 4.5l-4 15" />
);

export const UnderlineIcon = glyph(
  <>
    <path d="M6 4.5v6a6 6 0 0 0 12 0v-6" />
    <path d="M5 19.5h14" />
  </>
);

export const RefreshIcon = glyph(
  <>
    <path d="M20 11a8 8 0 1 0-2.3 5.6" />
    <path d="M20 5.5V11h-5.5" />
  </>
);

export const DownloadIcon = glyph(
  <>
    <path d="M12 3.5v11.5M7.5 10.5l4.5 4.5 4.5-4.5" />
    <path d="M4.5 17v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2" />
  </>
);

export const ClockIcon = glyph(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </>
);

export const InboxIcon = glyph(
  <>
    <path d="M4 12.5h4.2l1.3 2.5h4.9l1.3-2.5H20" />
    <path d="M5.6 5.5h12.8L20 12.5v5A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-5L5.6 5.5z" />
  </>
);

export const PlusIcon = glyph(<path d="M12 5v14M5 12h14" />);

export const CheckIcon = glyph(<path d="M4.5 12.5l5 5 10-11" />);

export const ReceiptIcon = glyph(
  <>
    <path d="M6 3.5h12v17l-2.5-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 20.5z" strokeLinejoin="round" />
    <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
  </>
);

export const GlobeIcon = glyph(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.3 3.7 5.3 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.3-3.7-8.5S9.6 5.8 12 3.5z" />
  </>
);

export const ChevronDownIcon = glyph(<path d="M6 9l6 6 6-6" />);
