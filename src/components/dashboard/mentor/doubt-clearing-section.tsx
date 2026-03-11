"use client";

import { useEffect, useState } from "react";
import {
  getDoubtRequests,
  updateDoubtRequest,
} from "@/actions/mentor/dashboard";
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
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Clock, Video, Check, X, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DoubtClearingSectionProps {
  mentorId: string;
}

export function DoubtClearingSection({ mentorId }: DoubtClearingSectionProps) {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [meetLink, setMeetLink] = useState<string>("");
  const [scheduledAt, setScheduledAt] = useState<string>(""); // Store as string for datetime-local input
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await getDoubtRequests(mentorId);
    if (result.success) {
      setRequests(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [mentorId]);

  const handleApprove = async () => {
    if (!selectedRequest || !meetLink || !scheduledAt) {
      toast.error("Please provide a meeting link and schedule time.");
      return;
    }

    setSubmitting(true);
    const result = await updateDoubtRequest(selectedRequest.id, {
      status: "scheduled",
      scheduledAt: new Date(scheduledAt),
      meetLink: meetLink,
      mentorId: mentorId,
    });
    setSubmitting(false);

    if (result.success) {
      toast.success("Doubt session scheduled successfully");
      setSelectedRequest(null);
      setMeetLink("");
      setScheduledAt("");
      fetchData(); // Refresh list
    } else {
      toast.error(result.error || "Failed to schedule session");
    }
  };

  const handleReject = async (request: any) => {
    if (!confirm("Are you sure you want to reject this request?")) return;

    const result = await updateDoubtRequest(request.id, {
      status: "rejected",
      mentorId: mentorId,
    });

    if (result.success) {
      toast.success("Request rejected");
      fetchData();
    } else {
      toast.error(result.error || "Failed to reject request");
    }
  };

  const handleComplete = async (request: any) => {
    if (!confirm("Mark this session as completed?")) return;

    const result = await updateDoubtRequest(request.id, {
      status: "completed",
      mentorId: mentorId, // Keep mentor ID if already set
    });

    if (result.success) {
      toast.success("Session marked as completed");
      fetchData();
    } else {
      toast.error(result.error || "Failed to complete session");
    }
  };

  if (loading) {
    return <div className="text-white">Loading doubt requests...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-[#1a1a1a] border-dashed rounded-lg bg-[#0a0a0a]">
        <HelpCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Requests</h3>
        <p className="text-gray-400 text-center max-w-sm">
          There are no pending doubt clearing requests at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <Card
            key={request.id}
            className={cn(
              "bg-black border transition-colors",
              request.status === "scheduled"
                ? "border-green-500/30 hover:border-green-500"
                : "border-[#1a1a1a] hover:border-yellow-500"
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="outline"
                  className={cn(
                    request.status === "scheduled"
                      ? "text-green-400 border-green-500/50 bg-green-900/20"
                      : "text-yellow-400 border-yellow-500/50 bg-yellow-900/20"
                  )}
                >
                  {request.status}
                </Badge>
                <span className="text-xs text-gray-500 font-sans">
                  {format(new Date(request.createdAt), "MMM d")}
                </span>
              </div>
              <CardTitle className="text-lg font-bold text-white line-clamp-1">
                {request.topic}
              </CardTitle>
              <CardDescription className="text-gray-400">
                by {request.student.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400 mb-4 line-clamp-3 min-h-[60px]">
                {request.description}
              </div>

              {request.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-white text-black hover:bg-gray-200 font-bold"
                    onClick={() => setSelectedRequest(request)}
                  >
                    Approve & Schedule
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleReject(request)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {request.status === "scheduled" && (
                <div className="space-y-3">
                  <div className="p-2 bg-green-900/20 border border-green-500/30 rounded text-xs text-green-300 flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>
                      {request.scheduledAt
                        ? format(new Date(request.scheduledAt), "PPp")
                        : "Scheduled"}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-green-600 text-white hover:bg-green-700 font-bold"
                    onClick={() => window.open(request.meetLink, "_blank")}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Join Meeting
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#1a1a1a] text-gray-400 hover:text-white hover:bg-white/10"
                    onClick={() => handleComplete(request)}
                  >
                    Mark as Completed
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedRequest}
        onOpenChange={(open) => !open && setSelectedRequest(null)}
      >
        <DialogContent className="bg-black border border-[#1a1a1a] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Doubt Session</DialogTitle>
            <DialogDescription>
              Set a time and provide a meeting link for the session.
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs uppercase tracking-wider">
                  Topic
                </Label>
                <div className="font-medium">{selectedRequest.topic}</div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="scheduledAt"
                  className="text-gray-400 text-xs uppercase tracking-wider"
                >
                  Date & Time
                </Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  className="bg-black border-[#1a1a1a] text-white focus:border-yellow-500 date-input-white"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="meetLink"
                  className="text-gray-400 text-xs uppercase tracking-wider"
                >
                  Meeting Link (Google Meet / Zoom)
                </Label>
                <Input
                  id="meetLink"
                  placeholder="https://meet.google.com/..."
                  className="bg-black border-[#1a1a1a] text-white focus:border-yellow-500"
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="secondary"
              className="bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => setSelectedRequest(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-yellow-600 text-black hover:bg-yellow-500 font-bold"
              onClick={handleApprove}
              disabled={submitting}
            >
              {submitting ? "Scheduling..." : "Confirm Schedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
