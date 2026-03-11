import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Shield,
  GraduationCap,
  Users,
  Briefcase,
  Terminal,
  User,
  Mail,
  Fingerprint,
} from "lucide-react";
import { HubUserControls } from "@/components/dashboard/hub/user-controls";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth");
  }

  const userRole = session.user.role;
  const userName = session.user.name;
  const userEmail = session.user.email;
  const userId = session.user.id;

  return (
    <div className="flex min-h-screen w-full bg-black font-sans">
      <div className="relative flex flex-col flex-1 z-10 w-full px-3 pb-3 pt-2 md:pl-6 md:pr-6 md:pb-6 md:pt-4">
        {/* Header - Hub Style */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-8 pb-2 md:pb-4 border-b border-[#1a1a1a]">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-bold font-sans text-white uppercase tracking-tighter leading-none">
              Command Center
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-600 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                {userRole} Mode
              </span>
              <span className="text-gray-500 font-sans text-xs uppercase tracking-widest">
                {"// Welcome, "}
                {userName}
              </span>
            </div>
          </div>

          <HubUserControls />
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Navigation Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
            {/* Admin Link - Only for Admin */}
            {userRole === "admin" && (
              <Link href="/dashboard/admin" className="block group">
                <Card className="h-full bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:">
                  <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-5 h-5 text-red-500" />
                      <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                        Admin Console
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                      Complete system control.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6">
                    <p className="text-sm text-gray-400 font-sans">
                      Manage users, courses, mentors, and platform settings.
                    </p>
                    <div className="mt-4 flex items-center text-red-500 font-bold text-xs uppercase tracking-widest">
                      <Terminal className="w-3 h-3 mr-2" /> Access Granted
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Mentor Link - For Admin and Mentor */}
            {(userRole === "admin" || userRole === "mentor") && (
              <Link href="/dashboard/mentor" className="block group">
                <Card className="h-full bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:">
                  <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-5 h-5 text-purple-500" />
                      <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                        Mentor Portal
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                      Student management & grading.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6">
                    <p className="text-sm text-gray-400 font-sans">
                      Track student progress, grade assignments, and clear
                      doubts.
                    </p>
                    <div className="mt-4 flex items-center text-purple-500 font-bold text-xs uppercase tracking-widest">
                      <Terminal className="w-3 h-3 mr-2" /> Access Granted
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Student Link - For Everyone */}
            <Link href="/dashboard/student" className="block group">
              <Card className="h-full bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:">
                <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                      Student Portal
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                    Learning & submissions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  <p className="text-sm text-gray-400 font-sans">
                    Access course materials, submit work, and view progress.
                  </p>
                  <div className="mt-4 flex items-center text-blue-500 font-bold text-xs uppercase tracking-widest">
                    <Terminal className="w-3 h-3 mr-2" /> Access Granted
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Recruiter Link - For Admin and Recruiter */}
            {(userRole === "admin" || userRole === "recruiter") && (
              <Link href="/dashboard/recruiter" className="block group">
                <Card className="h-full bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:">
                  <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-5 h-5 text-yellow-500" />
                      <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                        Recruiter Portal
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                      Talent acquisition.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6">
                    <p className="text-sm text-gray-400 font-sans">
                      Search for candidates and manage job postings.
                    </p>
                    <div className="mt-4 flex items-center text-yellow-500 font-bold text-xs uppercase tracking-widest">
                      <Terminal className="w-3 h-3 mr-2" /> Access Granted
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Partner Agency Link - For Admin and Partner Agency */}
            {(userRole === "admin" || userRole === "partner_agency") && (
              <Link href="/dashboard/partner" className="block group">
                <Card className="h-full bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:">
                  <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-5 h-5 text-green-500" />
                      <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                        Partner Portal
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                      Agency Stats & Revenue.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6">
                    <p className="text-sm text-gray-400 font-sans">
                      Track coupon usage and revenue share.
                    </p>
                    <div className="mt-4 flex items-center text-green-500 font-bold text-xs uppercase tracking-widest">
                      <Terminal className="w-3 h-3 mr-2" /> Access Granted
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>

          {/* User Details Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl">
              <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-5 h-5 text-gray-400" />
                  <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                    Identity
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                  Current Session Details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-6 space-y-4 md:space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-sans uppercase tracking-widest block">
                    Full Name
                  </label>
                  <div className="font-sans text-sm break-all">{userName}</div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-sans uppercase tracking-widest flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <div className="font-sans text-sm break-all text-gray-300">
                    {userEmail}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-sans uppercase tracking-widest flex items-center gap-1">
                    <Fingerprint className="w-3 h-3" /> User ID
                  </label>
                  <div className="font-sans text-xs break-all py-2 px-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-sm text-gray-400">
                    {userId}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-sans text-green-500 uppercase tracking-widest">
                      Session Active
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
