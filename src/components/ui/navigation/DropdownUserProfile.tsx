"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/components/Dropdown"
import loginServiceInstance from "@/services/LoginService"
import {
  RiArrowRightUpLine,
  RiComputerLine,
  RiLogoutBoxLine,
  RiMoonLine,
  RiPaintBrushLine,
  RiQuestionLine,
  RiSettings2Line,
  RiSunLine,
} from "@remixicon/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import * as React from "react"
import ModalEditPassword from "./ModalEditPassword"


export type DropdownUserProfileProps = {
  children: React.ReactNode
  align?: "center" | "start" | "end"
}

export function DropdownUserProfile({
  children,
  align = "start",
}: DropdownUserProfileProps) {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuLabel>Your Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>
                <RiPaintBrushLine
                  className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                  aria-hidden="true"/>
                Theme
                </DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value) => {
                    setTheme(value)
                  }}
                >
                  <DropdownMenuRadioItem
                    aria-label="Switch to Light Mode"
                    value="light"
                    iconType="check"
                  >
                    <RiSunLine className="size-4 shrink-0" aria-hidden="true" />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    aria-label="Switch to Dark Mode"
                    value="dark"
                    iconType="check"
                  >
                    <RiMoonLine
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    aria-label="Switch to System Mode"
                    value="system"
                    iconType="check"
                  >
                    <RiComputerLine
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
            
            <DropdownMenuItem>
              <RiSettings2Line
                className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                aria-hidden="true"/>
                <p style={{ textDecoration: 'line-through' }}>Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
                e.preventDefault(); // Prevent default action to keep dropdown open
                setHasOpenDialog(true);
              }}>
              <RiSettings2Line
                className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                aria-hidden="true"/>
                <ModalEditPassword
                  onSelect={() => {
                    setHasOpenDialog(false); // Close the modal after action
                  }}
                />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="mailto:info@panopti.nl">
              <DropdownMenuItem>
                <RiQuestionLine
                    className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                    aria-hidden="true"
                  />
                Get help
                <RiArrowRightUpLine
                  className="mb-1 ml-1 size-2.5 shrink-0 text-gray-500"
                  aria-hidden="true"
                />
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
                <DropdownMenuItem onClick={async () => {
                    // Delete the session cookie
                    const response = await loginServiceInstance.logout()
                    // document.cookie = 'session_cookie=; Max-Age=0; path=/; domain=yourdomain.com; secure; SameSite=Lax';
                    if (response.status === 200) {
                      window.location.href = '/login';
                    } else {
                      console.log("Something went wrong with login out!")
                    }
                    
                    // Redirect to the login page
                }}>
                    <RiLogoutBoxLine
                        className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                        aria-hidden="true"
                    />
                    Sign out
                </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
