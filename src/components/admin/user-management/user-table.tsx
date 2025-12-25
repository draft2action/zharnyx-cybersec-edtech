"use client";

import { useEffect, useState } from "react";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllUsers } from "@/actions/admin/user-management/action";

export function UserTable() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // API uses 1-based index for page
      const result = await getAllUsers({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
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
  }, [pagination]);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div>Loading...</div>
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
