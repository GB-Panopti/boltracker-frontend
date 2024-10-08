import { KpiEntryExtended } from "@/app/(main)/dashboard/page";
import { CategoryBarCard } from "./CategoryBarCard";
import ReferralsTable from "./referralsTable";
import { useTranslation } from "react-i18next";

export default function ReferralsTab() {
  const { t } = useTranslation();

  const data3: KpiEntryExtended[] = [
    {
      title: t("settings.referrals.base_fee"),
      percentage: 20,
      value: "€4,00",
      color: "bg-gray-700 dark:bg-indigo-500",
    },
    {
      title: t("settings.referrals.discountable_fee"),
      percentage: 35,
      value: "€7,00",
      color: "bg-gb-secondary dark:bg-purple-500",
    },
    {
      title: t("settings.referrals.applied_discount"),
      percentage: 45,
      value: "€9,00",
      color: "bg-gb-primarylite dark:bg-gray-600",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-5">
        <div className="col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {t("settings.referrals.header")}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            {t("settings.referrals.description")}
            <br />
            {t("settings.referrals.discount_info")}
          </p>
          <p className="mt-4"></p>
          <CategoryBarCard
            title={t("settings.referrals.monthly_fee")}
            change="-45%"
            value="€11,00"
            valueDescription={t("settings.referrals.per_month")}
            subtitle={t("settings.referrals.current_costs")}
            ctaDescription={t("settings.referrals.cta_description")}
            ctaText=""
            ctaLink=""
            data={data3}
            colors={["gray", "gb-secondary", "gb-primarylite"]}
            marker={{
              value: 55,
              tooltip: t("settings.referrals.marker_tooltip"),
              showAnimation: false,
            }}
          />
        </div>
        <div className="col-span-3">
          <ReferralsTable />
        </div>
      </div>
    </>
  );
}
