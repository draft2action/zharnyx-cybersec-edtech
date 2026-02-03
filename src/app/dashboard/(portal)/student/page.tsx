import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { requireStudent } from "@/lib/auth/role-guard";
import { StudentDashboardShell } from "@/components/dashboard/student/student-dashboard-shell";


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StudentPage(props: PageProps) {
  const session = await requireStudent();
  const searchParams = await props.searchParams;
  const section =
    typeof searchParams.section === "string" ? searchParams.section : undefined;
  const courseId =
    typeof searchParams.courseId === "string" ? searchParams.courseId : undefined;

  return (
    <div className="flex min-h-screen w-full bg-black font-sans">
      <div className="relative flex flex-col flex-1 z-10 w-full pl-6 pr-6 pb-6 pt-4">
        {/* Header Section */}
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b-2 border-white/20 pb-4">
          <div className="flex items-start gap-4">
            <SidebarTrigger className="text-white hover:bg-white/10 md:hidden border-2 border-white/20 rounded-none h-10 w-10 shrink-0" />
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2 font-mono"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-black font-mono text-white uppercase tracking-tighter leading-none">
                Student Portal
              </h1>
              <p className="text-gray-400 font-mono mt-1 text-sm uppercase tracking-widest">
                Track your progress and assignments
              </p>
            </div>
          </div>
        </div>

        <StudentDashboardShell
          section={section}
          courseId={courseId}
          studentId={session.user.id}
        />
      </div>
    </div>
  );
}
