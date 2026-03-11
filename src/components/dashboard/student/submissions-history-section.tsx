"use client";

import { useEffect, useState } from "react";
import { getAllSubmissions } from "@/actions/student/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ExternalLink, Github, Globe, Play } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface SubmissionsHistorySectionProps {
  studentId: string;
}

export function SubmissionsHistorySection({
  studentId,
}: SubmissionsHistorySectionProps) {
  const [data, setData] = useState<{
    assessments: any[];
    projects: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSubmissions(studentId);
        if (result.success && result.data) {
          setData(result.data);
        } else {
          toast.error("Failed to load history");
        }
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId]);

  if (loading) return <Skeleton className="h-64 w-full bg-zinc-900" />;

  return (
    <div className="space-y-8">
      {/* Assessments Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-sans uppercase tracking-wide pl-2 border-l-4 border-blue-500">
          Evaluations
        </h3>
        <div className="rounded-xl border border-[#1a1a1a] overflow-hidden">
          <Table>
            <TableHeader className="bg-[#0a0a0a]">
              <TableRow className="hover:bg-transparent border-[#1a1a1a]">
                <TableHead className="font-sans text-xs uppercase text-gray-400">
                  Course
                </TableHead>
                <TableHead className="font-sans text-xs uppercase text-gray-400">
                  Assessment
                </TableHead>
                <TableHead className="font-sans text-xs uppercase text-gray-400">
                  Submitted
                </TableHead>
                <TableHead className="font-sans text-xs uppercase text-gray-400">
                  Status
                </TableHead>
                <TableHead className="font-sans text-xs uppercase text-gray-400 text-right">
                  Score
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.assessments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center font-sans text-gray-500 py-8"
                  >
                    No assessment submissions found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.assessments.map((sub) => (
                  <TableRow
                    key={sub.id}
                    className="border-[#1a1a1a] hover:bg-[#0a0a0a] transition-colors"
                  >
                    <TableCell className="font-medium text-white font-sans truncate max-w-[150px]">
                      {sub.assessment?.week?.month?.course?.title ||
                        "Unknown Course"}
                    </TableCell>
                    <TableCell className="font-sans text-gray-300">
                      {sub.assessment?.title}
                      {sub.submissionUrl && (
                        <a
                          href={sub.submissionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 inline-flex align-middle text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </TableCell>
                    <TableCell className="font-sans text-gray-400 text-xs">
                      {sub.submittedAt
                        ? format(new Date(sub.submittedAt), "MMM d, yyyy")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`font-sans text-[10px] uppercase rounded-xl px-2 py-0.5 border-opacity-50 ${
                          sub.status === "completed" || sub.score !== null
                            ? "border-green-500 text-green-500"
                            : sub.status === "pending"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-gray-500 text-gray-500"
                        }`}
                      >
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-sans font-bold text-white">
                      {sub.score !== null ? `${sub.score}/100` : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-sans uppercase tracking-wide pl-2 border-l-4 border-purple-500">
          Projects
        </h3>
        <div className="rounded-xl border border-[#1a1a1a] overflow-hidden">
          <Table>
            <TableHeader className="bg-[#0a0a0a]">
              <TableRow className="hover:bg-transparent border-[#1a1a1a]">
                <TableHead className="font-sans text-xs uppercase text-gray-400">
                  Course
                </TableHead>
                <TableHead className="font-sans text-xs uppercase text-gray-400">
                  Project
                </TableHead>
                <TableHead className="font-sans text-xs uppercase text-gray-400">
                  Links
                </TableHead>
                <TableHead className="font-sans text-xs uppercase text-gray-400">
                  Review
                </TableHead>
                <TableHead className="font-sans text-xs uppercase text-gray-400 text-right">
                  Score
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.projects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center font-sans text-gray-500 py-8"
                  >
                    No project submissions found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.projects.map((proj) => (
                  <TableRow
                    key={proj.id}
                    className="border-[#1a1a1a] hover:bg-[#0a0a0a] transition-colors"
                  >
                    <TableCell className="font-medium text-white font-sans truncate max-w-[150px]">
                      {proj.week?.month?.course?.title || "Unknown Course"}
                    </TableCell>
                    <TableCell className="font-sans text-gray-300">
                      {proj.week?.projectTitle || "Project"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            className="text-gray-400 hover:text-white"
                          >
                            <Github className="w-3 h-3" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            className="text-gray-400 hover:text-white"
                          >
                            <Globe className="w-3 h-3" />
                          </a>
                        )}
                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            className="text-gray-400 hover:text-white"
                          >
                            <Play className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      className="font-sans text-xs text-gray-400 max-w-[200px] truncate"
                      title={proj.review}
                    >
                      {proj.review || "-"}
                    </TableCell>
                    <TableCell className="text-right font-sans font-bold text-white">
                      {proj.score !== null ? `${proj.score}/100` : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
