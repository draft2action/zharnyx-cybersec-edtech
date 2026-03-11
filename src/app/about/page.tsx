"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AboutHero } from "@/components/about/about-hero";
import { AboutProblem } from "@/components/about/about-problem";
import { AboutPillars } from "@/components/about/about-pillars";
import { AboutFounders } from "@/components/about/about-founders";
import { AboutCTA } from "@/components/about/about-cta";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-red-500/30 selection:text-white">
      <Navbar />
      <div className="relative z-10">
        <AboutHero />
        <AboutProblem />
        <AboutPillars />
        <AboutFounders />
        <AboutCTA />
      </div>
      <Footer />
    </main>
  );
}
