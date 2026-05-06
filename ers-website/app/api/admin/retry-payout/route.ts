import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { payout_id } = await req.json();

    if (!payout_id) {
      return Response.json({ error: "Missing payout_id" }, { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    const headers = {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    };

    // 🔍 Get payout
    const res = await fetch(
      `${base}/rest/v1/payouts?id=eq.${payout_id}&select=*`,
      { headers }
    );

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch payout" }, { status: 500 });
    }

    const data = await res.json();
    const payout = data[0];

    if (!payout) {
      return Response.json({ error: "Payout not found" }, { status: 404 });
    }

    // 🚫 Block unsafe states
    if (payout.status === "paid") {
      return Response.json({ error: "Already paid" }, { status: 400 });
    }

    if (payout.status === "processing") {
      return Response.json({ error: "Already processing" }, { status: 400 });
    }

    if (!payout.recipient_code) {
      return Response.json({ error: "Missing recipient" }, { status: 400 });
    }

    // 🔒 Mark as processing BEFORE calling Paystack (anti-duplicate)
    await fetch(
      `${base}/rest/v1/payouts?id=eq.${payout_id}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: "processing" }),
      }
    );

    // 💸 Paystack transfer
    const paystackRes = await fetch("https://api.paystack.co/transfer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "balance",
        amount: payout.amount * 100,
        recipient: payout.recipient_code,
        reason: "ERS payout retry",
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      // ❌ revert status on failure
      await fetch(
        `${base}/rest/v1/payouts?id=eq.${payout_id}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ status: "failed" }),
        }
      );

      return Response.json(
        { error: "Transfer failed", details: paystackData },
        { status: 500 }
      );
    }

    // ✅ Save transfer reference
    await fetch(
      `${base}/rest/v1/payouts?id=eq.${payout_id}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          transfer_code: paystackData.data.transfer_code,
        }),
      }
    );

    return Response.json({ success: true });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}