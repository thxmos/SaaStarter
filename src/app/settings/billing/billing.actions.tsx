"use server";

import { getSubscriptionByUserId } from "@/data-access/stripe.subscriptons";

export async function getBillingInfo(userId: string) {
  try {
    const subscription = await getSubscriptionByUserId(userId);
    return subscription;
  } catch (error) {
    console.error(error);
    return null;
  }
}
