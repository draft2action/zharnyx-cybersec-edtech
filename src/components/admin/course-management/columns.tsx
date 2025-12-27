"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export type Course = {
  id: string;
  title: string;
  description: string;
  status: "published" | "unpublished";
  createdAt: string; // Serialized date
};

interface ColumnsProps {
  onEdit: (courseId: string) => void;
}

export const getColumns = ({ onEdit }: ColumnsProps): ColumnDef<Course>[] => [
  {
    accessorKey: "title",
    header: "TITLE",
    cell: ({ row }) => (
      <span className="font-medium text-white">{row.getValue("title")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "published" ? "default" : "secondary"}
          className={
            status === "published"
              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
              : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => {
      return (
        <span className="text-gray-400">
          {new Date(row.getValue("createdAt")).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black border-white/10 text-white font-mono"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => onEdit(course.id)}
              className="cursor-pointer hover:bg-white/10"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
