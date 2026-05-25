import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "dev-only-secret-set-JWT_SECRET-in-production"
);

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) return NextResponse.json({ error: "פרמטרים חסרים" }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: "הסיסמה חייבת להכיל לפחות 6 תווים" }, { status: 400 });

    let email: string;
    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.purpose !== "reset" || typeof payload.email !== "string") throw new Error("invalid");
      email = payload.email;
    } catch {
      return NextResponse.json({ error: "הקישור פג תוקף או אינו חוקי" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.energyUser.update({ where: { email }, data: { password: hashed } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "שגיאה באיפוס הסיסמה" }, { status: 500 });
  }
}
