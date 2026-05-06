import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  };

  const [payments, payouts, tx] = await Promise.all([
    fetch(`${base}/rest/v1/payments?select=amount,status`, { headers }),
    fetch(`${base}/rest/v1/payouts?select=amount,status`, { headers }),
    fetch(`${base}/rest/v1/wallet_transactions?select=amount,type`, { headers }),
  ]);

  const paymentsData = await payments.json();
  const payoutsData = await payouts.json();
  const txData = await tx.json();

  const totalEscrow = paymentsData
    .filter((p: any) => p.status === "funded")
    .reduce((sum: number, p: any) => sum + p.amount, 0);

  const totalPaidOut = payoutsData
    .filter((p: any) => p.status === "paid")
    .reduce((sum: number, p: any) => sum + p.amount, 0);

  const revenue = txData
    .filter((t: any) => t.type === "fee")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  return NextResponse.json({
    totalEscrow,
    totalPaidOut,
    revenue,
  });
}