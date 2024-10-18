import Pricing from "../pricing/pricing";
import Parallax from "@/components/parallax";
import heroBgPic from "@/assets/hero-bg.jpg";

const PricingSection = () => {
  return (
    <Parallax
      bgImage={heroBgPic.src}
      bgImageAlt="Background Image"
      strength={200}
    >
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center bg-black bg-opacity-50 text-white">
        <div className="container px-4 md:px-6">
          <Pricing />
        </div>
      </section>
    </Parallax>
  );
};

export default PricingSection;
