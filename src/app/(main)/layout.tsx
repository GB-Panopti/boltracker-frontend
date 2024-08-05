"use client";

import { useAuthRedirect } from "./useAuthRedirect";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  const blur = useAuthRedirect();
  
  return (
    <div className={"relative " + blur}>
      <main className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
        {children}
      </main>
    </div>
  )
}
