"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { HelpCircle, Clock, CheckCircle, XCircle, Video } from "lucide-react";

interface DoubtSession {
  id: string;
  topic: string;
  description: string;
  status: "pending" | "scheduled" | "completed" | "rejected";
  createdAt: string | Date;
  scheduledAt: string | Date | null;
  meetLink: string | null;
  courseTitle: string | null;
  mentorName: string | null;
}

interface DoubtListProps {
  sessions: DoubtSession[];
}

export function DoubtList({ sessions }: DoubtListProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-[#1a1a1a] rounded-lg">
        <HelpCircle className="h-12 w-12 text-gray-500 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">
          No Doubt Sessions
        </h3>
        <p className="text-gray-400 max-w-sm">
          You haven&apos;t requested any doubt sessions yet. Click the
          &quot;Request Session&quot; button to get started.
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "scheduled":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3 mr-1" />;
      case "scheduled":
        return <Video className="w-3 h-3 mr-1" />;
      case "completed":
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case "rejected":
        return <XCircle className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card
          key={session.id}
          className="bg-zinc-900/50 border-[#1a1a1a] text-white"
        >
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(session.status)} capitalize`}
                  >
                    {getStatusIcon(session.status)}
                    {session.status}
                  </Badge>
                  <span className="text-xs text-gray-400 font-sans">
                    {format(new Date(session.createdAt), "PPP")}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold">
                  {session.topic}
                </CardTitle>
                <div className="text-sm text-gray-400 font-sans">
                  {session.courseTitle} •{" "}
                  {session.mentorName ? (
                    <span className="text-purple-400">
                      Mentor: {session.mentorName}
                    </span>
                  ) : (
                    "Waiting for mentor"
                  )}
                </div>
                <CardDescription className="text-gray-300 mt-2">
                  {session.description}
                </CardDescription>

                {session.status === "scheduled" && session.scheduledAt && (
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                    <p className="text-sm text-blue-400 font-sans font-bold mb-1">
                      Scheduled For:{" "}
                      {format(new Date(session.scheduledAt), "PPp")}
                    </p>
                    {session.meetLink && (
                      <a
                        href={session.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-300 underline hover:text-blue-200"
                      >
                        Join Meeting: {session.meetLink}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
