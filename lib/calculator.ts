import { IRISH_RULES } from "./irish-rules.ts";
import type { BuyerType } from "./irish-rules.ts";

export type CalculatorInputs = {
  buyerType: BuyerType;
  income1: number;
  income2: number;
  deposit: number;
  targetPrice: number;
  interestRate: number;
  termYears: number;
  newBuild: boolean;
};

export type CalculatorResult = ReturnType<typeof calculateMortgage>;

export function stampDuty(price: number): number {
  if (price <= 0) return 0;
  let remaining = price;
  let previous = 0;
  let tax = 0;
  for (const band of IRISH_RULES.stampDuty.bands) {
    const taxable = Math.max(0, Math.min(remaining, band.upTo - previous));
    tax += taxable * band.rate;
    remaining -= taxable;
    previous = band.upTo;
    if (remaining <= 0) break;
  }
  return tax;
}

export function monthlyRepayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const payments = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / payments;
  return principal * (monthlyRate * (1 + monthlyRate) ** payments) / ((1 + monthlyRate) ** payments - 1);
}

export function calculateMortgage(input: CalculatorInputs) {
  const income = Math.max(0, input.income1) + Math.max(0, input.income2);
  const ltv = IRISH_RULES.ltv[input.buyerType];
  const lti = IRISH_RULES.lti[input.buyerType];
  // There is no Central Bank LTI cap for BTL in the mortgage measures. This is deliberately
  // shown as price/LTV constrained rather than inventing a lender-specific income rule.
  const incomeLoanLimit = lti === null ? Infinity : income * lti;
  const depositPriceLimit = input.deposit / (1 - ltv);
  const affordablePrice = Math.max(0, Math.min(depositPriceLimit, incomeLoanLimit === Infinity ? depositPriceLimit : incomeLoanLimit + input.deposit));
  const chosenPrice = input.targetPrice > 0 ? input.targetPrice : affordablePrice;
  const ltvDeposit = chosenPrice * (1 - ltv);
  const incomeDeposit = Number.isFinite(incomeLoanLimit) ? Math.max(0, chosenPrice - incomeLoanLimit) : 0;
  const requiredDeposit = Math.max(ltvDeposit, incomeDeposit);
  const targetLoan = Math.max(0, chosenPrice - input.deposit);
  const maxLoan = Math.max(0, Math.min(incomeLoanLimit, chosenPrice * ltv));
  const estimatedLoan = Math.min(targetLoan, maxLoan);
  const fundingGap = Math.max(0, chosenPrice - input.deposit - estimatedLoan);
  const duty = stampDuty(chosenPrice);
  const monthly = monthlyRepayment(estimatedLoan, input.interestRate, input.termYears);
  const costType = input.newBuild ? "snagging" : "survey";
  const professional = IRISH_RULES.costs[costType];
  const costsLow = IRISH_RULES.costs.legal.min + IRISH_RULES.costs.valuation.min + professional.min;
  const costsHigh = IRISH_RULES.costs.legal.max + IRISH_RULES.costs.valuation.max + professional.max;
  const helpToBuyPotentiallyEligible = input.buyerType === "FTB" && input.newBuild && chosenPrice <= IRISH_RULES.helpToBuy.maxPropertyValue && estimatedLoan >= chosenPrice * IRISH_RULES.helpToBuy.minMortgagePercent;

  return {
    income,
    incomeLoanLimit: Number.isFinite(incomeLoanLimit) ? incomeLoanLimit : null,
    affordablePrice,
    requiredDeposit,
    chosenPrice,
    estimatedLoan,
    fundingGap,
    monthly,
    stampDuty: duty,
    costsLow,
    costsHigh,
    helpToBuyPotentiallyEligible,
    stress: [-2, -1, 1, 2].map(change => ({ rate: Math.max(0, input.interestRate + change), monthly: monthlyRepayment(estimatedLoan, Math.max(0, input.interestRate + change), input.termYears) })),
  };
}

export const euro = (value: number, maximumFractionDigits = 0) => new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits }).format(Number.isFinite(value) ? value : 0);
