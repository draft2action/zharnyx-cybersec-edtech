"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart2, MessageSquare } from "lucide-react";

export function EngagementStats() {
  const stats = [
    {
      label: "Active Students",
      value: "173",
      icon: Users,
      color: "text-purple-400",
      borderColor: "border-purple-500",
    },
    {
      label: "Course Ratings",
      value: "4.7",
      icon: BarChart2,
      color: "text-purple-400",
      borderColor: "border-purple-500",
    },
    {
      label: "Discussions",
      value: "28",
      icon: MessageSquare,
      color: "text-purple-400",
      borderColor: "border-purple-500",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl  relative overflow-hidden group hover:border-purple-500/50 transition-colors"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold font-sans uppercase tracking-widest text-gray-400">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-sans text-white mb-1">
              {stat.value}
            </div>
            <div className="h-1 w-full bg-white/10 mt-2">
              <div className="h-full bg-purple-500 w-[70%]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
