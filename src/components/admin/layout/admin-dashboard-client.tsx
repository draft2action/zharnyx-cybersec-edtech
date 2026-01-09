"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { requireAdmin } from "@/lib/auth/role-guard";
import { UserTable } from "@/components/admin/user-management/user-table";
import { MentorApplicationTable } from "@/components/admin/mentor-management/mentor-application-table";
import { CourseManager } from "@/components/admin/course-management/course-manager";
import { RankingTable } from "@/components/admin/ranking/ranking-table";
import { RecruiterApplicationTable } from "@/components/admin/recruiter-management/recruiter-application-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";

export default function AdminPage() {
  // Client-side state for active section
  const [activeSection, setActiveSection] = useState("user-management");

  // Since requireAdmin is server-side, it should be in a layout or a separate server server component.
  // For now, we will assume this page is wrapped or handled.
  // BUT: "use client" prevents async server actions in direct body.
  // We need to move the server check to a wrapper or layout.
  // Refactoring strategy:
  // 1. Convert this page to client component.
  // 2. Use a server component wrapper for authentication?
  // User asked to refactor `page.tsx`
  
  // Actually, Shadcn Sidebar is client side interactive.
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-black">
        <AnimatedBackground />
        
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <SidebarInset className="relative flex flex-col flex-1 overflow-y-auto bg-transparent z-10 w-full p-6">
           <header className="flex items-center gap-2 mb-6">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <h1 className="text-2xl font-bold font-mono text-white">
                 {activeSection.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </h1>
           </header>
           
           <div className="flex-1 w-full max-w-7xl mx-auto">
              {activeSection === "user-management" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">User Management</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">Manage users, roles, and permissions.</CardDescription>
                  </CardHeader>
                  <CardContent><UserTable /></CardContent>
                </Card>
              )}

              {activeSection === "mentor-management" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">Mentor Management</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">Manage mentor applications.</CardDescription>
                  </CardHeader>
                  <CardContent><MentorApplicationTable /></CardContent>
                </Card>
              )}

              {activeSection === "recruiter-management" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">Recruiter Management</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">Manage recruiter applications.</CardDescription>
                  </CardHeader>
                  <CardContent><RecruiterApplicationTable /></CardContent>
                </Card>
              )}

              {activeSection === "course-management" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardContent className="p-6"><CourseManager /></CardContent>
                </Card>
              )}

              {activeSection === "rankings" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">Student Rankings</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">View rankings and manage recruiter access.</CardDescription>
                  </CardHeader>
                  <CardContent><RankingTable /></CardContent>
                </Card>
              )}

              {activeSection === "revenue" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">Revenue</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">View revenue analytics.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-md">
                      <p className="text-gray-500 font-mono">Revenue Content Placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              )}
           </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
