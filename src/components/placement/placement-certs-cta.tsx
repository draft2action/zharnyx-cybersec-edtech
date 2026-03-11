"use client";

import { motion } from "motion/react";
import Link from "next/link";

const certifications = [
  {
    role: "SOC Analyst",
    certs: "CompTIA CySA+, BTL1",
    colorClass: "text-[#10b981]",
  },
  {
    role: "VAPT",
    certs: "eJPT, OSCP",
    colorClass: "text-red-500",
  },
  {
    role: "Cloud",
    certs: "AWS Security Specialty",
    colorClass: "text-[#3b82f6]",
  },
  {
    role: "DFIR",
    certs: "GCFA",
    colorClass: "text-[#eab308]",
  },
];

export function PlacementCertsCTA() {
  return (
    <section className="bg-[#050505] font-sans py-[120px] px-6 border-t border-[#1a1a1a]">
      <div className="container mx-auto max-w-[1280px]">

        {/* Recommended Certifications */}
        <div className="mb-[120px] w-full flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[24px] md:text-[32px] font-bold text-[#ffffff] mb-[48px] text-center"
          >
            Recommended <span className="text-red-500">Certifications</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1000px]">
            {certifications.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[24px] text-center hover:border-[#333333] transition-colors"
              >
                <div className={`text-[13px] font-mono tracking-wide mb-[12px] uppercase ${item.colorClass}`}>
                  {item.role}
                </div>
                <div className="text-[#f2f2f2] text-[16px] font-bold">
                  {item.certs}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-red-500/20 rounded-2xl p-[48px] md:p-[64px] text-center shadow-[0_0_40px_rgba(234,56,76,0.05)] w-full max-w-[900px]"
          >
            <h3 className="text-[28px] md:text-[40px] font-bold text-[#ffffff] mb-[16px]">
              Ready to Launch Your <span className="text-red-500">Career?</span>
            </h3>
            <p className="text-[#a3a3a3] text-[16px] md:text-[18px] mb-[40px]">
              Placement support is included in every full program package.
            </p>

            <div className="flex justify-center">
              <Link
                href="/enroll"
                className="bg-red-500 hover:bg-[#d92d3f] text-white px-[40px] py-[16px] rounded-md font-medium text-[16px] transition-all shadow-[0_0_20px_rgba(234,56,76,0.3)] hover:shadow-[0_0_25px_rgba(234,56,76,0.4)] whitespace-nowrap flex items-center gap-[8px]"
              >
                Enroll Now
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
                  className="w-5 h-5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
