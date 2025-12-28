"use client";

import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from "motion/react";

export default function ProgramsPage() {
  const programs = [
    {
      title: "Network Defense Essentials",
      description:
        "Master the fundamentals of network security, packet analysis, and defense strategies.",
      duration: "12 Weeks",
      level: "Beginner",
    },
    {
      title: "Ethical Hacking & Penetration Testing",
      description:
        "Learn offensive security techniques to find and fix vulnerabilities before attackers do.",
      duration: "16 Weeks",
      level: "Intermediate",
    },
    {
      title: "SOC Analyst Mastery",
      description:
        "Become a Security Operations Center analyst and learn to monitor, detect, and respond to threats.",
      duration: "14 Weeks",
      level: "Advanced",
    },
  ];

  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4 md:px-8 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-white">
              Our Training Programs
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Industry-standard cybersecurity training designed to take you from
              a beginner to a professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white font-mono">
                    {program.title}
                  </h3>
                  <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                    {program.level}
                  </span>
                </div>
                <p className="text-gray-400 mb-6 font-mono text-sm leading-relaxed">
                  {program.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 font-mono">
                  <span>Duration: {program.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
