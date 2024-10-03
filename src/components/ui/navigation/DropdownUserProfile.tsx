"use client";
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
} from "@/components/Dropdown";
import loginServiceInstance from "@/services/LoginService";
import {
  RiComputerLine,
  RiGlobalLine,
  RiLogoutBoxLine,
  RiMoonLine,
  RiPaintBrushLine,
  RiSettings2Line,
  RiSpeakLine,
  RiSunLine,
  RiTreasureMapLine,
} from "@remixicon/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";
import i18next from "i18next";
import { TourContext } from "../../../app/(main)/tutorial";

import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/contexts/AppProvider";
import { siteConfig } from "@/app/siteConfig";

export type DropdownUserProfileProps = {
  children: React.ReactNode;
  align?: "center" | "start" | "end";
};

export function DropdownUserProfile({
  children,
  align = "start",
}: DropdownUserProfileProps) {
  const { user } = useAppData();
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { restartTour } = React.useContext(TourContext);
  const { t } = useTranslation();

  const test = () => {
    restartTour();
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>
                <RiPaintBrushLine
                  className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                  aria-hidden="true"
                />
                {t("sidebar.theme")}
              </DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value) => {
                    setTheme(value);
                  }}
                >
                  <DropdownMenuRadioItem
                    aria-label="Switch to Light Mode"
                    value="light"
                    iconType="check"
                  >
                    <RiSunLine className="size-4 shrink-0" aria-hidden="true" />
                    {t("sidebar.light")}
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
                    {t("sidebar.dark")}
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
                    {t("sidebar.system")}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
            <DropdownMenuItem
              onClick={async () => { window.location.href = siteConfig.baseLinks.settings; }}
            >
              <RiSettings2Line className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800" aria-hidden="true" />
              {t("sidebar.accountsettings")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSubMenu>
              <DropdownMenuSubMenuTrigger>
                <RiGlobalLine
                  className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                  aria-hidden="true"
                />
                {t("sidebar.language")}
              </DropdownMenuSubMenuTrigger>
              <DropdownMenuSubMenuContent>
                <DropdownMenuRadioGroup
                  value={i18next.language}
                  onValueChange={(value) => {
                    i18next.changeLanguage(value);
                  }}
                >
                  <DropdownMenuRadioItem
                    aria-label="Switch to Light Mode"
                    value="en"
                    iconType="check"
                  >
                    English
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    aria-label="Switch to Dark Mode"
                    value="nl"
                    iconType="check"
                  >
                    Nederlands
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubMenuContent>
            </DropdownMenuSubMenu>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <Link href="/feedback">
              <DropdownMenuItem>
                <RiSpeakLine
                  className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                  aria-hidden="true"
                />
                {t("sidebar.feedback")}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={test}>
              <RiTreasureMapLine
                className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                aria-hidden="true"
              />
              Start tour
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={async () => {
                // Delete the session cookie
                const response = await loginServiceInstance.logout();
                if (response.status === 200) {
                  window.location.href = siteConfig.baseLinks.login;
                } else {
                  throw new Error(response.statusText);
                }
              }}
            >
              <RiLogoutBoxLine
                className="mb-1 ml-1 mr-2 size-4 shrink-0 text-gray-800"
                aria-hidden="true"
              />
              {t("sidebar.signout")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
