import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F6F6F3",
        "surface-hover": "#EFEFEB",
        ink: {
          DEFAULT: "#12141A",
          muted: "#6B7280",
          faint: "#9AA0AC",
        },
        line: "#E7E7E2",
        accent: {
          DEFAULT: "#2A3EFF",
          ink: "#1B2ACC",
          soft: "#EEF0FF",
        },
        stamp: {
          DEFAULT: "#E8462F",
          soft: "#FDECE8",
        },
        success: {
          DEFAULT: "#16A34A",
          soft: "#EAF7EF",
        },
        warn: {
          DEFAULT: "#D97706",
          soft: "#FDF3E5",
        },
        border: "#E7E7E2",
        input: "#E7E7E2",
        ring: "#2A3EFF",
        card: "#FFFFFF",
        "card-foreground": "#12141A",
        popover: "#FFFFFF",
        "popover-foreground": "#12141A",
        primary: "#2A3EFF",
        "primary-foreground": "#FFFFFF",
        secondary: "#F6F6F3",
        "secondary-foreground": "#12141A",
        muted: "#F6F6F3",
        "muted-foreground": "#6B7280",
        destructive: "#E8462F",
        "destructive-foreground": "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "1rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,20,26,0.04), 0 1px 1px rgba(18,20,26,0.03)",
        pop: "0 12px 32px rgba(18,20,26,0.10), 0 2px 8px rgba(18,20,26,0.06)",
      },
      keyframes: {
        "stamp-down": {
          "0%": { transform: "scale(2.4) rotate(-18deg)", opacity: "0" },
          "55%": { transform: "scale(0.96) rotate(-8deg)", opacity: "1" },
          "75%": { transform: "scale(1.05) rotate(-10deg)" },
          "100%": { transform: "scale(1) rotate(-8deg)", opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "stamp-down": "stamp-down 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "fade-up": "fade-up 0.5s ease both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
