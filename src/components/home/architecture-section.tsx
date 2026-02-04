"use client";

import { motion } from "motion/react";
import { GraduationCap, Briefcase, Zap, Lock, ShieldCheck, Target, ArrowRight as ArrowIcon } from "lucide-react";

export function ArchitectureSection() {
    return (
        <section id="why-us" className="py-24 relative bg-black border-t-2 border-white/20">
            {/* Section Header */}
            <div className="container mx-auto px-4 mb-20 text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 text-black border-2 border-red-600 shadow-[4px_4px_0px_0px_white] text-xs font-bold uppercase tracking-widest mb-6"
                >
                    <Lock size={12} strokeWidth={3} />
                    <span>The 5+1 Model</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter"
                >
                    The <span className="text-red-500 underline decoration-4 underline-offset-4">Cyber-Agency</span> Architecture
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 max-w-3xl mx-auto font-medium text-lg border-l-4 border-red-500 pl-4 text-left md:text-center md:border-l-0"
                >
                    We solve the "Experience Paradox" by legally and operationally decoupling Education from Work.
                    We operate two distinct entities that function as a single talent supply chain.
                </motion.p>
            </div>

            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-6xl relative z-10">

                {/* Card 1: Academy - Neo Brutalist (Red) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 bg-black border-2 border-white p-8 relative group hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[8px_8px_0px_0px_#ef4444]"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GraduationCap size={140} strokeWidth={1} />
                    </div>

                    <div className="flex items-start gap-5 mb-8">
                        <div className="p-4 bg-red-600 text-black font-bold border-2 border-white shadow-[4px_4px_0px_0px_white]">
                            <GraduationCap size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="text-sm font-bold bg-red-600 text-black px-2 py-0.5 w-fit mb-2 uppercase">Months 1-5</div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tight">Zharnyx Academy</h3>
                            <p className="text-gray-400 text-base font-mono mt-1">// THE TRAINING GROUND</p>
                        </div>
                    </div>

                    <blockquote className="border-l-4 border-red-500 pl-6 py-3 text-base text-gray-300 font-medium italic mb-10 bg-white/5">
                        "To transform raw beginners into 'Combat-Ready' operatives through a high-intensity, low-resource curriculum."
                    </blockquote>

                    <div className="space-y-6">
                        <SpecItem icon={<Target size={20} className="text-red-500" />} label="Primary Goal:" value="Capability Acquisition" color="red" />
                        <SpecItem icon={<GraduationCap size={20} className="text-red-500" />} label="Status:" value="Trainee (Paying Customer)" color="red" />
                        <SpecItem icon={<Zap size={20} className="text-red-500" />} label="Environment:" value="Simulation / War Games" color="red" />
                        <SpecItem icon={<ShieldCheck size={20} className="text-red-500" />} label="Output:" value="Skills & Projects" color="red" />
                    </div>

                    <div className="mt-10 p-5 border-2 border-white/20 bg-white/5 flex flex-col gap-2">
                        <div className="text-red-500 text-sm font-black uppercase tracking-widest">Hardware Standard</div>
                        <div className="text-gray-300 text-sm font-mono">Headless Operations (CLI Only). No GUI allowed.</div>
                    </div>
                </motion.div>

                {/* Card 2: Labs - Neo Brutalist (Purple) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 bg-black border-2 border-white p-8 relative group hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[8px_8px_0px_0px_#9333ea]"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Briefcase size={140} strokeWidth={1} />
                    </div>

                    <div className="flex items-start gap-5 mb-8">
                        <div className="p-4 bg-purple-600 text-black font-bold border-2 border-white shadow-[4px_4px_0px_0px_white]">
                            <Briefcase size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="text-sm font-bold bg-purple-600 text-black px-2 py-0.5 w-fit mb-2 uppercase">Month 6</div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tight">Zharnyx Labs</h3>
                            <p className="text-gray-400 text-base font-mono mt-1">// THE AGENCY</p>
                        </div>
                    </div>

                    <blockquote className="border-l-4 border-purple-500 pl-6 py-3 text-base text-gray-300 font-medium italic mb-10 bg-white/5">
                        "Deployment. Students are no longer 'learning'; they are 'working' on real client projects."
                    </blockquote>

                    <div className="space-y-6">
                        <SpecItem icon={<Target size={20} className="text-purple-500" />} label="Primary Goal:" value="Value Delivery" color="purple" />
                        <SpecItem icon={<Briefcase size={20} className="text-purple-500" />} label="Status:" value="Jr. Consultant (Intern)" color="purple" />
                        <SpecItem icon={<Zap size={20} className="text-purple-500" />} label="Environment:" value="Live Ops / Client Projects" color="purple" />
                        <SpecItem icon={<ShieldCheck size={20} className="text-purple-500" />} label="Output:" value="Experience Letter" color="purple" />
                    </div>

                    <div className="mt-10 p-5 border-t-2 border-white/10 text-sm text-gray-500 font-mono">
                        Students operate as 'Junior Security Consultants' under the supervision of the Zharnyx SOC Manager.
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

function SpecItem({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: "red" | "purple" }) {
    return (
        <div className="flex items-center gap-4 text-base group/item">
            <div className="shrink-0 p-1.5 border border-white/10 bg-black group-hover/item:border-white transition-colors">{icon}</div>
            <div className="flex-1">
                <span className={`font-bold uppercase text-${color}-500 mr-2 text-sm tracking-wider`}>{label}</span>
                <span className="text-gray-300 font-mono text-sm">{value}</span>
            </div>
        </div>
    )
}
