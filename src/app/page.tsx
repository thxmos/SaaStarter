import Footer from "@/components/footer";
import FeaturesSection from "@/components/landing-page/features-section";
import HeroSection from "@/components/landing-page/hero-section";
import PricingSection from "@/components/landing-page/pricing-section";
import SubscribeSection from "@/components/landing-page/pricing-section copy";

export default function LandingPage() {
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
