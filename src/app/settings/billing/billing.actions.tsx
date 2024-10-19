"use server";

import { getStripeSubscriptionByCustomerId } from "@/data-access/stripe.subscriptons";

export async function getBillingInfo(userId: string) {
  try {
    const subscription = await getStripeSubscriptionByCustomerId(userId);
    return subscription;
  } catch (error) {
    console.error(error);
    return null;
  }
}
