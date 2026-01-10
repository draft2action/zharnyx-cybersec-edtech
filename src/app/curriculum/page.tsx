import { HeroSection } from "../../components/curriculum/hero-section";
import { FoundationSection } from "../../components/curriculum/foundation-section";
import { SplitSection } from "../../components/curriculum/split-section";
import { ConvergenceSection } from "../../components/curriculum/convergence-section";
import { InternshipSection } from "../../components/curriculum/internship-section";
import { PortfolioSection } from "../../components/curriculum/portfolio-section";

export default function CurriculumPage() {
  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-purple-500/30">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <HeroSection />
        <FoundationSection />
        <SplitSection />
        <ConvergenceSection />
        <InternshipSection />
        <PortfolioSection />
      </div>
    </main>
  );
}
