"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import {
  getEnrolledCourses,
  getCourseMentors,
  createDoubtRequest,
} from "@/actions/student/doubt";
import { toast } from "sonner";

interface DoubtRequestDialogProps {
  studentId: string;
  onSuccess?: () => void;
}

interface Course {
  id: string;
  title: string;
}

interface Mentor {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export function DoubtRequestDialog({
  studentId,
  onSuccess,
}: DoubtRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);

  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedMentorId, setSelectedMentorId] = useState<string>("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const fetchCourses = async () => {
    setLoading(true);
    const res = await getEnrolledCourses(studentId);
    if (res.success && res.data) {
      setCourses(res.data);
    } else {
      toast.error("Failed to load courses");
    }
    setLoading(false);
  };

  const fetchMentors = async (courseId: string) => {
    const res = await getCourseMentors(courseId);
    if (res.success && res.data) {
      setMentors(res.data);
    } else {
      toast.error("Failed to load mentors");
    }
  };

  useEffect(() => {
    const init = async () => {
      if (open) {
        await fetchCourses();
      } else {
        // Reset form on close
        setSelectedCourseId("");
        setSelectedMentorId("");
        setTopic("");
        setDescription("");
        setMentors([]);
      }
    };
    init();
  }, [open]);

  useEffect(() => {
    const init = async () => {
      if (selectedCourseId) {
        await fetchMentors(selectedCourseId);
      } else {
        setMentors([]);
        setSelectedMentorId("");
      }
    };
    init();
  }, [selectedCourseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId || !topic || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    const res = await createDoubtRequest({
      studentId,
      courseId: selectedCourseId,
      mentorId: selectedMentorId || undefined,
      topic,
      description,
    });

    if (res.success) {
      toast.success("Doubt request submitted successfully");
      setOpen(false);
      onSuccess?.();
    } else {
      toast.error(res.error || "Failed to submit request");
    }
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-black hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> Request Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0a0a] text-white border-[#1a1a1a]">
        <DialogHeader>
          <DialogTitle>Request Doubt Session</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select a course and mentor to schedule a session. You have 3
            requests per week.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="course">Course</Label>
            <Select
              value={selectedCourseId}
              onValueChange={setSelectedCourseId}
              disabled={loading}
            >
              <SelectTrigger className="bg-zinc-900 border-[#1a1a1a]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-[#1a1a1a] text-white">
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mentor">Mentor (Optional)</Label>
            <Select
              value={selectedMentorId}
              onValueChange={setSelectedMentorId}
              disabled={!selectedCourseId}
            >
              <SelectTrigger className="bg-zinc-900 border-[#1a1a1a]">
                <SelectValue placeholder="Select a mentor" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-[#1a1a1a] text-white">
                {mentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Buffer Overflow in Week 3"
              className="bg-zinc-900 border-[#1a1a1a]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your doubt in detail..."
              className="bg-zinc-900 border-[#1a1a1a] min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-white text-black hover:bg-gray-200"
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
