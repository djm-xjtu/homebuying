/**
 * Irish residential buying rules used by the calculator.
 * Last verified: 3 July 2026. These are general limits; lenders may apply stricter criteria
 * and Central Bank allowances can permit a limited share of lending above the limits.
 */
export const IRISH_RULES = {
  verifiedAt: "2026-07-03",
  lti: {
    FTB: 4,
    SSB: 3.5,
    BTL: null,
    source: "https://www.centralbank.ie/consumer-hub/explainers/what-are-the-mortgage-measures",
  },
  ltv: {
    FTB: 0.9,
    SSB: 0.9,
    BTL: 0.7,
    source: "https://www.centralbank.ie/consumer-hub/explainers/what-are-the-mortgage-measures",
  },
  stampDuty: {
    bands: [
      { upTo: 1_000_000, rate: 0.01 },
      { upTo: 1_500_000, rate: 0.02 },
      { upTo: Infinity, rate: 0.06 },
    ],
    source: "https://www.revenue.ie/en/property/stamp-duty/property/stamp-duty-property/rates.aspx",
  },
  costs: {
    legal: { min: 2_000, max: 4_000 },
    valuation: { min: 150, max: 250 },
    survey: { min: 400, max: 900 },
    snagging: { min: 300, max: 700 },
    bookingDepositRate: { min: 0.02, max: 0.05 },
    contractDepositRate: 0.1,
  },
  helpToBuy: {
    maxRelief: 30_000,
    maxPropertyValue: 500_000,
    minMortgagePercent: 0.7,
    source: "https://www.revenue.ie/en/property/help-to-buy-incentive/index.aspx",
  },
} as const;

export type BuyerType = "FTB" | "SSB" | "BTL";

export const BUYER_LABELS: Record<BuyerType, string> = {
  FTB: "First-time buyer",
  SSB: "Second/subsequent buyer",
  BTL: "Buy-to-let investor",
};
