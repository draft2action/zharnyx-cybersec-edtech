"use client";

import { useState, useEffect, useCallback } from "react";
import { DoubtRequestDialog } from "./doubt-request-dialog";
import { DoubtList } from "./doubt-list";
import { getStudentDoubtSessions } from "@/actions/student/doubt";
import { HelpCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DoubtSession {
  id: string;
  topic: string;
  description: string;
  status: "pending" | "scheduled" | "completed" | "rejected";
  createdAt: string;
  scheduledAt: string | null;
  meetLink: string | null;
  courseTitle: string | null;
  mentorName: string | null;
}

interface DoubtSessionsViewProps {
  studentId: string;
}

export function DoubtSessionsView({ studentId }: DoubtSessionsViewProps) {
  const [sessions, setSessions] = useState<DoubtSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    const res = await getStudentDoubtSessions(studentId);
    if (res.success && res.data) {
      setSessions(res.data as unknown as DoubtSession[]);
    } else {
      toast.error("Failed to load doubt sessions");
    }
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    const init = async () => {
      await fetchSessions();
    };
    init();
  }, [fetchSessions]);

  return (
    <div className="space-y-6">
      <Card className="bg-black border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-white/20 pb-4 gap-4 md:gap-0">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-500" />
            <CardTitle className="font-mono text-2xl uppercase tracking-tight">
              Doubt Sessions
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={fetchSessions}
              className="border-white/20 bg-transparent hover:bg-white/10 text-white"
            >
              <RefreshCcw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
            <DoubtRequestDialog
              studentId={studentId}
              onSuccess={fetchSessions}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {loading && sessions.length === 0 ? (
            <div className="flex justify-center p-8">
              <RefreshCcw className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : (
            <DoubtList sessions={sessions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
