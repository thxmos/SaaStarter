"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

export async function getPrices(active: boolean = true) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const prices = await stripe.prices.list({
      active,
      // limit: 10,
      expand: ["data.product"], // This will include the associated product details
    });

    // Revalidate the path to ensure fresh data on the client
    revalidatePath("/*"); // check this works properly

    return {
      success: true,
      prices: prices.data.map((price) => ({
        id: price.id,
        // productName: price.product.name,
        unitAmount: price.unit_amount,
        currency: price.currency,
        type: price.type,
        interval: price.recurring?.interval,
      })),
    };
  } catch (error) {
    console.error("Error fetching Stripe prices:", error);
    return {
      success: false,
      error: "Failed to fetch prices. Please try again later.",
    };
  }
}
