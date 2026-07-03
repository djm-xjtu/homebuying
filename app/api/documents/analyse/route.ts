import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildPrompt, demoAnalyse } from "@/lib/document-analysis";
import type { DocumentType } from "@/lib/document-analysis";

export const runtime = "nodejs";
export const maxDuration = 60;

const validTypes = new Set(["loan-offer","contract","ber","block-policy","sale-contract","other"]);
const AnalysisSchema = z.object({ title:z.string(), summary:z.array(z.string()).min(1), flags:z.array(z.object({label:z.string(),detail:z.string()})), questions:z.array(z.string()).min(1) });

export async function POST(request:NextRequest){
  try{
    const form=await request.formData();const file=form.get("file");const rawType=String(form.get("type")||"other");
    if(!(file instanceof File)||file.type!=="application/pdf")return NextResponse.json({error:"A PDF file is required."},{status:400});
    if(file.size>10*1024*1024)return NextResponse.json({error:"The maximum file size is 10 MB."},{status:413});
    const type=(validTypes.has(rawType)?rawType:"other") as DocumentType;
    const buffer=Buffer.from(await file.arrayBuffer());
    // pdf-parse is loaded only inside this request so its Node-only code stays out of client bundles.
    const pdfParse=(await import("pdf-parse")).default;
    const parsed=await pdfParse(buffer,{max:60});const text=parsed.text?.trim()||"";
    if(!process.env.OPENAI_API_KEY)return NextResponse.json(demoAnalyse(text,type));
    const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4o-mini",response_format:{type:"json_object"},temperature:0.1,messages:[{role:"system",content:"You are a cautious Irish home-buying document explainer. Output valid JSON only."},{role:"user",content:buildPrompt(text,type)}]})});
    if(!response.ok)throw new Error(`AI provider returned ${response.status}`);
    const payload=await response.json();const content=payload.choices?.[0]?.message?.content;const checked=AnalysisSchema.parse(JSON.parse(content));
    return NextResponse.json({...checked,mode:"ai"});
  }catch(error){console.error("Document analysis failed",error);return NextResponse.json({error:"We could not read that PDF. If it is scanned or password-protected, use an unlocked text-based copy."},{status:422})}
}
