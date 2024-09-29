import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = headers().get("stripe-signature");

  let data;
  let eventType;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret!);
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        const checkout = data.object as Stripe.Checkout.Session;
        let user;
        const session = await stripe.checkout.sessions.retrieve(checkout.id, {
          expand: ["line_items"],
        });
        const customerId = session?.customer as string;
        const customer = (await stripe.customers.retrieve(
          customerId,
        )) as Stripe.Customer;
        const priceId = session?.line_items?.data[0]?.price?.id;

        if (customer.email) {
          user = await prisma.user.findUnique({
            where: { email: customer.email },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: customer.email,
                name: customer.name,
                stripeCustomerId: customer.id,
              },
            });
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripePriceId: priceId,
            isSubscribed: true,
            stripeCustomerId: customer.id,
          },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const checkout = data.object as Stripe.Subscription;
        const subscription = await stripe.subscriptions.retrieve(checkout.id);

        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        });
        if (!user) break;

        await prisma.user.update({
          where: { id: user.id },
          data: {
            isSubscribed: false,
          },
        });

        break;
      }
    }
  } catch (err: any) {
    console.error(
      "stripe error: " + err.message + " | EVENT TYPE: " + eventType,
    );
  }

  return NextResponse.json({});
}
