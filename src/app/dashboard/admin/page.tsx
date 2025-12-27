import Link from "next/link";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { requireAdmin } from "@/lib/auth/role-guard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "@/components/admin/user-management/user-table";
import { MentorApplicationTable } from "@/components/admin/mentor-management/mentor-application-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <>
      <AnimatedBackground />

      <div className="relative flex min-h-screen pointer-events-none">
        <main className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2 font-mono"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 font-mono mt-2 text-lg">
                Manage users, roles, and system settings
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="user-management" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-black/40 border border-white/10 h-14">
              <TabsTrigger
                value="user-management"
                className="font-mono text-base h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
              >
                User Management
              </TabsTrigger>
              <TabsTrigger
                value="mentor-management"
                className="font-mono text-base h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
              >
                Mentor Management
              </TabsTrigger>
              <TabsTrigger
                value="course-management"
                className="font-mono text-base h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
              >
                Course Management
              </TabsTrigger>
              <TabsTrigger
                value="revenue"
                className="font-mono text-base h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
              >
                Revenue
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="user-management">
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">
                      User Management
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Manage users, roles, and permissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserTable />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mentor-management">
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">
                      Mentor Management
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Manage mentor applications and profiles.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MentorApplicationTable />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="course-management">
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">
                      Course Management
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Create, edit, and manage courses.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-md">
                      <p className="text-gray-500 font-mono">
                        Course Management Content Placeholder
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="revenue">
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">Revenue</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      View revenue reports and analytics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-md">
                      <p className="text-gray-500 font-mono">
                        Revenue Content Placeholder
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </>
  );
}
