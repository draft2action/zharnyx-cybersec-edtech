"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Lock,
    BookOpen,
    CheckCircle2,
    Clock,
    DollarSign,
    BarChart,
    ChevronRight,
    FileText,
    PlayCircle
} from "lucide-react";
import { CourseEnrollmentDialog } from "./course-enrollment-dialog";
import { cn } from "@/lib/utils";

interface CoursePreviewProps {
    course: any;
    isLoggedIn: boolean;
}

export function CoursePreview({ course, isLoggedIn }: CoursePreviewProps) {
    const [openItem, setOpenItem] = useState<string | undefined>("module-0");
    const router = useRouter();

    const handleLoginRedirect = () => {
        router.push("/auth?callbackUrl=" + encodeURIComponent(window.location.pathname));
    };

    const duration = course.months?.length ? `${course.months.length * 4} Weeks` : "Self Paced";
    // Mock level for now
    const level = "Intermediate";

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
            {/* Header / Hero */}
            <div className="relative border-b border-white/10 bg-zinc-950/50 pt-32 pb-12">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                        <div className="space-y-4 max-w-2xl">
                            <Badge
                                variant="outline"
                                className="text-red-400 border-red-400/30 mb-2"
                            >
                                {level}
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold font-mono text-white tracking-tight">
                                {course.title}
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-6 pt-4 text-sm font-mono text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-indigo-400" />
                                    {duration}
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-400" />
                                    {course.months?.reduce((acc: number, m: any) => acc + (m.weeks?.length || 0), 0) || 0} Modules
                                </div>
                                <div className="flex items-center gap-2">
                                    <BarChart className="w-4 h-4 text-indigo-400" />
                                    Certificate of Completion
                                </div>
                            </div>
                        </div>

                        {/* Sticky Enrollment Card (Desktop) */}
                        <div className="hidden md:block w-full max-w-sm sticky top-24">
                            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-xl">
                                <div className="flex items-end gap-2 mb-6">
                                    <span className="text-3xl font-bold text-white font-mono">
                                        ₹{(course.price || 0).toLocaleString()}
                                    </span>
                                    <span className="text-gray-500 mb-1 line-through text-sm">₹{((course.price || 0) * 1.5).toLocaleString()}</span>
                                </div>

                                {isLoggedIn ? (
                                    <CourseEnrollmentDialog
                                        courseId={course.id}
                                        courseTitle={course.title}
                                        price={course.price || 0}
                                    >
                                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-lg shadow-lg shadow-red-500/20 mb-4 transition-all hover:scale-[1.02]">
                                            Start Residency
                                        </Button>
                                    </CourseEnrollmentDialog>
                                ) : (
                                    <Button
                                        onClick={handleLoginRedirect}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-lg shadow-lg shadow-red-500/20 mb-4 transition-all hover:scale-[1.02]"
                                    >
                                        Start Residency
                                    </Button>
                                )}

                                <p className="text-xs text-center text-gray-500">
                                    30-day money-back guarantee • Lifetime access
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 md:px-8 max-w-6xl py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold font-mono mb-6 flex items-center gap-3">
                                <div className="w-8 h-[2px] bg-red-500 rounded-full" />
                                Syllabus
                            </h2>

                            <div className="space-y-4">
                                {course.months?.map((month: any, idx: number) => (
                                    <div key={month.id} className="space-y-2">
                                        <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 pl-1">
                                            {month.title}
                                        </h3>

                                        <div className="border border-white/10 rounded-lg bg-zinc-950 overflow-hidden divide-y divide-white/5">
                                            {month.weeks?.map((week: any, wIdx: number) => (
                                                <div key={week.id} className="group">
                                                    <div className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors cursor-default">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                                                            {week.isProject ? (
                                                                <Lock className="h-5 w-5" />
                                                            ) : (
                                                                <Lock className="h-5 w-5" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                                                                    {week.title}
                                                                </span>
                                                                <Badge variant="secondary" className="bg-black border border-white/10 text-xs text-gray-500">
                                                                    Locked
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm text-gray-500 line-clamp-1">
                                                                {week.isProject ? "Capstone Project & Evaluation" : "Core concepts and practical exercises"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile enrollment - shown at bottom or similar? For now rely on sticky header or similar on mobile if needed, but sticking to desktop layout focus */}
                    <div className="md:hidden block">
                        {isLoggedIn ? (
                            <CourseEnrollmentDialog
                                courseId={course.id}
                                courseTitle={course.title}
                                price={course.price || 0}
                            >
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-lg shadow-lg shadow-red-500/20 mb-4 transition-all hover:scale-[1.02]">
                                    Start Residency
                                </Button>
                            </CourseEnrollmentDialog>
                        ) : (
                            <Button
                                onClick={handleLoginRedirect}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-lg shadow-lg shadow-red-500/20 mb-4 transition-all hover:scale-[1.02]"
                            >
                                Start Residency
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
