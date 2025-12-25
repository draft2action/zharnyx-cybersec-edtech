import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in");
  }

  const userRole = session.user.role;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <h1 className="text-xl font-bold">CyberSec EdTech</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/student"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  My Learning
                </Link>
                {(userRole === "admin" || userRole === "mentor") && (
                  <Link
                    href="/dashboard/mentor"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Mentor Portal
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link
                    href="/dashboard/admin"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="shrink-0">
                <span className="text-sm text-gray-700">
                  {session.user.name} ({userRole})
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
