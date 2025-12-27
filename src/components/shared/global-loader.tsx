"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoaderOne } from "@/components/ui/loader";
import { AnimatePresence, motion } from "motion/react";
import { useLoader } from "@/components/shared/loader-context";

export function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
    console.log(
      "GlobalLoader effect: isLoading =",
      isLoading,
      "pathname =",
      pathname
    );
    // When the path changes, it means navigation completed.
    // We keep the loader for a minimum time if it was already showing,
    // OR we just ensure it hides after a delay to show the new page.

    // However, since we trigger it on click, we want to hide it *after*
    // the navigation is done + some small delay for effect.

    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500); // Maintain the 2.5s duration requested

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
            <LoaderOne />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
