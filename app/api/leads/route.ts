import { NextRequest, NextResponse } from "next/server";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const runtime="nodejs";
const LeadSchema=z.object({name:z.string().trim().min(2).max(100),email:z.string().email().max(200),phone:z.string().trim().min(6).max(40),need:z.string().max(1000).optional(),estimatedLoan:z.number().nonnegative().optional(),consent:z.union([z.literal("on"),z.literal(true)])});

export async function POST(request:NextRequest){
  try{const input=LeadSchema.parse(await request.json());const lead={id:crypto.randomUUID(),...input,consent:true,createdAt:new Date().toISOString(),status:"new"};
    // Local persistence makes the flow testable without sending personal data elsewhere.
    // Production deployments should replace this adapter with encrypted Postgres and a retention job.
    const directory=path.join(process.cwd(),"data");await mkdir(directory,{recursive:true});await appendFile(path.join(directory,"leads.jsonl"),JSON.stringify(lead)+"\n",{encoding:"utf8",mode:0o600});
    return NextResponse.json({ok:true,id:lead.id},{status:201});
  }catch(error){if(error instanceof z.ZodError)return NextResponse.json({error:"Please check the contact details and consent."},{status:400});console.error("Lead capture failed",error);return NextResponse.json({error:"Lead storage is unavailable."},{status:500})}
}
