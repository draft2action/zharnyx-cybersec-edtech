"use client";

import { useEffect, useState } from "react";
import {
  updateProfile,
  getApprovedProjects,
  getStudentStats,
  getStudentProfile,
} from "@/actions/student/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Github,
  Globe,
  Linkedin,
  Save,
  Mail,
  Twitter,
  Plus,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileSectionProps {
  studentId: string;
}

export function ProfileSection({ studentId }: ProfileSectionProps) {
  const [formData, setFormData] = useState({
    bio: "",
    githubUrl: "",
    linkedinUrl: "",
    websiteUrl: "",
    twitterUrl: "",
    contactEmail: "",
    topProjects: [] as string[], // Array of project IDs
  });
  const [loading, setLoading] = useState(false);
  const [approvedProjects, setApprovedProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch approved projects
      const projects = await getApprovedProjects(studentId);
      if (projects.success && projects.data) {
        setApprovedProjects(projects.data);
      }

      // 2. Fetch user profile data
      const profile = await getStudentProfile(studentId);
      if (profile.success && profile.data) {
        const user = profile.data;
        setFormData({
          bio: user.bio || "",
          githubUrl: user.githubUrl || "",
          linkedinUrl: user.linkedinUrl || "",
          websiteUrl: user.websiteUrl || "",
          twitterUrl: user.twitterUrl || "",
          contactEmail: user.contactEmail || "",
          topProjects: user.topProjects || [],
        });
      }
    };
    fetchData();
  }, [studentId]);

  const handleSave = async () => {
    setLoading(true);
    const result = await updateProfile(studentId, formData);
    if (result.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
    setLoading(false);
  };

  const handleAddProject = (projectId: string) => {
    if (formData.topProjects.length >= 5) {
      toast.error("You can only select up to 5 top projects.");
      return;
    }
    if (formData.topProjects.includes(projectId)) return;

    setFormData((prev) => ({
      ...prev,
      topProjects: [...prev.topProjects, projectId],
    }));
  };

  const handleRemoveProject = (projectId: string) => {
    setFormData((prev) => ({
      ...prev,
      topProjects: prev.topProjects.filter((id) => id !== projectId),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-end">
        <Button
          asChild
          variant="outline"
          className="gap-2 border-2 border-white/20 hover:border-blue-500 hover:text-blue-500 text-gray-400 rounded-none bg-black"
        >
          <a
            href={`/profile/${studentId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="w-4 h-4" /> View Public Profile
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Personal Details */}
        <div className="space-y-4">
          <h3 className="font-mono text-lg text-blue-500 uppercase font-bold border-b border-white/10 pb-2">
            Personal Details
          </h3>

          <div className="space-y-2">
            <Label className="text-gray-400 font-mono text-xs uppercase">
              Bio
            </Label>
            <Textarea
              placeholder="Tell us about yourself..."
              className="bg-black border-2 border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500 min-h-[100px]"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400 font-mono text-xs uppercase flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" /> Contact Email
            </Label>
            <Input
              placeholder="contact@example.com"
              className="bg-black border-2 border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500 h-10"
              value={formData.contactEmail}
              onChange={(e) =>
                setFormData({ ...formData, contactEmail: e.target.value })
              }
            />
          </div>
        </div>

        {/* Right Column: Social Links */}
        <div className="space-y-4">
          <h3 className="font-mono text-lg text-blue-500 uppercase font-bold border-b border-white/10 pb-2">
            Social Links
          </h3>

          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/5 p-2 border border-white/10">
                <Github className="w-5 h-5 text-gray-300" />
              </div>
              <Input
                placeholder="GitHub URL"
                className="bg-black border-2 border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500 h-10"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/5 p-2 border border-white/10">
                <Linkedin className="w-5 h-5 text-blue-400" />
              </div>
              <Input
                placeholder="LinkedIn URL"
                className="bg-black border-2 border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500 h-10"
                value={formData.linkedinUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linkedinUrl: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/5 p-2 border border-white/10">
                <Twitter className="w-5 h-5 text-cyan-400" />
              </div>
              <Input
                placeholder="Twitter/X URL"
                className="bg-black border-2 border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500 h-10"
                value={formData.twitterUrl}
                onChange={(e) =>
                  setFormData({ ...formData, twitterUrl: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/5 p-2 border border-white/10">
                <Globe className="w-5 h-5 text-green-400" />
              </div>
              <Input
                placeholder="Personal Website"
                className="bg-black border-2 border-white/20 font-mono rounded-none text-white focus-visible:ring-0 focus-visible:border-blue-500 h-10"
                value={formData.websiteUrl}
                onChange={(e) =>
                  setFormData({ ...formData, websiteUrl: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Projects Selection */}
      <div className="space-y-4">
        <h3 className="font-mono text-lg text-blue-500 uppercase font-bold border-b border-white/10 pb-2">
          Top Projects (Max 5)
        </h3>
        <p className="text-gray-400 font-mono text-xs">
          Select your best work from approved submissions to showcase on your
          profile.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <Label className="text-gray-400 font-mono text-xs uppercase mb-2 block">
              Add Project
            </Label>
            <Select onValueChange={handleAddProject}>
              <SelectTrigger className="w-full border-2 border-white/20 bg-black text-white font-mono rounded-none">
                <SelectValue placeholder="Select a project..." />
              </SelectTrigger>
              <SelectContent className="bg-black border-2 border-white/20 text-white rounded-none">
                {approvedProjects.map((p) => (
                  <SelectItem
                    key={p.id}
                    value={p.id}
                    disabled={formData.topProjects.includes(p.id)}
                    className="font-mono"
                  >
                    {p.week?.projectTitle || p.week?.title || "Project"}
                  </SelectItem>
                ))}
                {approvedProjects.length === 0 && (
                  <div className="p-2 text-xs font-mono text-gray-500">
                    No approved projects found.
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.topProjects.map((projectId, index) => {
              const project = approvedProjects.find((p) => p.id === projectId);
              if (!project) return null;

              return (
                <Card
                  key={projectId}
                  className="bg-zinc-900 border border-white/10 relative group"
                >
                  <button
                    onClick={() => handleRemoveProject(projectId)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <CardContent className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-500">
                        #{index + 1}
                      </span>
                      <h4 className="font-bold text-white font-mono text-sm truncate">
                        {project.week?.projectTitle || "Project"}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-400 font-mono truncate">
                      {project.week?.month?.course?.title}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
            {formData.topProjects.length === 0 && (
              <div className="col-span-full flex items-center justify-center p-8 border-2 border-dashed border-white/10 text-gray-500 font-mono text-xs">
                No projects selected yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-white/10">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-mono rounded-none uppercase tracking-wide px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
