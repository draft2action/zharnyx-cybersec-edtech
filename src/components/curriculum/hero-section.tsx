"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden border-b-2 border-white/10 bg-black/50 backdrop-blur-sm "
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="inline-flex items-center gap-3 px-6 py-3 border-2 border-white/20 bg-white/5 text-sm font-mono font-bold text-white uppercase tracking-widest mb-10 hover:bg-white/10 transition-colors cursor-default"
      >
        <span className="w-2 h-2 bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]"></span>
        Detailed Curriculum
      </motion.div>

      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 max-w-7xl mx-auto uppercase text-white leading-[0.9]"
      >
        The{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-800 decoration-purple-500 underline decoration-4 underline-offset-8 decoration-skip-ink-none">
          Purple Team
        </span>{" "}
        <br className="hidden md:block" /> Pathway
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col md:flex-row items-center gap-6 text-gray-400 font-mono text-base md:text-lg mb-12 uppercase tracking-wide font-bold"
      >
        <span className="px-5 py-2 border-2 border-white/20 bg-black hover:border-white transition-colors">
          24 Weeks Intensive
        </span>
        <span className="hidden md:inline text-purple-500 text-2xl font-black">
          //
        </span>
        <span className="px-5 py-2 border-2 border-white/20 bg-black hover:border-white transition-colors">
          5+1 Operational Model
        </span>
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-base md:text-lg text-gray-300 font-mono max-w-3xl mx-auto border-y-2 border-white/10 py-6 px-10 bg-white/5 backdrop-blur-md mb-8"
      >
        4 Months Training <span className="text-purple-500 mx-2">+</span> 1
        Month War Games <span className="text-purple-500 mx-2">+</span> 1 Month
        Residency
      </motion.p>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown className="w-6 h-6 text-purple-500" />
      </motion.div>
    </motion.section>
  );
}
