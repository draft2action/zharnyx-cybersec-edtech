"use client";

import { motion } from "motion/react";

const problems = [
  {
    num: "1",
    text: "Graduates have zero SIEM experience — never used Splunk or Sentinel"
  },
  {
    num: "2",
    text: "No penetration testing skills — can't run Nmap or use Metasploit"
  },
  {
    num: "3",
    text: "Digital forensics is completely absent from curricula"
  },
  {
    num: "4",
    text: "Cloud security (AWS/Azure) is never taught practically"
  },
  {
    num: "5",
    text: "Incident Response remains theory-only — no real playbooks or SOAR tools"
  }
];

export function AboutProblem() {
  return (
    <section id="journey" className="bg-[#050505] font-sans py-[120px] px-6">
      <div className="container mx-auto max-w-[800px]">
        {/* Header */}
        <div className="text-center mb-[80px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] md:text-[48px] font-bold text-[#f2f2f2] tracking-tight"
          >
            The Problem <span className="text-red-500">We Solve</span>
          </motion.h2>
        </div>

        {/* Numbered List */}
        <div className="space-y-[16px] mb-[80px]">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-[24px] flex items-center gap-[24px]"
            >
              <div className="flex-shrink-0 w-[32px] h-[32px] rounded-full bg-red-500/10 flex items-center justify-center font-mono font-bold text-red-500 text-[14px]">
                {problem.num}
              </div>
              <p className="text-[#a3a3a3] text-[15px]">
                {problem.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlight Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-l-[2px] border-red-500 pl-[24px] md:pl-[40px] py-[12px] max-w-[650px] mx-auto text-center md:text-left"
        >
          <p className="text-[#a3a3a3] text-[18px] md:text-[20px] italic leading-relaxed">
            "A certificate tells an employer you studied. A portfolio tells them you can do the job."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
