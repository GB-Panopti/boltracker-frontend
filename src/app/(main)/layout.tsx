"use client";

import { Sidebar } from "@/components/ui/navigation/sidebar";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "../contexts/AppProvider";
import * as Sentry from "@sentry/nextjs";
import { TutorialProvider } from "./tutorial";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // Prevent mismatch between SSR and client-side rendering
  }

  return (
    <Sentry.ErrorBoundary fallback={<p>ah noes</p>}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <AppProvider>
          <TutorialProvider>
            <Sidebar />
            <main className="lg:pl-72">
              <div className="relative">
                <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
                  {children}
                </div>
              </div>
            </main>
          </TutorialProvider>
        </AppProvider>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  );
}
