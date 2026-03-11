"use client";

import { motion } from "motion/react";

const posts = [
  {
    id: 1,
    tag: "Career Guide",
    subTag: "SOC",
    title: "SOC Analyst Roadmap 2026 — Tamil Nadu Edition",
    description: "Everything you need to know about becoming a SOC Analyst in Chennai & Coimbatore. Career path, skills, salary, and hiring companies.",
  },
  {
    id: 2,
    tag: "Tutorial",
    subTag: "VAPT",
    title: "OWASP Top 10 Explained for Beginners",
    description: "A beginner-friendly breakdown of the most critical web application security risks — with examples and mitigation strategies.",
  },
  {
    id: 3,
    tag: "Tutorial",
    subTag: "Cloud",
    title: "AWS IAM Best Practices for Security Engineers",
    description: "How to implement least-privilege IAM policies in production AWS environments. Common misconfigurations and how to fix them.",
  },
  {
    id: 4,
    tag: "Career Guide",
    subTag: "DFIR",
    title: "Introduction to Digital Forensics — Where to Start",
    description: "A complete beginner's guide to digital forensics: tools, methodology, and career opportunities in India.",
  },
  {
    id: 5,
    tag: "Tutorial",
    subTag: "SOC",
    title: "MITRE ATT&CK Framework — A Practical Guide",
    description: "How to use MITRE ATT&CK for detection engineering, threat hunting, and security operations.",
  },
  {
    id: 6,
    tag: "Industry",
    subTag: "Career",
    title: "Tamil Nadu Cybersecurity Job Market 2026",
    description: "An analysis of cybersecurity hiring trends in Coimbatore, Chennai, and across Tamil Nadu. Salary data, top employers, and in-demand skills.",
  }
];

export function BlogGrid() {
  return (
    <section className="bg-[#050505] font-sans py-[80px] px-6">
      <div className="container mx-auto max-w-[1280px]">
        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-[32px] hover:border-[#262626] transition-colors flex flex-col h-full"
            >
              {/* Badges */}
              <div className="flex justify-between items-center mb-[24px]">
                <span className="text-red-500 text-[11px] font-mono uppercase tracking-wider bg-red-500/10 px-[10px] py-[4px] rounded-sm">
                  {post.tag}
                </span>
                <span className="text-[#525252] text-[12px] font-mono uppercase">
                  {post.subTag}
                </span>
              </div>
              
              {/* Content */}
              <h2 className="text-[20px] font-bold text-[#f2f2f2] leading-snug mb-[16px] group-hover:text-red-500 transition-colors">
                {post.title}
              </h2>
              <p className="text-[#a3a3a3] text-[14px] leading-relaxed mt-auto">
                {post.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
