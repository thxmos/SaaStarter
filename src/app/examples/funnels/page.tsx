"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      title: "Innovative AI",
      description:
        "Cutting-edge artificial intelligence for unparalleled performance.",
    },
    {
      title: "User-Friendly Interface",
      description: "Intuitive design for seamless user experience.",
    },
    {
      title: "Scalable Solutions",
      description: "Grow your business with our adaptable platform.",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your needs.",
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      quote: "Great product! Highly recommended.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jane Smith",
      quote: "Changed the way we do business.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Bob Johnson",
      quote: "Exceptional customer service.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Alice Brown",
      quote: "Innovative features that set it apart.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-6 bg-primary text-primary-foreground">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Our Amazing Product</h1>
          <ul className="flex space-x-4">
            <li>
              <Link href="#features" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:underline">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience the Future</h2>
          <div className="aspect-video w-full max-w-4xl mx-auto mb-8">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-xl mb-8">
            Our product revolutionizes the way you work, play, and live.
          </p>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Get Started Now</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Get Started</DialogTitle>
                <DialogDescription>
                  Enter your details to get started with our amazing product.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </section>

        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Features That Set Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name}'s avatar`}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="font-semibold mb-2">{testimonial.name}</h3>
                <p className="italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="p-6 bg-primary text-primary-foreground text-center"
      >
        <p>&copy; 2024 Our Amazing Product. All rights reserved.</p>
        <p className="mt-2">Contact us: info@amazingproduct.com</p>
      </footer>
    </div>
  );
}
