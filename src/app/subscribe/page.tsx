import { getUser } from "@/lib/lucia";
import PricingCard from "./pricing-card";

export interface Plan {
  link: string;
  priceId: string;
  price: number;
  duration: string;
}

export const plans: Plan[] = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_6oEcNP76Mfrj3y8aEF"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Q2uZmKI5Vbl5VrudQ5KDJOl"
        : "",
    price: 5,
    duration: "/month",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_9AQ157bn20wp3y8cMO"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Q2ueNKI5Vbl5VruLuKDdSUy"
        : "",

    price: 99,
    duration: "/year",
  },
];

const SubscribePage = async () => {
  const user = await getUser();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-300 mb-4">SuperSaaS</h1>
          <p className="text-xl text-gray-400">
            Boost your productivity with our amazing tools
          </p>
        </header>
        <div className="flex flex-col items-center md:items-start md:justify-center gap-4 md:flex-row">
          <PricingCard
            plan={plans[0]}
            title="Monthly Plan"
            price="$29"
            period="per month"
            features={[
              "All Monthly Plan features",
              "2 months free",
              "Up to 20 team members",
              "25GB storage",
              "Priority support",
            ]}
            ctaText="Start Monthly Plan"
          />
          <PricingCard
            plan={plans[1]}
            title="Yearly Plan"
            price="$290"
            period="per year"
            features={[
              "All Monthly Plan features",
              "2 months free",
              "Up to 20 team members",
              "25GB storage",
              "Priority support",
            ]}
            ctaText="Start Yearly Plan"
            highlighted={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
