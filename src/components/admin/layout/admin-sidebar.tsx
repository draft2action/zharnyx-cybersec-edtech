"use client";

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
} from "@/components/ui/sidebar";
import {
  Users,
  BookOpen,
  Briefcase,
  Trophy,
  DollarSign,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client"; // Verify auth client path

// Define menu items
const items = [
  {
    title: "User Management",
    id: "user-management",
    icon: Users,
  },
  {
    title: "Mentor Management",
    id: "mentor-management",
    icon: UserWithCases, // Or similar
  },
  {
    title: "Recruiter Management",
    id: "recruiter-management",
    icon: Briefcase,
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
  {
    title: "Revenue",
    id: "revenue",
    icon: DollarSign,
  },
];

// Need to import correct icon for UserWithCases or just use Users
import { UserCheck as UserWithCases } from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({
  activeSection,
  onSectionChange,
}: AdminSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth/");
  };

  return (
    <Sidebar
      className="border-r border-white/10 bg-black/90 text-white"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-white/10 p-4">
        <div className="flex items-center gap-2 font-mono font-bold text-xl text-white">
          <span className="text-blue-500">Cyber</span>Sec
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-mono">
            Admin Console
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id}
                    onClick={() => onSectionChange(item.id)}
                    className="hover:bg-white/10 data-[active=true]:bg-blue-600 data-[active=true]:text-white font-mono transition-colors"
                  >
                    <button>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10 p-4">
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
              className="hover:bg-red-500/10 text-red-400 hover:text-red-300 font-mono"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
