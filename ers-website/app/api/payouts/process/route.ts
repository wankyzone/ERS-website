import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { payout_id } = await req.json();

  // 1. Fetch payout
  const payoutRes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/payouts?id=eq.${payout_id}&select=*`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );

  const [payout] = await payoutRes.json();

  if (!payout || payout.status !== "pending") {
    return NextResponse.json({ error: "Invalid payout" }, { status: 400 });
  }

  // 2. Mark as processing (prevents double execution)
  await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/payouts?id=eq.${payout_id}`,
    {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "processing" }),
    }
  );

  // 3. Call Paystack Transfer API
  const transferRes = await fetch("https://api.paystack.co/transfer", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "balance",
      amount: payout.amount * 100,
      recipient: payout.recipient_code,
      reason: "ERS Runner Withdrawal",
    }),
  });

  const transferData = await transferRes.json();

  if (!transferData.status) {
    // ❌ failed
    await updateStatus(payout_id, "failed");
    return NextResponse.json({ error: "Transfer failed" });
  }

  // 4. Deduct wallet AFTER success
  await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/debit_wallet`,
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_user_id: payout.user_id,
        p_amount: payout.amount,
      }),
    }
  );

  // 5. Mark payout complete
  await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/payouts?id=eq.${payout_id}`,
    {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "paid",
        transfer_code: transferData.data.transfer_code,
        processed_at: new Date().toISOString(),
      }),
    }
  );

  return NextResponse.json({ success: true });
}

async function updateStatus(id: string, status: string) {
  await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/payouts?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );
}