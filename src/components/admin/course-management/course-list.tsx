"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { getColumns, Course } from "./columns";
import { getAllCourses } from "@/actions/admin/course-management/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
        : searchQuery;
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
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    setSearchQuery(query);
    fetchCourses({ pageIndex: 0, searchQuery: query });
  };

  const handlePaginationChange = (nextPagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setPagination(nextPagination);
    fetchCourses({
      pageIndex: nextPagination.pageIndex,
      pageSize: nextPagination.pageSize,
    });
  };

  const columns = getColumns({ onEdit });

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4 gap-4">
        <div className="flex flex-1 items-center gap-2">
          <input
            placeholder="Search courses..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 flex-1 rounded-md border border-white/10 bg-transparent px-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-400 font-mono"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="h-10 px-4 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium font-mono"
            disabled={loading}
          >
            Search
          </button>
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            fetchCourses({ statusFilter: value, pageIndex: 0 });
          }}
        >
          <SelectTrigger className="w-[180px] h-10 border-white/10 bg-transparent text-white font-mono">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/10 text-white font-mono">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-white font-mono text-center py-10">
          Loading courses...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pageCount={pageCount}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      )}
    </div>
  );
}
