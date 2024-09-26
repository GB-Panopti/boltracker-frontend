"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";
import { cx } from "@/lib/utils";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BillingTab from "../../../components/ui/settings/billingTab";
import AccountTab from "@/components/ui/settings/accountTab";
import ReferralsTab from "@/components/ui/settings/referralsTab";

export default function SettingsgPage() {
  const { t } = useTranslation();

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
              <TabsTrigger value="tab1">
                {t("settings.tab_account")}
              </TabsTrigger>
              <TabsTrigger value="tab2">
                {t("settings.tab_referrals")}
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
                <AccountTab />
              </TabsContent>
              <TabsContent
                value="tab2"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <ReferralsTab />
              </TabsContent>
              <TabsContent
                value="tab3"
                id="billing"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <BillingTab />
              </TabsContent>
            </div>
          </Tabs>
        </dl>
      </section>
    </>
  );
}
