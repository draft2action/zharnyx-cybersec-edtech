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

export function UserTable() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  // Search and Filter states
  const [query, setQuery] = useState(""); // Internal state for input
  const [searchQuery, setSearchQuery] = useState(""); // Actual query sent to API
  const [roleFilter, setRoleFilter] = useState("all");

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
        query: searchQuery,
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
  }, [pagination, searchQuery, roleFilter]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page
    setSearchQuery(query);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center py-4 gap-4">
        <div className="flex flex-1 items-center gap-2">
          <input
            placeholder="Search users..."
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
          >
            Search
          </button>
        </div>
        <Select
          value={roleFilter}
          onValueChange={(value) => {
            setRoleFilter(value);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          }}
        >
          <SelectTrigger className="w-[180px] h-10 border-white/10 bg-transparent text-white font-mono">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white/10 text-white font-mono">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="mentor">Mentor</SelectItem>
            <SelectItem value="recruiter">Recruiter</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <div className="text-white font-mono mx-auto container">Loading...</div>
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
