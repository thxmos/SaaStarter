import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/constants";
import heroBgPic from "@/assets/hero-bg.jpg";
import Link from "next/link";
import Parallax from "@/components/parallax";

export default function HeroSection() {
  return (
    <Parallax
      bgImage={heroBgPic.src}
      bgImageAlt="Background Image"
      strength={200}
    >
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center bg-black bg-opacity-50 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Revolutionize Your Beans with {APP_NAME}
              </h1>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Boost productivity, streamline processes, and take your beans to
                the next level with our cutting-edge SaaS solution.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/auth" passHref>
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Parallax>
  );
}
