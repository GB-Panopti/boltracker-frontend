/* eslint-disable @typescript-eslint/no-unused-vars */
import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/Button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/Drawer"
import { cx, focusRing } from "@/lib/utils"
import {
  RiHome2Line,
  RiMenuLine,
  RiRadarLine,
  RiBox1Line,
} from "@remixicon/react"
import Link from "next/link"
import ProductSelector from "@/ui/productSelector"
import React from "react"
import { ModalAddProduct } from "./ModalAddProduct"
import {
  WorkspacesDropdownDesktop,
} from "./SidebarWorkspacesDropdown"
import { useAppData } from "@/app/contexts/StockDataContext"
import { Card } from "@tremor/react"



export default function MobileSidebar() {
  const { user } = useAppData()

  const [, setHasOpenDialog] = React.useState(false)

  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            aria-label="open sidebar"
            id="mobile-sidebar-trigger"
            className="group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10"
          >
            <RiMenuLine
              className="size-6 shrink-0 sm:size-5"
              aria-hidden="true"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg border-gb-primary bg-gb-primary dark:border-gray-800 dark:bg-gb-primary-800">
          <DrawerHeader className="w-full">
            <WorkspacesDropdownDesktop/>
            
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
          </DrawerHeader>
          <DrawerBody>
            <nav
              aria-label="core mobile navigation links"
              className="flex flex-1 flex-col space-y-10"
            >
              <ul role="list" className="space-y-1.5">
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
                    <span>Overview</span>
                  </Link>
                </li>
                
                <li key="Track product">
                    <Link
                      href="#"
                      className={cx(
                        "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-md font-medium transition hover:dark:bg-gray-900 bg-gb-primarylite-600 text-gb-primarylite-50 ring-gb-primarylite-600/30 dark:bg-gb-primarylite-400/20 dark:text-gb-primarylite-400 dark:ring-gb-primarylite-400/20 hover:bg-gb-secondary-400 ",
                        // isActive(siteConfig.baseLinks.trackNew) ? "text-gb-secondary-600 dark:text-gb-secondary-400" : "",
                        
                        focusRing,
                      )}
                    >
                      <RiRadarLine className="size-5 shrink-0" aria-hidden="true" />
                      <ModalAddProduct
                        onSelect={handleDialogItemSelect}
                        onOpenChange={handleDialogItemOpenChange}
                        itemName="Track product"
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
                      Products
                    </div>
                <ProductSelector />
              </div>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
