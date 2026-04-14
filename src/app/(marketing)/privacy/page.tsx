import { siteConfig } from "@/lib/site";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <article className="container max-w-3xl py-16 prose prose-neutral dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p>
        {siteConfig.name} (“we”, “us”) respects your privacy. This page explains what we collect and
        why. Replace this placeholder text with your own policy before shipping to production.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Contact information you submit via our forms (name, email, company, message).</li>
        <li>Authentication details if you create a client account (email, hashed password, OAuth profile).</li>
        <li>Usage analytics — aggregated, non-identifying statistics about how our site is used.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To respond to inquiries, operate your account, bill for services, and improve our site.</p>
      <h2>Your rights</h2>
      <p>
        Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> to access, correct, or delete your data.
      </p>
    </article>
  );
}
