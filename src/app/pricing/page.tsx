import { PricingHero } from "@/components/pricing/hero-section";
import { PricingCard } from "@/components/pricing/pricing-card";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black">
      <PricingHero />
      <PricingCard />
    </main>
  );
}
