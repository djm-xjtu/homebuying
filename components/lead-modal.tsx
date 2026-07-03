"use client";

import { FormEvent, useState } from "react";
import { Check, X } from "lucide-react";
import { track } from "@/lib/analytics";

export function LeadModal({ open, onClose, estimatedLoan }: { open: boolean; onClose: () => void; estimatedLoan?: number }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  if (!open) return null;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, estimatedLoan }) });
    setStatus(response.ok ? "done" : "error"); if(response.ok)track("broker_lead_submitted",{hasEstimatedLoan:Boolean(estimatedLoan)});
  }
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Broker introduction"><div className="modal">
    <div className="modal-head"><h2 style={{fontSize:30}}>Talk to a regulated broker</h2><button className="icon-button" onClick={onClose} aria-label="Close"><X/></button></div>
    {status === "done" ? <div className="success"><div className="icon-box"><Check/></div><h3>Thanks — your request is recorded.</h3><p>We’ll only share these details with a participating Central Bank-regulated broker after confirming the introduction.</p><button className="button" onClick={onClose}>Done</button></div> : <form onSubmit={submit} className="form-grid">
      <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" /></div>
      <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" required autoComplete="tel" /></div>
      <div className="field full"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      <div className="field full"><label htmlFor="need">What would you like help with?</label><textarea id="need" name="need" rows={3} defaultValue="Mortgage options and next steps" /></div>
      <label className="field full" style={{flexDirection:"row",alignItems:"flex-start"}}><input type="checkbox" name="consent" required style={{width:18,marginTop:3}}/><span className="hint">I consent to HomeBuying.ie contacting me about this request and, with confirmation, introducing me to a regulated broker. I can withdraw consent at any time.</span></label>
      {status === "error" && <p className="field full" style={{color:"var(--danger)"}}>We couldn’t save that request. Please try again.</p>}
      <button className="button field full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request a free introduction"}</button>
      <p className="disclaimer field full">A broker may receive commission from a lender. The broker must disclose the nature of its services and remuneration to you. HomeBuying.ie is an introducer, not a mortgage intermediary.</p>
    </form>}
  </div></div>;
}
