"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function HorizontalScroll({
  children,
  title,
  description,
}: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] z-20">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-20 left-8 md:left-20 z-30 pointer-events-none">
          {title && (
            <h2 className="text-4xl md:text-6xl font-extrabold text-white font-mono tracking-tighter mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-white/60 font-mono max-w-lg">{description}</p>
          )}
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-[10%] md:pl-[30%]">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
