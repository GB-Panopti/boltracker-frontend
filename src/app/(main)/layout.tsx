"use client";

import { Sidebar } from "@/components/ui/navigation/sidebar";
import { useAuthRedirect } from "./useAuthRedirect";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "../contexts/StockDataContext";
import * as Sentry from "@sentry/nextjs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  const blur = useAuthRedirect();
  
  return (
    <Sentry.ErrorBoundary fallback={<p>ah noes</p>}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <AppProvider>
          <div className={blur}>
            <Sidebar />
            <main className="lg:pl-72">
              <div className="relative">
                <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </AppProvider>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  )
}
