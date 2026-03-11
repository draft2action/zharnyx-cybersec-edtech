"use client";

import { motion } from "motion/react";

export function AboutHero() {
  return (
    <section id="mission" className="relative overflow-hidden bg-[#050505] font-sans pt-[160px] pb-[80px] lg:pt-[240px] lg:pb-[140px] px-6">
      {/* Background Grid Pattern matching Lovable site */}
      {/* <div 
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none opacity-[0.15]" 
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
        }}
      /> */}

      {/* Grid fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-[1280px] relative z-10">
        <div className="max-w-[1000px] mb-[120px]">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.15em] mb-[24px]"
          >
            ABOUT US
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[30px] md:text-[40px] lg:text-[54px] font-bold text-[#f2f2f2] leading-[1.1] tracking-tight mb-[32px]"
          >
            Tamil Nadu's Own <span className="text-red-500">Cybersecurity Academy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#a3a3a3] text-[16px] md:text-[20px] max-w-[800px] leading-relaxed"
          >
            Making Tamil Nadu's students job-ready in cybersecurity — one cohort at a time.
          </motion.p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[48px] lg:p-[64px]"
          >
            <h2 className="text-red-500 text-[20px] lg:text-[26px] font-bold mb-[24px]">Mission</h2>
            <p className="text-[#a3a3a3] text-[14px] lg:text-[16px] leading-[1.8]">
              Make Tamil Nadu's students job-ready in cybersecurity through hands-on, track-specialised training that produces Day-1 deployable graduates — not just certificate holders.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[48px] lg:p-[64px]"
          >
            <h2 className="text-red-500 text-[20px] lg:text-[26px] font-bold mb-[24px]">Vision</h2>
            <p className="text-[#a3a3a3] text-[14px] lg:text-[16px] leading-[1.8]">
              Every Zharnyx graduate walks into their first cybersecurity role with a portfolio of real deliverables, hands-on lab experience, and the confidence to perform from Day 1.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
