"use client";

import { useEffect, useState } from "react";
import { getPendingProjects, scoreProject } from "@/actions/mentor/dashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  CheckCircle,
  ExternalLink,
  Github,
  MonitorPlay,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

interface ProjectScoringSectionProps {
  mentorId: string;
}

export function ProjectScoringSection({
  mentorId,
}: ProjectScoringSectionProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [score, setScore] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await getPendingProjects(mentorId);
    if (result.success) {
      setProjects(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [mentorId]);

  const handleScore = async () => {
    if (!selectedSubmission || !score) return;

    const scoreNum = parseInt(score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) {
      toast.error("Please enter a valid score (0-10)");
      return;
    }

    setSubmitting(true);
    const result = await scoreProject(selectedSubmission.id, scoreNum, review);
    setSubmitting(false);

    if (result.success) {
      toast.success("Project scored successfully");
      setSelectedSubmission(null);
      setScore("");
      setReview("");
      fetchData(); // Refresh list
    } else {
      toast.error(result.error || "Failed to score project");
    }
  };

  if (loading) {
    return <div className="text-white">Loading pending projects...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-[#1a1a1a] border-dashed rounded-lg bg-[#0a0a0a]">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
        <p className="text-gray-400 text-center max-w-sm">
          There are no pending project submissions to score at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((submission) => (
          <Card
            key={submission.id}
            className="bg-black border border-[#1a1a1a] hover:border-white/30 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="secondary"
                  className="bg-purple-900/20 text-purple-400 hover:bg-purple-900/30"
                >
                  {submission.week.month.course.title}
                </Badge>
                <span className="text-xs text-gray-500 font-sans">
                  {format(new Date(submission.createdAt), "MMM d")}
                </span>
              </div>
              <CardTitle className="text-lg font-bold text-white line-clamp-1">
                {submission.week.projectTitle || submission.week.title}
              </CardTitle>
              <CardDescription className="text-gray-400">
                by {submission.student.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400 mb-4 line-clamp-2">
                {submission.description}
              </div>
              <Button
                className="w-full bg-white text-black hover:bg-gray-200 font-bold"
                onClick={() => setSelectedSubmission(submission)}
              >
                Review & Score
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedSubmission}
        onOpenChange={(open) => !open && setSelectedSubmission(null)}
      >
        <DialogContent className="bg-black border border-[#1a1a1a] text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Score Project</DialogTitle>
            <DialogDescription>
              Review the project submission and provide feedback.
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase tracking-wider">
                    Student
                  </Label>
                  <div className="font-medium">
                    {selectedSubmission.student.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase tracking-wider">
                    Project
                  </Label>
                  <div className="font-medium line-clamp-1">
                    {selectedSubmission.week.projectTitle || "Project"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400 text-xs uppercase tracking-wider">
                  LINKS
                </Label>
                <div className="flex flex-col gap-2">
                  {selectedSubmission.githubUrl && (
                    <div className="flex items-center gap-2">
                      <Link
                        href={selectedSubmission.githubUrl}
                        target="_blank"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-[#1a1a1a] text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          GitHub Repository
                          <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Button>
                      </Link>
                    </div>
                  )}
                  {selectedSubmission.liveUrl && (
                    <div className="flex items-center gap-2">
                      <Link
                        href={selectedSubmission.liveUrl}
                        target="_blank"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-[#1a1a1a] text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <MonitorPlay className="mr-2 h-4 w-4" />
                          Live Demo
                          <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Button>
                      </Link>
                    </div>
                  )}
                  {selectedSubmission.demoUrl && (
                    <div className="flex items-center gap-2">
                      <Link
                        href={selectedSubmission.demoUrl}
                        target="_blank"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-[#1a1a1a] text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <MonitorPlay className="mr-2 h-4 w-4" />
                          Video Demo
                          <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400 text-xs uppercase tracking-wider">
                  Description
                </Label>
                <div className="text-sm bg-[#0a0a0a] p-3 rounded border border-[#1a1a1a] max-h-32 overflow-y-auto">
                  {selectedSubmission.description || "No description provided."}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="score"
                  className="text-gray-400 text-xs uppercase tracking-wider"
                >
                  Score (1-10)
                </Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="10"
                  placeholder="Enter score (1-10)..."
                  className="bg-black border-[#1a1a1a] text-white focus:border-purple-500"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="review"
                  className="text-gray-400 text-xs uppercase tracking-wider"
                >
                  Review Feedback
                </Label>
                <Textarea
                  id="review"
                  placeholder="Write your feedback here..."
                  className="bg-black border-[#1a1a1a] text-white focus:border-purple-500 min-h-[100px]"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="secondary"
              className="bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => setSelectedSubmission(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700 font-bold"
              onClick={handleScore}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Project Score"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
