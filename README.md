# WorkMail

**Your Api, Your Email.**

A compose window for your own [Resend](https://resend.com) account. Bring
your own Resend API key, pick an address on your own verified domain
(`noreply@`, `support@`, `info@`, or anything else), write the email, and
send — straight through your key, no middleman database.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The landing page is at
`/`; the app itself is at `/app`.

No environment variables are required. WorkMail doesn't hold a database or
a server-side API key — each person pastes their own Resend key into the
app, and it's used only for the request they're making.

## How the API key is handled

- The key is stored in the browser's `localStorage`, nowhere else.
- `/api/send` and `/api/domains` are thin relay routes: they read the key
  from the request body, use it for exactly one outbound call to Resend's
  API, and return the result. Nothing is logged or persisted server-side.
- Sent-mail history, the default domain, and the key itself all live in
  `localStorage` and can be wiped from Settings → **Clear all local data**.

## Branding — swapping in your own logo

The current mark is a CSS-drawn "postmark" ring (see `components/logo.tsx`),
so the app looks finished without any image assets. To use your own
artwork instead:

1. Drop `logo.png` into `/public`.
2. In `components/logo.tsx`, replace `<PostmarkMark />` with:
   ```tsx
   <img src="/logo.png" alt="WorkMail" className="h-7 w-7" />
   ```
3. For the browser favicon, either drop `favicon.ico` into `/public`
   (Next.js picks it up automatically), or replace the generated icon in
   `app/icon.tsx`.

## Stack

- **Next.js (App Router) + TypeScript + Tailwind CSS**
- **shadcn/ui**-style primitives in `components/ui/` (Radix underneath —
  `components.json` is included, so `npx shadcn add <component>` works if
  you want more)
- **Hugeicons** (`@hugeicons/react` + `@hugeicons/core-free-icons`) for the
  confirmed set of icons; a few glyphs not yet in the free tier are
  hand-drawn in `components/icons.tsx` to match the same stroke-rounded
  style — swap them for Hugeicons Pro icons any time
- **driver.js** for the "Take the tour" onboarding walkthrough
- **Resend** Node SDK, called only from the two API routes

## A note on deliverability

Nothing can *guarantee* inbox placement — it depends on your domain's SPF/
DKIM/DMARC setup, your sending reputation, and each recipient's filters.
The compose form's deliverability checklist reflects that honestly: it
flags the things WorkMail can actually check (domain verified, plain-text
included, subject looks clean) rather than promising results it can't
control.
