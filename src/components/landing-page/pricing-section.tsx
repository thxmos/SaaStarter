import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      features: ["5 Users", "10GB Storage", "Basic Support"],
    },
    {
      name: "Pro",
      price: "$79",
      features: [
        "25 Users",
        "100GB Storage",
        "Priority Support",
        "Advanced Analytics",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited Users",
        "Unlimited Storage",
        "24/7 Support",
        "Custom Integration",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-card rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-6 space-y-2 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
