import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLoader } from "@/components/shared/global-loader";
import { LoaderProvider } from "@/components/shared/loader-context";
import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { db } from "@/lib/db";
import { course } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Zharnyx Academy",
  description: "The Cyber-Agency",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const courses = await db.query.course.findMany({
    where: eq(course.status, "published"),
    columns: {
      id: true,
      title: true,
    },
  });

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`antialiased bg-background text-foreground font-mono`}
      >
        <LoaderProvider>
          <Suspense fallback={null}>
            <GlobalLoader />
          </Suspense>
          <Navbar courses={courses} />
          {children}
          <Footer />
          <Toaster position="bottom-right" expand={false} />
        </LoaderProvider>
      </body>
    </html>
  );
}
