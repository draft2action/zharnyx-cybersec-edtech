"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Shield, Terminal, Crosshair } from "lucide-react";

interface HeroSectionProps {
  course?: {
    months: any[];
    level: string;
    price: number | null;
  };
}

export function HeroSection({ course }: HeroSectionProps) {
  const duration = course?.months?.length ? `${course.months.length} MONTHS` : "6 MONTHS";
  const level = course?.level === "All Levels" ? "3 LVL" : course?.level || "3 LVL"; // Just a heuristic mapping
  const price = course?.price ? `₹${(course.price / 1000).toFixed(1)}K` : "₹4.5K";


  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-36 pb-10">
      {/* Background Grid Accent - subtle static noise or pattern could go here */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex flex-col items-center gap-8">
        {/* Top Badge - Neo Brutalist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 px-4 py-1.5 bg-red-600 text-black font-bold uppercase tracking-widest text-xs border-2 border-red-600 shadow-[4px_4px_0px_0px_white]"
        >
          <Terminal size={14} strokeWidth={3} />
          <span>Zharnyx 2.0 // Cyber-Agency</span>
        </motion.div>

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center max-w-5xl space-y-6">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1] uppercase flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              From Student to
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-white to-red-500 animate-gradient-x"
            >
              Security Consultant
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl font-medium border-l-4 border-red-600 pl-4 text-left md:text-center md:border-l-0 md:border-b-4 md:pb-2"
          >
            A 6-month career residency producing{" "}
            <span className="bg-white text-black px-1">
              Day-1-ready engineers
            </span>{" "}
            via live war games & SOC operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-red-500"
          >
            <span className="flex items-center gap-1">
              <Crosshair size={12} /> Live Operations
            </span>
            <span className="text-gray-600">/</span>
            <span className="flex items-center gap-1">
              <Shield size={12} /> Client Deployments
            </span>
          </motion.div>

          {/* Neo-Brutalist CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 mt-6 w-full justify-center"
          >
            <Link
              href="/blueprint"
              className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              <span className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 -z-10 border-2 border-white group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
              <span className="flex items-center gap-2">
                View Blueprint{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
            <Link
              href="/apply"
              className="group px-8 py-4 bg-transparent text-white font-bold text-lg uppercase tracking-wider border-2 border-white hover:bg-white hover:text-black transition-colors"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid - Neo Brutalist Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 w-full border-2 border-white/20 mt-12 bg-black/50 backdrop-blur-sm divide-x-2 divide-y-2 lg:divide-y-0 divide-white/20"
        >
          <StatItem value={duration} label="Duration" />
          <StatItem value={level} label="Deployment" />
          <StatItem value="100%" label="Exposure" />
          <StatItem value={price} label="Investment" />
        </motion.div>
      </main>
    </div>
  );
}

// function OverflowText({ text, delay }: { text: string; delay: number }) {
//   return (
//     <span className="inline-block overflow-hidden align-bottom">
//       <motion.span
//         initial={{ y: "100%" }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }}
//         className="inline-block"
//       >
//         {text}
//       </motion.span>
//     </span>
//   );
// }

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 hover:bg-white/5 transition-colors group">
      <span className="text-3xl font-bold text-white group-hover:text-red-500 transition-colors">
        {value}
      </span>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
  );
}
