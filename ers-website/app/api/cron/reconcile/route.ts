import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  };

  // 1. Get recent payments
  const res = await fetch(
    `${base}/rest/v1/payments?created_at=gte.${new Date(
      Date.now() - 1000 * 60 * 60
    ).toISOString()}&select=*`,
    { headers }
  );

  const payments = await res.json();

  for (const p of payments) {
    // 2. Verify with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${p.reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyRes.json();

    let status = "match";

    if (!verifyData.status || verifyData.data.status !== "success") {
      status = "missing";
    } else if (verifyData.data.amount / 100 !== p.amount) {
      status = "mismatch";
    }

    // 3. Log result
    await fetch(`${base}/rest/v1/reconciliation_logs`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference: p.reference,
        expected_amount: p.amount,
        actual_amount: verifyData?.data?.amount / 100 || 0,
        status,
      }),
    });
  }

  return NextResponse.json({ success: true });
}