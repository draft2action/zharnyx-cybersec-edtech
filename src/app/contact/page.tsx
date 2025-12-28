"use client";

import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4 md:px-8 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-white">
              Contact Us
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Have questions? We&apos;re here to help you start your
              cybersecurity journey.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-2xl mx-auto"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono text-gray-400">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:bg-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono text-gray-400">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono text-gray-400">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-mono text-gray-400">
                  Message
                </label>
                <Textarea
                  placeholder="How can we help you?"
                  className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:bg-white/10"
                />
              </div>

              <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6 text-lg rounded-xl">
                Send Message
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
