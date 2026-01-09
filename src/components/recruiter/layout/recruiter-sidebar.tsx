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
    Home,
    LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

// Define menu items
const items = [
    {
        title: "Candidates",
        id: "candidates",
        icon: Users,
    },
    // Add more recruiter items here if needed
];

interface RecruiterSidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

export function RecruiterSidebar({ activeSection, onSectionChange }: RecruiterSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
      await authClient.signOut();
      router.push("/auth/sign-in");
  };

  return (
    <Sidebar className="border-r border-white/10 bg-black/90 text-white" collapsible="icon">
      <SidebarHeader className="border-b border-white/10 p-4">
        <div className="flex items-center gap-2 font-mono font-bold text-xl text-white">
            <span className="text-purple-500">Cyber</span>talent
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-mono">Recruiter Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={activeSection === item.id}
                    onClick={() => onSectionChange(item.id)}
                    className="hover:bg-white/10 data-[active=true]:bg-purple-600 data-[active=true]:text-white font-mono transition-colors"
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
