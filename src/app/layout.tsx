import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLoader } from "@/components/shared/global-loader";
import { LoaderProvider } from "@/components/shared/loader-context";
import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Zharnyx Academy",
  description: "The Cyber-Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`antialiased bg-background text-foreground font-mono`}
      >
        <LoaderProvider>
          <Suspense fallback={null}>
            <GlobalLoader />
          </Suspense>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="bottom-right" expand={false} />
        </LoaderProvider>
      </body>
    </html>
  );
}
