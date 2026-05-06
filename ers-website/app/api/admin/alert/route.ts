import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, severity, user_id } = await req.json();

  // 🔔 SLACK
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `🚨 FRAUD ALERT\nUser: ${user_id}\nSeverity: ${severity}\n${message}`,
    }),
  });

  // 📧 EMAIL (via Resend)
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "ERS <alerts@wankysoftware.com>",
      to: ["admin@wankysoftware.com"],
      subject: `🚨 Fraud Alert (${severity})`,
      html: `<p>${message}</p><p>User: ${user_id}</p>`,
    }),
  });

  return NextResponse.json({ success: true });
}