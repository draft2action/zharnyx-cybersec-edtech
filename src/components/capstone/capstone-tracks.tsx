"use client";

import { motion } from "motion/react";
import { Monitor, Target, Cloud, Search } from "lucide-react";

const tracks = [
  {
    role: "SOC Students",
    description: "Defend a live corporate network. Monitor SIEM alerts, triage threats, coordinate incident response in real-time.",
    icon: Monitor,
  },
  {
    role: "VAPT Students",
    description: "Attack the SOC-defended network. Find vulnerabilities, exploit them, and document findings in a professional report.",
    icon: Target,
  },
  {
    role: "Cloud Students",
    description: "Secure the Azure/AWS infrastructure. Configure firewalls, manage IAM roles, and detect misconfigurations during the assault.",
    icon: Cloud,
  },
  {
    role: "DFIR Students",
    description: "Analyze the aftermath. Perform memory forensics, trace attacker movement, and build a comprehensive timeline of the breach.",
    icon: Search,
  },
];

export function CapstoneTracks() {
  return (
    <section className="bg-[#050505] font-sans py-[120px] px-6">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[32px]">
          {tracks.map((track, i) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[32px] md:p-[48px] flex flex-col"
              >
                <div className="mb-[24px]">
                  <Icon className="w-4 h-4 md:w-6 md:h-6 text-red-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#ffffff] text-[16px] md:text-[20px] font-bold mb-[16px]">
                  {track.role}
                </h3>
                <p className="text-[#a3a3a3] text-[12px] md:text-[14px] leading-relaxed">
                  {track.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
