"use client"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiHome2Line,
  RiLinkM,
  RiListCheck,
  RiSettings5Line,
  RiFocus3Line,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MobileSidebar from "./MobileSidebar"
import {
  WorkspacesDropdownDesktop,
  WorkspacesDropdownMobile,
} from "./SidebarWorkspacesDropdown"
import { UserProfileDesktop, UserProfileMobile } from "./UserProfile"
import ProductSelector from "@/ui/productSelector"

const navigation = [
  { name: "Overview", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Track product", href: siteConfig.baseLinks.trackNew, icon: RiFocus3Line },
  { name: "Settings", href: siteConfig.baseLinks.settings, icon: RiSettings5Line },
] as const

const shortcuts = [
  {
    name: "Add new user",
    href: "#",
    icon: RiLinkM,
  },
  {
    name: "Workspace usage",
    href: "#",
    icon: RiLinkM,
  },
  {
    name: "Cost spend control",
    href: "#",
    icon: RiLinkM,
  },
  {
    name: "Overview – Rows written",
    href: "#",
    icon: RiLinkM,
  },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings) {
      return pathname.startsWith("/settings")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }
  const isAddProduct = (itemHref: string) => {
    return (itemHref === siteConfig.baseLinks.trackNew)
  }

  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <WorkspacesDropdownDesktop />
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cx(
                      "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                      isActive(item.href) ? "text-indigo-600 dark:text-indigo-400" : "",
                      isAddProduct(item.href) ? "bg-emerald-500 text-emerald-50 ring-emerald-600/30 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20 " : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                        // : ,
                      focusRing,
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <span className="text-xs font-medium leading-6 text-gray-500">
                Products
              </span>
              <ProductSelector />
            </div>
          </nav>
          <div className="mt-auto"> 
            <UserProfileDesktop />
          </div>
        </aside>
      </nav>
      {/* top navbar (xs-lg) */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:hidden dark:border-gray-800 dark:bg-gray-950">
        <WorkspacesDropdownMobile />
        <div className="flex items-center gap-1 sm:gap-2">
          <UserProfileMobile />
          <MobileSidebar />
        </div>
      </div>
    </>
  )
}
