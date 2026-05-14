import { NextRequest, NextResponse } from "next/server";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!token) return NextResponse.json(null);
    const payload = await verifyToken(token);
    return NextResponse.json({ userId: payload.userId, name: payload.name, birthDate: payload.birthDate });
  } catch {
    return NextResponse.json(null);
  }
}