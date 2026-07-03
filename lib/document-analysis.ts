export type DocumentType = "loan-offer" | "contract" | "ber" | "block-policy" | "sale-contract" | "other";
export type DocumentAnalysis = { title:string; summary:string[]; flags:{label:string;detail:string}[]; questions:string[]; mode:"ai"|"demo" };

const patterns: Record<string,{label:string; regex:RegExp}> = {
  interestRate: { label:"Interest rate", regex:/interest rate.{0,50}?(\d+(?:\.\d+)?\s*%)/i },
  term: { label:"Term", regex:/(?:mortgage|loan) term.{0,40}?(\d+\s*(?:years?|months?))/i },
  repayment: { label:"Repayment", regex:/(?:monthly repayment|instalment).{0,40}?(€\s?[\d,.]+)/i },
  expiry: { label:"Expiry or deadline", regex:/(?:expires?|expiry|not later than).{0,55}?((?:\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})|(?:\d{1,2}\s+[A-Za-z]+\s+\d{4}))/i },
  excess: { label:"Policy excess", regex:/excess.{0,40}?(€\s?[\d,.]+)/i },
  ber: { label:"BER rating", regex:/(?:BER|energy rating).{0,25}?\b(A[1-3]|B[1-3]|C[1-3]|D[12]|E[12]|F|G)\b/i },
};

export function demoAnalyse(text:string,type:DocumentType):DocumentAnalysis {
  const clean=text.replace(/\s+/g," ").trim();
  const found=Object.values(patterns).flatMap(({label,regex})=>{const match=clean.match(regex);return match?[`${label}: ${match[1]}`]:[]});
  const typeName={"loan-offer":"Loan offer","contract":"Mortgage contract","ber":"BER certificate","block-policy":"Block insurance policy","sale-contract":"Contract for Sale","other":"Document"}[type];
  const flags:{label:string;detail:string}[]=[];
  if (/special condition/i.test(clean)) flags.push({label:"Special conditions found",detail:"Review every special condition and confirm who is responsible for satisfying it before drawdown or signing."});
  if (/clawback|early repayment charge|break (?:fee|cost)/i.test(clean)) flags.push({label:"Potential repayment or clawback term",detail:"Ask for the exact trigger, calculation method and euro example before relying on this summary."});
  if (/exclusion|not covered|excluded/i.test(clean)) flags.push({label:"Exclusions language found",detail:"Check the relevant exclusions against the property and lender requirements."});
  if (!flags.length) flags.push({label:"No automatic red flags extracted",detail:"This does not mean the document is risk-free. The local demo analyser only detects a small set of phrases."});
  return {title:`${typeName} explanation`,summary:[found.length?`Key details detected: ${found.join(" · ")}.`:"No standard key figures were detected reliably in the extracted text.",clean?`The document contains approximately ${clean.split(" ").length.toLocaleString("en-IE")} extracted words. The explanation should be checked against the original pages.`:"The PDF did not yield readable text. It may be scanned and require OCR."],flags,questions:["Which conditions must be satisfied before I sign or draw down, and who will confirm each one?","Are any dates, figures, definitions, exclusions, or schedules in this document unusual for this transaction?","Is anything missing that you would expect to see, and should I request an amended or clearer copy?"],mode:"demo"};
}

export function buildPrompt(text:string,type:DocumentType){return `You explain Irish home-buying documents. Analyse this ${type} without giving financial or legal advice. Never conclude whether the user should sign, borrow, or buy. Return strict JSON with keys: title (string), summary (array of short plain-English strings), flags (array of objects with label and detail), questions (array of questions for a solicitor or Central Bank-regulated broker). Quote no more than a few words at a time. Mark uncertain or unreadable content clearly. Document text:\n${text.slice(0,80000)}`;}
