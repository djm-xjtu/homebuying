"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronUp, Clock, ArrowRight } from "lucide-react";
import { JOURNEY } from "@/lib/journey";

const STORAGE_KEY = "homebuying-ie-checklist-v1";

export function Checklist() {
  const [done, setDone] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(JOURNEY[0].key);
  const [filter, setFilter] = useState("All");
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); } catch {} }, []);
  const toggle = (key:string) => setDone(current => { const next = current.includes(key) ? current.filter(k=>k!==key) : [...current,key]; localStorage.setItem(STORAGE_KEY,JSON.stringify(next)); return next; });
  const stages = ["All", ...Array.from(new Set(JOURNEY.map(step=>step.stage)))];
  const visible = useMemo(()=>filter === "All" ? JOURNEY : JOURNEY.filter(step=>step.stage===filter),[filter]);
  const percent = Math.round(done.length / JOURNEY.length * 100);
  return <div>
    <div className="panel" style={{marginBottom:26}}><div style={{display:"flex",justifyContent:"space-between",gap:15,alignItems:"baseline"}}><strong>{percent}% complete</strong><span className="hint">{done.length} of {JOURNEY.length} milestones</span></div><div className="progress" style={{marginTop:11}}><span style={{width:`${percent}%`}}/></div><p className="disclaimer">Progress is saved in this browser for privacy. Account-based sync can be connected through the persistence adapter before production deployment.</p></div>
    <div className="tabs">{stages.map(stage=><button key={stage} className={`tab ${filter===stage?"active":""}`} onClick={()=>setFilter(stage)}>{stage}</button>)}</div>
    <div className="checklist">{visible.map((step,index)=>{const completed=done.includes(step.key);const expanded=open===step.key;return <article className="check-item" key={step.key}>
      <div className="check-head"><button className={`check-circle ${completed?"done":""}`} onClick={()=>toggle(step.key)} aria-label={`${completed?"Mark incomplete":"Mark complete"}: ${step.title}`}>{completed&&<Check size={16}/>}</button>
      <div className="check-title" onClick={()=>setOpen(expanded?null:step.key)} role="button" tabIndex={0}><h3>{String(JOURNEY.indexOf(step)+1).padStart(2,"0")}. {step.title}</h3><p>{step.summary}</p></div>
      <button className="icon-button" onClick={()=>setOpen(expanded?null:step.key)} aria-label={expanded?"Collapse":"Expand"}>{expanded?<ChevronUp/>:<ChevronDown/>}</button></div>
      {expanded&&<div className="check-detail"><div><h4><Clock size={13}/> Typical time</h4><p className="hint">{step.duration}</p><h4 style={{marginTop:18}}>Actions</h4><ul>{step.actions.map(x=><li key={x}>{x}</li>)}</ul>{step.href&&<Link className="card-link" href={step.href} style={{marginTop:14}}>Open related tool <ArrowRight size={14}/></Link>}</div><div><h4>Documents</h4><ul>{step.documents.map(x=><li key={x}>{x}</li>)}</ul></div><div><h4>Common pitfalls</h4><ul>{step.pitfalls.map(x=><li key={x}>{x}</li>)}</ul></div></div>}
    </article>})}</div>
  </div>;
}
