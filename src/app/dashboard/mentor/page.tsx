import { requireMentor } from "@/lib/auth/role-guard";

export default async function MentorPage() {
  await requireMentor();

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mentor Portal</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your courses and students
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              My Courses
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Courses you are teaching
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-8 text-center text-gray-500">
            No courses yet. Create your first course to get started.
          </div>
        </div>
      </div>
    </div>
  );
}
