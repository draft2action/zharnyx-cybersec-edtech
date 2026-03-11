"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is pricing final?",
    answer: "Prices are subject to revision. Current pricing is valid for the next cohort. GST (18%) is included in all total figures."
  },
  {
    question: "Are there EMI options?",
    answer: "EMI is available on request with proper approval. Contact our team for details."
  },
  {
    question: "Can I get a refund?",
    answer: "Please refer to our Terms & Conditions page for our cancellation and refund policy."
  },
  {
    question: "Is there institutional pricing?",
    answer: "Yes, we offer special batch pricing for colleges and institutions. Contact us for details."
  },
  {
    question: "What does the student discount cover?",
    answer: "Valid college students get 50% off the Foundation Phase (₹9,899 → ₹4,949). Student ID verification required."
  }
];

export function PricingFaq() {
  return (
    <section className="py-[96px] px-4 md:px-8 bg-transparent font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-[64px]">
          <h2 className="text-[30px] font-bold text-[#f2f2f2] tracking-tight">
            Pricing <span className="text-red-500">FAQ</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#262626]">
                <AccordionTrigger className="text-left text-[14px] font-medium text-[#f2f2f2] hover:text-red-500 transition-colors py-[16px] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#8c8c8c] text-[14px] pb-[16px] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
