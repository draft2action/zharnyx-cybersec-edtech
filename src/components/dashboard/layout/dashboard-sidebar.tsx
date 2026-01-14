"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Briefcase,
  Settings,
  LogOut,
  Home,
  LayoutDashboard,
  GraduationCap,
  Users,
  Shield,
  PanelLeft,
  ChevronLeft,
  Terminal,
  FileText,
  FolderKanban,
  HelpCircle,
  Trophy,
} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Menu items configuration
const STUDENT_ITEMS = [
  {
    title: "My Learning",
    id: "learning",
    icon: GraduationCap,
  },
  {
    title: "Submissions",
    id: "submissions",
    icon: FileText,
  },
  {
    title: "Profile",
    id: "profile",
    icon: Settings,
  },
];

const ADMIN_ITEMS = [
  {
    title: "User Management",
    id: "user-management",
    icon: Users,
  },
  {
    title: "Mentor Management",
    id: "mentor-management",
    icon: Users,
  },
  {
    title: "Recruiter Management",
    id: "recruiter-management",
    icon: Briefcase,
  },
  {
    title: "Applications",
    id: "applications",
    icon: PanelLeft,
  },
  {
    title: "Course Management",
    id: "course-management",
    icon: BookOpen,
  },
  {
    title: "Student Rankings",
    id: "rankings",
    icon: Trophy,
  },
];

const MENTOR_ITEMS = [
  {
    title: "Student Progress",
    id: "student-progress",
    icon: GraduationCap,
  },
  {
    title: "Score Assignments",
    id: "score-assignments",
    icon: FileText,
  },
  {
    title: "Score Projects",
    id: "score-projects",
    icon: FolderKanban,
  },
  {
    title: "Doubt Sessions",
    id: "doubt-sessions",
    icon: HelpCircle,
  },
];

interface DashboardSidebarProps {
  userRole?: string;
}

