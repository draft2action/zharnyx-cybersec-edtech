"use client";

import { useEffect, useState } from "react";
import { MentorApplication, columns } from "./mentor-application-columns";
import { DataTable } from "../user-management/data-table"; // Reusing generic table
import { getMentorApplications } from "@/actions/admin/mentor-management/action";

export function MentorApplicationTable() {
  const [data, setData] = useState<MentorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  // You could add filters here later (status, search) via state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getMentorApplications({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        // search: ...
        // status: ...
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
  }, [pagination]);

  return (
    <div className="container mx-auto py-10 pt-0">
      {loading ? (
        <div className="text-center py-10 text-gray-400 font-mono">
          Loading applications...
        </div>
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
