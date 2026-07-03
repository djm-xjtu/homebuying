import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/calculator";
import { IRISH_RULES } from "@/lib/irish-rules";

export const metadata: Metadata = { title: "Irish Mortgage & Stamp Duty Calculator", description: "Estimate how much you could borrow, monthly repayments, deposit, Irish stamp duty, and buying costs." };

export default function CalculatorPage() {
  const faq = { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:[
    {"@type":"Question",name:"How much can a first-time buyer borrow in Ireland?",acceptedAnswer:{"@type":"Answer",text:"The Central Bank loan-to-income limit is generally four times gross income for first-time buyers, subject to lender affordability checks and limited allowances."}},
    {"@type":"Question",name:"How much deposit does an Irish first-time buyer need?",acceptedAnswer:{"@type":"Answer",text:"The general loan-to-value limit is 90%, implying at least a 10% deposit, although fees and other purchase costs require additional funds."}}
  ]};
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faq)}}/>
    <section className="page-hero"><div className="container"><span className="eyebrow"><span className="dot"/>Irish mortgage calculator</span><h1>Know your numbers before the viewing.</h1><p className="lead">A practical estimate of borrowing, deposit, repayments, stamp duty and the costs that are easy to forget.</p></div></section>
    <section className="section"><div className="container"><MortgageCalculator/></div></section>
    <section className="section tint"><div className="container"><div className="section-heading"><h2>Rules, with receipts.</h2><p>Calculator assumptions live in one maintainable rules file and link to the relevant authority.</p></div><div className="cards">
      <div className="card"><h3>Loan-to-income</h3><p>FTB 4×; second/subsequent buyer 3.5×. BTL has no mortgage-measures LTI cap.</p><a className="source" href={IRISH_RULES.lti.source} target="_blank" rel="noreferrer">Central Bank source</a></div>
      <div className="card"><h3>Loan-to-value</h3><p>90% for principal-home buyers and 70% for buy-to-let buyers.</p><a className="source" href={IRISH_RULES.ltv.source} target="_blank" rel="noreferrer">Central Bank source</a></div>
      <div className="card"><h3>Residential stamp duty</h3><p>Progressive rates of 1%, 2%, and 6% across the current bands.</p><a className="source" href={IRISH_RULES.stampDuty.source} target="_blank" rel="noreferrer">Revenue source</a></div>
    </div></div></section>
  </main>;
}
