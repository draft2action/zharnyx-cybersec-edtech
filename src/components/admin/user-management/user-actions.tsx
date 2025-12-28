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
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="font-mono bg-amber-100">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(user.id);
              toast.success("User ID copied to clipboard");
            }}
          >
            Copy User ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => setIsProgressModalOpen(true)}>
            View Progress
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Update Role</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => handleRoleUpdate(user.id, "student")}
          >
            Make Student
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, "mentor")}>
            Make Mentor
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, "admin")}>
            Make Admin
          </DropdownMenuItem>
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
