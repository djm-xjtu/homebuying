import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & disclaimers",
  description: "What HomeBuying.ie is (and is not): estimates, checklists and document orientation for Irish home buyers, with honest boundaries.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <span className="dot" />About us
          </span>
          <h1>A calmer operating system for buying a home.</h1>
          <p className="lead">HomeBuying.ie connects estimates, a practical journey map, document orientation, and introductions to regulated professionals.</p>
        </div>
      </section>
      <article className="guide-body">
        <h2>What we are</h2>
        <p>We are an information and software platform. Our calculators are estimates; our checklists are organisational aids; and automated document explanations help you prepare questions.</p>

        <h2>What we are not</h2>
        <p>We are not a mortgage intermediary, investment firm, solicitor, tax adviser, insurer, surveyor, BER assessor, or lender. We do not recommend that you sign, borrow, waive a condition, or purchase a property.</p>

        <h2>Introductions</h2>
        <p>Where you request an introduction, we intend to work only with firms whose relevant regulatory status can be verified. A broker may receive lender commission and must explain its service and remuneration. Any commercial relationship will be disclosed clearly.</p>

        <div className="notice">Before public launch, obtain Irish legal review of the platform wording, AI workflow, GDPR documentation, insurance, and the proposed broker introduction arrangement.</div>
      </article>
    </main>
  );
}

