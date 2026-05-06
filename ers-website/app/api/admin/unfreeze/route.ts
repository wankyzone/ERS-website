import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user_id } = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/unfreeze_user`,
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_user_id: user_id }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to unfreeze user" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}