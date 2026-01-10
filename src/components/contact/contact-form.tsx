"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Terminal,
  MapPin,
  Mail,
  Globe,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export function ContactForm() {
  return (
    <section className="min-h-screen py-20 px-4 md:px-8 bg-black relative flex items-center justify-center">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none opacity-50" />

      <div className="max-w-6xl w-full mx-auto border-2 border-white bg-black relative z-10 grid grid-cols-1 lg:grid-cols-3 shadow-[8px_8px_0px_0px_#ef4444]">
        {/* Left Panel: Contact Details */}
        <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-white p-8 md:p-12 space-y-12 bg-black">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-red-600 bg-red-600/10 text-red-500 text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-[4px_4px_0px_0px_#ef4444]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Comm Link Active
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              Get In <br />{" "}
              <span className="text-stroke-1 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
                Touch
              </span>
            </h2>
            <p className="text-zinc-400 font-mono text-sm leading-relaxed border-l-4 border-red-600 pl-4">
              Operators standing by. Signal us for deployment inquiries,
              partnership proposals, or general reconnaissance.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="p-3 border-2 border-white bg-black text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[4px_4px_0px_0px_white] transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">
                  Base of Operations
                </h4>
                <p className="text-zinc-400 text-sm font-mono">
                  Zharnyx HQ, Cyber City
                  <br />
                  Bengaluru, KA 560001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="p-3 border-2 border-white bg-black text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[4px_4px_0px_0px_white] transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">
                  Direct Uplink
                </h4>
                <p className="text-zinc-400 text-sm font-mono">
                  ops@zharnyx.com
                  <br />
                  support@zharnyx.com
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t-2 border-white/20">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
              Secure Channels
            </h4>
            <div className="flex gap-4">
              <SocialIcon icon={Github} href="#" color="hover:bg-red-600" />
              <SocialIcon icon={Linkedin} href="#" color="hover:bg-red-600" />
              <SocialIcon icon={Twitter} href="#" color="hover:bg-red-600" />
              <SocialIcon icon={Globe} href="#" color="hover:bg-red-600" />
            </div>
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className="lg:col-span-2 bg-black">
          {/* Terminal Header */}
          <div className="bg-black border-b-2 border-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono text-white uppercase font-bold tracking-widest">
                root@zharnyx:~/contact-uplink
              </span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-red-500"></div>
              <div className="w-2 h-2 bg-red-500"></div>
              <div className="w-2 h-2 bg-red-500"></div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-mono text-red-500 uppercase font-black tracking-widest border-b-2 border-red-500 inline-block pb-1">
                  Identity_String
                </label>
                <Input
                  placeholder="ENTER_FULL_NAME"
                  className="bg-black border-2 border-white text-white font-mono placeholder:text-zinc-700 h-14 rounded-none focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[4px_4px_0px_0px_#ef4444] transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-mono text-red-500 uppercase font-black tracking-widest border-b-2 border-red-500 inline-block pb-1">
                  Return_Address
                </label>
                <Input
                  placeholder="ENTER_EMAIL_ADDRESS"
                  className="bg-black border-2 border-white text-white font-mono placeholder:text-zinc-700 h-14 rounded-none focus-visible:ring-0 focus-visible:border-red-500 focus-visible:shadow-[4px_4px_0px_0px_#ef4444] transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-mono text-white uppercase font-black tracking-widest border-b-2 border-white inline-block pb-1">
                Transmission_Packet
              </label>
              <Textarea
                placeholder="ENTER_MESSAGE_CONTENT..."
                className="bg-black border-2 border-white text-white font-mono placeholder:text-zinc-700 min-h-[200px] rounded-none focus-visible:ring-0 focus-visible:border-white focus-visible:shadow-[4px_4px_0px_0px_#ffffff] transition-all resize-none p-4"
              />
            </div>

            <Button className="w-full bg-red-600 text-white font-black uppercase tracking-wider h-16 text-xl border-2 border-white shadow-[6px_6px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-red-700 rounded-none transition-all group">
              <span className="mr-3">&gt; Execute_Transmission</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({
  icon: Icon,
  href,
  color,
}: {
  icon: any;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      className={`w-12 h-12 border-2 border-white bg-black flex items-center justify-center text-white ${color} hover:shadow-[4px_4px_0px_0px_white] hover:-translate-y-1 transition-all`}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}
