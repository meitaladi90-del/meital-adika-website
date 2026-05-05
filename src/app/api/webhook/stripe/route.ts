import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendRegistrationConfirmation, sendRegistrationNotification } from "@/lib/resend";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { name, phone, workshop, message } = session.metadata ?? {};
    const email = session.customer_email ?? "";

    try {
      await prisma.registration.updateMany({
        where: { stripeSessionId: session.id },
        data: { paymentStatus: "paid" },
      });

      await Promise.all([
        sendRegistrationConfirmation({ name: name ?? "", email, workshop: workshop ?? "" }),
        sendRegistrationNotification({
          name: name ?? "",
          email,
          phone: phone ?? "",
          workshop: workshop ?? "",
          message,
        }),
      ]);
    } catch (err) {
      console.error("Webhook processing error:", err);
    }
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: { bodyParser: false },
};
