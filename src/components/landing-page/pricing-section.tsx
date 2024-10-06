import Pricing from "../pricing/pricing";

const PricingSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Simple, Transparent Pricing
        </h2>

        <Pricing />
      </div>
    </section>
  );
};

export default PricingSection;
