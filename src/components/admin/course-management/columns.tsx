"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, Globe, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
  onDelete: (courseId: string) => void;
  onUnpublish: (courseId: string) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
  onUnpublish,
}: ColumnsProps): ColumnDef<Course>[] => [
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
                Course Actions
              </DropdownMenuLabel>
            </div>

            <div className="p-1">
              {course.status === "published" && (
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    onUnpublish(course.id);
                  }}
                  className="text-orange-400 hover:text-black hover:bg-orange-500 focus:text-black focus:bg-orange-500 rounded-xl cursor-pointer uppercase text-xs font-bold tracking-wide py-2"
                >
                  <EyeOff className="mr-2 h-4 w-4" />
                  Unpublish
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => onEdit(course.id)}
                className="text-gray-300 hover:text-black hover:bg-white focus:text-black focus:bg-white rounded-xl cursor-pointer uppercase text-xs font-bold tracking-wide py-2"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10 my-1" />

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // Prevent closing for confirm dialog
                  onDelete(course.id);
                }}
                className="text-red-500 hover:text-black hover:bg-red-600 focus:text-black focus:bg-red-600 rounded-xl cursor-pointer uppercase text-xs font-bold tracking-wide py-2"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Course
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
