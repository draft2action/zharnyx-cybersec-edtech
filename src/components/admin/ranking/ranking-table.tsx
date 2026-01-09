"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStudentRankings, toggleRecruiterVisibility, RankedStudent } from "@/actions/admin/ranking/action";
import { toast } from "sonner";
import { Loader2, UserCheck, UserX } from "lucide-react";

export function RankingTable() {
  const [data, setData] = useState<RankedStudent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await getStudentRankings();
    if (result.success && result.data) {
      setData(result.data);
    } else {
      toast.error(result.error || "Failed to fetch rankings");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleVisibility = async (studentId: string, currentStatus: boolean) => {
    const result = await toggleRecruiterVisibility(studentId, !currentStatus);
    if (result.success) {
      toast.success(result.message);
      // Optimistic update
      setData((prev) =>
        prev.map((s) =>
          s.id === studentId ? { ...s, isRecruiterVisible: !currentStatus } : s
        )
      );
    } else {
      toast.error(result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="rounded-md border border-white/10">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-white/5">
            <TableHead className="font-mono text-white w-[80px]">Rank</TableHead>
            <TableHead className="font-mono text-white">Student</TableHead>
            <TableHead className="font-mono text-white text-right">Assessment Score</TableHead>
            <TableHead className="font-mono text-white text-right">Project Score</TableHead>
            <TableHead className="font-mono text-white text-right">Total Score</TableHead>
            <TableHead className="font-mono text-white">Recruiter Access</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableCell colSpan={6} className="h-24 text-center font-mono text-gray-500">
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((student, index) => (
              <TableRow key={student.id} className="border-white/10 hover:bg-white/5 font-mono">
                <TableCell className="font-medium text-white">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{student.name}</span>
                    <span className="text-gray-500 text-xs">{student.email}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-gray-300">{student.assessmentScore}</TableCell>
                <TableCell className="text-right text-gray-300">{student.projectScore}</TableCell>
                <TableCell className="text-right font-bold text-white">{student.totalScore}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleVisibility(student.id, student.isRecruiterVisible)}
                    className={student.isRecruiterVisible ? "text-green-400 hover:text-green-300 hover:bg-green-500/10" : "text-gray-500 hover:text-gray-400 hover:bg-gray-500/10"}
                  >
                    {student.isRecruiterVisible ? (
                       <>
                         <UserCheck className="mr-2 h-4 w-4" />
                         Visible
                       </>
                    ) : (
                       <>
                         <UserX className="mr-2 h-4 w-4" />
                         Hidden
                       </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
