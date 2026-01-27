"use client";

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
import { CourseEnrollmentDialog } from "@/components/programs/course-enrollment-dialog";

interface ProgramsListProps {
    courses: any[]; // Using any to avoid complex nested Drizzle type definition overhead for now, or we define interface
}

export function ProgramsList({ courses }: ProgramsListProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
        >
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold font-mono text-white">
                    Our Training Programs
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto font-mono">
                    Industry-standard cybersecurity training designed to take you from
                    a beginner to a professional.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {courses.map((program, index) => {
                    // Calculate a safer duration if not present
                    const duration = program.months?.length ? `${program.months.length * 4} Weeks` : "Self Paced";
                    const level = "Intermediate"; // Default or fetch from DB if we add 'level' column

                    return (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            className="w-full h-full"
                        >
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="h-full cursor-pointer group">
                                        <div className="flex flex-col h-full w-full rounded-[16px] border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:bg-white/5 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10">
                                            <div className="flex flex-col flex-1 space-y-6">
                                                <div className="flex justify-between items-start">
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
                                                    >
                                                        {level}
                                                    </Badge>
                                                    <div className="text-2xl font-bold text-green-400 font-mono tracking-tight flex items-center">
                                                        <span>₹{(program.price || 0).toLocaleString()}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <h3 className="text-2xl font-bold text-white font-mono group-hover:text-indigo-400 transition-colors">
                                                        {program.title}
                                                    </h3>
                                                    <p className="text-gray-400 line-clamp-3 leading-relaxed">
                                                        {program.description}
                                                    </p>
                                                </div>

                                                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-sm font-mono">
                                                    <div className="flex items-center text-gray-400">
                                                        <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                                                        {duration}
                                                    </div>
                                                    <div className="flex items-center text-indigo-400 group-hover:translate-x-1 transition-transform">
                                                        View Details &rarr;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-[#0f1111] border-white/10 text-white w-screen max-h-[85vh] overflow-hidden flex flex-col p-0">
                                    <ScrollArea className="flex-1 max-h-[85vh]">
                                        <div className="p-6 space-y-6">
                                            <DialogHeader>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="space-y-1">
                                                        <DialogTitle className="text-2xl font-bold font-mono">
                                                            {program.title}
                                                        </DialogTitle>
                                                        <DialogDescription className="text-gray-400">
                                                            {program.description}
                                                        </DialogDescription>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-indigo-400 border-indigo-400/30 whitespace-nowrap"
                                                    >
                                                        {level}
                                                    </Badge>
                                                </div>
                                            </DialogHeader>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-3">
                                                    <div className="p-2 rounded bg-indigo-500/20 text-indigo-400">
                                                        <Clock className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400">Duration</p>
                                                        <p className="font-mono font-bold">
                                                            {duration}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-3">
                                                    <div className="p-2 rounded bg-green-500/20 text-green-400">
                                                        <DollarSign className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400">Tuition</p>
                                                        <p className="font-mono font-bold">
                                                            ₹{(program.price || 0).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-3">
                                                    <div className="p-2 rounded bg-orange-500/20 text-orange-400">
                                                        <BarChart className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400">Level</p>
                                                        <p className="font-mono font-bold">
                                                            {level}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h4 className="text-xl font-bold font-mono border-b border-white/10 pb-4 flex items-center gap-3">
                                                    <BookOpen className="w-6 h-6 text-indigo-400" />
                                                    Course Curriculum
                                                </h4>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
                                                    {program.months?.map((month: any, idx: number) => (
                                                        <div
                                                            key={idx}
                                                            className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/[0.07] transition-colors"
                                                        >
                                                            <h5 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3">
                                                                {month.title}
                                                            </h5>
                                                            <div className="space-y-3 pl-2">
                                                                {month.weeks?.map((week: any, wIdx: number) => (
                                                                    <div
                                                                        key={wIdx}
                                                                        className="flex items-start text-gray-300"
                                                                    >
                                                                        <CheckCircle2
                                                                            className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${week.isProject
                                                                                ? "text-orange-400"
                                                                                : "text-green-500/70"
                                                                                }`}
                                                                        />
                                                                        <div className="flex-1">
                                                                            <span
                                                                                className={
                                                                                    week.isProject
                                                                                        ? "text-orange-300 font-medium"
                                                                                        : ""
                                                                                }
                                                                            >
                                                                                {week.title}
                                                                            </span>
                                                                            {week.isProject && (
                                                                                <div className="mt-1">
                                                                                    <Badge
                                                                                        variant="outline"
                                                                                        className="text-[10px] border-orange-500/30 text-orange-400"
                                                                                    >
                                                                                        Capstone Project
                                                                                    </Badge>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-6 border-t border-white/10">
                                                <CourseEnrollmentDialog
                                                    courseId={program.id}
                                                    courseTitle={program.title}
                                                    price={program.price || 0}
                                                >
                                                    <Button className="font-mono bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">
                                                        Enroll Now
                                                    </Button>
                                                </CourseEnrollmentDialog>
                                            </div>
                                        </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
