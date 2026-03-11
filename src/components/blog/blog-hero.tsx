"use client";

import { motion } from "motion/react";

export function BlogHero() {
  const filters = ["All", "SOC", "VAPT", "Cloud", "DFIR", "Career"];

  return (
    <section className="relative overflow-hidden bg-[#050505] font-sans pt-[160px] pb-[80px] px-6 border-b border-[#1a1a1a]">
      {/* Background Grid Pattern */}
      {/* <div 
        className="absolute inset-x-0 top-0 h-[400px] pointer-events-none opacity-[0.1]" 
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
        }}
      /> */}

      <div className="container mx-auto max-w-[1280px] relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.15em] mb-[24px]"
        >
          BLOG & RESOURCES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[36px] md:text-[48px] lg:text-[64px] font-bold text-[#f2f2f2] leading-[1.1] tracking-tight mb-[24px]"
        >
          Cybersecurity <span className="text-red-500">Insights</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#a3a3a3] text-[16px] md:text-[20px] max-w-[600px] leading-relaxed mb-[48px]"
        >
          Career guides, tool tutorials, and industry insights for Tamil Nadu's cybersecurity community.
        </motion.p>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-[12px]"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-[20px] py-[8px] rounded-full text-[14px] font-medium transition-colors border ${filter === "All"
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-transparent text-[#a3a3a3] border-[#262626] hover:bg-[#1f1f1f] hover:text-[#f2f2f2]"
                }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
