import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  // 🔒 VERIFY SIGNATURE
  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };

  // ✅ HANDLE TRANSFER SUCCESS
  if (event.event === "transfer.success") {
    const transfer_code = event.data.transfer_code;

    await fetch(
      `${base}/rest/v1/payouts?transfer_code=eq.${transfer_code}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          status: "paid",
          processed_at: new Date().toISOString(),
        }),
      }
    );
  }

  // ❌ HANDLE TRANSFER FAILURE
  if (event.event === "transfer.failed") {
    const transfer_code = event.data.transfer_code;

    await fetch(
      `${base}/rest/v1/payouts?transfer_code=eq.${transfer_code}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          status: "failed",
          failure_reason: event.data.reason,
        }),
      }
    );
  }

  return NextResponse.json({ received: true });
}