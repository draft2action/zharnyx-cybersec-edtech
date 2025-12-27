"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, FileText, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateMentorApplicationStatus } from "@/actions/admin/mentor-management/action";
import { toast } from "@/components/shared/toast";
import { Badge } from "@/components/ui/badge";

export type MentorApplication = {
  id: string;
  fullName: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  resumeUrl: string;
  createdAt: Date;
};

const handleStatusUpdate = async (
  applicationId: string,
  newStatus: "approved" | "rejected"
) => {
  const result = await updateMentorApplicationStatus(applicationId, newStatus);
  if (result.success) {
    toast.success(result.message || "Status updated successfully");
  } else {
    toast.error(result.error || "Failed to update status");
  }
};

export const columns: ColumnDef<MentorApplication>[] = [
  {
    accessorKey: "fullName",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "approved"
              ? "default" // or success if available
              : status === "rejected"
              ? "destructive"
              : "secondary"
          }
          className={
            status === "approved"
              ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
              : status === "rejected"
              ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "APPLIED ON",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => {
      const application = row.original;

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
                navigator.clipboard.writeText(application.id);
                toast.success("ID copied to clipboard");
              }}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer"
              >
                <FileText className="mr-2 h-4 w-4" /> View Resume
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleStatusUpdate(application.id, "approved")}
              disabled={application.status === "approved"}
            >
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Use
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusUpdate(application.id, "rejected")}
              disabled={application.status === "rejected"}
            >
              <XCircle className="mr-2 h-4 w-4 text-red-500" /> Use Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
