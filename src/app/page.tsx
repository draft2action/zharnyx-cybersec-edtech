// Navbar removed to layout
import { HeroSection } from "@/components/home/hero-section";
import { ArchitectureSection } from "@/components/home/architecture-section";
import { MasterPlanSection } from "@/components/home/master-plan-section";
import { MethodologySection } from "@/components/home/methodology-section";
import { WarRoomSection } from "@/components/home/war-room-section";
import { AgencyOperationsSection } from "@/components/home/agency-operations-section";
import { GatekeepingSection } from "@/components/home/gatekeeping-section";
import { DeploymentTiersSection } from "@/components/home/deployment-tiers-section";
import { WhyZharnyxSection } from "@/components/home/why-zharnyx-section";
import { AboutCTASection } from "@/components/home/about-cta-section";
// Footer removed to layout

export default function Home() {
  return (
    <>
      <HeroSection />
      <ArchitectureSection />
      <WhyZharnyxSection />
      <MasterPlanSection />
      <MethodologySection />
      <WarRoomSection />
      <AgencyOperationsSection />
      <GatekeepingSection />
      <DeploymentTiersSection />
      <AboutCTASection />
    </>
  );
}
