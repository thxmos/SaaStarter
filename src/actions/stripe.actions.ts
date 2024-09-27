"use server";

import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export interface Subscription {
  id: string;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  status: string;
  start_date: number;
  billing_cycle: string;
  interval: string;
}

export const getSubscriptions = async (
  userId: string,
): Promise<{
  success: boolean;
  subscription: Subscription | null;
}> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.stripeCustomerId) {
    return { success: false, subscription: null };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const subscriptions = await stripe.subscriptions.list({
    customer: user.stripeCustomerId,
  });

  if (subscriptions.data.length > 0) {
    const subscription = subscriptions.data[0];
    const billing_cycle = `${new Date(
      subscription.current_period_start * 1000,
    ).toLocaleDateString()} - ${new Date(
      subscription.current_period_end * 1000,
    ).toLocaleDateString()}`;
    const interval = subscription.items.data[0].price.recurring?.interval;
    return {
      success: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        current_period_start: subscription.current_period_start,
        currency: subscription.items.data[0].price.currency,
        start_date: subscription.start_date,
        billing_cycle,
        interval:
          interval === "month"
            ? "Monthly"
            : interval === "year"
            ? "Annually"
            : "unknown",
      },
    };
  } else {
    return { success: false, subscription: null };
  }
};
