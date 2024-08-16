// Tremor Raw Badge [v0.0.0]

import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx } from "@/lib/utils"

const badgeVariants = tv({
  base: cx(
    "inline-flex items-center gap-x-1 whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-semibold ring-1",
  ),
  variants: {
    variant: {
      default: [
        "bg-gb-secondary-50 text-gb-secondary-800 ring-gb-secondary-500/30",
        "dark:bg-gb-secondary-400/10 dark:text-gb-secondary-400 dark:ring-gb-secondary-400/30",
      ],
      neutral: [
        "bg-gray-50 text-gray-700 ring-gray-500/30",
        "dark:bg-gray-400/10 dark:text-gray-300 dark:ring-gray-400/20",
      ],
      success: [
        "bg-gb-primarylite-50 text-gb-primarylite-800 ring-gb-primarylite-600/30",
        "dark:bg-gb-primarylite-400/10 dark:text-gb-primarylite-400 dark:ring-gb-primarylite-400/20",
      ],
      error: [
        "bg-red-50 text-red-800 ring-red-600/20",
        "dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
      ],
      warning: [
        "bg-yellow-50 text-yellow-800 ring-yellow-600/30",
        "dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cx(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  },
)

Badge.displayName = "Badge"

export { Badge, badgeVariants, type BadgeProps }
