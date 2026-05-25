import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "dev-only-secret-set-JWT_SECRET-in-production"
);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "נא להזין כתובת מייל" }, { status: 400 });

    const user = await prisma.energyUser.findUnique({ where: { email } });
    if (!user) {
      // Return success to avoid email enumeration
      return NextResponse.json({ ok: true });
    }

    const token = await new SignJWT({ email, purpose: "reset" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(secret);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://meitaladika.co.il";
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    await resend.emails.send({
      from: "מיטל עדיקה <noreply@meitaladika.co.il>",
      to: [email],
      subject: "איפוס סיסמה - מיטל עדיקה",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #5a3e28; padding: 32px; border-radius: 12px; color: #f5f0e8;">
          <h2 style="color: #c9a97a; text-align: center;">איפוס סיסמה ✨</h2>
          <p style="line-height: 1.8;">שלום ${user.name},</p>
          <p style="line-height: 1.8;">קיבלנו בקשה לאיפוס הסיסמה שלך. לחצי על הכפתור להגדרת סיסמה חדשה:</p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${resetLink}" style="background: #c9a97a; color: #5a3e28; padding: 14px 32px; border-radius: 40px; text-decoration: none; font-weight: bold; font-size: 15px;">
              איפוס סיסמה ←
            </a>
          </div>
          <p style="font-size: 13px; opacity: 0.65;">הקישור בתוקף ל-15 דקות. אם לא ביקשת לאפס סיסמה — אפשר להתעלם מהמייל הזה.</p>
          <p style="font-size: 12px; opacity: 0.5; text-align: center; margin-top: 24px;">מיטל עדיקה | נומרולוגיה והעצמת נשים</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "שגיאה בשליחת המייל" }, { status: 500 });
  }
}
