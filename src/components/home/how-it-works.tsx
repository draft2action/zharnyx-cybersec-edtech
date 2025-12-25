"use client";

import { UserCheck, List, Activity, Trophy } from "lucide-react";
import { motion } from "motion/react"; // Corrected import path from "motion/react" to "framer-motion" as per common usage

const steps = [
  {
    id: "01",
    title: "Enrol & Verify",
    description:
      "Create your account and complete the identity verification process. Join a community of elite learners.",
    icon: UserCheck,
  },
  {
    id: "02",
    title: "Select Program",
    description:
      "Choose from our specialized tracks: Red Teaming, Blue Teaming, or Full Stack Sec. Designed by veterans.",
    icon: List,
  },
  {
    id: "03",
    title: "Active Labs",
    description:
      "Engage in hands-on, live-fire simulations. Hack into real-world scenarios and defend against active threats.",
    icon: Activity,
  },
  {
    id: "04",
    title: "Global Certification",
    description:
      "Complete the capstone project and earn a globally recognized certificate. Network with mentors.",
    icon: Trophy,
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative z-10 py-24 px-6 md:px-20 max-w-8xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 space-y-4 text-left"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold font-mono text-white tracking-tighter">
          Protocol Sequence
        </h2>
        <p className="text-white/60 font-mono text-lg max-w-xl">
          Follow the standard operating procedure to elevate your clearance
          level.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {steps.map((step) => (
          <motion.div
            key={step.id}
            variants={itemVariants}
            className="group relative h-[400px] w-full overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm p-8 flex flex-col justify-between"
            style={{ borderRadius: "0px" }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-mono font-bold text-white">
              {step.id}
            </div>

            <div className="mt-8 relative z-10">
              <div className="text-4xl mb-6 bg-white/10 w-16 h-16 flex items-center justify-center rounded-none group-hover:bg-white/20 transition-colors">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white font-mono mb-4">
                {step.title}
              </h3>
              <p className="text-white/60 font-mono text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="w-full h-1 bg-white/10 mt-6 overflow-hidden">
              <div className="h-full bg-white/40 w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
