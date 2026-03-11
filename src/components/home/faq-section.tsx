"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Who can enroll?",
    a: "Anyone with a passion for cybersecurity — college students, IT professionals, fresh graduates, or career returners. No prior security experience needed for the Foundation phase.",
  },
  {
    q: "Do I need a laptop?",
    a: "Yes, a basic laptop with at least 8GB RAM is recommended. We provide guided setup for all required tools and labs.",
  },
  {
    q: "Is it live or recorded?",
    a: "Classes are primarily live sessions with recordings available for review. All labs are done hands-on in real time.",
  },
  {
    q: "Can I take only the Foundation?",
    a: "Yes. The Foundation phase is available separately and gives you a strong base in networking, OS, and security fundamentals.",
  },
  {
    q: "Do you guarantee placement?",
    a: "We provide active placement support, mock interviews, and connect you with hiring partners — but final selection depends on your performance.",
  },
  {
    q: "Where are classes held?",
    a: "We operate in Coimbatore, Chennai, and fully remote. You can choose the mode that suits you.",
  },
  {
    q: "What certifications align with the tracks?",
    a: "Our curriculum maps to CompTIA Security+, CEH, AWS Security Specialty, and Digital Forensics certifications depending on your chosen track.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#262626]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-[16px] text-left group"
      >
        <span className="text-[#f2f2f2] font-medium text-[14px] group-hover:text-red-500 transition-colors">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-[#a3a3a3] flex-shrink-0 ml-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-[#a3a3a3] text-[14px] leading-relaxed pb-[16px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="py-[120px] bg-[#050505] font-sans">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-[64px]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-500 text-[12px] font-semibold uppercase tracking-[0.15em] mb-[16px]"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] md:text-[44px] font-bold text-[#f2f2f2] tracking-tight"
          >
            Frequently Asked <span className="text-red-500">Questions</span>
          </motion.h2>
        </div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="max-w-[800px] mx-auto"
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}

          <div className="mt-[40px] text-center">
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-[#d4d4d4] hover:text-[#f2f2f2] transition-colors text-[13px] font-medium group"
            >
              View All FAQs
              <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
