"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export function PricingHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden border-b border-[#262626] font-sans"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-[16px]"
      >
        <span className="text-[14px] font-semibold text-red-500 uppercase tracking-[0.1em] cursor-default">
          PRICING
        </span>
      </motion.div>

      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-[48px] font-bold tracking-tight mb-[24px] max-w-7xl mx-auto text-[#f2f2f2] leading-none"
      >
        Affordable{" "}
        <span className="text-red-500">
          By Design
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[18px] font-normal text-[#8c8c8c] max-w-[448px] mx-auto mb-[24px] leading-[28px]"
      >
        All prices include 18% GST. No hidden fees.
      </motion.p>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-sans"
      >
        <span className="text-[12px] text-[#8c8c8c] uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown className="w-5 h-5 text-purple-500 animate-bounce" />
      </motion.div>

      {/* Decorative Grid - keeping it subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none opacity-30" />
    </motion.section>
  );
}
