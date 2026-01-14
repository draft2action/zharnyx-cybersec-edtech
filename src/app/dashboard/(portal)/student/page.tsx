import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireStudent } from "@/lib/auth/role-guard";
import { StudentDashboardShell } from "@/components/dashboard/student/student-dashboard-shell";
import { AnimatedBackground } from "@/components/shared/animated-background";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StudentPage(props: PageProps) {
  const session = await requireStudent();
  const searchParams = await props.searchParams;
  const section =
    typeof searchParams.section === "string" ? searchParams.section : undefined;

  return (
    <>
      <AnimatedBackground />
      <div className="relative flex min-h-screen pointer-events-none">
        <main className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-8">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2 font-mono"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
                Student Portal
              </h1>
              <p className="text-gray-400 font-mono mt-2 text-lg">
                Track your progress and assignments
              </p>
            </div>
          </div>

          <StudentDashboardShell
            section={section}
            studentId={session.user.id}
          />
        </main>
      </div>
    </>
  );
}
