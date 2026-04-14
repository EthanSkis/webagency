import { siteConfig } from "@/lib/site";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <article className="container max-w-3xl py-16 prose prose-neutral dark:prose-invert">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p>
        These terms govern your use of the {siteConfig.name} website and client portal. Replace this
        placeholder text with your own terms before shipping to production.
      </p>
      <h2>Services</h2>
      <p>
        All engagements are governed by a separate written Statement of Work, which takes precedence
        over anything on this page.
      </p>
      <h2>Payments</h2>
      <p>Invoices are due within 14 days of issuance unless otherwise agreed in writing.</p>
      <h2>Liability</h2>
      <p>
        To the fullest extent permitted by law, our total liability is limited to the fees paid for
        the specific engagement giving rise to the claim.
      </p>
    </article>
  );
}
