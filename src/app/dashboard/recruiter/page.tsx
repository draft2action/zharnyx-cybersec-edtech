import { requireRecruiter } from "@/lib/auth/role-guard";
import RecruiterDashboardClient from "@/components/recruiter/layout/recruiter-dashboard-client";

export default async function RecruiterDashboard() {
  await requireRecruiter();

  return <RecruiterDashboardClient />;
}
