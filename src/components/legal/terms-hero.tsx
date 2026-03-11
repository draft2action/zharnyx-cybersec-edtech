"use client";

import { motion } from "motion/react";

export function TermsHero() {
  return (
    <section className="relative overflow-hidden bg-[#000000] font-sans pt-[160px] pb-[80px] px-6 border-b border-[#1a1a1a]">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto max-w-[1000px] relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[48px] md:text-[64px] font-bold text-[#ffffff] leading-[1.1] tracking-tight mb-[16px]"
        >
          Terms & <span className="text-red-500">Conditions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#a3a3a3] text-[14px] md:text-[16px]"
        >
          Last updated: March 2026
        </motion.p>
      </div>
    </section>
  );
}
