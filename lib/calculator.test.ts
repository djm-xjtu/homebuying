import assert from "node:assert/strict";
import test from "node:test";
import { calculateMortgage, monthlyRepayment, stampDuty } from "./calculator.ts";

test("stamp duty is progressive across all residential bands", () => {
  assert.equal(stampDuty(500_000), 5_000);
  assert.equal(stampDuty(1_200_000), 14_000);
  assert.equal(stampDuty(1_600_000), 26_000);
});

test("monthly repayment handles interest and zero rate", () => {
  assert.equal(Math.round(monthlyRepayment(300_000, 4, 30)), 1432);
  assert.equal(monthlyRepayment(120_000, 0, 10), 1000);
});

test("FTB borrowing is constrained by 4x income and 90% LTV", () => {
  const result = calculateMortgage({ buyerType: "FTB", income1: 70_000, income2: 0, deposit: 40_000, targetPrice: 350_000, interestRate: 4, termYears: 30, newBuild: false });
  assert.equal(result.incomeLoanLimit, 280_000);
  assert.equal(result.estimatedLoan, 280_000);
  assert.equal(result.fundingGap, 30_000);
  assert.equal(result.requiredDeposit, 70_000);
});

test("HTB only flags a qualifying FTB new build scenario", () => {
  const result = calculateMortgage({ buyerType: "FTB", income1: 90_000, income2: 0, deposit: 40_000, targetPrice: 400_000, interestRate: 4, termYears: 30, newBuild: true });
  assert.equal(result.helpToBuyPotentiallyEligible, true);
});
