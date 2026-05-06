import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "ERS Alerts <alerts@wankysoftware.com>",
      to: ["admin@wankysoftware.com"],
      subject: "ERS System Test",
      html: "<p>Fraud alert system ready.</p>",
    }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}