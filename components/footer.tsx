import Link from "next/link";
import { House } from "lucide-react";

export function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-grid">
      <div><div className="brand"><span className="brand-mark"><House size={19}/></span>HomeBuying.ie</div><p style={{marginTop:16,maxWidth:430}}>Clear tools and plain-English information for buying a home in Ireland. Built for buyers, not bankers.</p></div>
      <div><h3>Plan your purchase</h3><div className="footer-links"><Link href="/calculator">Mortgage calculator</Link><Link href="/checklist">Buying checklist</Link><Link href="/documents">Document explainer</Link></div></div>
      <div><h3>Important</h3><div className="footer-links"><Link href="/about">About & disclaimer</Link><Link href="/privacy">Privacy policy</Link><Link href="/guides">Buyer guides</Link></div></div>
    </div>
    <div className="footer-bottom">HomeBuying.ie provides general information and estimates only. It is not a financial intermediary, solicitor, tax adviser, or other regulated adviser. Confirm decisions with a Central Bank-regulated mortgage adviser, your solicitor, Revenue, and the relevant authority. © {new Date().getFullYear()} HomeBuying.ie.</div>
  </div></footer>;
}
