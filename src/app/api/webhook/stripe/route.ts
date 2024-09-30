import { prisma } from "@/lib/prisma";
import { PricingPlanInterval, PricingType } from "@prisma/client";
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
      case "product.updated": {
        const product = data.object as Stripe.Product;
        if (!product) return;
        const upsert = await prisma.product.upsert({
          where: { stripeProductId: product.id },
          create: {
            name: product.name,
            description: product.description,
            image: product.images[0],
            active: product.active,
            stripeProductId: product.id,
            metadata: product.metadata,
          },
          update: {
            name: product.name,
            description: product.description,
            image: product.images[0],
            active: product.active,
            metadata: product.metadata,
            stripeProductId: product.id,
          },
        });

        break;
      }

      case "product.deleted": {
        const product = data.object as Stripe.Product;
        if (!product) return;
        const res = await prisma.product.delete({
          where: { stripeProductId: product.id },
        });
        break;
      }

      case "price.updated": {
        const price = data.object as Stripe.Price;
        if (!price) return;
        const upsert = await prisma.price.upsert({
          where: { stripePriceId: price.id },
          create: {
            stripePriceId: price.id.toString(),
            stripeProductId: price.product.toString(),
            active: price.active,
            unitAmount: price.unit_amount,
            currency: price.currency,
            type: price.type.toUpperCase() as PricingType,
            interval:
              price.recurring?.interval.toUpperCase() as PricingPlanInterval,
            trialPeriodDays: price.recurring?.trial_period_days,
            metadata: price.metadata,
            product: {
              connect: { stripeProductId: price.product.toString() },
            },
          },
          update: {
            stripePriceId: price.id.toString(),
            stripeProductId: price.product.toString(),
            active: price.active,
            unitAmount: price.unit_amount,
            currency: price.currency,
            type: price.type.toUpperCase() as PricingType,
            interval:
              price.recurring?.interval.toUpperCase() as PricingPlanInterval,
            trialPeriodDays: price.recurring?.trial_period_days,
            metadata: price.metadata,
            product: {
              connect: { stripeProductId: price.product.toString() },
            },
          },
        });
        break;
      }

      case "price.deleted": {
        const price = data.object as Stripe.Price;
        if (!price) return;
        const res = await prisma.price.delete({
          where: { stripePriceId: price.id },
        });
        break;
      }

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
                subscriptions: {
                  connect: {
                    stripePriceId: priceId,
                  },
                },
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
            subscriptions: {
              connect: {
                stripePriceId: priceId,
              },
            },
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
            subscriptions: {
              disconnect: {
                stripePriceId: subscription.items.data[0].price.id,
              },
            },
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
