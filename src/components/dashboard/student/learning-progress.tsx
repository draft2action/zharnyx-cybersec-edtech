"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Award, Clock } from "lucide-react";

export function LearningProgress() {
  const stats = [
    {
      label: "Hours Learned",
      value: "14.5",
      icon: Clock,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Course Completion",
      value: "85%",
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Certificates",
      value: "2",
      icon: Award,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white font-mono">
          Learning Progress
        </CardTitle>
        <CardDescription className="text-gray-400 font-mono">
          Your improved skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-white/5 bg-white/5 flex flex-col items-center text-center"
            >
              <div
                className={`p-3 rounded-full ${stat.bgColor} ${stat.color} mb-3`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-white font-mono mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
