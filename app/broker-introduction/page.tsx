import type { Metadata } from "next";
import { BrokerIntroCTA } from "@/components/broker-intro-cta";

export const metadata: Metadata = {
  title: "Talk to a regulated mortgage broker (introduction)",
  description: "Request a consent-based introduction to a Central Bank-regulated mortgage broker to discuss Irish mortgage options and next steps.",
};

export default function BrokerIntroductionPage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is HomeBuying.ie a mortgage broker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. HomeBuying.ie is an information platform and introducer. Any regulated mortgage advice must come from a Central Bank-regulated intermediary or your lender.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after I submit the form?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We record your request. Before sharing details with any broker, the introduction should be confirmed with you so you stay in control of your personal data.",
        },
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <span className="dot" />Broker introduction
          </span>
          <h1>Get calm, regulated help with your mortgage plan.</h1>
          <p className="lead">A short, consent-based request — and you keep control of the handoff.</p>
        </div>
      </section>
      <section className="section tint">
        <div className="container">
          <BrokerIntroCTA />
        </div>
      </section>
    </main>
  );
}
