"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { User } from "./columns";
import { updateUserRole } from "@/actions/admin/student-management/action";
import { UserProgressModal } from "./user-progress-modal";

interface UserActionsProps {
  user: User;
}

export function UserActions({ user }: UserActionsProps) {
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const handleRoleUpdate = async (
    userId: string,
    newRole: "admin" | "mentor" | "student"
  ) => {
    const result = await updateUserRole(userId, newRole);
    if (result.success) {
      toast.success("User role updated successfully");
    } else {
      toast.error(result.error || "Failed to update user role");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-white/10 rounded-xl data-[state=open]:bg-white/10"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="font-sans bg-black border border-[#1a1a1a] rounded-xl w-56  p-0"
        >
          <div className="bg-[#0a0a0a] p-2 border-b border-[#1a1a1a]">
            <DropdownMenuLabel className="p-0 text-white font-bold uppercase text-xs tracking-widest">
              User Actions
            </DropdownMenuLabel>
          </div>
          <div className="p-1">
            <DropdownMenuItem
              className="text-gray-300 hover:text-black hover:bg-white focus:text-black focus:bg-white rounded-xl cursor-pointer uppercase text-xs font-bold tracking-wide py-2"
              onClick={() => {
                navigator.clipboard.writeText(user.id);
                toast.success("User ID copied to clipboard");
              }}
            >
              Copy ID
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-gray-300 hover:text-black hover:bg-white focus:text-black focus:bg-white rounded-xl cursor-pointer uppercase text-xs font-bold tracking-wide py-2"
              onSelect={() => setIsProgressModalOpen(true)}
            >
              View Progress
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/10 my-1" />

            <DropdownMenuLabel className="text-gray-500 text-[10px] uppercase tracking-widest px-2 py-1 mt-1">
              Update Role
            </DropdownMenuLabel>

            <DropdownMenuItem
              className="text-blue-400 hover:text-black hover:bg-blue-400 focus:text-black focus:bg-blue-400 rounded-xl cursor-pointer uppercase text-xs font-bold tracking-wide py-2"
              onClick={() => handleRoleUpdate(user.id, "student")}
            >
              Set as Student
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-purple-400 hover:text-black hover:bg-purple-400 focus:text-black focus:bg-purple-400 rounded-xl cursor-pointer uppercase text-xs font-bold tracking-wide py-2"
              onClick={() => handleRoleUpdate(user.id, "mentor")}
            >
              Set as Mentor
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400 hover:text-black hover:bg-red-500 focus:text-black focus:bg-red-500 rounded-xl cursor-pointer uppercase text-xs font-bold tracking-wide py-2"
              onClick={() => handleRoleUpdate(user.id, "admin")}
            >
              Set as Admin
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProgressModal
        userId={user.id}
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
      />
    </>
  );
}
