import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user_id, freeze } = await req.json();

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };

  await fetch(`${base}/rest/v1/profiles?id=eq.${user_id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      is_frozen: freeze,
    }),
  });

  return NextResponse.json({ success: true });
}