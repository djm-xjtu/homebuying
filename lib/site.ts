export const SITE = {
  name: "HomeBuying.ie",
  // Configure this in production so canonical URLs, sitemap, and Open Graph are correct.
  // Examples:
  // - https://homebuying.ie
  // - https://djm-xjtu.github.io/homebuying
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://homebuying.ie",
  valuationReport: {
    // External payment link (Stripe Payment Link / Gumroad product, etc.)
    paymentUrl: process.env.NEXT_PUBLIC_VALUATION_PAYMENT_URL ?? "",
    // External intake form (Typeform / Google Form, etc.) used after payment.
    intakeUrl: process.env.NEXT_PUBLIC_VALUATION_INTAKE_URL ?? "",
    priceLabel: process.env.NEXT_PUBLIC_VALUATION_PRICE_LABEL ?? "€2.99",
  },
} as const;
