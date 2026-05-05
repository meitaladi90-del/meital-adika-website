import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendRegistrationConfirmation, sendRegistrationNotification } from "@/lib/resend";
import { createCheckoutSession } from "@/lib/stripe";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  workshop: z.string().min(2),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const registration = await prisma.registration.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        workshop: data.workshop,
        message: data.message,
        paymentStatus: "pending",
      },
    });

    const priceId = process.env.WORKSHOP_PRICE_ID;

    if (priceId) {
      const session = await createCheckoutSession({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        workshop: data.workshop,
        message: data.message,
        priceId,
        successUrl: `${siteUrl}/workshop/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${siteUrl}/workshop`,
      });

      await prisma.registration.update({
        where: { id: registration.id },
        data: { stripeSessionId: session.id },
      });

      return NextResponse.json({ checkoutUrl: session.url });
    }

    // No Stripe configured — send confirmation directly
    await Promise.all([
      sendRegistrationConfirmation({ name: data.fullName, email: data.email, workshop: data.workshop }),
      sendRegistrationNotification(data),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.errors }, { status: 400 });
    }
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
