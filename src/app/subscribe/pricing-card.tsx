import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { Plan } from "./page";
import { useSession } from "@/providers/session-provider";

interface Props {
  plan: Plan;
  title: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
}

const PricingCard: React.FC<Props> = async ({
  ctaText,
  features,
  period,
  price,
  title,
  highlighted,
  plan,
}) => {
  const { user } = useSession();

  return (
    <Card
      className={`flex flex-col min-w-[300px] min ${
        highlighted ? "border-blue-500 border-2" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold">{price}</span> {period}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="text-green-500 mr-2" size={20} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link
          target="_blank"
          href={`${plan.link}?prefilled_email=${user?.email}`}
        >
          <Button
            className="w-full"
            variant={highlighted ? "default" : "outline"}
          >
            {ctaText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
