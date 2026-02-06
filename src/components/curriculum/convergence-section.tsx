"use client";

import React from "react";
import { Swords } from "lucide-react";
import { motion } from "motion/react";

export function ConvergenceSection() {
  return (
    <section id="convergence" className="py-32 px-4 md:px-8 max-w-[1200px] mx-auto border-b-2 border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <span className="text-purple-400 font-mono font-bold uppercase tracking-widest text-base mb-6 border-2 border-purple-500/30 px-4 py-2 bg-purple-900/10">
          Month 5
        </span>
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-4 tracking-tighter">
          The Convergence
        </h2>
        <div className="flex items-center gap-3 mb-6 bg-black border-2 border-white/20 px-6 py-2 rounded-full">
          <Swords className="w-6 h-6 text-red-500" />
          <span className="text-purple-400 text-xl font-black uppercase tracking-widest">
            The War Games
          </span>
          <Swords className="w-6 h-6 text-blue-500 scale-x-[-1]" />
        </div>
        <p className="text-gray-300 font-mono font-medium text-base md:text-lg max-w-2xl mx-auto">
          We pair 1 Red Student with 1 Blue Student. Real-time attack and
          defense operations.
        </p>
      </motion.div>

      <div className="space-y-12 relative">
        {/* Vertical Line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-[23px] top-10 bottom-10 w-1 bg-white/10 hidden md:block"
        ></motion.div>

        {/* Step 1-2 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-10 relative group"
        >
          <div className="hidden md:flex shrink-0 w-12 h-12 bg-black border-2 border-white items-center justify-center z-10 group-hover:bg-purple-600 transition-colors shadow-[0_0_0_4px_black]">
            <span className="text-sm font-black text-white">1-2</span>
          </div>
          <div className="flex-1 bg-black border-2 border-white/20 p-8 hover:border-purple-500 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#a855f7] hover:-translate-y-1">
            <h4 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">
              Preparation
            </h4>
            <p className="text-gray-400 font-mono text-base border-t-2 border-white/10 pt-4 mt-2 font-medium">
              Red prepares attack scripts. Blue hardens the defenses.
            </p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-10 relative group"
        >
          <div className="hidden md:flex shrink-0 w-12 h-12 bg-black border-2 border-white items-center justify-center z-10 group-hover:bg-red-600 transition-colors shadow-[0_0_0_4px_black]">
            <span className="text-sm font-black text-white">3</span>
          </div>
          <div className="flex-1 bg-black border-2 border-white/20 p-8 hover:border-red-500 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#ef4444] hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                LIVE FIRE EXERCISE
              </h4>
              <div className="flex gap-2">
                <span className="bg-red-500/20 text-red-500 text-xs font-black px-2 py-1 border border-red-500 uppercase">
                  Attack
                </span>
                <span className="bg-blue-500/20 text-blue-500 text-xs font-black px-2 py-1 border border-blue-500 uppercase">
                  Defend
                </span>
              </div>
            </div>

            <p className="text-gray-400 font-mono text-base border-t-2 border-white/10 pt-4 mt-2 font-medium">
              Red Team attacks the Blue Team&apos;s infrastructure in real-time.
              Blue Team must detect and block them within 15 minutes.
            </p>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-10 relative group"
        >
          <div className="hidden md:flex shrink-0 w-12 h-12 bg-black border-2 border-white items-center justify-center z-10 group-hover:bg-white group-hover:text-black transition-colors shadow-[0_0_0_4px_black]">
            <span className="text-sm font-black group-hover:text-black text-white">
              4
            </span>
          </div>
          <div className="flex-1 bg-black border-2 border-purple-500 p-8 shadow-[12px_12px_0px_0px_#a855f7]">
            <h4 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">
              The Joint Report
            </h4>
            <div className="p-6 bg-white/5 border border-dashed border-white/30 text-gray-300 font-mono text-sm md:text-base italic mb-6">
              &quot;Here is how I got in.&quot; <br />
              &quot;Here is how I saw him.&quot; <br />
              &quot;Here is how to fix it.&quot;
            </div>
            <p className="text-purple-400 font-black text-sm uppercase tracking-widest border-l-4 border-purple-500 pl-4">
              Deliverable: Purple Team Assessment
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
