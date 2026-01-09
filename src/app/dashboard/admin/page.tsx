import { requireAdmin } from "@/lib/auth/role-guard";
import AdminDashboardClient from "@/components/admin/layout/admin-dashboard-client";

export default async function AdminPage() {
  await requireAdmin();

  return <AdminDashboardClient />;
}
