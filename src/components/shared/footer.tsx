"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/20 bg-slate-900/80 backdrop-blur-md pt-16 pb-8">
      <div className="w-full px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-mono text-white tracking-tighter">
              ZHARNYX ACADEMY
            </h3>
            <p className="text-white/60 font-mono text-sm leading-relaxed max-w-xs">
              Forging the next generation of elite cybersecurity professionals
              through intensive, hands-on combat simulation and expert
              mentorship.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-mono mb-6">Programs</h4>
            <ul className="space-y-3 font-mono text-sm text-white/60">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Red Teaming
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blue Teaming
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Full Stack Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Corporate Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold font-mono mb-6">Resources</h4>
            <ul className="space-y-3 font-mono text-sm text-white/60">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  CTF Challenges
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Career Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter/Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold font-mono mb-6">
              Stay Updated
            </h4>
            <p className="text-white/60 font-mono text-sm">
              Get the latest security briefings and program updates.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/5 border-white/10 text-white font-mono placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-white/20"
              />
              <Button variant="secondary" className="font-mono">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-white/40 font-mono text-xs">
            © {new Date().getFullYear()} CyberSec EdTech Platform. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-white/40 font-mono text-xs">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
