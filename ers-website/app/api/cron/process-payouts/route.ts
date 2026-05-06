import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };

  // 1. Fetch pending payouts (limit batch)
  const res = await fetch(
    `${base}/rest/v1/payouts?status=eq.pending&limit=5`,
    { headers }
  );

  const payouts = await res.json();

  for (const p of payouts) {
    try {
      // 2. Lock payout (prevent double processing)
      const lockRes = await fetch(
        `${base}/rest/v1/rpc/lock_payout`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ p_id: p.id }),
        }
      );

      const locked = await lockRes.json();

      if (!locked) continue; // already picked

      // 3. Call Paystack
      const paystackRes = await fetch(
        "https://api.paystack.co/transfer",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "balance",
            amount: p.amount * 100,
            recipient: p.recipient_code,
            reason: "ERS automated payout",
          }),
        }
      );

      const data = await paystackRes.json();

      if (!data.status) {
        // ❌ FAIL CASE
        await fetch(
          `${base}/rest/v1/payouts?id=eq.${p.id}`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              status: "failed",
              failure_reason: data.message,
            }),
          }
        );

        continue;
      }

      // ✅ SUCCESS CASE
      await fetch(
        `${base}/rest/v1/payouts?id=eq.${p.id}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            status: "processing",
            transfer_code: data.data.transfer_code,
          }),
        }
      );

    } catch (err: any) {
      console.error("Payout error:", err);

      await fetch(
        `${base}/rest/v1/payouts?id=eq.${p.id}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            status: "failed",
            failure_reason: err.message,
          }),
        }
      );
    }
  }

  return NextResponse.json({ processed: payouts.length });
}