# HomeBuying.ie MVP

A mobile-first Irish home-buying navigator: mortgage and cost estimates, a stage-by-stage checklist, cautious PDF explanations, and consent-based broker lead capture.

## What works

- `/calculator`: LTI/LTV affordability, annuity repayments, rate sensitivity, progressive residential stamp duty, cost ranges, and a Help to Buy orientation flag.
- `/checklist`: nine expandable milestones with browser-local progress persistence.
- `/documents`: client-side PDF parsing (in your browser) and a clearly labelled local demo analyser. No uploads.
- Broker introduction modal and landing page. For GitHub Pages (static), it hands off to an external form URL you configure.
- Static guides, metadata, sitemap, robots, Open Graph images, structured data, disclaimers, and a draft privacy page.
- SEO landing pages for monetisation: `/broker-introduction` (lead capture) and `/valuation-report` (paid report offer with configurable payment link).

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

## GitHub Pages deployment

This project is configured to deploy as a **static export** to GitHub Pages (Project Pages) via GitHub Actions.

- Pages URL (after merge + first deploy): `https://djm-xjtu.github.io/homebuying/`
- Workflow: `.github/workflows/pages.yml`

Important: GitHub Pages is static, so **server-side API routes are not available**. Lead capture and payments use external links:
- Broker leads: set `NEXT_PUBLIC_LEAD_FORM_URL` to a Typeform / Google Form / Formspree endpoint.
- Paid report: set `NEXT_PUBLIC_VALUATION_PAYMENT_URL` (Stripe Payment Link / Gumroad) and optionally `NEXT_PUBLIC_VALUATION_INTAKE_URL`.

## Environment

Copy `.env.example` to `.env.local`.
- `NEXT_PUBLIC_SITE_URL` should match your deployment base URL.
- For GitHub Pages, set `NEXT_PUBLIC_BASE_PATH=/homebuying`.

## Rules and sources

All numeric policy assumptions are in `lib/irish-rules.ts`, with official source links and a `verifiedAt` date. As of 3 July 2026 the implementation reflects:

- Central Bank mortgage measures: FTB LTI 4×, SSB LTI 3.5×; 90% principal-home and 70% BTL maximum LTV. The calculator does not invent a BTL LTI cap.
- Revenue residential stamp duty: 1% on the first €1m, 2% on the portion from €1m to €1.5m, and 6% above €1.5m.
- Revenue Help to Buy headline checks: FTB, qualifying new home, value up to €500k, qualifying loan of at least 70%, and enhanced relief up to €30k. Actual relief also depends on tax paid and other conditions.

Calculator outputs are estimates, not underwriting decisions or regulated advice.

## Production hardening checklist

This repository is a working product MVP, not a claim that regulated, privacy, or operational launch work is complete.

1. Obtain Irish counsel review of the introducer model, Consumer Protection Code implications, marketing claims, terms, professional indemnity/cyber cover, and legal-services referral restrictions.
2. If you collect broker leads directly (instead of an external form provider), store them in an encrypted EU-region database with role-based access, audit logs, and an explicit retention/deletion job.
3. Add authentication and a database-backed `ChecklistProgress` repository if cross-device sync is required. The current privacy-first browser persistence is intentional and disclosed in the UI.
4. Complete the privacy notice with the controller identity, contact, lawful bases, exact retention, subprocessors/transfers, cookies/analytics, and data-subject request process.
5. If you add server-side document analysis later, perform a DPIA, add malware scanning, OCR for scanned PDFs, rate limiting, abuse controls, and verified deletion.
6. Verify every partner against the Central Bank register immediately before activation and disclose all remuneration/conflicts. Add a double-confirmation handoff rather than silently sharing a lead.
7. Add monitoring, error reporting, consent-version tracking, analytics with consent controls, accessibility testing, and browser E2E tests.
8. Re-check policy config against official sources before each release and on a scheduled basis.

## Architecture notes

- The calculation domain is pure TypeScript and covered by Node tests.
- On GitHub Pages, document analysis runs locally in the browser and does not upload PDFs to the site.
- Broker consent is explicit. The production handoff should preserve evidence of the privacy notice and consent version shown at submission time.
