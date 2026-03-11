"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES = ["All", "Foundation", "SOC", "VAPT", "Cloud", "DFIR", "Career"];

const curriculumData = [
  // Foundation
  { week: 1, category: "Foundation", title: "Linux Fundamentals & CLI Mastery", tools: "Ubuntu, VirtualBox" },
  { week: 2, category: "Foundation", title: "Windows Administration & AD Basics", tools: "Windows Server, PowerShell" },
  { week: 3, category: "Foundation", title: "Virtualization & Lab Environment", tools: "VirtualBox, VMware" },
  { week: 4, category: "Foundation", title: "OS Hardening & Security Baselines", tools: "PFSense, iptables" },
  { week: 5, category: "Foundation", title: "Networking Fundamentals & OSI Model", tools: "Packet Tracer" },
  { week: 6, category: "Foundation", title: "Wireshark & Packet Capture Analysis", tools: "Wireshark, tcpdump" },
  { week: 7, category: "Foundation", title: "Python for Cybersecurity (Scripting)", tools: "Python, VS Code" },
  { week: 8, category: "Foundation", title: "Cryptography & PKI Basics", tools: "OpenSSL, GPG" },
  { week: 9, category: "Foundation", title: "Web Technologies & REST APIs", tools: "Burp proxy, Postman" },
  { week: 10, category: "Foundation", title: "Database Concepts & Basic SQL", tools: "MySQL, SQLite" },
  { week: 11, category: "Foundation", title: "Cloud Fundamentals (AWS/Azure)", tools: "AWS Console, Azure Portal" },
  { week: 12, category: "Foundation", title: "Foundation Capstone Project", tools: "Integrated Labs" },

  // SOC
  { week: 13, category: "SOC", title: "Splunk & Microsoft Sentinel (SOC)", tools: "Splunk, Sentinel, SPL, KQL" },
  { week: 14, category: "SOC", title: "Dashboard Design & Alert Triage (SOC)", tools: "Splunk Dashboards" },
  { week: 15, category: "SOC", title: "Alert Triage — 50 Alerts Exercise (SOC)", tools: "SIEM platforms" },
  { week: 16, category: "SOC", title: "SLA Tracking & SOC Metrics (SOC)", tools: "SIEM, ticketing" },
  { week: 17, category: "SOC", title: "MITRE ATT&CK & Sigma Rules (SOC)", tools: "MITRE Navigator, Sigma" },
  { week: 18, category: "SOC", title: "Zeek, Suricata & NSM (SOC)", tools: "Zeek, Suricata" },

  // VAPT
  { week: 19, category: "VAPT", title: "OSINT & Reconnaissance (VAPT)", tools: "Maltego, Shodan, Nmap" },
  { week: 20, category: "VAPT", title: "Active Scanning & Enumeration (VAPT)", tools: "Nessus, OpenVAS" },
  { week: 21, category: "VAPT", title: "Web Application Pentesting (VAPT)", tools: "Burp Suite Pro, OWASP ZAP" },
  { week: 22, category: "VAPT", title: "Network Exploitation (VAPT)", tools: "Metasploit, CrackMapExec" },

  // Cloud & DFIR Mixed examples
  { week: 23, category: "Cloud", title: "AWS Security & IAM Policies (Cloud)", tools: "AWS CLI, CloudTrail" },
  { week: 24, category: "Cloud", title: "Azure Security Center & Misconfigs (Cloud)", tools: "Azure AD, Defender" },
  { week: 25, category: "DFIR", title: "Memory Forensics & Malware Triage (DFIR)", tools: "Volatility, FTK Imager" },
  { week: 26, category: "DFIR", title: "Incident Response Playbooks (DFIR)", tools: "TheHive, Cortex XSOAR" },

  // Career
  { week: 27, category: "Career", title: "Resume Building & ATS Optimization", tools: "LinkedIn, GitHub" },
  { week: 28, category: "Career", title: "Demo Day & Placement Support", tools: "Mock Interviews, Portfolios" },
];

export function CurriculumContent() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredData = curriculumData.filter((item) =>
    activeTab === "All" || item.category === activeTab
  );

  return (
    <section className="bg-[#050505] font-sans py-[80px] px-6 min-h-[800px]">
      <div className="container mx-auto max-w-[1280px]">

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-[64px]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${activeTab === cat
                ? "bg-red-500 border-red-500 text-white"
                : "bg-transparent border-[#333333] text-[#a3a3a3] hover:border-[#666666] hover:text-[#f2f2f2]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Curriculum Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredData.map((item) => (
              <motion.div
                key={item.week}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[24px] hover:border-[#333333] transition-colors flex flex-col h-full"
              >
                {/* Top Row: Week & Category */}
                <div className="flex justify-between items-center mb-4 text-[12px] font-mono tracking-wide">
                  <span className="text-red-500">Week {item.week}</span>
                  <span className="text-[#555555] uppercase">{item.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-[#f2f2f2] text-[14px] md:text-[16px] font-bold mb-6 flex-grow">
                  {item.title}
                </h3>

                {/* Tools */}
                <div className="text-[10px]">
                  <span className="text-red-500">Tools: </span>
                  <span className="text-[#a3a3a3]">{item.tools}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Fallback (though won't happen here) */}
        {filteredData.length === 0 && (
          <div className="text-center text-[#555555] mt-12 text-lg">
            No curriculum items found for this track.
          </div>
        )}

      </div>
    </section>
  );
}
