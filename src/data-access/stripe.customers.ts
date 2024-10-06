import { Stripe } from "stripe";
import { stripe } from "@/lib/stripe";

export const createStripeCustomer = async (
  email: string,
  name: string,
): Promise<Stripe.Customer> => {
  return await stripe.customers.create({
    email: email.toLowerCase(),
    name: name,
  });
};

export const getStripeCustomer = async (
  customerId: string,
): Promise<Stripe.Customer> => {
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) {
    throw new Error("Customer has been deleted");
  }
  return customer as Stripe.Customer;
};
