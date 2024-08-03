"use client"

import { Button } from "@/components/Button"
import { cx, focusRing } from "@/lib/utils"
import { RiHome3Line, RiHomeSmileFill, RiMore2Fill } from "@remixicon/react"

import { DropdownUserProfile } from "./DropdownUserProfile"
import { Icon } from "@tremor/react"

export const UserProfileDesktop = () => {
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="primary"
        className={cx(
          focusRing,
          "group flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-200 hover:bg-gb-secondary-800 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10",
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
            aria-hidden="true"
          >
            <Icon icon={RiHome3Line} />
          </span>
          <span>Your account</span>
        </span>
        <RiMore2Fill
          className="size-4 shrink-0 text-gray-200 group-hover:text-gray-200 group-hover:dark:text-gray-400"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  )
}

export const UserProfileMobile = () => {
  return (
    <DropdownUserProfile align="end">
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex items-center rounded-md p-1 text-sm font-medium text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10",
        )}
      >
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
          aria-hidden="true"
        >
          <Icon icon={RiHomeSmileFill} />
        </span>
      </Button>
    </DropdownUserProfile>
  )
}
