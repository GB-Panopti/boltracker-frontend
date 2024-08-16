"use client";

import { Sidebar } from "@/components/ui/navigation/sidebar";
import { useAuthRedirect } from "./useAuthRedirect";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  const blur = useAuthRedirect();
  
  return (
    <div>
      <Sidebar />
      <main className="lg:pl-72">
        <div className={"relative " + blur}>
          <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
