"use client";

import { createCheckoutSession } from "@/actions/stripe.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { Price, Product } from "@prisma/client";
import { Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

interface Props {
  price: Price;
  product: Product;
  features: string[];
  highlighted?: boolean;
}

const PricingCard: React.FC<Props> = ({
  price,
  product,
  features,
  highlighted,
}) => {
  const handleCheckout = async () => {
    const { success, sessionId } = await createCheckoutSession(price, 1);

    if (!success || !sessionId) {
      toast.error("Failed to create checkout session, try again.");
      return;
    }

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

    stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <Card
      className={`flex flex-col min-w-[300px] min ${
        highlighted ? "border-blue-500 border-2" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold">
            {Number(price.unitAmount) / 100}
            {getCurrencySymbol(price.currency as string)}
          </span>{" "}
          <span className="lowercase">{price.interval}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li className="flex items-center">
              <Check className="text-green-500 mr-2" size={20} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCheckout}
          className="w-full"
          variant={highlighted ? "default" : "outline"}
        >
          Subscribe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
