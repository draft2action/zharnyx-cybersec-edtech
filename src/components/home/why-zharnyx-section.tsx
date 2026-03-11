"use client";

import { motion } from "motion/react";

const problems = [
  "No SIEM experience (Splunk, Sentinel)",
  "Zero penetration testing skills",
  "No digital forensics exposure",
  "Cloud security is never taught",
  "Incident Response is theory-only",
];

export function WhyZharnyxSection() {
  return (
    <section className="py-[120px] bg-[#0a0a0a] border-t border-[#1a1a1a] font-sans">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] lg:gap-[100px] items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-[24px]">
              <span className="text-[12px] font-semibold text-red-500 tracking-[0.1em] uppercase">
                THE PROBLEM
              </span>
            </div>
            
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#f2f2f2] leading-[1.1] mb-[32px] tracking-tight">
              Colleges Teach the Syllabus. <span className="text-red-500">We Teach the Skill.</span>
            </h2>

            <p className="text-[15px] text-[#a3a3a3] leading-[26px] mb-[40px] max-w-[500px]">
              95% of cybersecurity graduates can't handle a real SOC alert, write a pentest report, or analyze a memory dump. The industry needs Day-1 deployable talent — not certificate holders.
            </p>

            <blockquote className="border-l-[3px] border-red-500 pl-[20px] text-[#737373] italic text-[15px] leading-[26px]">
              "A certificate tells an employer you studied. A portfolio tells them you can do the job."
            </blockquote>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-[12px]"
          >
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-[16px] p-[20px] rounded-[8px] bg-[#0f0f0f] border border-[#1f1f1f]"
              >
                <div className="flex-shrink-0 w-[24px] h-[24px] rounded-full bg-red-500/10 text-red-500 text-[12px] font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <span className="text-[#d4d4d4] text-[14px]">{problem}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
