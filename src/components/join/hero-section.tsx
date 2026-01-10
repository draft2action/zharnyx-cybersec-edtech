"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export function JoinHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden border-b-2 border-white/10 bg-black/50 backdrop-blur-sm pt-20"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-3 px-6 py-3 border-2 border-white/20 bg-white/5 text-sm font-mono font-bold text-white uppercase tracking-widest mb-10 hover:bg-white/10 transition-colors cursor-default"
      >
        <span className="w-2 h-2 bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
        Recruitment Portal
      </motion.div>

      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 max-w-7xl mx-auto uppercase text-white leading-[0.9]"
      >
        Choose Your <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-white to-green-600 decoration-green-500 underline decoration-4 underline-offset-8 decoration-skip-ink-none">
          Designation
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base md:text-lg text-gray-300 font-mono max-w-3xl mx-auto border-y-2 border-white/10 py-6 px-10 bg-white/5 backdrop-blur-md mb-8"
      >
        Zharnyx is an ecosystem. Identify your role to proceed.
      </motion.p>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none opacity-50" />
    </motion.section>
  );
}
