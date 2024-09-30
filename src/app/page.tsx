"use client";

import Footer from "@/components/footer";
import FeaturesSection from "@/components/landing-page/features-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import SubscribeSection from "@/components/landing-page/subscribe-section";
import { useSession } from "@/providers/session-provider";
import { redirect } from "next/navigation";

export default function LandingPage() {
  const { user } = useSession();
  if (user) redirect("/dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <SubscribeSection />
      </main>
      <Footer />
    </div>
  );
}
