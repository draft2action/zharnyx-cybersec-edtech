import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { LogOut } from "lucide-react";
import { TransitionLink } from "@/components/shared/transition-link";

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
                <TransitionLink
                  href="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </TransitionLink>
                <TransitionLink
                  href="/dashboard/student"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  My Learning
                </TransitionLink>
                {(userRole === "admin" || userRole === "mentor") && (
                  <TransitionLink
                    href="/dashboard/mentor"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Mentor Portal
                  </TransitionLink>
                )}
                {userRole === "admin" && (
                  <TransitionLink
                    href="/dashboard/admin"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Admin Panel
                  </TransitionLink>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <span className="text-sm text-gray-700">
                  {session.user.name} ({userRole})
                </span>
              </div>
              <SignOutButton
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </SignOutButton>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
