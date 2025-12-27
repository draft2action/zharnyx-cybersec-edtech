"use client";

import { motion } from "motion/react";
import {
  Terminal,
  User,
  Award,
  Calendar,
  Briefcase,
  MonitorCheck,
  LucideIcon,
} from "lucide-react";

interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const highlights: Highlight[] = [
  {
    id: "h1",
    title: "32 Projects",
    description: "Hands-on real-world cybersecurity projects",
    icon: Terminal,
  },
  {
    id: "h2",
    title: "1:1 Mentorship",
    description: "Weekly personalized guidance from experts",
    icon: User,
  },
  {
    id: "h3",
    title: "Verified Portfolio",
    description: "Recruiter-approved project certifications",
    icon: Award,
  },
  {
    id: "h4",
    title: "6-Month Program",
    description: "Intensive cohort-based learning",
    icon: Calendar,
  },
  {
    id: "h5",
    title: "Job Ready",
    description: "Build skills that recruiters actually seek",
    icon: Briefcase,
  },
  {
    id: "h6",
    title: "Live War Rooms",
    description: "Collaborative problem-solving sessions",
    icon: MonitorCheck,
  },
];

export function ProgramHighlights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="relative z-10 py-24 px-6 md:px-20 max-w-8xl mx-auto ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 space-y-4 text-left"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold font-mono text-white tracking-tighter">
          Program Highlights
        </h2>
        <p className="text-white/60 font-mono text-lg max-w-xl">
          Everything you need to become a cybersecurity professional
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {highlights.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm p-6 flex flex-row items-start gap-4"
          >
            <div className="bg-white/10 p-3 rounded-none group-hover:bg-white/20 transition-colors shrink-0">
              <item.icon className="w-6 h-6 text-white" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-white font-mono">
                {item.title}
              </h3>
              <p className="text-white/60 font-mono text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 group-hover:bg-white/50 transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-white/20 group-hover:bg-white/50 transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
