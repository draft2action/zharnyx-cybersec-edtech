import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";

export default function Home() {
  return (
    <>
      {/* Fixed animated background */}
      <AnimatedBackground />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section Client Component */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorks />
    </>
  );
}
