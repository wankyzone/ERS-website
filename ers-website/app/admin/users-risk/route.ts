export async function GET() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  };

  const res = await fetch(
    `${base}/rest/v1/profiles?select=id,risk_score,is_frozen&order=risk_score.desc&limit=20`,
    { headers }
  );

  const data = await res.json();

  return Response.json(data);
}