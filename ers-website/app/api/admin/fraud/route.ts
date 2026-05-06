import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  };

  const res = await fetch(
    `${base}/rest/v1/fraud_signals?select=*,profiles(id,email,risk_score,is_frozen)&order=created_at.desc&limit=50`,
    { headers }
  );

  const data = await res.json();

  return NextResponse.json(data);
}