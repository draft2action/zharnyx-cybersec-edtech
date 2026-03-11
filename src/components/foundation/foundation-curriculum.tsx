"use client";

import { motion } from "motion/react";
import { Terminal, Globe, Code } from "lucide-react";

const curriculumBlocks = [
  {
    month: "Month 1: Systems, OS & Virtualization",
    icon: <Terminal className="w-[24px] h-[24px] text-red-500" />,
    weeks: [
      {
        id: "week-1",
        label: "Week 1",
        title: "Linux Fundamentals & CLI Mastery",
        description: "File system, permissions, bash scripting, cron jobs",
        tools: "Ubuntu, VirtualBox",
      },
      {
        id: "week-2",
        label: "Week 2",
        title: "Windows Administration & Active Directory Basics",
        description: "PowerShell, Event Viewer, Group Policy, domain basics",
        tools: "Windows Server, PowerShell",
      },
      {
        id: "week-3",
        label: "Week 3",
        title: "OS Hardening & Posture",
        description: "Securing Linux & Windows servers, CIS Benchmarks",
        tools: "Ansible, OpenSCAP",
      },
      {
        id: "week-4",
        label: "Week 4",
        title: "Virtualization & Containers",
        description: "Docker basics, hypervisor setup, lab infrastructure",
        tools: "Docker, KVM",
      },
    ],
  },
  {
    month: "Month 2: Networking, TCP/IP & Traffic Analysis",
    icon: <Globe className="w-[24px] h-[24px] text-red-500" />,
    weeks: [
      {
        id: "week-5",
        label: "Week 5",
        title: "Networking Fundamentals & OSI Model",
        description: "TCP/IP stack, subnetting, DNS, DHCP, ARP",
        tools: "Packet Tracer",
      },
      {
        id: "week-6",
        label: "Week 6",
        title: "Wireshark & Packet Capture Analysis",
        description: "Display filters, TCP streams, protocol dissection",
        tools: "Wireshark, tcpdump",
      },
      {
        id: "week-7",
        label: "Week 7",
        title: "Network Scanning & Enumeration",
        description: "Host discovery, port scanning, service detection, NSE",
        tools: "Nmap, Masscan",
      },
      {
        id: "week-8",
        label: "Week 8",
        title: "Web Application Basics & Vulnerability Intro",
        description: "HTTP/HTTPS, OWASP Top 10 intro, DVWA labs",
        tools: "DVWA, Burp Suite (intro)",
      },
    ],
  },
  {
    month: "Month 3: Security Frameworks, Python & Capstone",
    icon: <Code className="w-[24px] h-[24px] text-red-500" />,
    weeks: [
      {
        id: "week-9",
        label: "Week 9",
        title: "Cybersecurity Frameworks",
        description: "NIST CSF, MITRE ATT&CK, Cyber Kill Chain",
        tools: "Documentation tools",
      },
      {
        id: "week-10",
        label: "Week 10",
        title: "Python for Security",
        description: "Scripting basics, requests library, building basic scanners",
        tools: "Python 3, Scapy",
      },
      {
        id: "week-11",
        label: "Week 11",
        title: "Python Security Tools & API Integration",
        description: "VirusTotal API, log parsers, automated recon scripts",
        tools: "Python, APIs",
      },
      {
        id: "week-12",
        label: "Week 12",
        title: "Foundation Capstone — 48-Hour Security Audit",
        description: "Full audit: scanning, analysis, report writing, presentation",
        tools: "All foundation tools",
      },
    ],
  },
];

export function FoundationCurriculum() {
  return (
    <section className="bg-[#050505] font-sans py-[120px] px-6">
      <div className="container mx-auto max-w-[1280px]">
        <div className="space-y-[120px]">
          {curriculumBlocks.map((block) => (
            <div key={block.month} className="space-y-[40px]">
              {/* Header */}
              <div className="flex items-center gap-4">
                {block.icon}
                <h2 className="text-[20px] md:text-[28px] font-bold text-[#ffffff]">
                  {block.month}
                </h2>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {block.weeks.map((week, i) => (
                  <motion.div
                    key={week.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[32px] hover:border-[#262626] transition-colors flex flex-col h-full"
                  >
                    <div className="text-red-500 text-[13px] font-mono mb-[16px]">
                      {week.label}
                    </div>
                    <h3 className="text-[18px] font-bold text-[#f2f2f2] mb-[12px]">
                      {week.title}
                    </h3>
                    <p className="text-[#a3a3a3] text-[14px] leading-relaxed mb-[24px] flex-grow">
                      {week.description}
                    </p>
                    <div className="mt-auto">
                      <span className="text-red-500 text-[13px]">Tools: </span>
                      <span className="text-[#737373] text-[13px]">{week.tools}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
