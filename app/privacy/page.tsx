import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy (draft)",
  description: "Privacy-first MVP: what HomeBuying.ie stores, what stays in your browser, and what must be completed before production launch.",
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <span className="dot" />Privacy
          </span>
          <h1>Collect less. Explain clearly. Delete on purpose.</h1>
        </div>
      </section>
      <article className="guide-body">
        <h2>Documents</h2>
        <p>On GitHub Pages, document explanation runs in your browser. The site does not provide a server endpoint to upload PDFs.</p>

        <h2>Checklist data</h2>
        <p>Checklist progress is stored only in your browser using local storage. Clearing site data removes it.</p>

        <h2>Broker requests</h2>
        <p>On GitHub Pages, broker introductions hand off to an external form link (if configured). That external provider’s privacy policy and data retention rules apply.</p>

        <h2>Your rights</h2>
        <p>Under applicable data-protection law, you may have rights of access, correction, erasure, restriction, objection, and portability, and the right to complain to the Data Protection Commission. Production contact and controller details must be inserted before launch.</p>

        <div className="notice">Draft product policy—not a production-ready privacy notice. Controller identity, processors, transfers, cookies, retention periods, contact details and lawful bases require completion and legal review before collecting real users’ data.</div>
      </article>
    </main>
  );
}

