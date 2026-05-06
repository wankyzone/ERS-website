import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const secret = process.env.PAYSTACK_SECRET_KEY!;

  // 🔒 Verify signature
  const hash = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const reference = event.data.reference;

  // 🔍 Verify with Paystack
  const verifyRes = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    }
  );

  const verifyData = await verifyRes.json();

  if (!verifyData.status || verifyData.data.status !== "success") {
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  const tx = verifyData.data;
  const metadata = tx.metadata;

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };

  // 🔥 Create errand + escrow (atomic)
  const res = await fetch(
    `${base}/rest/v1/rpc/create_errand_with_payment`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        p_title: metadata.title,
        p_description: metadata.description,
        p_budget: metadata.budget,
        p_client_id: metadata.user_id,
        p_reference: reference,
        p_amount: tx.amount / 100,
      }),
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    return NextResponse.json({ error: "DB write failed" }, { status: 500 });
  }

  // 🚨 FRAUD CHECK (NOW CORRECTLY PLACED)
  await fetch(`${base}/rest/v1/rpc/detect_duplicate_payment`, {
    method: "POST",
    headers,
    body: JSON.stringify({ p_reference: reference }),
  });

  return NextResponse.json({ received: true });
}