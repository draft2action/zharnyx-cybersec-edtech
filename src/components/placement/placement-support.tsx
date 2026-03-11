"use client";

import { motion } from "motion/react";

function RedCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
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

const supportItems = [
  "30+ job applications supported per student",
  "3 rounds of mock interviews (behavioral + technical)",
  "ATS-optimized resume building",
  "LinkedIn & GitHub portfolio optimization",
  "Demo Day presentation to hiring partners",
  "Alumni network access & referrals",
  "Networking mixer with hiring companies (Coimbatore/Chennai)",
];

const salaryRanges = [
  {
    role: "SOC Analyst",
    range: "₹5–8 LPA (L1) → ₹8–14 LPA (L2-L3)",
    colorClass: "text-[#10b981]",
  },
  {
    role: "VAPT",
    range: "₹8–18 LPA",
    colorClass: "text-red-500",
  },
  {
    role: "Cloud Security",
    range: "₹12–30 LPA",
    colorClass: "text-[#3b82f6]",
  },
  {
    role: "DFIR",
    range: "₹14–28 LPA",
    colorClass: "text-[#eab308]",
  },
];

export function PlacementSupport() {
  return (
    <section className="bg-[#050505] font-sans py-[120px] px-6 border-b border-[#1a1a1a]">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-start">

          {/* Left: Support Checklist */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[24px] md:text-[32px] font-bold text-[#ffffff] mb-[32px]"
            >
              Placement <span className="text-red-500">Support Includes</span>
            </motion.h2>

            <div className="space-y-[16px]">
              {supportItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-[16px]"
                >
                  <RedCheckIcon className="text-red-500 shrink-0 mt-[2px]" />
                  <span className="text-[#a3a3a3] text-[14px] md:text-[16px] leading-snug">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Salary Ranges */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[24px] md:text-[32px] font-bold text-[#ffffff] mb-[32px]"
            >
              Salary <span className="text-red-500">Ranges</span>
            </motion.h2>

            <div className="space-y-[16px]">
              {salaryRanges.map((item, i) => (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[16px]"
                >
                  <div className={`text-[12px] font-mono tracking-wide mb-[12px] uppercase ${item.colorClass}`}>
                    {item.role}
                  </div>
                  <div className="text-[#f2f2f2] text-[14px] md:text-[16px] font-bold">
                    {item.range}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
