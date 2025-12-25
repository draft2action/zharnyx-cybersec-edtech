"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <div className="relative flex min-h-screen items-center justify-center pointer-events-none overflow-hidden">
      <main className="flex w-8xl max-w-8xl flex-col items-center justify-center gap-8 py-20 px-6 sm:px-16 pointer-events-auto z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold text-white font-mono tracking-tighter"
          >
            Master the hack, lead the attack
          </motion.h1>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-8 font-mono text-white text-lg"
        >
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span
              className="text-2xl"
              style={{ fontVariantLigatures: "normal" }}
            >
              -&gt;
            </span>
            <span>1:1 Mentorship</span>
          </div>
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span
              className="text-2xl"
              style={{ fontVariantLigatures: "normal" }}
            >
              -&gt;
            </span>
            <span>Active Labs</span>
          </div>
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span
              className="text-2xl"
              style={{ fontVariantLigatures: "normal" }}
            >
              -&gt;
            </span>
            <span>Global Certificates</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link
            href="/auth?mode=signup"
            className="px-8 py-4 bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] text-black font-mono font-semibold transition-all duration-300 text-center border-2 border-white"
            style={{ borderRadius: "0px" }}
          >
            Execute Learning
          </Link>
          <Link
            href="/auth?mode=signup&role=mentor"
            className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white text-white font-mono font-semibold hover:bg-white/10 transition-all duration-300 text-center"
            style={{ borderRadius: "0px" }}
          >
            Deploy as Mentor
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 5V19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white text-xs font-mono tracking-widest">
            SCROLL
          </span>
        </motion.div>
      </main>
    </div>
  );
}
