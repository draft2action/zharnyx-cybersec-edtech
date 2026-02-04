"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { getColumns, Course } from "./columns";
import {
  getAllCourses,
  deleteCourse,
  updateCourseStatus,
} from "@/actions/admin/course-management/action";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TableSkeleton } from "@/components/shared/table-skeleton";

import { useDebounce } from "@/hooks/use-debounce";
import { useUrlSync } from "@/hooks/use-url-sync";

interface CourseListProps {
  onEdit: (courseId: string) => void;
}

export function CourseList({ onEdit }: CourseListProps) {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  const [query, setQuery] = useUrlSync("search", "", 500);
  const debouncedQuery = useDebounce(query, 500);
  const [statusFilter, setStatusFilter] = useUrlSync("status", "all");

  const fetchCourses = async (overrides?: {
    pageIndex?: number;
    pageSize?: number;
    searchQuery?: string;
    statusFilter?: string;
  }) => {
    setLoading(true);
    const currentPagination = {
      pageIndex:
        overrides?.pageIndex !== undefined
          ? overrides.pageIndex
          : pagination.pageIndex,
      pageSize:
        overrides?.pageSize !== undefined
          ? overrides.pageSize
          : pagination.pageSize,
    };
    const currentSearchQuery =
      overrides?.searchQuery !== undefined
        ? overrides.searchQuery
        : debouncedQuery;
    const currentStatusFilter =
      overrides?.statusFilter !== undefined
        ? overrides.statusFilter
        : statusFilter;

    const result = await getAllCourses({
      page: currentPagination.pageIndex + 1,
      limit: currentPagination.pageSize,
      query: currentSearchQuery,
      status: currentStatusFilter,
    });

    if (result.success && result.data) {
      const mappedCourses: Course[] = result.data.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description || "",
        status: c.status,
        createdAt: new Date(c.createdAt).toString(),
      }));
      setData(mappedCourses);
      setPageCount(result.meta?.totalPages || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Reset pagination when search or filter changes
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedQuery, statusFilter]);

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, debouncedQuery, statusFilter]);

  const handlePaginationChange = (nextPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(nextPagination);
  };
  /* Wait, `fetchCourses` uses state values unless overridden. 
     If we want live search, we should just depend on `debouncedQuery` in an effect. */

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (deleteId) {
      const result = await deleteCourse(deleteId);
      if (result.success) {
        toast.success(result.message);
        fetchCourses();
      } else {
        toast.error(result.error);
      }
      setDeleteId(null);
    }
  };

  const [unpublishId, setUnpublishId] = useState<string | null>(null);

  const confirmUnpublish = async () => {
    if (unpublishId) {
      const result = await updateCourseStatus(unpublishId, "unpublished");
      if (result.success) {
        toast.success(result.message);
        fetchCourses();
      } else {
        toast.error(result.error);
      }
      setUnpublishId(null);
    }
  };

  const columns = getColumns({
    onEdit,
    onDelete: (id) => setDeleteId(id),
    onUnpublish: (id) => setUnpublishId(id),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center py-4 gap-4">
        <div className="flex flex-col md:flex-row flex-1 items-stretch md:items-center gap-2">
          <input
            placeholder="SEARCH COURSES..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 flex-1 rounded-none border-2 border-white/20 bg-black px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 font-mono uppercase tracking-wide transition-colors"
          />
          <button
            disabled={loading}
            className="h-10 px-6 rounded-none bg-white text-black hover:bg-gray-200 transition-colors text-xs font-black uppercase tracking-widest border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "SEARCHING..." : "SEARCH"}
          </button>
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
          }}
        >
          <SelectTrigger className="w-full md:w-[180px] h-10 border-2 border-white/20 bg-black text-white font-mono rounded-none uppercase text-xs font-bold tracking-wide focus:border-red-500">
            <SelectValue placeholder="ALL STATUS" />
          </SelectTrigger>
          <SelectContent className="bg-black border-2 border-white/20 text-white font-mono rounded-none">
            <SelectItem value="all">ALL STATUS</SelectItem>
            <SelectItem value="published">PUBLISHED</SelectItem>
            <SelectItem value="unpublished">UNPUBLISHED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <TableSkeleton columnCount={4} rowCount={5} />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pageCount={pageCount}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="bg-black border-white/10 text-white font-mono">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the
              course and all associated data including tests and progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 border-white/10 text-white hover:bg-white/20">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white border-0"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!unpublishId}
        onOpenChange={(open) => !open && setUnpublishId(null)}
      >
        <AlertDialogContent className="bg-black border-white/10 text-white font-mono">
          <AlertDialogHeader>
            <AlertDialogTitle>Unpublish this course?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will remove the course from the public catalog. Students will
              no longer see it, but enrolled students may still have access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 border-white/10 text-white hover:bg-white/20">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmUnpublish}
              className="bg-orange-500 hover:bg-orange-600 text-white border-0"
            >
              Unpublish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
