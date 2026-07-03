"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { BUYER_LABELS, IRISH_RULES } from "@/lib/irish-rules";
import type { BuyerType } from "@/lib/irish-rules";
import { calculateMortgage, euro } from "@/lib/calculator";
import { LeadModal } from "./lead-modal";
import { track } from "@/lib/analytics";

const defaults = { buyerType: "FTB" as BuyerType, income1: 65000, income2: 35000, deposit: 45000, targetPrice: 400000, interestRate: 4, termYears: 30, newBuild: false };

export function MortgageCalculator({ compact = false }: { compact?: boolean }) {
  const [input, setInput] = useState(defaults);
  const [leadOpen, setLeadOpen] = useState(false);
  const result = useMemo(() => calculateMortgage(input), [input]);
  const setNumber = (key: keyof typeof input, value: string) => setInput(current => ({ ...current, [key]: Number(value) || 0 }));

  return <><div className="tool-grid">
    <div className="panel">
      <h3>Your buying plan</h3><p className="hint">Tell us what you know. You can adjust every number.</p>
      <div className="form-grid">
        <div className="field full"><label htmlFor="buyer">Buyer type</label><select id="buyer" value={input.buyerType} onChange={e => setInput({...input,buyerType:e.target.value as BuyerType})}>{Object.entries(BUYER_LABELS).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></div>
        <div className="field"><label htmlFor="income1">Your gross income</label><input id="income1" type="number" min="0" step="1000" value={input.income1} onChange={e=>setNumber("income1",e.target.value)}/></div>
        <div className="field"><label htmlFor="income2">Second income</label><input id="income2" type="number" min="0" step="1000" value={input.income2} onChange={e=>setNumber("income2",e.target.value)}/></div>
        <div className="field"><label htmlFor="deposit">Savings / deposit</label><input id="deposit" type="number" min="0" step="1000" value={input.deposit} onChange={e=>setNumber("deposit",e.target.value)}/></div>
        <div className="field"><label htmlFor="price">Target property price</label><input id="price" type="number" min="0" step="5000" value={input.targetPrice} onChange={e=>setNumber("targetPrice",e.target.value)}/></div>
        {!compact && <><div className="field"><label htmlFor="rate">Interest rate (%)</label><input id="rate" type="number" min="0" max="20" step="0.1" value={input.interestRate} onChange={e=>setNumber("interestRate",e.target.value)}/></div>
        <div className="field"><label htmlFor="term">Mortgage term</label><select id="term" value={input.termYears} onChange={e=>setNumber("termYears",e.target.value)}>{[15,20,25,30,35].map(year=><option key={year} value={year}>{year} years</option>)}</select></div></>}
        <label className="field full" style={{flexDirection:"row",alignItems:"center"}}><input type="checkbox" checked={input.newBuild} onChange={e=>setInput({...input,newBuild:e.target.checked})} style={{width:18}}/> This is a new build</label>
      </div>
    </div>
    <aside className="panel sticky" aria-live="polite">
      <div className="result-main"><span className="label">Estimated mortgage</span><div className="big">{euro(result.estimatedLoan)}</div><p>Approx. {euro(result.monthly)} per month at {input.interestRate}% over {input.termYears} years</p></div>
      <div className="result-row"><span>Maximum affordable price</span><strong>{euro(result.affordablePrice)}</strong></div>
      <div className="result-row"><span>Minimum deposit at target</span><strong>{euro(result.requiredDeposit)}</strong></div>
      <div className="result-row"><span>Stamp duty estimate</span><strong>{euro(result.stampDuty)}</strong></div>
      <div className="result-row"><span>Other buying costs</span><strong>{euro(result.costsLow)}–{euro(result.costsHigh)}</strong></div>
      {result.fundingGap > 0 && <div className="notice" style={{marginTop:16}}><Info size={15} style={{verticalAlign:"middle",marginRight:6}}/>Your target has an estimated funding gap of <strong>{euro(result.fundingGap)}</strong>.</div>}
      {result.helpToBuyPotentiallyEligible && <div className="notice" style={{marginTop:16}}>You may meet the headline Help to Buy conditions. Revenue determines the actual relief, up to {euro(IRISH_RULES.helpToBuy.maxRelief)}.</div>}
      {!compact && <details style={{marginTop:18}}><summary style={{fontWeight:800,fontSize:13,cursor:"pointer"}}>Rate sensitivity</summary>{result.stress.map(row=><div className="result-row" key={row.rate}><span>At {row.rate.toFixed(1)}%</span><strong>{euro(row.monthly)}/month</strong></div>)}</details>}
      <button className="button" style={{width:"100%",marginTop:20}} onClick={()=>{track("calculation_completed",{buyerType:input.buyerType,hasFundingGap:result.fundingGap>0});setLeadOpen(true)}}>Get broker help <ArrowRight size={17}/></button>
      <p className="disclaimer">Estimate only, based on general Central Bank mortgage measures verified {IRISH_RULES.verifiedAt}. Lenders assess affordability individually and limited exceptions may apply. This is not financial, tax, or legal advice.</p>
    </aside>
  </div><LeadModal open={leadOpen} onClose={()=>setLeadOpen(false)} estimatedLoan={result.estimatedLoan}/></>;
}
