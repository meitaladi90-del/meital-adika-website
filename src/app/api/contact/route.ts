import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend, CONTACT_EMAIL } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("noreply@form.local")),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email ?? "",
        phone: data.phone,
        message: data.message ?? "",
      },
    });

    await resend.emails.send({
      from: "אתר AdikAura <noreply@resend.dev>",
      to: [CONTACT_EMAIL],
      subject: `פנייה חדשה מ-${data.name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 32px; border-radius: 12px;">
          <h2 style="color: #5a3e28; margin-bottom: 24px;">פנייה חדשה מהאתר 🤍</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 8px; font-weight: bold; color: #5a3e28; width: 120px;">שם מלא:</td><td style="padding: 10px 8px; color: #5a3e28;">${data.name}</td></tr>
            ${data.birthDate ? `<tr><td style="padding: 10px 8px; font-weight: bold; color: #5a3e28;">תאריך לידה:</td><td style="padding: 10px 8px; color: #5a3e28;" dir="ltr">${data.birthDate}</td></tr>` : ""}
            ${data.phone ? `<tr><td style="padding: 10px 8px; font-weight: bold; color: #5a3e28;">טלפון:</td><td style="padding: 10px 8px; color: #5a3e28;" dir="ltr">${data.phone}</td></tr>` : ""}
            ${data.message && data.message !== `תאריך לידה: ${data.birthDate}\nטלפון: ${data.phone}` ? `<tr><td style="padding: 10px 8px; font-weight: bold; color: #5a3e28; vertical-align: top;">הודעה:</td><td style="padding: 10px 8px; color: #5a3e28;">${data.message}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.errors }, { status: 400 });
    }
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
