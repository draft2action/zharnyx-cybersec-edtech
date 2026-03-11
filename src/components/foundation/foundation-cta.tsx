"use client";

import { motion } from "motion/react";
import Link from "next/link";

function RedCheckIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  );
}

const deliverables = [
  "3-VM Lab Environment (Linux, Windows, Firewall)",
  "PCAP Analysis Report",
  "48-Hour Security Audit Capstone",
  "Python Security Automation Scripts",
  "Network Scanning Report",
];

export function FoundationCTA() {
  return (
    <section className="bg-[#050505] font-sans py-[120px] px-6 border-t border-[#1a1a1a]">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
          
          {/* Left: Deliverables */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[32px] md:text-[40px] font-bold text-[#ffffff] mb-[48px]"
            >
              Foundation <span className="text-red-500">Deliverables</span>
            </motion.h2>

            <div className="space-y-[24px]">
              {deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-[16px]"
                >
                  <RedCheckIcon className="text-red-500 shrink-0" />
                  <span className="text-[#a3a3a3] text-[16px] md:text-[18px]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: CTA Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-red-500/20 rounded-2xl p-[48px] text-center shadow-[0_0_40px_rgba(234,56,76,0.05)]"
          >
            <p className="text-[#a3a3a3] text-[15px] mb-[16px]">
              Foundation is required for all tracks
            </p>
            <h3 className="text-[28px] md:text-[36px] font-bold text-[#ffffff] mb-[40px]">
              Start Your Journey
            </h3>
            
            <div className="flex flex-col sm:flex-row justify-center gap-[16px]">
              <Link
                href="/enroll"
                className="bg-red-500 hover:bg-[#d92d3f] text-white px-[32px] py-[16px] rounded-md font-medium text-[16px] transition-all shadow-[0_0_20px_rgba(234,56,76,0.3)] hover:shadow-[0_0_25px_rgba(234,56,76,0.4)] whitespace-nowrap"
              >
                Enroll Now
              </Link>
              <Link
                href="/programs"
                className="bg-transparent border border-[#262626] text-[#f2f2f2] hover:bg-[#1f1f1f] px-[32px] py-[16px] rounded-md font-medium text-[16px] transition-colors whitespace-nowrap"
              >
                View All Programs
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
