import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase env vars");
  }

  return createClient(url, key);
}

function generateCode() {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabase(); // ✅ runtime, not build

    const { email, referralCode } = await req.json();

    const code = generateCode();

    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        email,
        referral_code: code,
        referred_by: referralCode || null,
      })
      .select()
      .single();

    if (referralCode) {
      await supabase.rpc("increment_referrals", {
        code_input: referralCode,
      });
    }

    return NextResponse.json({ data, error });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}