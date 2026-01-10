"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { UserTable } from "@/components/admin/user-management/user-table";
import { MentorApplicationTable } from "@/components/admin/mentor-management/mentor-application-table";
import { CourseManager } from "@/components/admin/course-management/course-manager";
import { RecruiterApplicationTable } from "@/components/admin/recruiter-management/recruiter-application-table";
import { ApprovedMentorsTable } from "@/components/admin/mentor-management/approved-mentors-table";
import { ApprovedRecruitersTable } from "@/components/admin/recruiter-management/approved-recruiters-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "user-management";

  return (
    <div className="flex min-h-screen w-full bg-black">
      <AnimatedBackground />

      <div className="relative flex flex-col flex-1 bg-transparent z-10 w-full pl-6 pr-6 pb-6">
        <header className="flex items-center gap-4 mb-6 pt-4 border-b border-white/10 pb-4">
          <SidebarTrigger className="text-white hover:bg-white/10 md:hidden" />
          <h1 className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 uppercase tracking-tighter">
            {activeSection.replace(/-/g, " ")}
          </h1>
        </header>

        <div className="flex-1 w-full max-w-[1600px] mx-auto">
          {activeSection === "user-management" && (
            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-mono text-xl text-blue-400">
                  User Management
                </CardTitle>
                <CardDescription className="text-gray-400 font-mono">
                  Manage users, roles, and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserTable />
              </CardContent>
            </Card>
          )}

          {activeSection === "mentor-management" && (
            <div className="space-y-8">
              <ApprovedMentorsTable />
            </div>
          )}

          {activeSection === "recruiter-management" && (
            <div className="space-y-8">
              <ApprovedRecruitersTable />
            </div>
          )}

          {activeSection === "applications" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl text-blue-400">
                      Mentor Applications
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Review pending mentor requests.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MentorApplicationTable />
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl text-blue-400">
                      Recruiter Applications
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Review pending recruiter requests.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecruiterApplicationTable />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "course-management" && (
            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
              <CardContent className="p-6">
                <CourseManager />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
