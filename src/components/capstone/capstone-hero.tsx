"use client";

import { motion } from "motion/react";

export function CapstoneHero() {
  return (
    <section className="relative overflow-hidden bg-[#000000] font-sans pt-[160px] pb-[80px] px-6 border-b border-[#1a1a1a]">
      {/* Background Glows and Grid */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500 opacity-[0.05] blur-[120px] pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      /> */}

      <div className="container mx-auto max-w-[1280px] relative z-10 flex flex-col items-center px-4 md:px-8 text-center mt-[40px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-[11px] md:text-[13px] font-mono tracking-[0.15em] mb-[24px] uppercase"
        >
          WEEK 25 · CAPSTONE SIMULATION
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[30px] md:text-[40px] lg:text-[54px] font-bold text-[#ffffff] leading-[1.1] tracking-tight mb-[24px]"
        >
          72-Hour <span className="text-red-500">Live-Fire Exercise</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#a3a3a3] text-[12px] md:text-[16px] max-w-[700px] leading-relaxed mb-[40px]"
        >
          The ultimate test. All four tracks come together in a real-time, cross-team cybersecurity simulation. SOC defends. VAPT attacks. Cloud secures. DFIR investigates.
        </motion.p>
      </div>
    </section>
  );
}
