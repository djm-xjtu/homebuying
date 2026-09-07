"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, LoaderCircle, Lock, MessageCircleQuestion, Trash2, Upload } from "lucide-react";
import type { DocumentAnalysis, DocumentType } from "@/lib/document-analysis";
import { demoAnalyse } from "@/lib/document-analysis";
import { track } from "@/lib/analytics";

async function extractPdfText(file: File) {
  const arrayBuffer = await file.arrayBuffer();

  // Client-side PDF parsing for GitHub Pages (static). No uploads.
  // pdfjs-dist is a runtime dependency only used in the browser.
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const { getDocument, GlobalWorkerOptions, version } = pdfjs as unknown as {
    getDocument: (args: unknown) => { promise: unknown };
    GlobalWorkerOptions: { workerSrc: string };
    version: string;
  };

  // Use a CDN worker to avoid bundling worker assets.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${String(version)}/pdf.worker.min.js`;

  const loadingTask = getDocument({ data: arrayBuffer }) as any;
  const doc = await loadingTask.promise;

  const total = Math.min(Number(doc.numPages || 0), 60);
  let text = "";

  for (let pageNo = 1; pageNo <= total; pageNo += 1) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const page = await doc.getPage(pageNo);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const content = await page.getTextContent();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const items = content.items as Array<{ str?: string }>;
    text += items.map(x => x.str ?? "").join(" ") + "\n";
  }

  return text.trim();
}

export function DocumentExplainer() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<DocumentType>("loan-offer");
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const input = useRef<HTMLInputElement>(null);

  function choose(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0];
    if (next) validate(next);
  }

  function validate(next: File) {
    setError("");
    setAnalysis(null);
    if (next.type !== "application/pdf") {
      setError("Please choose a PDF file.");
      return;
    }
    if (next.size > 10 * 1024 * 1024) {
      setError("The maximum file size is 10 MB.");
      return;
    }
    setFile(next);
    track("document_selected", { type, sizeBucketMb: Math.ceil(next.size / 1024 / 1024) });
  }

  function drop(event: DragEvent) {
    event.preventDefault();
    setDrag(false);
    const next = event.dataTransfer.files[0];
    if (next) validate(next);
  }

  async function analyse() {
    if (!file) return;
    setLoading(true);
    setError("");

    try {
      const text = await extractPdfText(file);
      const result = demoAnalyse(text, type);
      setAnalysis(result);
      track("document_analysis_completed", { type, mode: result.mode });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setFile(null);
    setAnalysis(null);
    setError("");
    if (input.current) input.current.value = "";
  }

  return (
    <div className="tool-grid">
      <div className="panel">
        <div className="field" style={{ marginBottom: 18 }}>
          <label htmlFor="docType">Document type</label>
          <select id="docType" value={type} onChange={e => setType(e.target.value as DocumentType)}>
            <option value="loan-offer">Loan offer</option>
            <option value="contract">Mortgage contract</option>
            <option value="sale-contract">Contract for Sale</option>
            <option value="ber">BER certificate</option>
            <option value="block-policy">Block / apartment insurance policy</option>
            <option value="other">Other home-buying document</option>
          </select>
        </div>

        <div
          className={`upload ${drag ? "dragging" : ""}`}
          onDragOver={e => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={drop}
        >
          <Upload size={35} />
          <h3 style={{ marginTop: 14 }}>Drop a PDF here</h3>
          <p className="hint">PDF only · up to 10 MB · processed locally in your browser</p>
          <input ref={input} type="file" accept="application/pdf" onChange={choose} hidden />
          <button className="button secondary" onClick={() => input.current?.click()}>
            Choose a document
          </button>
        </div>

        {file && (
          <div className="result-row">
            <span>
              <FileText size={16} style={{ verticalAlign: "middle", marginRight: 8 }} />
              {file.name} <small>({(file.size / 1024 / 1024).toFixed(1)} MB)</small>
            </span>
            <button className="icon-button" onClick={clear} aria-label="Remove file">
              <Trash2 size={18} />
            </button>
          </div>
        )}

        {error && (
          <div className="notice" style={{ marginTop: 15, color: "var(--danger)" }}>
            {error}
          </div>
        )}

        <button className="button" style={{ width: "100%", marginTop: 18 }} disabled={!file || loading} onClick={analyse}>
          {loading ? (
            <>
              <LoaderCircle className="spin" size={18} />Reading document…
            </>
          ) : (
            "Explain this document"
          )}
        </button>

        <div className="privacy-strip">
          <Lock size={20} />
          <span>
            <strong>Private by design.</strong> On GitHub Pages, this analyser runs in your browser and does not upload the PDF to the site.
          </span>
        </div>
      </div>

      <aside className="panel">
        {!analysis ? (
          <div className="empty">
            <FileText size={38} />
            <h3 style={{ marginTop: 13 }}>Your explanation appears here</h3>
            <p>We’ll organise it into plain English, points to notice, and questions for your professional adviser.</p>
          </div>
        ) : (
          <>
            <span className="eyebrow">
              <span className="dot" />Local demo analysis
            </span>
            <h2 style={{ fontSize: 33, marginTop: 12 }}>{analysis.title}</h2>
            <div className="analysis-section">
              <h3>
                <CheckCircle2 size={19} />In plain English
              </h3>
              <ul>{analysis.summary.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="analysis-section">
              <h3>
                <AlertTriangle size={19} />Points to notice
              </h3>
              {analysis.flags.map(x => (
                <div className="flag" key={x.label}>
                  <strong>{x.label}</strong>
                  <div className="hint">{x.detail}</div>
                </div>
              ))}
            </div>
            <div className="analysis-section">
              <h3>
                <MessageCircleQuestion size={19} />Questions to ask
              </h3>
              <ol>
                {analysis.questions.map(x => (
                  <li key={x} style={{ marginBottom: 9 }}>
                    {x}
                  </li>
                ))}
              </ol>
            </div>
            <p className="disclaimer">
              Automated explanation only—not legal, financial, insurance, energy, or mortgage advice. It may be incomplete or wrong. Do not rely on it to sign, borrow, waive conditions, or buy. Check the original document with your solicitor, regulated broker/lender, insurer, or BER assessor.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}
