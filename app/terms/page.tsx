import { LegalLayout } from "@/components/legal-layout";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = {
  title: "Terms of Use — WorkMail",
  description: "The terms that govern your use of WorkMail.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="August 2026">
      <p>
        These terms govern your use of WorkMail. By using WorkMail, you
        agree to them. If you don't agree, please don't use the product.
      </p>

      <h2>What WorkMail is</h2>
      <p>
        WorkMail is the control center for your application's email,
        built on your own Resend account: compose and send using your own
        API key, start from a template, preview across email clients, and
        use the API Playground to get equivalent code for your own app.
        WorkMail is not an email service provider, does not host
        mailboxes, and does not guarantee delivery of any message.
      </p>

      <h2>Your Resend account and API key</h2>
      <p>
        You're responsible for your own Resend account, its API key, and
        everything sent using it through WorkMail — including keeping your
        key confidential. WorkMail relays your requests to Resend on your
        behalf but does not control Resend's service, pricing, or policies.
      </p>
      <p>
        The API Playground displays your key as it would appear in real
        code, which means it's visible on screen unless you leave the key
        hidden (the default). Take care when sharing your screen or
        screenshots while it's revealed.
      </p>

      <h2>Templates and code samples</h2>
      <p>
        Templates and the code generated in the API Playground are generic
        starting points, not legal, security, or compliance advice.
        Security-sensitive templates — OTP and password reset in
        particular — are illustrative; you're responsible for reviewing
        and adapting them to your own security requirements before use.
        Generated code samples are illustrative too, not guaranteed
        production-ready, and you're responsible for reviewing them —
        including never embedding your API key in client-side or
        browser-executed code — before using them in your own application.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to use WorkMail to send email that:</p>
      <ul>
        <li>Violates applicable law, including anti-spam laws such as CAN-SPAM or GDPR-related rules in your jurisdiction;</li>
        <li>Is sent without a legitimate basis to contact the recipient;</li>
        <li>Contains malicious content, phishing attempts, or malware;</li>
        <li>Infringes someone else's intellectual property or privacy rights;</li>
        <li>Violates Resend's own acceptable use policy.</li>
      </ul>
      <p>
        You're solely responsible for the content, recipients, and legality
        of every email you send through WorkMail.
      </p>

      <h2>No guarantee of deliverability</h2>
      <p>
        WorkMail surfaces guidance that can help — domain verification
        status, plain-text inclusion, subject-line checks — but cannot and
        does not guarantee that any email will be delivered, or that it
        will reach a recipient's inbox rather than a spam folder.
        Deliverability depends on factors outside WorkMail's control,
        including your domain's sending reputation and each recipient's own
        filtering.
      </p>

      <h2>Service "as is"</h2>
      <p>
        WorkMail is provided "as is" and "as available," without warranties
        of any kind, express or implied, including merchantability, fitness
        for a particular purpose, or non-infringement. We don't warrant that
        the service will be uninterrupted, error-free, or secure.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, WorkMail and its operators
        won't be liable for any indirect, incidental, special, or
        consequential damages — including lost messages, lost business, or
        lost data — arising from your use of the service.
      </p>

      <h2>Changes to the service or these terms</h2>
      <p>
        We may update WorkMail or these terms from time to time. Material
        changes will be reflected by updating the date at the top of this
        page. Continued use after a change means you accept the updated
        terms.
      </p>

      <h2>Termination</h2>
      <p>
        You can stop using WorkMail at any time — since your data lives in
        your browser, deleting it from Settings or clearing your browser's
        site data effectively ends your relationship with WorkMail.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
