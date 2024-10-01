import PricingCard from "@/components/pricing-card";
import { APP_NAME } from "@/constants";
import { prisma } from "@/lib/prisma";
import { Price, Product } from "@prisma/client";

interface Plan {
  price: Price;
  product: Product;
  features: string[];
}

const SubscribePage = async () => {
  const prices = await prisma.price.findMany();
  const products = await prisma.product.findMany();

  const plans = prices.map((price) => {
    const product = products.find(
      (p) => p.stripeProductId === price.stripeProductId,
    );
    if (!product) return null;

    let features = [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
      "Feature 5",
    ];

    if (product.stripeProductId === "stripe price id") {
      features = [];
    }

    return {
      price,
      product,
      features: features,
    };
  }) as Plan[];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-300 mb-4">{APP_NAME}</h1>
          <p className="text-xl text-gray-400">
            Boost your productivity with our amazing tools
          </p>
        </header>
        <div className="flex flex-col items-center md:items-start md:justify-center gap-4 md:flex-row">
          {plans.map(async ({ price, product, features }) => {
            if (!product || !product.active)
              return <p>No Products Available.</p>;
            return (
              <PricingCard
                key={product.id}
                product={product}
                price={price}
                features={features}
                highlighted
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
