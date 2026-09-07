"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, ExternalLink, X } from "lucide-react";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/site";

export function LeadModal({ open, onClose, estimatedLoan }: { open: boolean; onClose: () => void; estimatedLoan?: number }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const leadFormUrl = SITE.broker.leadFormUrl;

  const isExternalFormEnabled = useMemo(() => Boolean(leadFormUrl), [leadFormUrl]);

  if (!open) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, FormDataEntryValue>;
      const payload = { ...data, estimatedLoan } as Record<string, FormDataEntryValue | number | undefined>;
      track("broker_lead_submitted", { hasEstimatedLoan: Boolean(estimatedLoan), mode: isExternalFormEnabled ? "external" : "disabled" });

      if (!leadFormUrl) {
        setStatus("done");
        return;
      }

      // For GitHub Pages (static), we hand off to an external form endpoint.
      // We append a few fields as query parameters when possible.
      let url = leadFormUrl;
      if (/^https?:\/\//i.test(leadFormUrl)) {
        const u = new URL(leadFormUrl);
        if (payload["name"]) u.searchParams.set("name", String(payload["name"]));
        if (payload["email"]) u.searchParams.set("email", String(payload["email"]));
        if (payload["phone"]) u.searchParams.set("phone", String(payload["phone"]));
        if (payload["need"]) u.searchParams.set("need", String(payload["need"]));
        if (typeof estimatedLoan === "number") u.searchParams.set("estimatedLoan", String(estimatedLoan));
        url = u.toString();
      }

      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Broker introduction">
      <div className="modal">
        <div className="modal-head">
          <h2 style={{ fontSize: 30 }}>Talk to a regulated broker</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        {status === "done" ? (
          <div className="success">
            <div className="icon-box">
              <Check />
            </div>
            <h3>Thanks — your request is ready.</h3>
            <p>
              {leadFormUrl
                ? "We’ve opened the broker-introduction form in a new tab so you can complete the request."
                : "This static demo can’t store leads yet. Set NEXT_PUBLIC_LEAD_FORM_URL to enable an external form handoff."}
            </p>
            <button className="button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="form-grid">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" required autoComplete="tel" />
            </div>
            <div className="field full">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field full">
              <label htmlFor="need">What would you like help with?</label>
              <textarea id="need" name="need" rows={3} defaultValue="Mortgage options and next steps" />
            </div>
            <label className="field full" style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <input type="checkbox" name="consent" required style={{ width: 18, marginTop: 3 }} />
              <span className="hint">I consent to being contacted about this request and (with confirmation) introduced to a regulated broker. I can withdraw consent at any time.</span>
            </label>
            {status === "error" && <p className="field full" style={{ color: "var(--danger)" }}>We couldn’t open the handoff form. Please try again.</p>}
            <button className="button field full" disabled={status === "sending"}>
              {status === "sending" ? "Opening…" : isExternalFormEnabled ? (
                <>
                  Continue to form <ExternalLink size={16} style={{ marginLeft: 8 }} />
                </>
              ) : (
                "Request a free introduction"
              )}
            </button>
            <p className="disclaimer field full">
              A broker may receive commission from a lender. The broker must disclose the nature of its services and remuneration to you. HomeBuying.ie is an introducer, not a mortgage intermediary.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
