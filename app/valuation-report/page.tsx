import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Valuation-style report (paid)",
  description: "A paid, plain-English home-buying report: affordability recap, cost plan, document checklist and questions to ask before you commit.",
};

export default function ValuationReportPage() {
  const paymentUrl = SITE.valuationReport.paymentUrl;
  const intakeUrl = SITE.valuationReport.intakeUrl;

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "HomeBuying.ie — Buying Plan Report",
    description: "A paid home-buying report for Irish buyers: an affordability recap, cost plan, document checklist and questions to confirm with your solicitor and regulated broker.",
    brand: { "@type": "Brand", name: "HomeBuying.ie" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: SITE.valuationReport.priceLabel.replace(/[^0-9.]/g, "") || "2.99",
      url: paymentUrl || SITE.url + "/valuation-report",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <span className="dot" />Paid report
          </span>
          <h1>A report you can act on, before you bid.</h1>
          <p className="lead">A simple paid product to fund the site: a buying plan report (plain English, sourced, and full of questions to ask).</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="cards">
            <div className="card">
              <div className="icon-box">
                <FileText />
              </div>
              <h3>What you get</h3>
              <ul style={{ marginTop: 14, paddingLeft: 18, lineHeight: 1.7 }}>
                <li>Affordability recap (LTI/LTV constraints + deposit reality check)</li>
                <li>Stamp duty and buying-cost plan (with the main Irish assumptions)</li>
                <li>Document checklist for your stage (loan offer, contract, BER, block policy, etc.)</li>
                <li>A ranked list of questions to confirm with your solicitor and regulated broker</li>
              </ul>
            </div>

            <div className="card">
              <div className="icon-box">
                <CheckCircle2 />
              </div>
              <h3>Pricing</h3>
              <p className="lead" style={{ marginTop: 12 }}>
                {SITE.valuationReport.priceLabel} per report
              </p>
              <p style={{ marginTop: 10 }}>
                Pay once for a single property / situation. The report is general information and preparation help — not regulated advice or a chartered valuation.
              </p>
              <div className="actions" style={{ marginTop: 18, flexWrap: "wrap" }}>
                {paymentUrl ? (
                  <a className="button" href={paymentUrl} target="_blank" rel="noreferrer">
                    Buy the report <ArrowRight size={17} />
                  </a>
                ) : (
                  <Link className="button" href="/broker-introduction">
                    Get broker help instead <ArrowRight size={17} />
                  </Link>
                )}
                {intakeUrl && (
                  <a className="button secondary" href={intakeUrl} target="_blank" rel="noreferrer">
                    After purchase: submit details
                  </a>
                )}
              </div>
              {!paymentUrl && (
                <p className="disclaimer" style={{ marginTop: 14 }}>
                  Payments are being set up. For now, you can still use the free calculator and request a broker introduction.
                </p>
              )}
            </div>

            <div className="card">
              <div className="icon-box">
                <ShieldCheck />
              </div>
              <h3>Important boundaries</h3>
              <p style={{ marginTop: 12 }}>
                We do not tell you whether to sign, borrow, waive conditions, or buy. We help you turn numbers and paperwork into structured questions.
              </p>
              <p className="disclaimer" style={{ marginTop: 12 }}>
                Always confirm decisions with your solicitor, your lender, and a Central Bank-regulated mortgage intermediary.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-heading">
            <h2>Prefer free tools?</h2>
            <p>Start with the calculator and checklist — many buyers never need anything else.</p>
          </div>
          <div className="actions">
            <Link className="button" href="/calculator">
              Mortgage calculator <ArrowRight size={17} />
            </Link>
            <Link className="button secondary" href="/checklist">
              Buying checklist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
