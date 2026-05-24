import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend, CONTACT_EMAIL } from "@/lib/resend";
import { signToken, AUTH_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, birthDate } = await req.json();

    if (!name || !email || !birthDate) {
      return NextResponse.json({ error: "שדות חסרים" }, { status: 400 });
    }

    const existing = await prisma.energyUser.findUnique({ where: { email } });
    if (existing) {
      // Auto-login existing user instead of erroring
      const token = await signToken({ userId: existing.id, name: existing.name, birthDate: existing.birthDate });
      const res = NextResponse.json({ name: existing.name, birthDate: existing.birthDate });
      res.cookies.set(AUTH_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return res;
    }

    const user = await prisma.energyUser.create({
      data: { name, email, phone: phone || null, birthDate, password: "" },
    });

    const token = await signToken({ userId: user.id, name: user.name, birthDate: user.birthDate });

    resend.emails.send({
      from: "אתר מיטל עדיקה <noreply@meitaladika.co.il>",
      to: [CONTACT_EMAIL],
      subject: `משתמשת חדשה נרשמה - ${user.name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5a3e28;">משתמשת חדשה נרשמה לאזור האנרגיה!</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">שם:</td><td style="padding: 8px;">${user.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">מייל:</td><td style="padding: 8px;">${user.email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">טלפון:</td><td style="padding: 8px;">${user.phone ?? "לא צוין"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">תאריך לידה:</td><td style="padding: 8px;">${user.birthDate}</td></tr>
          </table>
        </div>
      `,
    }).catch(() => {});

    const response = NextResponse.json({ name: user.name, birthDate: user.birthDate });
    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "שגיאה בשרת" }, { status: 500 });
  }
}