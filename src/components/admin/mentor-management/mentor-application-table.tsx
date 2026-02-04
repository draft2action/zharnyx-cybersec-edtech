"use client";

import { useEffect, useState } from "react";
import { MentorApplication, columns } from "./mentor-application-columns";
import { DataTable } from "../user-management/data-table"; // Reusing generic table
import { getMentorApplications } from "@/actions/admin/mentor-management/action";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlSync } from "@/hooks/use-url-sync";

export function MentorApplicationTable() {
  const [data, setData] = useState<MentorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  // Search and Filter states
  const [query, setQuery] = useUrlSync("search", "", 500);
  const debouncedQuery = useDebounce(query, 500);
  const [statusFilter, setStatusFilter] = useUrlSync("status", "all");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getMentorApplications({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: debouncedQuery,
        status: statusFilter,
      });

      if (result.success && result.data) {
        const mappedApps: MentorApplication[] = result.data.map((app) => ({
          id: app.id,
          fullName: app.fullName,
          email: app.email,
          status: app.status as "pending" | "approved" | "rejected",
          resumeUrl: app.resumeUrl,
          createdAt: new Date(app.createdAt),
        }));
        setData(mappedApps);
        setPageCount(result.meta?.totalPages || 0);
      }
      setLoading(false);
    };

    fetchData();
  }, [pagination, debouncedQuery, statusFilter]);

  // Reset pagination when search or filter changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedQuery, statusFilter]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-10 pt-0 overflow-x-auto">
      <div className="flex items-center py-4 gap-4">
        <div className="flex flex-1 items-center gap-2">
          <input
            placeholder="SEARCH APPLICATIONS..."
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
          <SelectTrigger className="w-[180px] h-10 border-2 border-white/20 bg-black text-white font-mono rounded-none uppercase text-xs font-bold tracking-wide focus:border-red-500">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-black border-2 border-white/20 text-white font-mono rounded-none">
            <SelectItem value="all">ALL STATUS</SelectItem>
            <SelectItem value="pending">PENDING</SelectItem>
            <SelectItem value="approved">APPROVED</SelectItem>
            <SelectItem value="rejected">REJECTED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <TableSkeleton columnCount={5} rowCount={5} />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pageCount={pageCount}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      )}
    </div>
  );
}
