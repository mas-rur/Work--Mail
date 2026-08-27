import { LegalLayout } from "@/components/legal-layout";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy — WorkMail",
  description: "How WorkMail handles your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="August 2026">
      <p>
        WorkMail ("we", "us") is the control center for your application's
        email, built on your own Resend account. This page explains what
        data WorkMail touches, and — just as importantly — what it doesn't.
      </p>

      <h2>The short version</h2>
      <p>
        Your Resend API key, sending domain, test email address, and
        sent-mail history are stored only in your browser's local storage.
        WorkMail does not operate a database, and does not have
        server-side accounts, logins, or user profiles.
      </p>

      <h2>What we collect</h2>
      <p>
        WorkMail itself collects nothing that persists on our servers. Two
        server-side routes exist to make sending possible:
      </p>
      <ul>
        <li>
          <strong>Sending an email</strong> — your API key, the from/to
          addresses, subject, and message body are sent to our server for
          the single moment it takes to relay the request to Resend's API.
          They are not logged or written to disk.
        </li>
        <li>
          <strong>Syncing domains</strong> — your API key is sent to our
          server for the single moment it takes to ask Resend which domains
          are verified on your account. Same handling: used once, not
          stored.
        </li>
      </ul>
      <p>
        Standard web infrastructure (our hosting provider) may keep
        short-lived technical logs — such as request timestamps or IP
        addresses for abuse prevention — that are outside WorkMail's own
        application logic and are not used to build any profile of you.
      </p>

      <h2>What lives in your browser</h2>
      <p>
        Your Resend API key, default sending domain, verified-domain list,
        and sent-mail history are stored using your browser's{" "}
        <code>localStorage</code>. This data never leaves your device unless
        you take an action that requires it — sending a message or syncing
        domains — and even then, only the specific data needed for that
        request is sent. You can delete it at any time from WorkMail's
        Settings tab, or by clearing your browser's site data.
      </p>

      <h2>Templates, the API Playground, and testing tools</h2>
      <p>
        These don't introduce any new server-side storage — they use the
        same key and domain already described above.
      </p>
      <ul>
        <li>
          <strong>Templates</strong> are static content bundled with the
          app. Choosing one and filling in fields happens entirely in your
          browser; nothing is sent anywhere until you actually send the
          resulting email.
        </li>
        <li>
          <strong>The API Playground</strong> generates example code (cURL,
          JavaScript, Python, PHP, Node.js, React) in your browser, using
          the key already stored there. If you click{" "}
          <span className="font-mono">Send this request</span>, that
          request goes through the same relay described above — used once,
          not stored.
        </li>
        <li>
          <strong>"Send test to myself"</strong> uses an address you save
          in Settings, stored locally the same way as your API key and
          domain. Test sends go through the same relay as a normal send.
        </li>
        <li>
          <strong>Client preview</strong> (Gmail/Outlook/Apple Mail) renders
          your HTML entirely in your own browser. Nothing is sent to our
          server or any third party to generate it.
        </li>
      </ul>

      <h2>Third parties</h2>
      <p>
        Every email you send through WorkMail is delivered by{" "}
        <a href="https://resend.com" target="_blank" rel="noreferrer">
          Resend
        </a>
        , using your own account and API key. Resend's handling of message
        content and recipient data is governed by{" "}
        <a
          href="https://resend.com/legal/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Resend's own privacy policy
        </a>
        , which we'd encourage you to read.
      </p>

      <h2>Cookies</h2>
      <p>
        WorkMail does not use tracking or advertising cookies. It relies on
        browser local storage, described above, rather than cookies for
        remembering your settings.
      </p>

      <h2>Data retention</h2>
      <p>
        Because WorkMail doesn't store your data server-side, retention is
        entirely in your hands: your data lives in your browser until you
        delete it, clear your browser data, or switch browsers or devices.
      </p>

      <h2>Children's privacy</h2>
      <p>
        WorkMail is not directed at children and is not intended for use by
        anyone under the age required to hold accounts with services like
        Resend in their jurisdiction.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes, we'll update the date at the top of this
        page. Continued use of WorkMail after a change means you accept the
        updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
