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
import { getCurrencySymbol } from "@/utils/currency.utils";
import { Price, Product } from "@prisma/client";
import { Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

  const handleCheckout = async () => {
    setIsBusy(true);
    const { success, sessionId, message } = await createCheckoutSession(
      price,
      1,
    );

    if (!success || !sessionId) {
      if (message) {
        toast.error(message);
      } else {
        router.push("/auth");
      }

      return;
    }
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    stripe?.redirectToCheckout({ sessionId });
    setIsBusy(false);
  };

  return (
    <Card
      className={`flex flex-col min-w-[300px] min ${
        highlighted ? "border-primary border-2" : ""
      }`}
      aria-labelledby={`pricing-plan-${product.id}`}
    >
      <CardHeader>
        <CardTitle
          id={`pricing-plan-${product.id}`}
          className="text-2xl font-bold "
        >
          {product.name}
        </CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold">
            {Number(price.unitAmount) / 100}
            {getCurrencySymbol(price.currency as string)}
          </span>{" "}
          <span className="lowercase">{price.interval}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul
          className="space-y-2"
          aria-label={`Features of ${product.name} plan`}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check
                className="text-green-500 mr-2"
                size={20}
                aria-hidden="true"
              />
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
          aria-label={`Subscribe to ${product.name} plan`}
          disabled={isBusy}
        >
          {isBusy ? <BeatLoader size={10} /> : "Choose Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
