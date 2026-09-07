import Link from "next/link";
import { House } from "lucide-react";

export function Header() {
  return <header className="nav"><div className="container nav-inner">
    <Link href="/" className="brand"><span className="brand-mark"><House size={20} /></span>HomeBuying.ie</Link>
    <nav className="nav-links" aria-label="Primary navigation">
      <Link href="/calculator">Calculator</Link>
      <Link href="/checklist">Checklist</Link>
      <Link href="/documents">Document explainer</Link>
      <Link href="/guides">Guides</Link>
      <Link href="/broker-introduction">Broker help</Link>
      <Link href="/valuation-report">Paid report</Link>
      <Link href="/calculator" className="button small">Start your plan</Link>
    </nav>
  </div></header>;
}
