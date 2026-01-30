"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoaderCyber } from "@/components/ui/loader-cyber";
import { AnimatePresence, motion } from "motion/react";
import { useLoader } from "@/components/shared/loader-context";

export function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
    // When the path changes, it means navigation completed.
    // We keep the loader for a minimum time if it was already showing,
    // OR we just ensure it hides after a delay to show the new page.

    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // Reduced from 2500ms to 800ms for a snappier feel

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, isLoading, setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md"
          style={{ zIndex: 9999 }}
        >
          <div className="flex flex-col items-center">
            <LoaderCyber />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
