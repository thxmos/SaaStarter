"use server";

import { findUniqueUser } from "@/data-access/user";
import { getUser } from "@/lib/lucia";
import { Price } from "@prisma/client";
import Stripe from "stripe";

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
      console.error("Session user not found.");
      return { success: false };
    }
    const { user, error } = await findUniqueUser({
      where: { id: luciaUser.id },
      select: { stripeCustomerId: true },
    });

    if (!user || !user.stripeCustomerId) {
      console.error(error);
      return {
        success: false,
      };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const customer = await stripe.customers.retrieve(user.stripeCustomerId);

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
      line_items: [
        {
          price: price.stripePriceId!,
          quantity: quanity,
        },
      ],
      mode: "subscription",
      customer: customer.id,
    });

    if (!session) {
      return { success: false };
    }

    return { success: true, sessionId: session.id };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { success: false };
  }
};
