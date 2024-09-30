"use client";

import { Parallax } from "react-parallax";
import { Button } from "@/components/ui/button";
import heroBgPic from "@/assets/hero-bg.jpg";
import { APP_NAME } from "@/constants";

export default function Component() {
  return (
    <Parallax
      bgImage={heroBgPic.src}
      bgImageAlt="Background Image"
      strength={200}
    >
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black bg-opacity-50 text-white flex justify-center items-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Revolutionize Your Beans with {APP_NAME}
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Boost productivity, streamline processes, and take your beans to
                the next level with our cutting-edge SaaS solution.
              </p>
            </div>
            <div className="space-x-4">
              <Button className="bg-white text-black hover:bg-gray-200">
                Get Started
              </Button>
              {/* <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Learn More
              </Button> */}
            </div>
          </div>
        </div>
      </section>
    </Parallax>
  );
}
