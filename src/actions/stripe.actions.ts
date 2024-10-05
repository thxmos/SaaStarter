"use server";

import { createStripeCheckoutSession } from "@/data-access/stripe.checkout.sessions";
import { getStripeCustomer } from "@/data-access/stripe.customers";
import { getUserById } from "@/data-access/user";
import { getUser } from "@/lib/lucia";
import { Price } from "@prisma/client";

export type Subscription = {
  id: string;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  status: string;
  start_date: number;
  billing_cycle: string;
  interval: string;
};

export const createCheckoutSession = async (price: Price, quanity: number) => {
  try {
    const { user: luciaUser } = await getUser();
    if (!luciaUser) {
      throw new Error("Session user not found.");
    }

    const user = await getUserById(luciaUser.id);
    if (!user || !user.stripeCustomerId) {
      throw new Error("User not found or no stripe customer id");
    }

    const customer = await getStripeCustomer(user.stripeCustomerId);

    const session = await createStripeCheckoutSession(
      customer.id,
      price.stripePriceId!,
      quanity,
    );

    return { success: true, sessionId: session.id };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { success: false };
  }
};