export function DashboardSidebar({
  userRole = "student",
}: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toggleSidebar, state } = useSidebar();

  const effectiveRole =
    userRole === "admin"
      ? pathname?.startsWith("/dashboard/mentor")
        ? "mentor"
        : pathname?.startsWith("/dashboard/student")
        ? "student"
        : "admin"
      : userRole;

  const currentSection =
    searchParams.get("section") ||
    (effectiveRole === "mentor"
      ? "student-progress"
      : effectiveRole === "student"
      ? "learning"
      : "user-management");

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth");
  };

  const handleAdminClick = (id: string) => {
    // Navigate with search param for admin sections
    router.push(`/dashboard/admin?section=${id}`);
  };

  const handleMentorClick = (id: string) => {
    router.push(`/dashboard/mentor?section=${id}`);
  };

  const handleStudentClick = (id: string) => {
    router.push(`/dashboard/student?section=${id}`);
  };

  const items =
    effectiveRole === "admin"
      ? []
      : effectiveRole === "mentor"
      ? []
      : STUDENT_ITEMS;

  return (
    <Sidebar
      className="border-r-2 border-white/20 bg-black text-white"
      collapsible="icon"
    >
      <SidebarHeader className="border-b-2 border-white/20 p-4 h-[80px] flex items-center justify-center bg-black group-data-[collapsible=icon]:p-2">
        {/* Logo / Title Area */}
        <div className="flex items-center gap-3 overflow-hidden w-full group">
          {/* Icon - Color depends on Role */}
          <div
            className={cn(
              "flex items-center justify-center shrink-0 w-10 h-10 border-2 border-white/20 shadow-[2px_2px_0px_0px_white] group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 transition-all",
              effectiveRole === "mentor"
                ? "bg-purple-600"
                : effectiveRole === "student"
                ? "bg-blue-600"
                : "bg-red-600"
            )}
          >
            <div
              className={cn(
                "text-black h-6 w-6 group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4 flex items-center justify-center"
              )}
            >
              {effectiveRole === "mentor" ? (
                <GraduationCap strokeWidth={2.5} />
              ) : effectiveRole === "student" ? (
                <BookOpen strokeWidth={2.5} />
              ) : (
                <Terminal strokeWidth={2.5} />
              )}
            </div>
          </div>

          {/* Text - White - Hide via CSS when collapsed if state isn't enough */}
          <div
            className={cn(
              "flex flex-col transition-opacity duration-200",
              state === "collapsed" ? "opacity-0 w-0 hidden" : "opacity-100"
            )}
          >
            <span className="font-black text-xl text-white tracking-tighter uppercase leading-none">
              ZHARNYX
            </span>
            <span
              className={cn(
                "text-[10px] font-mono uppercase tracking-widest leading-none mt-1",
                effectiveRole === "mentor"
                  ? "text-purple-500"
                  : effectiveRole === "student"
                  ? "text-blue-500"
                  : "text-red-500"
              )}
            >
              {effectiveRole === "mentor"
                ? "Mentor Zone"
                : effectiveRole === "student"
                ? "Student Portal"
                : "Admin Console"}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-black py-6">
        {/* Admin Menu */}
        {effectiveRole === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 font-mono font-bold uppercase tracking-widest text-xs mb-4 pl-4 group-data-[collapsible=icon]:hidden">
              Management modules
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2 px-2 group-data-[collapsible=icon]:px-0">
                {ADMIN_ITEMS.map((item) => {
                  const isActive =
                    pathname === "/dashboard/admin" &&
                    currentSection === item.id;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => handleAdminClick(item.id)}
                        className={cn(
                          "font-mono font-bold text-sm border-2 transition-all duration-200 p-3 h-auto rounded-none mb-1",
                          // Default
                          "bg-transparent border-transparent text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20",
                          // Active
                          isActive &&
                            "bg-red-600/10 border-red-600 text-red-500 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500 shadow-[2px_2px_0px_0px_#dc2626]",
                          // Collapsed adjustments
                          "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2"
                        )}
                      >
                        <button className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                          <item.icon
                            className={cn(
                              "h-5 w-5 stroke-[1.5px] shrink-0",
                              isActive
                                ? "text-red-500"
                                : "text-gray-400 group-hover:text-white"
                            )}
                          />
                          <span className="uppercase tracking-wide text-xs group-data-[collapsible=icon]:hidden">
                            {item.title}
                          </span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Mentor Menu */}
        {effectiveRole === "mentor" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 font-mono font-bold uppercase tracking-widest text-xs mb-4 pl-4 group-data-[collapsible=icon]:hidden">
              Overview & Grading
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2 px-2 group-data-[collapsible=icon]:px-0">
                {MENTOR_ITEMS.map((item) => {
                  const isActive =
                    pathname === "/dashboard/mentor" &&
                    currentSection === item.id;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => handleMentorClick(item.id)}
                        className={cn(
                          "font-mono font-bold text-sm border-2 transition-all duration-200 p-3 h-auto rounded-none mb-1",
                          // Default
                          "bg-transparent border-transparent text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20",
                          // Active - Purple
                          isActive &&
                            "bg-purple-600/10 border-purple-600 text-purple-500 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500 shadow-[2px_2px_0px_0px_#9333ea]",
                          // Collapsed adjustments
                          "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2"
                        )}
                      >
                        <button className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                          <item.icon
                            className={cn(
                              "h-5 w-5 stroke-[1.5px] shrink-0",
                              isActive
                                ? "text-purple-500"
                                : "text-gray-400 group-hover:text-white"
                            )}
                          />
                          <span className="uppercase tracking-wide text-xs group-data-[collapsible=icon]:hidden">
                            {item.title}
                          </span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Student Menu */}
        {effectiveRole !== "admin" && effectiveRole !== "mentor" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-500 font-mono font-bold uppercase tracking-widest text-xs mb-4 pl-4 group-data-[collapsible=icon]:hidden">
              Learning Space
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2 px-2 group-data-[collapsible=icon]:px-0">
                {items.map((item) => {
                  const isActive =
                    pathname === "/dashboard/student" &&
                    currentSection === item.id;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => handleStudentClick(item.id)}
                        className={cn(
                          "font-mono font-bold text-sm border-2 transition-all duration-200 p-3 h-auto rounded-none mb-1",
                          // Default
                          "bg-transparent border-transparent text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20",
                          // Active
                          isActive &&
                            "bg-blue-600/10 border-blue-600 text-blue-500 hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-500 shadow-[2px_2px_0px_0px_#2563eb]",
                          // Collapsed
                          "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2"
                        )}
                      >
                        <button className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                          <item.icon
                            className={cn(
                              "h-5 w-5 stroke-[1.5px] shrink-0",
                              isActive
                                ? "text-blue-500"
                                : "text-gray-400 group-hover:text-white"
                            )}
                          />
                          <span className="uppercase tracking-wide text-xs group-data-[collapsible=icon]:hidden">
                            {item.title}
                          </span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t-2 border-white/20 p-4 bg-black group-data-[collapsible=icon]:p-2">
        <SidebarMenu className="gap-2 group-data-[collapsible=icon]:gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleSidebar}
              className="hover:bg-white/10 font-mono text-gray-400 hover:text-white border-2 border-transparent hover:border-white/20 h-auto p-3 rounded-none  group-data-[collapsible=icon]:justify-center"
            >
              <PanelLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  state === "collapsed" && "rotate-180"
                )}
              />
              <span className="uppercase tracking-wider text-xs group-data-[collapsible=icon]:hidden">
                {state === "expanded" ? "Collapse" : ""}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => router.push("/")}
              className="hover:bg-white/10 font-mono text-gray-400 hover:text-white border-2 border-transparent hover:border-white/20 h-auto p-3 rounded-none group-data-[collapsible=icon]:justify-center"
            >
              <Home className="h-4 w-4" />
              <span className="uppercase tracking-wider text-xs group-data-[collapsible=icon]:hidden">
                Home
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="hover:bg-red-900/30 text-red-500/70 hover:text-red-500 font-mono border-2 border-transparent hover:border-red-900/50 h-auto p-3 rounded-none group group-data-[collapsible=icon]:justify-center"
            >
              <LogOut className="h-4 w-4 " />
              <span className="uppercase tracking-wider text-xs group-data-[collapsible=icon]:hidden">
                Sign Out
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
