"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";
import { cx } from "@/lib/utils";
import ReferralsTable from "@/ui/referralsTable";
import { CategoryBarCard } from "@/components/ui/settings/CategoryBarCard";
import { KpiEntryExtended } from "../dashboard/page";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";
import { RiKey2Line, RiMailOpenLine } from "@remixicon/react";
import { useAppData } from "@/app/contexts/AppProvider";
import loginServiceInstance from "@/services/LoginService";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BillingTab from "./billingTab";
export default function SettingsgPage() {
  const { user } = useAppData();
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, onOpenChange] = useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { t } = useTranslation();

  const chartdata = [
    {
      name: "Subscribed",
      amount: 4,
    },
    {
      name: "Newly Subscribed",
      amount: 2,
    },
    {
      name: "Pending",
      amount: 2,
    },
    {
      name: "Canceled",
      amount: 2,
    },
  ];

  const data3: KpiEntryExtended[] = [
    {
      title: "Base fee",
      percentage: 20,
      value: "€4,00",
      color: "bg-gray-700 dark:bg-indigo-500",
    },
    {
      title: "Discountable fee",
      percentage: 35,
      value: "€7,00",
      color: "bg-gb-secondary dark:bg-purple-500",
    },
    {
      title: "Applied discount",
      percentage: 45,
      value: "€9,00",
      color: "bg-gb-primarylite dark:bg-gray-600",
    },
  ];

  async function handleChangeEmail() {
    setError(null);
    if (newEmail === confirmEmail) {
      const response = await loginServiceInstance.changeEmail(newEmail);

      if (response.status === 200) {
        console.log("email changed");
      } else {
        setError("Something went wrong!");
      }
    } else {
      setError("Passwords are not equal!");
    }
  }

  async function handleChangePassword() {
    setError(null);
    if (newPassword === confirmPassword) {
      const response = await loginServiceInstance.changePassword(newPassword);

      if (response.status === 200) {
        console.log("password changed");
      } else {
        setError("Something went wrong!");
      }
    } else {
      setError("Passwords are not equal!");
    }
  }

  return (
    <>
      <section aria-labelledby="usage-overview">
        <h1
          id="usage-overview"
          className="scroll-mt-8 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50"
        >
          {t("settings.title")}
        </h1>
        <dl className={cx("mt-10 grid grid-cols-1 gap-14")}>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab2">
                {t("settings.tab_referrals")}
              </TabsTrigger>
              <TabsTrigger value="tab1">
                {t("settings.tab_account")}
              </TabsTrigger>
              <TabsTrigger value="tab3">
                {t("settings.tab_billing")}
              </TabsTrigger>
            </TabsList>
            <div className="ml-2 mt-4">
              <TabsContent
                value="tab1"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-8">
                  <div className="col-span-8 md:col-span-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      Change email
                    </h2>
                  </div>
                  <div className="space-y-2 col-span-8 md:col-span-2">
                    <Label htmlFor="new-email">Insert Email</Label>
                    <Input
                      placeholder="Enter email"
                      id="new-email"
                      name="new-email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2 col-span-8 md:col-span-2">
                    <Label htmlFor="confirm-email">Confirm Email</Label>
                    <Input
                      placeholder="Enter email"
                      id="confirm-email"
                      name="confirm-email"
                      type="email"
                    />
                  </div>
                  <Button
                    onClick={() => handleChangeEmail()}
                    type="submit"
                    className="w-full sm:w-fit h-fit mt-auto col-span-8 md:col-span-1"
                  >
                    <RiMailOpenLine className="size-5 mr-1" />
                    {t("save")}
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-8">
                  <div className="col-span-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      Change password
                    </h2>
                  </div>
                  <div className="col-span-8 md:col-span-2 space-y-2">
                    <Label htmlFor="new-password">Insert Password</Label>
                    <Input
                      placeholder={t("password.new_password")}
                      id="new-password"
                      name="new-password"
                      type="password"
                    />
                  </div>
                  <div className="col-span-8 md:col-span-2 space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      placeholder={t("password.confirm_password")}
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                    />
                  </div>

                  <Button
                    onClick={() => handleChangePassword()}
                    type="submit"
                    className="col-span-8 md:col-span-1 w-full sm:w-fit h-fit mt-auto"
                  >
                    <RiKey2Line className="size-5 mr-1" />
                    {t("save")}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent
                value="tab2"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-5">
                  <div className="col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      Referrals
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-500">
                      Refer your friends and get discounts on your monthly fee.
                      <br />
                      Every referral who subscribes for 3 months will give you a
                      10% discount on your next billing cycle.
                    </p>
                    <p className="mt-4"></p>
                    <CategoryBarCard
                      title="Monthly fee"
                      change="-45%"
                      value="€11,00"
                      valueDescription="per month"
                      subtitle="Current costs"
                      ctaDescription="Referrals who just reached 3 months will affect your next billing cycle."
                      ctaText=""
                      ctaLink=""
                      data={data3}
                      colors={["gray", "gb-secondary", "gb-primarylite"]}
                      marker={{
                        value: 55,
                        tooltip: "45% discount",
                        showAnimation: false,
                      }}
                    />
                  </div>
                  <div className="col-span-3">
                    <ReferralsTable />
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="tab3"
                id="billing"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <BillingTab/>
              </TabsContent>
            </div>
          </Tabs>
        </dl>
      </section>
    </>
  );
}
