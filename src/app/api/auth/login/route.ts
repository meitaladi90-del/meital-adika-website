import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, AUTH_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "נא להזין מייל וסיסמה" }, { status: 400 });
    }

    const user = await prisma.energyUser.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "המייל לא נמצא במערכת" }, { status: 401 });
    }
    if (!user.password) {
      return NextResponse.json({ error: "לא הוגדרה סיסמה לחשבון זה. נסי לאפס סיסמה." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "הסיסמה שגויה" }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, name: user.name, birthDate: user.birthDate });
    const res = NextResponse.json({ name: user.name, birthDate: user.birthDate });
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "שגיאה בשרת. ייתכן שהשירות אינו זמין כרגע." }, { status: 500 });
  }
}
