"use client";

import { UserTable } from "@/components/admin/user-management/user-table";
import { MentorApplicationTable } from "@/components/admin/mentor-management/mentor-application-table";
import { CourseManager } from "@/components/admin/course-management/course-manager";
import { RecruiterApplicationTable } from "@/components/admin/recruiter-management/recruiter-application-table";
import { ApprovedMentorsTable } from "@/components/admin/mentor-management/approved-mentors-table";
import { ApprovedRecruitersTable } from "@/components/admin/recruiter-management/approved-recruiters-table";
import { RankingTable } from "@/components/admin/ranking/ranking-table";
import { CouponManager } from "@/components/admin/coupon-management/coupon-manager";
import { PartnerApplicationTable } from "@/components/admin/partner-management/partner-application-table";
import { PartnerTable } from "@/components/admin/partner-management/partner-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Terminal } from "lucide-react";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "user-management";

  return (
    <div className="flex min-h-screen w-full bg-black font-sans">
      {/* Removed AnimatedBackground for better visibility/contrast */}

      <div className="relative flex flex-col flex-1 z-10 w-full px-3 pb-3 pt-2 md:pl-6 md:pr-6 md:pb-6 md:pt-4">
        {/* Header - Neo Brutalist */}
        <header className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8 pb-2 md:pb-4 border-b-2 border-white/20">
          <SidebarTrigger className="text-white hover:bg-white/10 md:hidden border-2 border-white/20 rounded-none h-10 w-10" />

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-black font-mono text-white uppercase tracking-tighter leading-none">
              {activeSection.replace(/-/g, " ")}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-red-600 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                Admin Zone
              </span>
              <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                {"// System Status: Active"}
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 w-full max-w-auto mx-auto">
          {activeSection === "user-management" && (
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10] pt-0">
              <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <Terminal className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                  <CardTitle className="font-mono text-lg md:text-xl text-white uppercase tracking-wide">
                    User Database
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                  Manage users, roles, and permissions across the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-3 md:p-6">
                  <UserTable />
                </div>
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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Mentor Applications */}
                <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10] pt-0">
                  <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                    <div className="flex items-start justify-between ">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Terminal className="w-4 h-4 text-blue-500" />
                          <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                            Mentor Requests
                          </CardTitle>
                        </div>
                        <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                          Review pending mentor applications.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6">
                    <MentorApplicationTable />
                  </CardContent>
                </Card>

                {/* Recruiter Applications */}
                <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10] pt-0">
                  <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Terminal className="w-4 h-4 text-purple-500" />
                          <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                            Recruiter Requests
                          </CardTitle>
                        </div>
                        <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                          Review pending recruiter applications.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6">
                    <RecruiterApplicationTable />
                  </CardContent>
                </Card>

                {/* Partner Applications */}
                <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10] pt-0 col-span-1 xl:col-span-2">
                  <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Terminal className="w-4 h-4 text-green-500" />
                          <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                            Partner Agency Requests
                          </CardTitle>
                        </div>
                        <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                          Review pending partner agency applications.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6">
                    <PartnerApplicationTable />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "course-management" && (
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
              <CardContent className="p-0">
                <CourseManager />
              </CardContent>
            </Card>
          )}

          {activeSection === "rankings" && (
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10] pt-0">
              <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <Terminal className="w-4 h-4 text-yellow-500" />
                  <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                    Student Rankings
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                  Global leaderboard of top performing students.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-3 md:p-6">
                  <RankingTable />
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "coupon-management" && <CouponManager />}

          {activeSection === "partner-management" && (
            <div className="space-y-8">
              <PartnerTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
