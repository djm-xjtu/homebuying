"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import { LeadModal } from "@/components/lead-modal";

export function BrokerIntroCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card" style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, marginBottom: 8 }}>Request a free broker introduction</h2>
        <p style={{ marginBottom: 18 }}>
          If you want help comparing lenders, rates, exemptions, or the paperwork timeline, we can record your request and (with your confirmation) introduce you to a participating Central Bank-regulated broker.
        </p>
        <div className="microcopy" style={{ marginBottom: 16 }}>
          <span>
            <BadgeCheck size={15} />Consent-based
          </span>
          <span>
            <ShieldCheck size={15} />General guidance only
          </span>
        </div>
        <button className="button" onClick={() => setOpen(true)}>
          Request an introduction <ArrowRight size={17} />
        </button>
        <p className="disclaimer" style={{ marginTop: 16 }}>
          HomeBuying.ie is an introducer, not a mortgage intermediary. The broker must explain its service and remuneration. You can withdraw consent at any time.
        </p>
      </div>

      <LeadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
