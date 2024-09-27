import { COMPANY_NAME } from "@/constants";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Revolutionize Your Workflow with {COMPANY_NAME}
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Boost productivity, streamline processes, and take your business
              to the next level with our cutting-edge SaaS solution.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="bg-background text-primary hover:bg-secondary">
              Get Started
            </Button>
            <Button className="text-background border-background hover:bg-background/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
