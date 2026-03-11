"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const founders = [
  {
    initial: "S",
    name: "Sanjai R",
    role: "Founder & CEO",
    bio: "Visionary behind Zharnyx. Building Tamil Nadu's cybersecurity talent pipeline.",
  },
  {
    initial: "H",
    name: "Harish",
    role: "Co-Founder — Curriculum",
    bio: "Designed the 28-week curriculum with real-world tool integration.",
  },
  {
    initial: "A",
    name: "Antony",
    role: "Co-Founder — Placements",
    bio: "Connects students to hiring partners across Coimbatore & Chennai.",
  },
];

export function FoundersSection() {
  return (
    <section className="py-[120px] bg-[#050505] font-sans">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-[64px]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-500 text-[12px] font-semibold uppercase tracking-[0.15em] mb-[16px]"
          >
            LEADERSHIP
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] md:text-[44px] font-bold text-[#f2f2f2] tracking-tight"
          >
            Meet the <span className="text-red-500">Founders</span>
          </motion.h2>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[48px]">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex flex-col items-center text-center p-[40px] border border-[#1f1f1f] rounded-[16px] bg-[#0a0a0a] hover:border-[#333] transition-colors"
            >
              {/* Avatar */}
              <div className="flex-shrink-0 w-[64px] h-[64px] rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-[20px] font-bold mb-[24px]">
                {f.initial}
              </div>
              {/* Info */}
              <div>
                <p className="text-[#f2f2f2] font-semibold text-[16px] leading-none mb-[8px] tracking-tight">{f.name}</p>
                <p className="text-red-500 text-[13px] mb-[20px] tracking-wide">{f.role}</p>
                <p className="text-[#8c8c8c] text-[14px] leading-[24px]">{f.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More About Us */}
        <div className="text-center flex justify-center">
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="/about"
            className="inline-flex items-center gap-2 text-[#f2f2f2] font-medium hover:bg-[#1f1f1f] transition-colors group px-[24px] py-[12px] border border-[#262626] rounded-[8px] text-[14px]"
          >
            More About Us{" "}
            <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
