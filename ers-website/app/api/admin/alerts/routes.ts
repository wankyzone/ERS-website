import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  };

  // Failed payouts
  const res = await fetch(
    `${base}/rest/v1/payouts?status=eq.failed`,
    { headers }
  );

  const failed = await res.json();

  const alerts: { message: string }[] = [];

  if (failed.length > 0) {
    alerts.push({
      message: `${failed.length} failed payouts detected`,
    });
  }

  return Response.json(alerts);
}