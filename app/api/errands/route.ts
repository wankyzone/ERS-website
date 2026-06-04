import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { task } = body;

  if (!task) {
    return NextResponse.json({ error: "Task required" }, { status: 400 });
  }

  // For now (mock)
  console.log("New errand:", task);

  return NextResponse.json({
    success: true,
    message: "Errand created",
    data: { task },
  });
}