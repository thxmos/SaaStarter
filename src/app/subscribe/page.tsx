import PricingCard from "./pricing-card";
import ProtectedLayout from "@/components/protected-layout";
import { APP_NAME } from "@/constants";
import { findPrices } from "@/data-access/stripe.prices";
import { findProducts } from "@/data-access/stripe.products";
import { Price, Product } from "@prisma/client";

interface Plan {
  price: Price;
  product: Product;
  features: string[];
}

const MOCK_FEATURES = [
  "Premium Big Beans",
  "Monthly Delivery",
  "Exclusive Garbanzo Preparation Methods",
  "Customizable Bean Options",
  "Tasting Guide",
];

const SubscribePage = async () => {
  const { prices } = await findPrices();
  const { products } = await findProducts();

  const plans = prices
    ?.map((price) => {
      const product = products.find(
        (p) => p.stripeProductId === price.stripeProductId,
      );
      if (!product) return null;

      // TODO: Implement actual logic to determine feaatures based on the product
      const features = MOCK_FEATURES;

      return { price, product, features };
    })
    .filter((plan): plan is Plan => plan !== null);

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-300 mb-4">
              {APP_NAME} Subscription Plans
            </h1>
            <p className="text-xl text-gray-400">
              Boost your productivity with our amazing tools
            </p>
          </header>
          <section
            aria-label="Pricing Plans"
            className="flex flex-col items-center md:items-start md:justify-center gap-4 md:flex-row"
          >
            {plans && plans.length > 0 ? (
              plans.map(({ price, product, features }, index) => (
                <PricingCard
                  key={product.id}
                  product={product}
                  price={price}
                  features={features}
                  highlighted={index === 0} // TODO: Determine this dynamically
                  aria-labelledby={`plan-${product.id}-title`}
                />
              ))
            ) : (
              <p role="alert">No products are currently available.</p>
            )}
          </section>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default SubscribePage;
