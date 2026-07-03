import type { Metadata } from "next";
import { Checklist } from "@/components/checklist";

export const metadata: Metadata = { title: "Irish Home-Buying Checklist", description: "A practical stage-by-stage checklist from mortgage approval in principle to keys, stamp duty, utilities, and LPT." };
export default function ChecklistPage(){return <main><section className="page-hero"><div className="container"><span className="eyebrow"><span className="dot"/>Your buying journey</span><h1>One clear path from planning to keys.</h1><p className="lead">Nine milestones, with the documents, common traps and next actions that matter at each stage.</p></div></section><section className="section tint"><div className="container" style={{maxWidth:900}}><Checklist/></div></section></main>}
