"use client";

import { motion } from "motion/react";
import { BookOpen, Shield, Briefcase, ArrowRight } from "lucide-react";

// Custom Check Icon to match the design (a circle with a check inside, not filled)
function CustomCheckIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  );
}

const phases = [
  {
    icon: <BookOpen className="w-[32px] h-[32px] text-red-500" />,
    phase: "Phase 1",
    duration: "3 Months",
    weeks: "Weeks 1-12",
    title: "Foundation",
    description:
      "All students start here. Master systems, networking, security fundamentals, and Python scripting. Build your first lab environment.",
    features: [
      "Linux & Windows Administration",
      "TCP/IP Networking & Traffic Analysis",
      "Security Frameworks & Python",
      "Foundation Capstone Project",
    ],
  },
  {
    icon: <Shield className="w-[32px] h-[32px] text-red-500" />,
    phase: "Phase 2",
    duration: "3 Months",
    weeks: "Weeks 13-24",
    title: "Specialization",
    description:
      "Choose your track — SOC, VAPT, Cloud Security, or DFIR. Deep dive into real tools and industry scenarios.",
    features: [
      "Track-specific advanced training",
      "Industry-standard tool mastery",
      "Weekly lab deliverables",
      "Specialization Capstone",
    ],
  },
  {
    icon: <Briefcase className="w-[32px] h-[32px] text-red-500" />,
    phase: "Phase 3",
    duration: "1 Month",
    weeks: "Weeks 25-28",
    title: "Career Launch",
    description:
      "72-hour live-fire capstone, resume optimization, mock interviews, Demo Day with hiring partners, and placement support.",
    features: [
      "72-hr Cross-Track Capstone",
      "ATS Resume & LinkedIn Optimization",
      "3 Mock Interview Rounds",
      "Demo Day & Placement Support",
    ],
  },
];

export function ProgramsPhases() {
  return (
    <section className="py-[120px] bg-[#050505] font-sans px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              id={phase.title === "Foundation" ? "foundation-phase" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-[32px] flex flex-col h-full hover:border-[#404040] transition-colors scroll-mt-[100px]"
            >
              <div className="mb-[24px]">
                {phase.icon}
              </div>
              
              <div className="text-red-500 text-[10px] font-mono mb-[12px] uppercase tracking-wider">
                {phase.phase} · {phase.duration} · {phase.weeks}
              </div>
              
              <h3 className="text-[24px] font-bold text-[#f2f2f2] mb-[16px]">
                {phase.title}
              </h3>
              
              <p className="text-[#a3a3a3] text-[14px] leading-relaxed mb-[32px] min-h-[72px]">
                {phase.description}
              </p>
              
              <div className="space-y-[16px] mb-[40px] flex-grow">
                {phase.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CustomCheckIcon className="w-[16px] h-[16px] text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[#a3a3a3] text-[13px]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <button className="flex items-center justify-between w-full px-[16px] py-[12px] text-[14px] font-medium text-[#f2f2f2] bg-transparent border border-[#262626] rounded-md hover:bg-[#1a1a1a] transition-colors mt-auto group">
                Learn More
                <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
