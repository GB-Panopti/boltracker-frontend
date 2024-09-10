"use client";

import { Sidebar } from "@/components/ui/navigation/sidebar";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "../contexts/StockDataContext";
import * as Sentry from "@sentry/nextjs";
import { TutorialProvider } from "./tutorial";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
  )
}
