"use client";

import React from "react";
import { Sword, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function SplitSection() {
  return (
    <section id="specialization" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto border-b-2 border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <span className="text-purple-400 font-mono font-bold uppercase tracking-widest text-base mb-6 border-2 border-purple-500/30 px-4 py-2 bg-purple-900/10">
          Month 3-4
        </span>
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-6 tracking-tighter">
          The Split
        </h2>
        <p className="text-gray-300 font-mono uppercase tracking-wide text-sm md:text-base max-w-2xl mx-auto font-bold">
          Students separate into their chosen domains.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Red Team Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative bg-black border-2 border-red-900/50 hover:border-red-500 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#ef4444] hover:-translate-y-1"
        >
          <div className="p-10 border-b-2 border-red-900/30 bg-red-950/10">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 bg-red-600 flex items-center justify-center border-2 border-white shadow-[6px_6px_0px_0px_black]">
                <Sword className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                  Red Team
                </h3>
                <p className="text-red-500 font-mono text-sm uppercase font-bold tracking-widest">
                  The Sword
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm md:text-base font-mono uppercase tracking-wide">
              Offensive Security, Web/Network Hacking
            </p>
          </div>

          <div className="p-10 space-y-10">
            <TrackModule
              number="3"
              title="Web Application Warfare"
              color="text-red-500"
              bg="bg-red-500"
              items={[
                "OWASP Top 10: SQLi, XSS, IDOR, Burp Suite Pro, API Hacking.",
                "PROJECT: The Bank Heist: A dummy banking app has 5 hidden vulnerabilities. Steal the admin credentials and drain the fake funds.",
              ]}
            />
            <TrackModule
              number="4"
              title="Network & AD Attacks"
              color="text-red-500"
              bg="bg-red-500"
              items={[
                "Active Directory Exploits: Kerberoasting, Bloodhound, Metasploit, Evasion techniques.",
                "PROJECT: Domain Domination: Escalate privileges to 'Domain Admin' without tripping alarms. Deliverable: Technical Attack Path Report.",
              ]}
            />
          </div>
        </motion.div>

        {/* Blue Team Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative bg-black border-2 border-blue-900/50 hover:border-blue-500 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#3b82f6] hover:-translate-y-1"
        >
          <div className="p-10 border-b-2 border-blue-900/30 bg-blue-950/10">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 bg-blue-600 flex items-center justify-center border-2 border-white shadow-[6px_6px_0px_0px_black]">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                  Blue Team
                </h3>
                <p className="text-blue-500 font-mono text-sm uppercase font-bold tracking-widest">
                  The Shield
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm md:text-base font-mono uppercase tracking-wide">
              SOC Operations, Threat Hunting, Forensics
            </p>
          </div>

          <div className="p-10 space-y-10">
            <TrackModule
              number="3"
              title="The Watchtower (SIEM)"
              color="text-blue-500"
              bg="bg-blue-500"
              items={[
                "SIEM Architecture: Splunk/Wazuh, Writing parsers, SPL/KQL queries, Dashboards.",
                "PROJECT: The Detection Engineer: Write a custom rule to trigger an alert after 5 failed attempts. Deliverable: Dashboard screenshot + Rule syntax.",
              ]}
            />
            <TrackModule
              number="4"
              title="Incident Response"
              color="text-blue-500"
              bg="bg-blue-500"
              items={[
                "Digital Forensics: Disk/Memory analysis, Malware Analysis (Static), The Incident Response Lifecycle.",
                "PROJECT: Ransomware Patient Zero: Analyze the memory dump, find the entry point. Deliverable: Incident Response (IR) Report.",
              ]}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrackModule({
  number,
  title,
  items,
  color,
  bg,
}: {
  number: string;
  title: string;
  items: string[];
  color: string;
  bg: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <span
          className={cn(
            "w-10 h-10 flex items-center justify-center font-black text-lg text-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
            bg
          )}
        >
          {number}
        </span>
        <h4 className="font-black text-xl text-white uppercase tracking-tight">
          {title}
        </h4>
      </div>
      <ul className="pl-5 border-l-4 border-white/10 space-y-4 ml-5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <ChevronRight
              className={cn("w-5 h-5 mt-1 shrink-0 stroke-[3px]", color)}
            />
            <span className="text-gray-300 font-medium text-sm md:text-base leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
