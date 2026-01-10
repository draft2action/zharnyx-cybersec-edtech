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
import { BookOpen, FileText, Code, User, Home, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

// Define menu items
const items = [
  {
    title: "Enrolled Courses",
    id: "enrolled-courses",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    id: "assignments",
    icon: FileText,
  },
  {
    title: "Projects",
    id: "projects",
    icon: Code,
  },
  {
    title: "Public Profile",
    id: "public-profile",
    icon: User,
    isLink: true,
  },
];

interface StudentSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userId: string;
}

export function StudentSidebar({
  activeSection,
  onSectionChange,
  userId,
}: StudentSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth");
  };

  const handleItemClick = (item: (typeof items)[0]) => {
    if (item.id === "public-profile") {
      window.open(`/profile/${userId}`, "_blank");
    } else {
      onSectionChange(item.id);
    }
  };

  return (
    <Sidebar
      className="border-r border-white/10 bg-black/90 text-white"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-white/10 p-4">
        <div className="flex items-center gap-2 font-mono font-bold text-xl text-white">
          <span className="text-green-500">Student</span>Hub
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-mono">
            Learning
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.id && !item.isLink}
                    onClick={() => handleItemClick(item)}
                    className="hover:bg-white/10 data-[active=true]:bg-green-600 data-[active=true]:text-white font-mono transition-colors cursor-pointer"
                  >
                    <button>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.isLink && (
                        <span className="ml-auto text-xs text-gray-500">↗</span>
                      )}
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
