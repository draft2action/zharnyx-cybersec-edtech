"use client";

import { useEffect, useState } from "react";
import {
  getPendingAssignments,
  scoreAssignment,
} from "@/actions/mentor/dashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";

interface AssignmentScoringSectionProps {
  mentorId: string;
}

export function AssignmentScoringSection({
  mentorId,
}: AssignmentScoringSectionProps) {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [score, setScore] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await getPendingAssignments(mentorId);
    if (result.success) {
      setAssignments(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [mentorId]);

  const handleScore = async () => {
    if (!selectedSubmission || !score) return;

    const scoreNum = parseInt(score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      toast.error("Please enter a valid score (0-100)");
      return;
    }

    setSubmitting(true);
    const result = await scoreAssignment(selectedSubmission.id, scoreNum);
    setSubmitting(false);

    if (result.success) {
      toast.success("Assignment scored successfully");
      setSelectedSubmission(null);
      setScore("");
      fetchData(); // Refresh list
    } else {
      toast.error(result.error || "Failed to score assignment");
    }
  };

  if (loading) {
    return <div className="text-white">Loading pending assignments...</div>;
  }

  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-[#1a1a1a] border-dashed rounded-lg bg-[#0a0a0a]">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
        <p className="text-gray-400 text-center max-w-sm">
          There are no pending assignments to score at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((response) => (
          <Card
            key={response.id}
            className="bg-black border border-[#1a1a1a] hover:border-white/30 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-900/20 text-blue-400 hover:bg-blue-900/30"
                >
                  {response.assessment.week.title}
                </Badge>
                <span className="text-xs text-gray-500 font-sans">
                  {format(new Date(response.submittedAt), "MMM d")}
                </span>
              </div>
              <CardTitle className="text-lg font-bold text-white line-clamp-1">
                {response.assessment.title}
              </CardTitle>
              <CardDescription className="text-gray-400">
                by {response.student.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400 mb-4 line-clamp-2">
                {response.assessment.problem}
              </div>
              <Button
                className="w-full bg-white text-black hover:bg-gray-200 font-bold"
                onClick={() => setSelectedSubmission(response)}
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
        <DialogContent className="bg-black border border-[#1a1a1a] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Score Assignment</DialogTitle>
            <DialogDescription>
              Review the submission and assign a score.
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4 py-4">
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
                  Assessment
                </Label>
                <div className="font-medium">
                  {selectedSubmission.assessment.title}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400 text-xs uppercase tracking-wider">
                  Submission
                </Label>
                <div className="p-3 bg-[#0a0a0a] rounded border border-[#1a1a1a] flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden mr-2">
                    <FileText className="h-4 w-4 shrink-0 text-blue-400" />
                    <span className="text-sm truncate opacity-80 box-decoration-slice">
                      {selectedSubmission.submissionUrl}
                    </span>
                  </div>
                  <Link
                    href={selectedSubmission.submissionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gray-400 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="score"
                  className="text-gray-400 text-xs uppercase tracking-wider"
                >
                  Score (0-100)
                </Label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter score..."
                  className="bg-black border-[#1a1a1a] text-white focus:border-purple-500"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
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
              {submitting ? "Submitting..." : "Submit Score"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
