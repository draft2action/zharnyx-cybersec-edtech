import { requireStudent } from "@/lib/auth/role-guard";

export default async function StudentPage() {
  await requireStudent();

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View your courses and progress
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Enrolled Courses */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                My Courses
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Courses you are enrolled in
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-8 text-center text-gray-500">
              No courses enrolled yet. Browse courses to get started.
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Pending Assignments
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Assignments due soon
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-8 text-center text-gray-500">
              No pending assignments.
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Learning Progress
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your overall progress across all courses
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-8 text-center text-gray-500">
            Start learning to track your progress.
          </div>
        </div>
      </div>
    </div>
  );
}
