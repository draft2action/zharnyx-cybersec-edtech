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
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LearningMaterialSectionProps {
  studentId: string;
}

interface Resource {
  title: string;
  link: string;
}

interface Assessment {
  id: string;
  title: string;
}

interface Week {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  content?: string;
  resources?: Resource[];
  assessments?: Assessment[];
  projectTitle?: string;
  projectDescription?: string;
}

interface Month {
  id: string;
  title: string;
  weeks: Week[];
}

interface Course {
  id: string;
  title: string;
}

export function LearningMaterialSection({
  studentId,
}: LearningMaterialSectionProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseContent, setCourseContent] = useState<Month[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);

  // States for submission dialogs
  const [activeWeek, setActiveWeek] = useState<Week | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(
    null
  );
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
        setCourses(result.data);
        setSelectedCourseId(result.data[0].id);
      }
    };
    fetchCourses();
  }, [studentId]);

  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchContent = async () => {
      setLoadingContent(true);
      const result = await getCourseContent(studentId, selectedCourseId);
      if (result.success) {
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
    <div className="space-y-6 p-6">
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
            <div key={month.id} className="space-y-4">
              <h3 className="text-lg font-bold text-blue-500 font-mono uppercase tracking-wide border-b border-blue-500/30 pb-2">
                {month.title}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {month.weeks.map((week) => (
                  <div
                    key={week.id}
                    className={cn(
                      "relative group border-2 bg-zinc-900/50 p-4 transition-all duration-200",
                      week.isLocked
                        ? "border-white/10 opacity-70 cursor-not-allowed"
                        : "border-white/20 hover:border-blue-500/50"
                    )}
                  >
                    {/* Lock Overlay */}
                    {week.isLocked && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
                        <div className="bg-black border border-white/20 p-2 rounded-full">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold font-mono">
                            {week.title}
                          </h4>
                          {week.isCompleted && (
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-500 font-mono text-[10px] uppercase h-5"
                            >
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">
                          {week.description}
                        </p>

                        {/* Week Content / Instructions */}
                        {week.content && (
                          <div className="mt-2 text-sm text-gray-300 font-mono bg-black/20 p-3 border border-white/5 rounded-sm whitespace-pre-wrap">
                            {week.content}
                          </div>
                        )}

                        {/* Resources */}
                        {week.resources &&
                          Array.isArray(week.resources) &&
                          week.resources.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <span className="text-xs text-blue-400 font-mono uppercase tracking-wider flex items-center gap-1">
                                <BookOpen className="w-3 h-3" /> Learning
                                Resources
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {week.resources.map((res, idx) => (
                                  <a
                                    key={idx}
                                    href={res.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-white bg-white/5 px-3 py-2 border border-transparent hover:border-white/20 transition-colors"
                                  >
                                    <ExternalLink className="w-3 h-3 text-blue-500" />
                                    <span className="truncate">
                                      {res.title || res.link}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Assessments */}
                        {week.assessments &&
                          week.assessments.length > 0 &&
                          week.assessments.map((assessment) => (
                            <Dialog
                              key={assessment.id}
                              open={
                                isSubmitOpen &&
                                activeAssessment?.id === assessment.id
                              }
                              onOpenChange={(open) => {
                                if (!week.isLocked) {
                                  setIsSubmitOpen(open);
                                  if (open) {
                                    setActiveAssessment(assessment);
                                    setActiveWeek(week);
                                  }
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  disabled={week.isLocked}
                                  className="font-mono text-xs border-white/20 hover:bg-blue-900/20 hover:text-blue-400 hover:border-blue-500 rounded-none h-8"
                                >
                                  <FileText className="w-3 h-3 mr-2" />
                                  {assessment.title}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-zinc-950 border-2 border-white/20 text-white rounded-none sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="font-mono uppercase">
                                    Submit Assessment
                                  </DialogTitle>
                                  <DialogDescription className="font-mono text-xs text-gray-400">
                                    Submit your work for &quot;
                                    {assessment.title}&quot;. Only PDF or valid
                                    URLs allowed.
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
                          ))}

                        {/* Project Submission */}
                        {(week.projectTitle || week.projectDescription) && (
                          <Dialog
                            open={isProjectOpen && activeWeek?.id === week.id}
                            onOpenChange={(open) => {
                              if (!week.isLocked) {
                                setIsProjectOpen(open);
                                if (open) {
                                  setActiveWeek(week);
                                }
                              }
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                disabled={week.isLocked}
                                className="font-mono text-xs border-purple-500/50 text-purple-400 hover:bg-purple-900/20 hover:text-purple-300 hover:border-purple-500 rounded-none h-8"
                              >
                                <Upload className="w-3 h-3 mr-2" />
                                Submit Project
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-950 border-2 border-white/20 text-white rounded-none sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle className="font-mono uppercase">
                                  Submit Project
                                </DialogTitle>
                                <DialogDescription className="font-mono text-xs text-gray-400">
                                  Submit your project deliverables for &quot;
                                  {week.projectTitle}&quot;.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
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
                                  Submit Project
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}

                        {week.isCompleted && !week.isLocked && (
                          <div className="ml-auto md:ml-0">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
