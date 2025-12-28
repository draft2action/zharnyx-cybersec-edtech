"use client";

import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from "motion/react";
import { FolderGit2, Shield, Terminal } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Corporate Network Sentinel",
      description:
        "Design and implement a secure network architecture for a mock corporate environment, including firewall rules and IDS configuration.",
      icon: Shield,
      tech: ["Network Security", "Firewalls", "IDS/IPS"],
    },
    {
      title: "Vulnerability Assessment Suite",
      description:
        "Build an automated script to scan and report common vulnerabilities in web applications.",
      icon: Terminal,
      tech: ["Python", "Automation", "Scanning"],
    },
    {
      title: "Secure File Transfer System",
      description:
        "Develop a secure file sharing application with end-to-end encryption and strict access controls.",
      icon: FolderGit2,
      tech: ["Cryptography", "Web Security", "Access Control"],
    },
  ];

  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4 md:px-8 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-white">
              Student Projects
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Real-world challenges solved by our students. Apply your skills in
              practical scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="group p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <project.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white font-mono mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 font-mono text-sm leading-relaxed h-20">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs rounded bg-white/5 text-gray-300 font-mono border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
