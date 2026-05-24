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

    // Try DB (optional - keeps working even if DB is unavailable on Vercel)
    try {
      const existing = await prisma.energyUser.findUnique({ where: { email } });
      if (!existing) {
        await prisma.energyUser.create({
          data: { name, email, phone: phone || null, birthDate, password: "" },
        });
        resend.emails.send({
          from: "אתר מיטל עדיקה <noreply@meitaladika.co.il>",
          to: [CONTACT_EMAIL],
          subject: `משתמשת חדשה נרשמה - ${name}`,
          html: `<div dir="rtl"><h2>משתמשת חדשה!</h2><p>שם: ${name}</p><p>מייל: ${email}</p><p>טלפון: ${phone ?? "לא צוין"}</p><p>תאריך לידה: ${birthDate}</p></div>`,
        }).catch(() => {});
      }
    } catch {
      // DB not available — continue without saving
    }

    // Always create and return token
    const token = await signToken({ userId: email, name, birthDate });
    const response = NextResponse.json({ name, birthDate });
    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "שגיאה בהרשמה" }, { status: 500 });
  }
}