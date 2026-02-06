"use client";

import { motion } from "motion/react";
import {
  Server,
  Landmark,
  ScanSearch,
  Clock,
  FileCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function WarRoomSection() {
  return (
    <section id="war-room" className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4 font-bold"
          >
            {/* Operational Training */}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none"
          >
            War Rooms: Where Real <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500">
              Engineers Are Built
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-6 font-mono text-sm uppercase tracking-wide"
          >
            No lectures. Real missions. Deadlines. Reviews.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <WarRoomCard
            title="Build the Lab"
            icon={<Server size={32} />}
            tag="Infrastructure"
            description="Deploy a complete security lab from scratch. Firewalls, SIEM, vulnerable machines."
            color="orange"
            delay={0.1}
          />
          <WarRoomCard
            title="Bank Heist"
            icon={<Landmark size={32} />}
            tag="Offensive Ops"
            description="Simulate a full attack chain on a financial infrastructure. Red team leads."
            color="red"
            delay={0.2}
          />
          <WarRoomCard
            title="Detection Engineer"
            icon={<ScanSearch size={32} />}
            tag="Defensive Ops"
            description="Write detection rules that catch real threats. Blue team focus."
            color="blue"
            delay={0.3}
          />
        </div>

        {/* Footer Stats/Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/10 pt-16"
        >
          <StatItem
            icon={<Clock className="text-red-500" />}
            text="Real Deadlines"
          />
          <StatItem
            icon={<FileCheck className="text-red-500" />}
            text="Reviewed Work"
          />
          <StatItem
            icon={<Users className="text-red-500" />}
            text="Team Collaboration"
          />
        </motion.div>
      </div>
    </section>
  );
}

function WarRoomCard({
  title,
  icon,
  tag,
  description,
  color,
  delay,
}: {
  title: string;
  icon: React.ReactNode;
  tag: string;
  description: string;
  color: string;
  delay: number;
}) {
  // Simple color mapping for badges/border accents
  const getColors = (c: string) => {
    switch (c) {
      case "orange":
        return "text-orange-500 border-orange-500 bg-orange-500/10";
      case "red":
        return "text-red-500 border-red-500 bg-red-500/10";
      case "blue":
        return "text-blue-500 border-blue-500 bg-blue-500/10";
      default:
        return "text-white border-white bg-white/10";
    }
  };

  const themeColors = getColors(color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative bg-black border-2 border-white/20 p-8 hover:border-white transition-colors duration-300"
    >
      <div className="flex justify-between items-start mb-6">
        <div
          className={cn(
            "p-3 border-2",
            themeColors.replace("bg-", "bg-opacity-0 ")
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            "px-2 py-1 text-[10px] font-black uppercase tracking-widest border border-current",
            themeColors
          )}
        >
          {tag}
        </span>
      </div>

      <h3 className="text-2xl font-black text-white uppercase mb-4 group-hover:text-red-500 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-mono text-gray-300 uppercase tracking-wider">
        {text}
      </span>
    </div>
  );
}
