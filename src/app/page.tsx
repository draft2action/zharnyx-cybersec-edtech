import { HeroSection } from "@/components/home/hero-section";
import { PortfolioSection } from "@/components/curriculum/portfolio-section";
import { ArchitectureSection } from "@/components/home/architecture-section";
import { MasterPlanSection } from "@/components/home/master-plan-section";
import { MethodologySection } from "@/components/home/methodology-section";
import { WarRoomSection } from "@/components/home/war-room-section";
import { AgencyOperationsSection } from "@/components/home/agency-operations-section";
import { GatekeepingSection } from "@/components/home/gatekeeping-section";
import { DeploymentTiersSection } from "@/components/home/deployment-tiers-section";
import { WhyZharnyxSection } from "@/components/home/why-zharnyx-section";
import { AboutCTASection } from "@/components/home/about-cta-section";
import { db } from "@/lib/db";
import { course } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch the first published course, or a specific one "main"
  // For now, let's take the first published one as the "featured" course
  const courses = await db.query.course.findMany({
    where: eq(course.status, "published"),
    with: {
      months: true,
    },
    limit: 1,
  });

  const featuredCourse = courses[0];

  return (
    <>
      <HeroSection course={featuredCourse} />
      <ArchitectureSection />
      <WhyZharnyxSection />
      <MasterPlanSection />
      <MethodologySection />
      <WarRoomSection />
      <AgencyOperationsSection />
      <GatekeepingSection />
      <DeploymentTiersSection />
      <PortfolioSection stats={featuredCourse?.portfolioStats} />
      <AboutCTASection />
    </>
  );
}
