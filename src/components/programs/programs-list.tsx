"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "motion/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    BookOpen,
    Clock,
    BarChart,
    DollarSign,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";


interface ProgramsListProps {
    courses: any[];
    enrolledCourseIds: string[];
    isLoggedIn: boolean;
}

export function ProgramsList({ courses, enrolledCourseIds, isLoggedIn }: ProgramsListProps) {
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push("/auth?callbackUrl=" + encodeURIComponent(window.location.pathname));
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
        >


            {courses.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-white bg-black/50 text-center space-y-4 shadow-[8px_8px_0px_0px_white]">
                    <div className="p-4 bg-red-600 border-2 border-white inline-block">
                        <BookOpen className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                        No Programs Active
                    </h3>
                    <p className="text-gray-400 font-mono text-sm max-w-md">
                        Our training modules are currently undergoing calibration. Check back later for new deployments.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
                    {courses.map((program, index) => {
                        // Calculate a safer duration if not present
                        const duration = "6 Months";
                        const actualDurationMonths = program.months?.length || 0;
                        const level = program.level || "Intermediate";

                        return (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                className="w-full h-full"
                            >
                                <Link
                                    href={enrolledCourseIds.includes(program.id) ? `/dashboard/student?section=learning&courseId=${program.id}` : `/programs/${program.id}`}
                                    className="h-full block group relative"
                                >
                                    <div className="flex flex-col h-full w-full border-2 border-white bg-black p-6 transition-all duration-300 shadow-[8px_8px_0px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_white]">
                                        <div className="flex flex-col flex-1 space-y-6">
                                            <div className="flex justify-between items-start">
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-red-600 text-black border-2 border-red-600 font-bold uppercase tracking-wider rounded-none hover:bg-red-500"
                                                >
                                                    {level}
                                                </Badge>
                                                <div className="flex flex-col items-end gap-1.5">
                                                    <div className="text-xl font-black text-white font-mono tracking-tighter flex items-center bg-blue-600 px-2 py-1 border-2 border-blue-600 transform -rotate-2">
                                                        <span>₹{(program.price || 0).toLocaleString()}</span>
                                                    </div>
                                                    <div className="text-[10px] font-black text-green-400 font-mono uppercase tracking-wider bg-green-950/50 border border-green-500/30 px-2 py-0.5">
                                                        For Students: ₹4,999
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-red-500 transition-colors">
                                                    {program.title}
                                                </h3>
                                                <p className="text-gray-400 line-clamp-3 leading-relaxed font-mono text-xs">
                                                    {program.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-6 border-t-2 border-white/20 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                                                <div className="flex items-center text-gray-300">
                                                    <Clock className="w-4 h-4 mr-2 text-red-500" />
                                                    <div className="flex flex-col">
                                                        <span>{duration}</span>
                                                        {actualDurationMonths < 6 && (
                                                            <span className="text-[10px] text-zinc-500 italic leading-tight">
                                                                * More content to update
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <span className={`flex items-center group-hover:translate-x-1 transition-transform ${enrolledCourseIds.includes(program.id) ? "text-green-400" : "text-red-500"}`}>
                                                    {enrolledCourseIds.includes(program.id) ? "Continue" : "Details"} &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}
