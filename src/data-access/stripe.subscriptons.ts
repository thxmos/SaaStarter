import { Stripe } from "stripe";
import { stripe } from "@/lib/stripe";

export const getStripeSubscriptionByCustomerId = async (
  customerId: string,
): Promise<Stripe.Subscription | null> => {
  const subscriptions = await stripe.subscriptions.list();
  return subscriptions.data.filter(
    (subscription) => subscription.customer === customerId,
  )[0];
};
