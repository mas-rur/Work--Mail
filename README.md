# WorkMail

**The control center for your application's email.** *(Your Api, Your Email.)*

Built on your own [Resend](https://resend.com) account. Bring your own
Resend API key, pick an address on your own verified domain (`noreply@`,
`support@`, `info@`, or anything else), start from a template or a blank
message, send — straight through your key, no middleman database. An API
Playground and multi-client preview round it out for developers.

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

## Templates, API Playground, and testing

All three are new on top of the original Compose/History/Settings flow —
none of them needed a new dependency or a new env var.

- **Templates** (`lib/templates.ts`, `components/templates/`) — seven
  starting points (welcome, OTP, invoice, password reset, payment
  confirmation, contact form, developer notification) with
  `{{mustache}}`-style placeholders. Picking one opens a dialog to fill in
  the variables, then writes the result straight into the Compose editor
  via `RichTextEditorHandle.setHtml()`.
- **API Playground** (`lib/code-snippets.ts`,
  `components/playground/api-playground.tsx`) — build a from/to/subject/
  HTML request and get matching cURL, JavaScript, Python, PHP, Node.js
  (using the `resend` SDK), and React code. The React tab deliberately
  posts to your own backend instead of calling Resend directly, since
  embedding a secret key in browser code is unsafe. **The displayed API
  key is masked by default** (a "Reveal API key" toggle un-masks it) so
  the view is safe to screenshot or screen-share — Copy always pastes the
  real, working code regardless of the toggle. There's also a "Send this
  request" button that fires the exact request through the existing
  `/api/send` relay.
- **Testing** — "Send test to myself" in Compose uses a test address saved
  in Settings (`settingsStore.getTestEmail`/`setTestEmail` in
  `lib/storage.ts`) and sends the current draft there with the subject
  prefixed `[Test]`. "Preview" opens a dialog
  (`components/compose/client-preview-dialog.tsx`) that renders the
  current HTML inside Gmail/Outlook/Apple Mail-styled frames via a
  sandboxed `<iframe>`, alongside pattern-based Outlook compatibility
  notes (`lib/email-compat.ts`) — flexbox/grid, background images,
  embedded SVG, and similar things Outlook desktop's Word engine handles
  differently. This is real HTML rendered in the visitor's own browser,
  framed to resemble each client — not each client's actual rendering
  engine — and the dialog says so.

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

The footer also references `/public/mecozx.png` for the "Powered by"
credit — drop that file into `/public` as well (it isn't included here).
Until you add it, the footer will show a broken image in that one spot.

## Legal pages, sitemap, and AI discoverability

- **FAQ** (`/faq`), **Privacy Policy** (`/privacy`), and **Terms of Use**
  (`/terms`) are plain content pages in `app/faq`, `app/privacy`, and
  `app/terms`. The privacy and terms copy describes exactly what this
  codebase does (BYOK, local-storage-only persistence, no deliverability
  guarantee) — **it's a starting point, not legal advice**; have someone
  review it against your actual jurisdiction and business before you rely
  on it.
- Support email is centralized in `lib/site.ts` as `SUPPORT_EMAIL`
  (`info@workmail.space`) and used across the footer, FAQ, and legal pages
  — change it in one place if it ever needs to update.
- `app/sitemap.ts` and `app/robots.ts` are Next.js's built-in conventions;
  they're served automatically at `/sitemap.xml` and `/robots.txt` with no
  extra setup. Both read the site's base URL from `SITE_URL` in
  `lib/site.ts` — update that if you deploy somewhere other than
  `workmail.space`.
- `public/llms.txt` follows the emerging [llms.txt](https://llmstxt.org)
  convention — a plain-text summary of the product aimed at AI assistants
  and crawlers, served at `/llms.txt`. Update it if the product's scope
  changes.

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
