"use client";

import React from "react";
import { motion } from "motion/react";

export function FoundationSection() {
  return (
    <section id="foundation" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto border-b-2 border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <span className="text-purple-400 font-mono font-bold uppercase tracking-widest text-base mb-6 border-2 border-purple-500/30 px-4 py-2 bg-purple-900/10">
          Month 1-2
        </span>
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-8 tracking-tighter">
          The Foundation
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-6 font-medium text-lg md:text-xl leading-relaxed">
          Combined Cohort (Red + Blue). Everyone builds the battlefield.
        </p>
        <p className="text-gray-500 text-sm md:text-base uppercase tracking-wide border-l-4 border-purple-500 pl-6 py-1 font-mono">
          "You cannot hack what you do not understand. You cannot defend what
          you cannot build."
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Module 1: The Architect */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group bg-black border-2 border-white/20 p-8 md:p-10 hover:border-white transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#ffffff]"
        >
          <div className="flex items-center gap-8 mb-10 border-b-2 border-white/10 pb-8">
            <div className="w-16 h-16 bg-white flex items-center justify-center border-2 border-white shadow-[6px_6px_0px_0px_#333]">
              <span className="text-black font-black text-3xl">1</span>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight mb-2">
                The Architect
              </h3>
              <p className="text-purple-400 font-mono text-sm md:text-base font-bold uppercase tracking-wider">
                Networking & Linux
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleCard
              week="W1"
              title="Linux Survival"
              description="File systems, permissions, Bash scripting, SSH hardening"
            />
            <ModuleCard
              week="W2"
              title="Network Anatomy"
              description="OSI Model, TCP/IP handshake, Subnetting, DNS, HTTP/S"
            />
            <ModuleCard
              week="W3"
              title="Python for Security"
              description="Automating Nmap scans, parsing logs, writing basic socket scripts."
            />
            <ModuleCard
              week="W4"
              isProject
              title="PROJECT: Build Your Own Lab"
              description="Deploy a virtual network with 1 Windows Server (AD), 1 Linux Web Server, and 1 Firewall (pfSense). Deliverable: A topology diagram + a script that auto-configures the firewall."
            />
          </div>
        </motion.div>

        {/* Module 2: The Scout */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group bg-black border-2 border-white/20 p-8 md:p-10 hover:border-white transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#ffffff]"
        >
          <div className="flex items-center gap-8 mb-10 border-b-2 border-white/10 pb-8">
            <div className="w-16 h-16 bg-white flex items-center justify-center border-2 border-white shadow-[6px_6px_0px_0px_#333]">
              <span className="text-black font-black text-3xl">2</span>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight mb-2">
                The Scout
              </h3>
              <p className="text-purple-400 font-mono text-sm md:text-base font-bold uppercase tracking-wider">
                Vulnerability & Logs
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleCard
              week="W1"
              title="Reconnaissance (OSINT)"
              description="Google Dorks, Shodan, finding exposed assets."
            />
            <ModuleCard
              week="W2"
              title="Scanning & Enumeration"
              description="Nmap mastery, Nessus/OpenVAS, understanding CVEs."
            />
            <ModuleCard
              week="W3"
              title="The Digital Footprint"
              description="What logs look like (Syslog, Windows Event Viewer), identifying 'normal' vs. 'abnormal' traffic."
            />
            <ModuleCard
              week="W4"
              isProject
              title="PROJECT: The Audit Report"
              description="Run a vulnerability scan on a target machine, identify 3 critical flaws, and write a professional 'Executive Summary' recommending fixes. Deliverable: A PDF Audit Report (Corporate Standard)."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ModuleCard({
  week,
  title,
  description,
  isProject = false,
}: {
  week: string;
  title: string;
  description: string;
  isProject?: boolean;
}) {
  return (
    <div
      className={`p-6 border-2 transition-colors duration-200 ${isProject
          ? "border-purple-500 bg-purple-500/5 hover:bg-purple-500/10"
          : "border-white/10 bg-white/5 hover:border-white/40 hover:bg-white/10"
        }`}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="shrink-0 pt-1">
          <span
            className={`text-xs font-black uppercase px-3 py-1.5 border-2 ${isProject
                ? "bg-purple-500 text-white border-purple-500"
                : "bg-black text-gray-300 border-gray-600"
              }`}
          >
            {week}
          </span>
        </div>
        <div>
          <h4
            className={`font-black uppercase text-lg mb-2 leading-tight ${isProject ? "text-white" : "text-gray-100"
              }`}
          >
            {title}
          </h4>
          <p className="text-sm text-gray-400 font-mono leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
