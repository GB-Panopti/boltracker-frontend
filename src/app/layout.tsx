import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import { Sidebar } from "@/components/ui/navigation/sidebar";
import { AppProvider } from "./contexts/StockDataContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-y-scroll scroll-auto antialiased selection:bg-gb-secondary-100 selection:text-gb-secondary-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="mx-auto">
          <ThemeProvider defaultTheme="system" attribute="class">
            <AppProvider>
              <Sidebar />
              <main className="lg:pl-72">{children}</main>
            </AppProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}