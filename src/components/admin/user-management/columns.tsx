"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import { updateUserRole } from "@/actions/admin/user-management/action";
import { toast } from "@/components/shared/toast";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "mentor" | "student";
  createdAt: Date;
  // Add other fields as necessary from specific DB schema return type
};

const handleRoleUpdate = async (userId: string, newRole: "admin" | "mentor" | "student") => {
  const result = await updateUserRole(userId, newRole);
  if (result.success) {
    toast.success("User role updated successfully");
  } else {
    toast.error(result.error || "Failed to update user role");
  }
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "createdAt",
    header: "JOINED",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
            <DropdownMenuLabel>Update Role</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, "student")}>
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
      );
    },
  },
];
