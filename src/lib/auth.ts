import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "dev-only-secret-set-JWT_SECRET-in-production"
);

export const AUTH_COOKIE = "energy_auth";

export interface TokenPayload extends JWTPayload {
  userId: string;
  name: string;
  birthDate: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify<TokenPayload>(token, secret);
  return payload;
}