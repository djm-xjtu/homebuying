# HomeBuying.ie MVP

A mobile-first Irish home-buying navigator: mortgage and cost estimates, a stage-by-stage checklist, cautious PDF explanations, and consent-based broker lead capture.

## What works

- `/calculator`: LTI/LTV affordability, annuity repayments, rate sensitivity, progressive residential stamp duty, cost ranges, and a Help to Buy orientation flag.
- `/checklist`: nine expandable milestones with browser-local progress persistence.
- `/documents`: in-memory PDF parsing. With no API key it runs a clearly labelled local phrase extractor; with an OpenAI key it requests structured, non-advisory analysis.
- Broker introduction modal and validated server endpoint. The local adapter writes to `data/leads.jsonl` with restrictive file permissions.
- Static guides, metadata, sitemap, robots, Article/FAQ structured data, disclaimers, and a draft privacy page.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run build
```

## Environment

Copy `.env.example` to `.env.local`. `OPENAI_API_KEY` is optional; without it the document route remains usable in local demo mode. The API is called server-side and the key is never exposed to the browser.

## Rules and sources

All numeric policy assumptions are in `lib/irish-rules.ts`, with official source links and a `verifiedAt` date. As of 3 July 2026 the implementation reflects:

- Central Bank mortgage measures: FTB LTI 4×, SSB LTI 3.5×; 90% principal-home and 70% BTL maximum LTV. The calculator does not invent a BTL LTI cap.
- Revenue residential stamp duty: 1% on the first €1m, 2% on the portion from €1m to €1.5m, and 6% above €1.5m.
- Revenue Help to Buy headline checks: FTB, qualifying new home, value up to €500k, qualifying loan of at least 70%, and enhanced relief up to €30k. Actual relief also depends on tax paid and other conditions.

Calculator outputs are estimates, not underwriting decisions or regulated advice.

## Production hardening checklist

This repository is a working product MVP, not a claim that regulated, privacy, or operational launch work is complete.

1. Obtain Irish counsel review of the introducer model, Consumer Protection Code implications, marketing claims, AI disclaimers, terms, professional indemnity/cyber cover, and legal-services referral restrictions.
2. Replace file-based lead persistence with encrypted EU-region Postgres, role-based access, audit logs, verified deletion/retention jobs, and a processor inventory/DPA set.
3. Add authentication and a database-backed `ChecklistProgress` repository if cross-device sync is required. The current privacy-first browser persistence is intentional and disclosed in the UI.
4. Complete the privacy notice with the controller identity, contact, lawful bases, exact retention, subprocessors/transfers, cookies/analytics, and data-subject request process. Perform a DPIA for document analysis.
5. Configure a model provider with an appropriate enterprise data-retention agreement. Add OCR for scanned PDFs, malware scanning, encryption/key management if files are ever retained, per-user quotas, rate limiting, abuse controls, and deletion verification.
6. Verify every partner against the Central Bank register immediately before activation and disclose all remuneration/conflicts. Add a double-confirmation handoff rather than silently sharing a lead.
7. Add transactional email, monitoring, error reporting, consent-version tracking, analytics with consent controls, accessibility testing, and browser E2E tests.
8. Re-check policy config against official sources before each release and on a scheduled basis.

## Architecture notes

- The calculation domain is pure TypeScript and covered by Node tests.
- Uploads are capped at 10 MB/60 pages and handled in server memory; the original PDF and extracted text are not written by this app.
- The model prompt forbids sign/buy/borrow conclusions. Responses are schema-validated, but the UI still treats them as fallible automated explanations.
- Broker consent is explicit. The production handoff should preserve evidence of the privacy notice and consent version shown at submission time.
