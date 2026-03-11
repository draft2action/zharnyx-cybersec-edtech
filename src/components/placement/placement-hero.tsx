"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";

const partners = [
  "Petadot",
  "Briskinfosec",
  "StrongBox IT",
  "TCS",
  "Infosys",
  "HCL",
];

export function PlacementHero() {
  return (
    <section className="relative overflow-hidden bg-[#000000] font-sans pt-[160px] pb-[80px] px-6 border-b border-[#1a1a1a]">
      {/* Background Glows and Grid */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500 opacity-[0.05] blur-[120px] pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      /> */}

      <div className="container mx-auto max-w-[1280px] relative z-10 flex flex-col items-start px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-[11px] md:text-[13px] font-mono tracking-[0.15em] mb-[24px uppercase]"
        >
          PLACEMENT & CAREERS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[30px] md:text-[40px] lg:text-[54px] font-bold text-[#ffffff] leading-[1.1] tracking-tight mb-[24px]"
        >
          From Training to <span className="text-red-500">Career Launch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#a3a3a3] text-[12px] md:text-[16px] max-w-[700px] leading-relaxed mb-[120px]"
        >
          Structured placement support — not just a certificate. We help you get hired.
        </motion.p>

        {/* Hiring Partners Section */}
        <div className="w-full flex flex-col items-center mt-[20px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[20px] md:text-[28px] font-bold text-white mb-[48px] text-center"
          >
            Hiring <span className="text-red-500">Partners</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-[24px] w-full max-w-3xl">
            {partners.map((partner, i) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="bg-[#050505] border border-[#1a1a1a] rounded-xl flex items-center justify-center  px-4 py-2 hover:border-[#333333] transition-colors"
              >
                <span className="text-[#a3a3a3] text-[16px] font-medium tracking-wide">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-[8px] mt-[48px] text-[#737373] text-[14px]"
          >
            <MapPin className="w-4 h-4" />
            <span>Coimbatore · Chennai · Remote</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
