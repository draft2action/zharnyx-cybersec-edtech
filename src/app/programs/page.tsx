import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from "motion/react"; // Can't use motion directly in server component if we want animation? 
// Wait, motion components need "use client".
// If I make the page async, I can't use motion directly in the default export if it's a server component?
// Next.js App Router allows server components.
// But `motion.div` is a client component.
// So I should split the page: `ProgramsPage` (Server) -> `ProgramsContent` (Client).
// Or just keep it client and use a server action or API?
// Better: Server Component fetches data -> Passes to Client Component.
// Current file is "use client" at top.
// I should remove "use client", make it async, and move the UI to a new component.
// OR, I can fetch data in a server component wrapper.

import { db } from "@/lib/db";
import { course } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ProgramsList } from "../../components/programs/programs-list";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const courses = await db.query.course.findMany({
    where: eq(course.status, "published"),
    with: {
      months: {
        with: {
          weeks: true
        }
      },
    },
  });

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4 md:px-8 container mx-auto max-w-[95%]">
        <ProgramsList courses={courses} />
      </main>
      <Footer />
    </>
  );
}
