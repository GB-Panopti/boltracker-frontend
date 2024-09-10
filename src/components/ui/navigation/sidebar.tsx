"use client"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiHome2Line,
  RiRadarLine,
  RiBox1Line,
} from "@remixicon/react"
import Link from "next/link"
import MobileSidebar from "./MobileSidebar"
import {
  WorkspacesDropdownDesktop,
  WorkspacesDropdownMobile,
} from "./SidebarWorkspacesDropdown"
import { UserProfileDesktop, UserProfileMobile } from "./UserProfile"
import ProductSelector from "@/ui/productSelector"
import React from "react"
import { ModalAddProduct } from "./ModalAddProduct"
import { Card } from "@tremor/react"
import { useAppData } from "@/app/contexts/StockDataContext"
import { useTranslation } from "react-i18next"


export function Sidebar() {
  const [, setHasOpenDialog] = React.useState(false)
  const { user } = useAppData()
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)
  const { t } = useTranslation()

  const handleTrackProductSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleTrackProductDialogOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
  }

  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-gb-primary p-4  dark:border-gray-800 dark:bg-gb-primary-800">
          <WorkspacesDropdownDesktop />
          {
            (() => {
              if (user && user.subscription === 0) {
                return (
                  <Card className="p-4 bg-gb-accent-500 dark:bg-gray-950 rounded-md border-gb-primary-400 border-4 ring-0">
                    <h2 className="text-lg font-bold text-white dark:text-gray-50">DEMO MODE</h2>
                    <p className="text-sm text-gray-100 dark:text-gray-400"><i>Feel free to look around!</i></p>
                    <p className="text-xs text-gray-100 dark:text-gray-400">Subscribe to make changes and start tracking your own products.</p>
                  </Card>
                );
              }
            })()
          }
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5 ">
              <li key="Overview">
                <Link
                  href={siteConfig.baseLinks.overview}
                  className={cx(
                    "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-md font-medium transition hover:bg-gray-200 hover:dark:bg-gray-900 text-gb-primarylite-50 hover:text-gray-900 dark:text-gb-primarylite-300 hover:dark:text-gray-50",
                    // below commented out cuz it's nice if you have multiple nav options but with only Overview it just looks goofy bro
                    // isActive(siteConfig.baseLinks.overview) ? "text-gb-secondary-600 dark:text-gb-secondary-400" : "", 
                    focusRing,
                  )}
                >
                  <RiHome2Line className="size-5 shrink-0" aria-hidden="true" />
                  <span>{t('sidebar.overview')}</span>
                </Link>
              </li>
              
              <li key="Track product">
                  <Link
                    id="button-add-product"
                    href="#"
                    className={cx(
                      "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-md font-medium transition hover:dark:bg-gray-900 bg-gb-primarylite-600 text-gb-primarylite-50 ring-gb-primarylite-600/30 dark:bg-gb-primarylite-400/20 dark:text-gb-primarylite-400 dark:ring-gb-primarylite-400/20 hover:bg-gb-secondary-400 ",
                      // isActive(siteConfig.baseLinks.trackNew) ? "text-gb-secondary-600 dark:text-gb-secondary-400" : "",
                      
                      focusRing,
                    )}
                  >
                    <RiRadarLine className="size-5 shrink-0" aria-hidden="true" />
                    <ModalAddProduct
                      onSelect={handleTrackProductSelect}
                      onOpenChange={handleTrackProductDialogOpenChange}
                      itemName={t("track_product.title")}
                    />
                  </Link>
                </li>
            </ul>
            <div>
              <div
                    className={cx(
                      "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-md font-medium text-gb-primarylite-50 ring-gb-primarylite-600/30  dark:text-gb-primarylite-300 dark:ring-gb-primarylite-400/20 ",
                      // isActive(siteConfig.baseLinks.trackNew) ? "text-gb-secondary-600 dark:text-gb-secondary-400" : "",
                      focusRing,
                    )}
                  >
                    <RiBox1Line className="size-5 shrink-0" aria-hidden="true" />
                    {t('sidebar.tracked_products')}
                  </div>
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
          {
            (() => {
              if (user && user.subscription === 0) {
                return (
                  <h2 className="text-lg font-bold text-gb-accent dark:text-gray-50">DEMO MODE</h2>
                );
              }
            })()
          }
        <div className="flex items-center gap-1 sm:gap-2">
          <UserProfileMobile />
          <MobileSidebar />
        </div>
      </div>
    </>
  )
}
