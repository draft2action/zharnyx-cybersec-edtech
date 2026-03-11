"use client";

import { motion } from "motion/react";
import { Monitor, Radio, Cloud, Search, ArrowRight } from "lucide-react";

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

const tracks = [
  {
    icon: <Monitor className="w-[32px] h-[32px] text-red-500" />, // Red for SOC
    title: "Foundation + SOC + Placement",
    duration: "7 Months",
    weeks: "28 Weeks",
    features: ["SIEM Operations", "Threat Hunting", "Incident Response"],
  },
  {
    icon: <Radio className="w-[32px] h-[32px] text-red-500" />, // Red for VAPT
    title: "Foundation + VAPT + Placement",
    duration: "7 Months",
    weeks: "28 Weeks",
    features: ["Web App Pentesting", "Network Exploitation", "Mobile VAPT"],
  },
  {
    icon: <Cloud className="w-[32px] h-[32px] text-red-500" />, // Red for Cloud
    title: "Foundation + Cloud + Placement",
    duration: "7 Months",
    weeks: "28 Weeks",
    features: ["AWS/Azure Security", "Container Security", "DevSecOps"],
  },
  {
    icon: <Search className="w-[32px] h-[32px] text-red-500" />, // Red for DFIR
    title: "Foundation + DFIR + Placement",
    duration: "7 Months",
    weeks: "28 Weeks",
    features: ["Disk Forensics", "Memory Analysis", "Malware Investigation"],
  },
];

export function ProgramsTracks() {
  return (
    <section className="py-[120px] bg-[#050505] font-sans px-4">
      <div className="container mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-[80px]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-500 text-[12px] font-semibold uppercase tracking-[0.15em] mb-[16px]"
          >
            CHOOSE YOUR PATH
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] md:text-[44px] font-bold text-[#f2f2f2] tracking-tight"
          >
            4 Complete <span className="text-red-500">Packages</span>
          </motion.h2>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, i) => (
            <motion.div
              key={track.title}
              id={
                track.features[0].includes("SIEM") ? "soc" : 
                track.features[0].includes("Web App") ? "vapt" : 
                track.features[0].includes("AWS") ? "cloud" : "dfir"
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-[32px] flex flex-col hover:border-[#404040] transition-colors scroll-mt-[100px]"
            >
              <div className="mb-[40px]">
                {track.icon}
              </div>

              <h3 className="text-[16px] font-bold text-[#f2f2f2] mb-[12px] leading-snug">
                {track.title}
              </h3>

              <div className="text-[#a3a3a3] text-[10px] font-mono mb-[32px] uppercase tracking-wider">
                {track.duration} · {track.weeks}
              </div>

              <div className="space-y-[16px] mb-[40px] flex-grow">
                {track.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <CustomCheckIcon className="w-[14px] h-[14px] text-red-500 flex-shrink-0" />
                    <span className="text-[#737373] text-[13px]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <a 
                href="/enroll" 
                className="inline-flex items-center gap-2 text-red-500 hover:text-[#f87171] transition-colors text-[13px] font-medium group mt-auto"
              >
                Explore Track
                <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
