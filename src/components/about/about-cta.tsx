"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="bg-[#050505] font-sans py-[120px] px-6">
      <div className="container mx-auto max-w-[800px] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-[64px] border border-red-500/20 bg-red-500/5 overflow-hidden"
        >
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 bg-radial-gradient from-red-500/10 to-transparent opacity-50 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-[36px] md:text-[48px] font-bold text-[#f2f2f2] tracking-tight mb-[24px]">
              Serving <span className="text-red-500">Coimbatore & Chennai</span>
            </h2>
            
            <p className="text-[#a3a3a3] text-[16px] md:text-[18px] mb-[40px]">
              Remote participation available for all programs.
            </p>
            
            <Link 
              href="/apply"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-[#f87171] text-white px-[32px] py-[16px] rounded-md font-semibold text-[15px] transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(234,56,76,0.3)] hover:shadow-[0_0_30px_rgba(234,56,76,0.5)]"
            >
              Join Zharnyx
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
