import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";

import { ProgramHighlights } from "@/components/home/program-highlights";
import { Testimonials } from "@/components/home/testimonials";
import { Footer } from "@/components/shared/footer";

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

      {/* Program Highlights Section */}
      <ProgramHighlights />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </>
  );
}
