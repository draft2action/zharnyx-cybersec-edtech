"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getUserProgress } from "@/actions/admin/student-management/action";
import { toast } from "sonner";

interface UserProgressModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface AssessmentData {
  id: string;
  score: number | null;
  status: string;
  assessment?: {
    title: string;
  };
}

interface ProjectData {
  id: string;
  score: number | null;
  status: string;
  githubUrl: string | null;
  liveUrl: string | null;
  week?: {
    title: string;
  };
}

interface ProgressData {
  assessments: AssessmentData[];
  projects: ProjectData[];
}

export function UserProgressModal({
  userId,
  isOpen,
  onClose,
}: UserProgressModalProps) {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      const fetchProgress = async () => {
        setLoading(true);
        const result = await getUserProgress(userId);
        if (result.success && result.data) {
          setData(result.data as unknown as ProgressData);
        } else {
          toast.error(result.error || "Failed to fetch user progress");
        }
        setLoading(false);
      };

      fetchProgress();
    }
  }, [isOpen, userId]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] border-white/10 bg-black text-white max-h-[80vh] overflow-y-auto font-mono">
        <DialogHeader>
          <DialogTitle>User Progress</DialogTitle>
          <DialogDescription className="text-gray-400">
            Assessments and Project Submissions for the student.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Loading progress...
          </div>
        ) : !data ? (
          <div className="py-8 text-center text-sm text-gray-500">
            No data found.
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                Assessments
              </h3>
              {data.assessments.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No assessments completed.
                </p>
              ) : (
                <ul className="space-y-2">
                  {data.assessments.map((a) => (
                    <li
                      key={a.id}
                      className="p-3 border border-white/10 rounded bg-white/5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-200">
                          {a.assessment?.title || "Assessment"}
                        </span>
                        <span className="text-sm text-gray-400">
                          Score: {a.score}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Status: {a.status}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                Project Submissions
              </h3>
              {data.projects.length === 0 ? (
                <p className="text-sm text-gray-500">No projects submitted.</p>
              ) : (
                <ul className="space-y-2">
                  {data.projects.map((p) => (
                    <li
                      key={p.id}
                      className="p-3 border border-white/10 rounded bg-white/5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-200">
                          {p.week?.title
                            ? `${p.week.title} Project`
                            : "Project"}
                        </span>
                        <span className="text-sm text-gray-400">
                          Score: {p.score || "N/A"}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            className="underline mr-2 hover:text-white"
                          >
                            GitHub
                          </a>
                        )}
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            className="underline mr-2 hover:text-white"
                          >
                            Live
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Status: {p.status}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
