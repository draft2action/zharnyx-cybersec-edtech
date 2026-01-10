import { HeroSection } from "../../components/about/hero-section";
import { MissionSection } from "../../components/about/mission-section";
import { CorePillarsSection } from "../../components/about/core-pillars-section";
import { LeadershipSection } from "../../components/about/leadership-section";
import { JourneySection } from "../../components/about/journey-section";
import { QuoteSection } from "../../components/about/quote-section";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Global Background (Same as Curriculum) */}

      <div className="relative z-10">
        <HeroSection />
        <MissionSection />
        <CorePillarsSection />
        <LeadershipSection />
        <JourneySection />
        <QuoteSection />
      </div>
    </main>
  );
}
