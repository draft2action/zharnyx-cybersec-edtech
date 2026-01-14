import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth");
  }

  return <>{children}</>;
}
