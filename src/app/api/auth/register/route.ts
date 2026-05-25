import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { resend, CONTACT_EMAIL } from "@/lib/resend";
import { signToken, AUTH_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, birthDate, password } = await req.json();
    if (!name || !email || !birthDate || !password) {
      return NextResponse.json({ error: "שדות חסרים" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "הסיסמה חייבת להכיל לפחות 6 תווים" }, { status: 400 });
    }

    try {
      const existing = await prisma.energyUser.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: "כתובת המייל כבר רשומה. נסי להיכנס." }, { status: 409 });
      }
      const hashed = await bcrypt.hash(password, 10);
      await prisma.energyUser.create({
        data: { name, email, phone: phone || null, birthDate, password: hashed },
      });
      resend.emails.send({
        from: "אתר מיטל עדיקה <noreply@meitaladika.co.il>",
        to: [CONTACT_EMAIL],
        subject: `משתמשת חדשה נרשמה - ${name}`,
        html: `<div dir="rtl"><h2>משתמשת חדשה!</h2><p>שם: ${name}</p><p>מייל: ${email}</p><p>טלפון: ${phone ?? "לא צוין"}</p><p>תאריך לידה: ${birthDate}</p></div>`,
      }).catch(() => {});
    } catch {
      // DB not available — continue without saving
    }

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
