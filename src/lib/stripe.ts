import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function createCheckoutSession({
  name,
  email,
  phone,
  workshop,
  message,
  priceId,
  successUrl,
  cancelUrl,
}: {
  name: string;
  email: string;
  phone: string;
  workshop: string;
  message?: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      name,
      phone,
      workshop,
      message: message ?? "",
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    locale: "he",
  });

  return session;
}
