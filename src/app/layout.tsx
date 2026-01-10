import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLoader } from "@/components/shared/global-loader";
import { LoaderProvider } from "@/components/shared/loader-context";
import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
        className={`${jetbrainsMono.variable} antialiased bg-background text-foreground font-mono`}
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
