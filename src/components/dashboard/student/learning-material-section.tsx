"use client";

import { useEffect, useState } from "react";
import {
  getEnrolledCourses,
  getCourseContent,
  submitAssignment,
  submitProject,
} from "@/actions/student/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Lock,
  FileText,
  Upload,
  CheckCircle,
  Github,
  Globe,
  Play,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DashboardCourseMonth, DashboardCourseWeek, CourseAssessment, DashboardCourse } from "@/types/dashboard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LearningMaterialSectionProps {
  studentId: string;
  courseId?: string;
}

function CountdownTimer({ targetDate }: { targetDate: Date | string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      } else {
        setTimeLeft("Expired");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return <span className={cn("font-mono font-bold", timeLeft === "Expired" ? "text-red-500" : "text-yellow-500")}>{timeLeft || "Loading..."}</span>;
}

export function LearningMaterialSection({
  studentId,
  courseId,
}: LearningMaterialSectionProps) {
  const [courses, setCourses] = useState<DashboardCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseContent, setCourseContent] = useState<DashboardCourseMonth[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);

  // States for submission dialogs
  const [activeWeek, setActiveWeek] = useState<DashboardCourseWeek | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<CourseAssessment | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [projectData, setProjectData] = useState({
    githubUrl: "",
    liveUrl: "",
    demoUrl: "",
    description: "",
  });
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getEnrolledCourses(studentId);
      if (result.success && result.data && result.data.length > 0) {
        console.log(result.data)
        setCourses(result.data);
        if (courseId) {
          // Verify user is enrolled in the requested course
          const requestedCourse = result.data.find(c => c.id === courseId);
          if (requestedCourse) {
            setSelectedCourseId(courseId);
          } else {
            setSelectedCourseId(result.data[0].id);
          }
        } else {
          setSelectedCourseId(result.data[0].id);
        }
      }
    };
    fetchCourses();
  }, [studentId, courseId]);

  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchContent = async () => {
      setLoadingContent(true);
      const result = await getCourseContent(studentId, selectedCourseId);
      if (result.success) {
        console.log("DEBUG: courseContent", JSON.stringify(result.data, null, 2));
        setCourseContent(result.data || []);
      } else {
        toast.error("Failed to load course content");
      }
      setLoadingContent(false);
    };

    fetchContent();
  }, [selectedCourseId, studentId]);

  const handleSubmitAssignment = async () => {
    if (!submissionUrl) {
      toast.error("Please enter a URL");
      return;
    }
    if (!activeAssessment || !activeWeek) return;

    const result = await submitAssignment(
      studentId,
      activeAssessment.id,
      activeWeek.id,
      submissionUrl
    );
    if (result.success) {
      toast.success("Assignment submitted successfully!");
      setIsSubmitOpen(false);
      setSubmissionUrl("");
      // Refresh content to update locks
      const content = await getCourseContent(studentId, selectedCourseId);
      if (content.success) setCourseContent(content.data || []);
    } else {
      toast.error("Failed to submit");
    }
  };

  const handleSubmitProject = async () => {
    if (!projectData.description) {
      toast.error("Description is required");
      return;
    }
    if (!activeWeek) return;

    const result = await submitProject(studentId, activeWeek.id, projectData);
    if (result.success) {
      toast.success("Project submitted successfully!");
      setIsProjectOpen(false);
      setProjectData({
        githubUrl: "",
        liveUrl: "",
        demoUrl: "",
        description: "",
      });
      // Refresh content
      const content = await getCourseContent(studentId, selectedCourseId);
      if (content.success) setCourseContent(content.data || []);
    } else {
      toast.error("Failed to submit project");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      {/* Course Selector */}
      <div className="flex flex-col gap-2">
        <Label className="text-gray-400 font-mono text-xs uppercase">
          Select Course
        </Label>
        <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
          <SelectTrigger className="w-full md:w-[300px] border-2 border-white/20 bg-black text-white font-mono rounded-none focus:ring-0 focus:border-blue-500">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent className="bg-black border-2 border-white/20 text-white rounded-none">
            {courses.map((c) => (
              <SelectItem
                key={c.id}
                value={c.id}
                className="focus:bg-zinc-900 focus:text-white font-mono"
              >
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loadingContent ? (
        <div className="text-white font-mono">Loading content...</div>
      ) : (
        <div className="space-y-8">
          {courseContent.map((month) => (
            <div key={month.id} className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-bold text-blue-500 font-mono uppercase tracking-wide border-b border-blue-500/30 pb-2">
                {month.title}
              </h3>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {month.weeks.map((week: DashboardCourseWeek) => (
                  <AccordionItem
                    key={week.id}
                    value={week.id}

                    className={cn(
                      "group border mb-4 rounded bg-zinc-900/30 transition-all duration-200 overflow-hidden",
                      week.isLocked
                        ? "border-white/5 opacity-60 cursor-not-allowed"
                        : "border-white/10 hover:border-blue-500/30 hover:bg-zinc-900/50"
                    )}
                  >
                    <AccordionTrigger disabled={week.isLocked} className="w-full px-3 py-3 md:px-4 md:py-4 hover:no-underline">
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 w-full">
                        {week.isLocked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <div className="w-5 h-5 flex items-center justify-center">
                            {week.isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : week.isPending ? (
                              <div className="w-4 h-4 rounded-full border-2 border-yellow-500 border-dashed" />
                            ) : null}
                          </div>
                        )}
                        <div className="flex flex-col items-start gap-1 text-left">
                          <h4 className={cn("text-white font-medium font-mono text-sm md:text-base tracking-wide", week.isLocked && "text-gray-600")}>
                            {week.title}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                            {week.isLocked ? "Locked" : "Click to view content"}
                          </span>
                        </div>
                        {week.isCompleted && !week.isLocked && (
                          <Badge
                            variant="outline"
                            className="ml-auto mr-4 border-green-500 text-green-500 font-mono text-[10px] uppercase"
                          >
                            Completed
                          </Badge>
                        )}
                        {week.isPending && !week.isCompleted && !week.isLocked && (
                          <Badge
                            variant="outline"
                            className="ml-auto mr-4 border-yellow-500 text-yellow-500 font-mono text-[10px] uppercase"
                          >
                            <div className="w-2 h-2 mr-2 rounded-full border border-yellow-500 border-dashed" />
                            Pending Review
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-t border-white/5 bg-black/40">
                      <div className="p-5 md:p-8">
                        {/* Plan / Content */}
                        <div className="space-y-4 mb-6">
                          <div className="flex flex-col gap-3 items-center">
                            <h5 className="text-gray-400 font-mono text-xs uppercase font-bold tracking-widest text-center">Learning Plan</h5>
                            <div className="flex justify-center w-full">
                              <Button
                                variant="outline"
                                asChild
                                className="font-mono text-xs border-white/10 bg-zinc-900/50 hover:bg-zinc-800 text-gray-300 hover:text-white h-9 px-3 flex items-center gap-2 max-w-[200px] md:max-w-xs justify-start rounded-sm transition-all group/btn"
                              >
                                <a
                                  href={week.content?.startsWith('http') ? week.content : '#'}
                                  target={week.content?.startsWith('http') ? "_blank" : "_self"}
                                  rel={week.content?.startsWith('http') ? "noopener noreferrer" : undefined}
                                  className={cn(!week.content && "pointer-events-none opacity-50")}
                                >
                                  <FileText className="w-3 h-3 text-blue-500 group-hover/btn:text-blue-400 transition-colors shrink-0" />
                                  <span className="truncate">{week.content || "No Plan Linked"}</span>
                                  {week.content?.startsWith('http') && (
                                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover/btn:opacity-50 transition-opacity shrink-0" />
                                  )}
                                </a>
                              </Button>
                            </div>
                          </div>

                          {/* Resources */}
                          {/* Assuming resources is castable to array of objects or handled safely */}
                          {Array.isArray(week.resources) && (week.resources as any[]).length > 0 && (
                            <div className="flex flex-col items-center">
                              <h5 className="text-gray-400 font-mono text-xs uppercase mb-3 font-bold tracking-widest text-center">Resources</h5>
                              <div className="flex flex-wrap gap-3 justify-center">
                                {(week.resources as any[]).map((res: any, idx: number) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    asChild
                                    className="font-mono text-xs border-white/10 bg-zinc-900/50 hover:bg-zinc-800 text-gray-300 hover:text-white h-9 px-3 flex items-center gap-2 max-w-[200px] md:max-w-xs justify-start rounded-sm transition-all group/btn"
                                  >
                                    <a href={res.link} target="_blank" rel="noopener noreferrer">
                                      <Globe className="w-3 h-3 text-blue-500 group-hover/btn:text-blue-400 transition-colors shrink-0" />
                                      <span className="truncate">{res.title}</span>
                                      <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover/btn:opacity-50 transition-opacity shrink-0" />
                                    </a>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Weeks Assessment */}
                        {week.assessments && week.assessments.length > 0 && (
                          <div className="mb-6">
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="assessments" className="border-none">
                                <AccordionTrigger className="text-gray-400 font-mono text-xs uppercase hover:text-white hover:no-underline py-3 justify-start gap-2 tracking-widest font-bold">
                                  Weeks Assessment
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid grid-cols-1 gap-4 pt-4">
                                    {week.assessments.map((assessment: CourseAssessment) => (
                                      <div key={assessment.id} className="bg-zinc-900/20 border border-white/5 p-4 md:p-6 rounded flex flex-col gap-4 relative overflow-hidden group/card hover:border-white/10 transition-colors">
                                        {/* Card Header */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                          <div className="space-y-1">
                                            <h4 className="text-white font-medium font-mono text-base">{assessment.title}</h4>
                                            <div className="flex items-center gap-2">
                                              <span className="text-xs font-mono text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-500/20">
                                                {assessment.topic}
                                              </span>
                                              {assessment.isCompleted && (
                                                <span className="text-xs font-mono text-green-400 bg-green-900/20 px-2 py-0.5 rounded border border-green-500/20 flex items-center gap-1">
                                                  <CheckCircle className="w-3 h-3" /> Completed
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex flex-col items-end gap-2">
                                            {week.isCompleted && !week.isProjectRejected && !week.assessments?.some(a => a.isRejected) ? (
                                              <Badge variant="outline" className="border-green-500 text-green-500 font-mono text-xs border-dashed uppercase py-1.5">
                                                <CheckCircle className="w-3 h-3 mr-2" />
                                                Successfully Submitted
                                              </Badge>
                                            ) : assessment.isPending ? (
                                              <Badge variant="outline" className="border-yellow-500 text-yellow-500 font-mono text-xs border-dashed uppercase py-1.5">
                                                <div className="w-3 h-3 mr-2 rounded-full border-2 border-yellow-500 border-dashed" />
                                                Review Pending
                                              </Badge>
                                            ) : week.isPending ? (
                                              // Show Pending if pending AND NOT rejected. Usually they are mutually exclusive per item, but week.isPending is aggregate.
                                              // If specific assessment is rejected, we should show Resubmit button for THAT assessment.
                                              // But here we are iterating assessments.
                                              assessment.isRejected ? (
                                                <Dialog
                                                  open={
                                                    isSubmitOpen &&
                                                    activeAssessment?.id === assessment.id
                                                  }
                                                  onOpenChange={(open) => {
                                                    setIsSubmitOpen(open);
                                                    if (open) {
                                                      setActiveAssessment(assessment);
                                                      setActiveWeek(week);
                                                    }
                                                  }}
                                                >
                                                  <DialogTrigger asChild>
                                                    <Button
                                                      variant="outline"
                                                      className="font-mono text-xs border-dashed border-red-500/50 text-red-500 hover:bg-red-900/20 hover:text-red-400 hover:border-red-500 rounded-none h-8"
                                                    >
                                                      <FileText className="w-3 h-3 mr-2" />
                                                      Resubmit Work
                                                    </Button>
                                                  </DialogTrigger>
                                                  <DialogContent className="bg-zinc-950 border-2 border-white/20 text-white rounded-none sm:max-w-md">
                                                    {/* Dialog Content same as submit */}
                                                    <DialogHeader>
                                                      <DialogTitle className="font-mono uppercase">
                                                        Resubmit Assessment
                                                      </DialogTitle>
                                                      <DialogDescription className="font-mono text-xs text-gray-400">
                                                        Resubmit your work for "{assessment.title}".
                                                        Previous submission was rejected.
                                                      </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                      <div className="space-y-2">
                                                        <Label className="text-xs font-mono uppercase">
                                                          Submission URL
                                                        </Label>
                                                        <Input
                                                          placeholder="https://..."
                                                          className="bg-black border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500"
                                                          value={submissionUrl}
                                                          onChange={(e) =>
                                                            setSubmissionUrl(e.target.value)
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                    <DialogFooter>
                                                      <Button
                                                        onClick={handleSubmitAssignment}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white font-mono rounded-none uppercase tracking-wide w-full"
                                                      >
                                                        Resubmit Assignment
                                                      </Button>
                                                    </DialogFooter>
                                                  </DialogContent>
                                                </Dialog>
                                              ) : (
                                                <Button
                                                  variant="outline"
                                                  className="font-mono text-xs border-dashed border-white/30 text-gray-400 cursor-not-allowed hover:bg-transparent"
                                                  onClick={() =>
                                                    toast("Waiting for mentor's response", {
                                                      description: "You cannot submit other work until the current one is reviewed.",
                                                    })
                                                  }
                                                >
                                                  <FileText className="w-3 h-3 mr-2" />
                                                  Pending Review
                                                </Button>
                                              )
                                            ) : (
                                              <Dialog
                                                open={
                                                  isSubmitOpen &&
                                                  activeAssessment?.id === assessment.id
                                                }
                                                onOpenChange={(open) => {
                                                  setIsSubmitOpen(open);
                                                  if (open) {
                                                    setActiveAssessment(assessment);
                                                    setActiveWeek(week);
                                                  }
                                                }}
                                              >
                                                <DialogTrigger asChild>
                                                  <Button
                                                    variant="outline"
                                                    className="font-mono text-xs border-dashed border-white/30 hover:bg-yellow-900/20 hover:text-yellow-400 hover:border-yellow-500 rounded-none h-8"
                                                  >
                                                    <FileText className="w-3 h-3 mr-2" />
                                                    Submit Work
                                                  </Button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-zinc-950 border-2 border-white/20 text-white rounded-none sm:max-w-md">
                                                  <DialogHeader>
                                                    <DialogTitle className="font-mono uppercase">
                                                      Submit Assessment
                                                    </DialogTitle>
                                                    <DialogDescription className="font-mono text-xs text-gray-400">
                                                      Submit your work for "{assessment.title}".
                                                      Only PDF or valid URLs allowed.
                                                    </DialogDescription>
                                                  </DialogHeader>
                                                  <div className="space-y-4 py-4">
                                                    <div className="space-y-2">
                                                      <Label className="text-xs font-mono uppercase">
                                                        Submission URL
                                                      </Label>
                                                      <Input
                                                        placeholder="https://..."
                                                        className="bg-black border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500"
                                                        value={submissionUrl}
                                                        onChange={(e) =>
                                                          setSubmissionUrl(e.target.value)
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                  <DialogFooter>
                                                    <Button
                                                      onClick={handleSubmitAssignment}
                                                      className="bg-blue-600 hover:bg-blue-700 text-white font-mono rounded-none uppercase tracking-wide w-full"
                                                    >
                                                      Submit Assignment
                                                    </Button>
                                                  </DialogFooter>
                                                </DialogContent>
                                              </Dialog>
                                            )}
                                          </div>
                                        </div>

                                        {/* Problem Description */}
                                        <div className="bg-black/30 p-3 rounded border border-white/5">
                                          <h6 className="text-[10px] text-gray-500 uppercase font-mono mb-1">Problem Statement</h6>
                                          <p className="text-sm text-gray-300 font-mono leading-relaxed">
                                            {assessment.problem}
                                          </p>
                                        </div>

                                        {/* Feedback Section */}
                                        {/* Feedback Section */}
                                        {assessment.isRejected && (
                                          <div className="bg-red-900/20 border border-red-500/30 p-3 rounded mt-2">
                                            <h6 className="text-[10px] text-red-400 uppercase font-mono mb-1 font-bold">Mentor Feedback</h6>
                                            {assessment.feedback ? (
                                              <a
                                                href={assessment.feedback}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-red-300 hover:text-red-200 font-mono underline decoration-red-500/30 underline-offset-4 flex items-center gap-2"
                                              >
                                                <ExternalLink className="w-3 h-3" />
                                                View Improvements Doc
                                              </a>
                                            ) : (
                                              <span className="text-sm text-red-400/50 font-mono italic">
                                                No feedback document linked.
                                              </span>
                                            )}
                                          </div>
                                        )}

                                        {/* Footer Info */}
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 pt-2 border-t border-white/5 mt-1">
                                          {!assessment.isCompleted && !week.isCompleted && (
                                            <div className="flex items-center gap-1.5">
                                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                              Deadline: <span className="text-gray-300">
                                                {assessment.deadline ? (
                                                  <div className="inline-flex items-center gap-2">
                                                    <span>{new Date(assessment.deadline).toLocaleDateString()}</span>
                                                    <span className="text-[10px] text-gray-500">•</span>
                                                    <CountdownTimer targetDate={assessment.deadline} />
                                                  </div>
                                                ) : (
                                                  "No Deadline"
                                                )}
                                              </span>
                                            </div>
                                          )}
                                          {assessment.isRejected && (
                                            <div className="text-red-500 flex items-center gap-1.5">
                                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                              Score: {assessment.score}/100 (Failed)
                                            </div>
                                          )}
                                          <div className="flex items-center gap-1.5">
                                            Format: <span className="text-gray-300 uppercase">{assessment.submissionFormat || "URL"}</span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        )}


                        {/* Actions Area (Projects only now) */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">


                          {/* Project Submission */}
                          {(week.projectTitle || week.projectDescription) && (
                            week.isCompleted && !week.isProjectRejected ? (
                              <Badge variant="outline" className="border-green-500 text-green-500 font-mono text-xs border-dashed uppercase py-1.5 h-9 px-3">
                                <CheckCircle className="w-3 h-3 mr-2" />
                                Project Submitted
                              </Badge>
                            ) : week.isPending && !week.isProjectRejected ? (
                              <Badge variant="outline" className="border-yellow-500 text-yellow-500 font-mono text-xs border-dashed uppercase py-1.5 h-9 px-3">
                                <div className="w-3 h-3 mr-2 rounded-full border-2 border-yellow-500 border-dashed" />
                                Review Pending
                              </Badge>
                            ) : (
                              // Resubmit Logic or New Submit
                              <div className="flex flex-col gap-2 w-full md:w-auto">
                                {week.isProjectRejected && (
                                  <div className="bg-red-900/20 border border-red-500/30 p-3 rounded mb-2 w-full">
                                    <h6 className="text-[10px] text-red-400 uppercase font-mono mb-1 font-bold">Mentor Feedback</h6>
                                    {week.projectReview ? (
                                      <a
                                        href={week.projectReview}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-red-300 hover:text-red-200 font-mono underline decoration-red-500/30 underline-offset-4 flex items-center gap-2"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                        View Improvements Doc
                                      </a>
                                    ) : (
                                      <span className="text-sm text-red-400/50 font-mono italic">
                                        No feedback document linked.
                                      </span>
                                    )}
                                  </div>
                                )}

                                <Dialog
                                  open={isProjectOpen && activeWeek?.id === week.id}
                                  onOpenChange={(open) => {
                                    setIsProjectOpen(open);
                                    if (open) {
                                      setActiveWeek(week);
                                    }
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "font-mono text-xs border-purple-500/50 text-purple-400 hover:bg-purple-900/20 hover:text-purple-300 hover:border-purple-500 rounded-none h-9",
                                        week.isProjectRejected && "border-red-500 text-red-500 hover:text-red-400 hover:border-red-400"
                                      )}
                                    >
                                      <Upload className="w-4 h-4 mr-2" />
                                      {week.isProjectRejected ? "Resubmit Project" : "Submit Project"}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-zinc-950 border-2 border-white/20 text-white rounded-none sm:max-w-lg">
                                    <DialogHeader>
                                      <DialogTitle className="font-mono uppercase">
                                        {week.isProjectRejected ? "Resubmit Project" : "Submit Project"}
                                      </DialogTitle>
                                      <DialogDescription className="font-mono text-xs text-gray-400">
                                        {week.isProjectRejected ? (
                                          "Your previous submission was rejected. Please address the feedback and resubmit."
                                        ) : (
                                          <>
                                            Submit your project deliverables for "
                                            {week.projectTitle}".
                                          </>
                                        )}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label className="text-xs font-mono uppercase flex items-center gap-2">
                                            <Github className="w-3 h-3" /> GitHub Repo
                                          </Label>
                                          <Input
                                            placeholder="https://github.com/..."
                                            className="bg-black border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500"
                                            value={projectData.githubUrl}
                                            onChange={(e) =>
                                              setProjectData({
                                                ...projectData,
                                                githubUrl: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label className="text-xs font-mono uppercase flex items-center gap-2">
                                            <Globe className="w-3 h-3" /> Live URL
                                          </Label>
                                          <Input
                                            placeholder="https://..."
                                            className="bg-black border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500"
                                            value={projectData.liveUrl}
                                            onChange={(e) =>
                                              setProjectData({
                                                ...projectData,
                                                liveUrl: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-xs font-mono uppercase flex items-center gap-2">
                                          <Play className="w-3 h-3" /> Demo Video URL
                                        </Label>
                                        <Input
                                          placeholder="https://youtube.com/..."
                                          className="bg-black border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500"
                                          value={projectData.demoUrl}
                                          onChange={(e) =>
                                            setProjectData({
                                              ...projectData,
                                              demoUrl: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-xs font-mono uppercase">
                                          Description / Notes
                                        </Label>
                                        <Textarea
                                          placeholder="Any additional notes..."
                                          className="bg-black border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500 min-h-[100px]"
                                          value={projectData.description}
                                          onChange={(e) =>
                                            setProjectData({
                                              ...projectData,
                                              description: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        onClick={handleSubmitProject}
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-none uppercase tracking-wide w-full"
                                      >
                                        {week.isProjectRejected ? "Resubmit Project" : "Submit Project"}
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
