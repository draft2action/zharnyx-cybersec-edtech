import { requireAuth } from "@/lib/auth/role-guard";
import { RecruiterApplicationForm } from "@/components/apply/recruiter-form";

export default async function RecruiterApplyPage() {
  await requireAuth();

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      {/* Decorative Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Application: <span className="text-blue-500">Recruiter</span>
          </h1>
          <p className="text-zinc-400 font-mono">
            Connect with pre-vetted operational talent.
          </p>
        </div>

        <RecruiterApplicationForm />
      </div>
    </main>
  );
}
