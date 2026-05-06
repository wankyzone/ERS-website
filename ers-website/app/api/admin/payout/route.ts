export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  };

  const res = await fetch(
    `${base}/rest/v1/payouts?select=*&order=created_at.desc`,
    { headers }
  );

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch payouts" }, { status: 500 });
  }

  const data = await res.json();

  return Response.json(data);
}