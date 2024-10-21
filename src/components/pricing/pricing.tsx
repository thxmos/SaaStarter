import { findPrices } from "@/data-access/price";
import { findProducts } from "@/data-access/product";
import { Price, Product } from "@prisma/client";
import PricingCard from "@/components/pricing/pricing-card";

const MOCK_FEATURES = [
  "Premium Big Beans",
  "Monthly Delivery",
  "Exclusive Garbanzo Preparation Methods",
  "Customizable Bean Options",
  "Tasting Guide",
];

interface Plan {
  price: Price;
  product: Product;
  features: string[];
}

const Pricing = async () => {
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
    <>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
        Simple, Transparent Pricing
      </h2>
      <div
        aria-label="Pricing Plans"
        className="flex flex-col items-center md:items-start md:justify-center gap-4 md:flex-row flex-wrap"
      >
        {plans.length > 0 ? (
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
      </div>
    </>
  );
};

export default Pricing;
