import Link from "next/link";
import { ArrowRight, Calculator, Check, ClipboardCheck, FileSearch, LockKeyhole, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <span className="dot" />Buying in Ireland, made clearer
            </span>
            <h1>From mortgage maths to moving day.</h1>
            <p className="lead">Know what you can afford, follow every step, and turn intimidating paperwork into useful questions—all in one calm place.</p>
            <div className="actions">
              <Link className="button" href="/calculator">
                Calculate my budget <ArrowRight size={17} />
              </Link>
              <Link className="button secondary" href="/checklist">
                See the full journey
              </Link>
            </div>
            <div className="microcopy">
              <span>
                <Check size={15} />Built around Irish rules
              </span>
              <span>
                <Check size={15} />No jargon
              </span>
              <span>
                <Check size={15} />Free to start
              </span>
            </div>
          </div>

          <div className="hero-card" aria-label="Example calculator result">
            <div className="hero-card-inner">
              <span className="label">Your estimated buying power</span>
              <div className="hero-total">€420,000</div>
              <span className="label">Plan readiness</span>
              <div className="meter">
                <span />
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <strong>€375k</strong>
                  <span>Estimated mortgage</span>
                </div>
                <div className="hero-stat">
                  <strong>€45k</strong>
                  <span>Your deposit</span>
                </div>
                <div className="hero-stat">
                  <strong>€1,790</strong>
                  <span>Example monthly</span>
                </div>
                <div className="hero-stat">
                  <strong>4 of 9</strong>
                  <span>Steps mapped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Three useful tools</span>
            <h2>A home-buying brain outside your head.</h2>
            <p>The numbers, tasks and paperwork stay connected, so your next step is never buried in another browser tab.</p>
          </div>
          <div className="cards">
            <div className="card">
              <div className="icon-box">
                <Calculator />
              </div>
              <h3>Mortgage & cost calculator</h3>
              <p>Estimate borrowing, deposit, monthly payments, stamp duty and often-forgotten buying costs.</p>
              <Link className="card-link" href="/calculator">
                Run your numbers <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card">
              <div className="icon-box">
                <ClipboardCheck />
              </div>
              <h3>Complete buying checklist</h3>
              <p>Follow nine milestones from AIP to keys, with documents, expected timing and common pitfalls.</p>
              <Link className="card-link" href="/checklist">
                Map the journey <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card">
              <div className="icon-box">
                <FileSearch />
              </div>
              <h3>Document explainer</h3>
              <p>Turn a loan offer, contract, BER or block policy into plain English and better questions.</p>
              <Link className="card-link" href="/documents">
                Explain a document <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="section-heading">
            <span className="eyebrow">Two monetisation paths</span>
            <h2>Make it useful — and sustainable.</h2>
            <p>We keep the core tools free. You can support the site by requesting a broker introduction or buying a paid report.</p>
          </div>
          <div className="cards">
            <div className="card">
              <h3>Free broker introduction</h3>
              <p>Consent-based handoff to a Central Bank-regulated broker to discuss mortgage options and next steps.</p>
              <Link className="card-link" href="/broker-introduction">
                Request an introduction <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card">
              <h3>Paid buying plan report</h3>
              <p>A valuation-style report: cost plan, document checklist, and questions to confirm with your solicitor and broker.</p>
              <Link className="card-link" href="/valuation-report">
                View the report offer <ArrowRight size={14} />
              </Link>
            </div>
            <div className="card">
              <h3>Short, sourced guides</h3>
              <p>Answer common questions (stamp duty, Help to Buy, surveys, insurance) with official source links.</p>
              <Link className="card-link" href="/guides">
                Browse guides <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">The road to your front door</span>
            <h2>Every big moment, in the right order.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <h3>Get mortgage-ready</h3>
              <p>Budget, documents, deposit, AIP.</p>
            </div>
            <div className="step">
              <h3>Find and check</h3>
              <p>View, bid, survey, title checks.</p>
            </div>
            <div className="step">
              <h3>Commit safely</h3>
              <p>Loan offer, contracts, insurance.</p>
            </div>
            <div className="step">
              <h3>Close and move</h3>
              <p>Funds, duty, keys, utilities.</p>
            </div>
          </div>
          <div className="actions" style={{ justifyContent: "center", marginTop: 48 }}>
            <Link className="button" href="/checklist">
              Open the full checklist
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: "center", maxWidth: 770 }}>
          <div className="icon-box" style={{ margin: "0 auto 22px" }}>
            <ShieldCheck />
          </div>
          <h2>Useful guidance, honest boundaries.</h2>
          <p className="lead">We explain information and help you prepare questions. We do not tell you whether to sign, borrow, or buy. Your solicitor, regulated broker and lender remain the decision-grade experts.</p>
          <div className="microcopy" style={{ justifyContent: "center", marginTop: 25 }}>
            <span>
              <LockKeyhole size={15} />Uploads not retained
            </span>
            <span>
              <ShieldCheck size={15} />Sources shown
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

