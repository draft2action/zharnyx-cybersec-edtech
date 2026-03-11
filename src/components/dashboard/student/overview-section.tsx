"use client";

import { useEffect, useState } from "react";
import { getStudentStats } from "@/actions/student/dashboard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Activity, BookOpen, CheckCircle, Trophy } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface OverviewSectionProps {
  studentId: string;
}

export function OverviewSection({ studentId }: OverviewSectionProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getStudentStats(studentId);
        if (result.success) {
          setStats(result.data);
        } else {
          toast.error("Failed to load stats");
        }
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [studentId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            className="h-32 bg-zinc-900 border border-[#1a1a1a]"
          />
        ))}
      </div>
    );
  }

  const items = [
    {
      label: "Enrolled Courses",
      value: stats?.enrolledCourses || 0,
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      label: "Completed Modules",
      value: stats?.completedModules || 0,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Average Score",
      value: `${stats?.avgScore || 0}%`,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      label: "Attendance",
      value: stats?.attendance || "0%",
      icon: Activity,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card
            key={item.label}
            className="bg-black border border-[#1a1a1a] text-white rounded-xl  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sans uppercase tracking-wider text-gray-400">
                {item.label}
              </CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-sans">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Overview Content like Recent Activity could go here */}
    </div>
  );
}
