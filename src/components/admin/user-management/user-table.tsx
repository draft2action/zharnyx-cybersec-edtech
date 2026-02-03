"use client";

import { useEffect, useState } from "react";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllUsers } from "@/actions/admin/student-management/action";
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

export function UserTable() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  // Search and Filter states
  const [query, setQuery] = useUrlSync("search", "", 500);
  // We use the same value for query and debouncedQuery because the hook handles URL debounce internally if needed,
  // BUT the table uses debouncedQuery to fetch data.
  // Actually, my hook debounces the URL update, but we also want the data fetch to be debounced.
  // The 'query' returned by useUrlSync is the immediate value (for input).
  // The URL update happens later.
  // We still need a debounced value for the API call unless we want to read from URL?
  // Let's keep it simple: useUrlSync returns [value, setValue]. The URL update is a side effect.
  // We still need a debounced value for the API call to avoid spamming while typing.
  // OR we can trust the hook's URL update delay, but that might delay the UI?
  // UseDebounce is better for the API call. The URL sync is just for permalinks.

  const debouncedQuery = useDebounce(query, 500);
  // Note: The hook also debounces URL updates, so they happen together effectively.

  const [roleFilter, setRoleFilter] = useUrlSync("role", "all");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // API uses 1-based index for page
      const result = await getAllUsers({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        query: debouncedQuery,
        role: roleFilter,
      });

      if (result.success && result.data) {
        // Map DB result to User type if needed, but assuming schema matches for now
        // Casting raw data to User[] - ensure fields match schema.ts
        const mappedUsers: User[] = result.data.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          createdAt: new Date(u.createdAt),
        }));
        setData(mappedUsers);
        setPageCount(result.meta?.totalPages || 0);
      }
      setLoading(false);
    };

    fetchData();
  }, [pagination, debouncedQuery, roleFilter]);

  // Reset pagination when search changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedQuery, roleFilter]);


  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full py-4 md:py-10">
      <div className="flex flex-col md:flex-row items-stretch md:items-center py-4 gap-4">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-2">
          <input
            placeholder="SEARCH USERS..."
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
          value={roleFilter}
          onValueChange={(value) => {
            setRoleFilter(value);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
        >
          <SelectTrigger className="w-full md:w-[180px] h-10 border-2 border-white/20 bg-black text-white font-mono rounded-none uppercase text-xs font-bold tracking-wide focus:border-red-500">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent className="bg-black border-2 border-white/20 text-white font-mono rounded-none">
            <SelectItem value="all">ALL ROLES</SelectItem>
            <SelectItem value="student">STUDENT</SelectItem>
            <SelectItem value="mentor">MENTOR</SelectItem>
            <SelectItem value="recruiter">RECRUITER</SelectItem>
            <SelectItem value="partner_agency">PARTNER AGENCY</SelectItem>
            <SelectItem value="admin">ADMIN</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <TableSkeleton columnCount={5} rowCount={10} />
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
