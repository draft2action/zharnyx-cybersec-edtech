"use client";

import { motion } from "motion/react";

const founders = [
  {
    initial: "S",
    name: "Sanjai R",
    role: "Founder & CEO",
    bio: "Visionary behind Zharnyx. Building Tamil Nadu's cybersecurity talent pipeline from the ground up."
  },
  {
    initial: "H",
    name: "Harish",
    role: "Co-Founder — Curriculum",
    bio: "Designed the 28-week, 4-track curriculum with real-world tool integration and weekly deliverables."
  },
  {
    initial: "A",
    name: "Antony",
    role: "Co-Founder — Placements",
    bio: "Connects students to hiring partners across Coimbatore, Chennai, and remote opportunities."
  }
];

export function AboutFounders() {
  return (
    <section id="leadership" className="bg-[#050505] font-sans py-[120px] px-6">
      <div className="container mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-[80px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] md:text-[48px] font-bold text-[#f2f2f2] tracking-tight"
          >
            Meet the <span className="text-red-500">Founders</span>
          </motion.h2>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[48px] text-center"
            >
              {/* Avatar Outline Circle */}
              <div className="w-[80px] h-[80px] mx-auto rounded-full bg-[#1a1a1a] flex items-center justify-center mb-[24px]">
                <span className="text-red-500 text-[20px] font-bold">
                  {founder.initial}
                </span>
              </div>
              
              <h3 className="text-[18px] font-bold text-[#f2f2f2] mb-[4px]">
                {founder.name}
              </h3>
              
              <p className="text-red-500 text-[12px] font-mono mb-[16px]">
                {founder.role}
              </p>
              
              <p className="text-[#737373] text-[13px] leading-relaxed">
                {founder.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
