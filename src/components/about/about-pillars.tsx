"use client";

import { motion } from "motion/react";
import { 
  Laptop, 
  MapPin, 
  Users, 
  Banknote, 
  GraduationCap, 
  Award 
} from "lucide-react";

const pillars = [
  {
    icon: <Laptop className="w-[24px] h-[24px] text-red-500" />,
    title: "Real Lab-First Learning",
    description: "Every week has a hands-on lab deliverable. Students build, not just read."
  },
  {
    icon: <MapPin className="w-[24px] h-[24px] text-red-500" />,
    title: "Tamil Nadu Focused Placements",
    description: "Targeted at Coimbatore, Chennai & TN-based companies and GCCs."
  },
  {
    icon: <Users className="w-[24px] h-[24px] text-red-500" />,
    title: "Buddy System Learning",
    description: "Paired with a peer for accountability, collaboration, and support."
  },
  {
    icon: <Banknote className="w-[24px] h-[24px] text-red-500" />,
    title: "Affordable by Design",
    description: "Student discount on Foundation. EMI available on request."
  },
  {
    icon: <GraduationCap className="w-[24px] h-[24px] text-red-500" />,
    title: "Structured End-to-End Journey",
    description: "28-week curriculum — Foundation → Track → Career Launch."
  },
  {
    icon: <Award className="w-[24px] h-[24px] text-red-500" />,
    title: "4 Specialized Tracks",
    description: "SOC, VAPT, Cloud Security, DFIR — choose your career path."
  }
];

export function AboutPillars() {
  return (
    <section id="core-pillars" className="bg-[#050505] font-sans py-[120px] px-6">
      <div className="container mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-[80px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] md:text-[48px] font-bold text-[#f2f2f2] tracking-tight"
          >
            What Makes Us <span className="text-red-500">Different</span>
          </motion.h2>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[32px] md:p-[40px] hover:border-[#262626] transition-colors"
            >
              <div className="mb-[24px]">
                {pillar.icon}
              </div>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#f2f2f2] mb-[12px]">
                {pillar.title}
              </h3>
              <p className="text-[#a3a3a3] text-[13px] leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
