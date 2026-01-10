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
  Trophy,
  DollarSign,
  Settings,
  LogOut,
  Home,
  LayoutDashboard,
  GraduationCap,
  Users,
  Shield,
  PanelLeft,
  ChevronLeft,
} from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Menu items configuration
const STUDENT_ITEMS = [
  {
    title: "Overview",
    url: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    title: "My Learning",
    url: "/dashboard/student/learning",
    icon: GraduationCap,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
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

  const currentSection = searchParams.get("section") || "user-management";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth");
  };

  const handleAdminClick = (id: string) => {
    // Navigate with search param for admin sections
    router.push(`/dashboard/admin?section=${id}`);
  };

  const items = userRole === "admin" ? [] : STUDENT_ITEMS;

  return (
    <Sidebar
      className="border-r border-blue-500/30 bg-black text-white transition-all duration-300 overflow-visible"
      collapsible="icon"
    >
      <SidebarHeader className="border-b-2 border-red-600 p-4 h-[70px] flex items-center bg-black">
        {/* Logo / Title Area */}
        <div className="flex items-center gap-3 overflow-hidden transition-all duration-300 w-full">
          {/* Shield Icon - Red */}
          <div className="flex items-center justify-center shrink-0">
            <Shield
              className={cn(
                "text-red-600 fill-red-600/10 transition-all duration-300 stroke-[2.5px]",
                state === "expanded" ? "h-8 w-8" : "h-5 w-5"
              )}
            />
          </div>

          {/* Text - Red */}
          {state === "expanded" && (
            <span className="font-mono font-black text-xl text-red-600 tracking-tighter truncate animate-in fade-in slide-in-from-left-4 duration-300 uppercase shadow-[2px_2px_0px_0px_#3b82f6]">
              ZHARNYX
            </span>
          )}
        </div>

        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-3 top-6 z-50 h-6 w-6 rounded-none border-2 border-red-600 bg-black text-red-600 hover:bg-red-600 hover:text-black transition-all duration-200 shadow-[4px_4px_0px_0px_#3b82f6]",
            state === "collapsed" && "right-[-12px]"
          )}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 font-bold transition-transform duration-300",
              state === "collapsed" && "rotate-180"
            )}
          />
        </Button>
      </SidebarHeader>

      <SidebarContent className="bg-black">
        {/* Admin Menu */}
        {userRole === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-red-500/70 font-mono font-bold uppercase tracking-wider text-xs mb-2">
              Admin Console
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {ADMIN_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        pathname === "/dashboard/admin" &&
                        currentSection === item.id
                      }
                      onClick={() => handleAdminClick(item.id)}
                      className={cn(
                        "font-mono font-bold text-sm border-2 border-transparent transition-all duration-200 p-3 h-auto",
                        // Default: Blue text
                        "text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500 hover:shadow-[4px_4px_0px_0px_#3b82f6]",
                        // Active: Purple styling
                        "data-[active=true]:bg-purple-900/20 data-[active=true]:text-purple-400",
                        "data-[active=true]:border-purple-500 data-[active=true]:shadow-[4px_4px_0px_0px_#a855f7]",
                        "data-[active=true]:translate-x-[2px] data-[active=true]:translate-y-[2px]"
                      )}
                    >
                      <button className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "h-5 w-5 stroke-[2.5px]",
                            // Icon color follows active state (Purple) or default (Blue)
                            pathname === "/dashboard/admin" &&
                              currentSection === item.id
                              ? "text-purple-400"
                              : "text-blue-500"
                          )}
                        />
                        <span className="leading-none">{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Student/Mentor Menu */}
        {userRole !== "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-red-500/70 font-mono font-bold uppercase tracking-wider text-xs mb-2">
              Dashboard
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        pathname === item.url ||
                        pathname?.startsWith(item.url + "/")
                      }
                      onClick={() => router.push(item.url)}
                      className={cn(
                        "font-mono font-bold text-sm border-2 border-transparent transition-all duration-200 p-3 h-auto",
                        "text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500 hover:shadow-[4px_4px_0px_0px_#3b82f6]",
                        "data-[active=true]:bg-purple-900/20 data-[active=true]:text-purple-400",
                        "data-[active=true]:border-purple-500 data-[active=true]:shadow-[4px_4px_0px_0px_#a855f7]"
                      )}
                    >
                      <button className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 stroke-[2.5px]" />
                        <span className="leading-none">{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4 bg-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => router.push("/")}
              className="hover:bg-white/10 font-mono text-gray-400 hover:text-white"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="hover:bg-red-500/10 text-red-500/80 hover:text-red-500 font-mono group"
            >
              <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
