import { stripe } from "@/lib/stripe";

export async function createStripeCheckoutSession(
  customerId: string,
  priceId: string,
  quantity: number,
) {
  return await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    line_items: [
      {
        price: priceId,
        quantity: quantity,
      },
    ],
    mode: "subscription",
    customer: customerId,
  });
}
