"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlayCircle, Download } from "lucide-react";
import defaultProductPic from "@/assets/product-default.svg";
import NavBar from "../../nav-bar";

export default function TrapEssentialsVol2Page() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to your server and initiating the download
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <main className="max-w-4xl mx-auto">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-8">
            <div className="space-y-6">
              <Image
                src={defaultProductPic}
                alt="Trap Essentials Vol. 2"
                width={600}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <Label htmlFor="name" className="sr-only">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full sm:col-span-2 px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="mr-2 h-5 w-5" /> Download Now
                </Button>
              </form>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Trap Essentials Vol. 2
              </h1>
              <div className="bg-blue-100 p-4 rounded-lg flex items-center space-x-4 mb-6">
                <PlayCircle className="h-10 w-10 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Preview Track</h3>
                  <p className="text-sm text-gray-600">0:30</p>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <p className="mb-4">
                  Trap Essentials Vol. 2 is the ultimate collection of trap
                  sounds, featuring over 500 high-quality samples, loops, and
                  one-shots. Perfect for producers looking to create
                  chart-topping trap hits.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>500+ trap samples and loops</li>
                  <li>High-quality 24-bit WAV files</li>
                  <li>Royalty-free for commercial use</li>
                  <li>Compatible with all major DAWs</li>
                  <li>Instant digital download</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Elevate Your Trap Productions
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Trap Essentials Vol. 2 is more than just a sample pack – it's your
            gateway to creating professional-grade trap music. Each sound in
            this collection has been meticulously crafted to provide you with
            the highest quality audio elements. From earth-shaking 808s to crisp
            hi-hats and unique vocal chops, this pack offers everything you need
            to produce chart-topping trap hits. Whether you're a beginner
            looking to dive into trap production or a seasoned producer seeking
            fresh sounds, Trap Essentials Vol. 2 is your ultimate resource for
            staying ahead in the competitive world of modern music production.
            Download now and transform your tracks from ordinary to
            extraordinary with these industry-standard sounds.
          </p>
        </section>
      </main>
    </div>
  );
}
