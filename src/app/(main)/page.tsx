"use client";
import { Filterbar } from "@/components/ui/overview/DashboardFilterbar";
import { cx } from "@/lib/utils";
import { subDays } from "date-fns";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { ProductTable } from "@/components/ProductTable";
import { useAppData } from "../contexts/AppProvider";
import stockServiceInstance from "@/services/StockService";
import { ProductTableMobile } from "@/components/ProductTableMobile";
import { useTranslation } from "react-i18next";

export type PeriodValue = "previous-period" | "last-year" | "no-comparison";

export type KpiEntry = {
  title: string;
  percentage: number;
  current: number;
  allowed: number;
  unit?: string;
};

// const data: KpiEntry[] = [
//   {
//     title: "Rows read",
//     percentage: 48.1,
//     current: 48.1,
//     allowed: 100,
//     unit: "M",
//   },
//   {
//     title: "Rows written",
//     percentage: 78.3,
//     current: 78.3,
//     allowed: 100,
//     unit: "M",
//   },
//   {
//     title: "Storage",
//     percentage: 26,
//     current: 5.2,
//     allowed: 20,
//     unit: "GB",
//   },
// ]

// const data2: KpiEntry[] = [
//   {
//     title: "Weekly active users",
//     percentage: 21.7,
//     current: 21.7,
//     allowed: 100,
//     unit: "%",
//   },
//   {
//     title: "Total users",
//     percentage: 70,
//     current: 28,
//     allowed: 40,
//   },
//   {
//     title: "Uptime",
//     percentage: 98.3,
//     current: 98.3,
//     allowed: 100,
//     unit: "%",
//   },
// ]

export type KpiEntryExtended = Omit<
  KpiEntry,
  "current" | "allowed" | "unit"
> & {
  value: string;
  color: string;
};

// const data3: KpiEntryExtended[] = [
//   {
//     title: "Base tier",
//     percentage: 68.1,
//     value: "$200",
//     color: "bg-gb-secondary-600 dark:bg-gb-secondary-500",
//   },
//   {
//     title: "On-demand charges",
//     percentage: 20.8,
//     value: "$61.1",
//     color: "bg-purple-600 dark:bg-gb-secondary-500",
//   },
//   {
//     title: "Caching",
//     percentage: 11.1,
//     value: "$31.9",
//     color: "bg-gray-400 dark:bg-gray-600",
//   },
// ]

// const { stockData } = useAppData();
// // Convert dates to timestamps to find the max date
// const stockDates = stockData.map((datum) => new Date(datum.date).getTime());
// const maxDate = stockDates.length ? new Date(Math.max(...stockDates)) : new Date();

const maxDate = new Date();

export default function Overview() {
  const [selectedDates, setSelectedDates] = React.useState<
    DateRange | undefined
  >({
    from: subDays(maxDate, 30),
    to: maxDate,
  });

  // get the raw stock data from the context
  const { setRawStockData } = useAppData();
  const { t } = useTranslation();

  useEffect(() => {
    stockServiceInstance
      .getAllUserStockDateRange(selectedDates?.from, selectedDates?.to)
      .then((response) => {
        setRawStockData(response.data);
      });
  }, [selectedDates]);

  return (
    <>
      <section aria-labelledby="usage-overview">
        <h1
          id="usage-overview"
          className="scroll-mt-8 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50"
        >
          {t("overview.title")}
        </h1>
        <div className="sticky top-16 z-20 flex items-center justify-between border-b border-gray-200 bg-white pb-4 pt-4 sm:pt-6 lg:top-0 lg:mx-0 lg:px-0 lg:pt-8 dark:border-gray-800 dark:bg-gray-950">
          <Filterbar
            maxDate={maxDate}
            minDate={new Date(2022, 0, 1)}
            selectedDates={selectedDates}
            onDatesChange={(dates) => setSelectedDates(dates)}
          />
        </div>
        <dl className={cx("mt-10 grid grid-cols-1 gap-14")}>
          <div className="md:hidden">
            <ProductTableMobile selectedDates={selectedDates} />
          </div>
          {/*Product table should disappear when md  */}
          <div className="hidden md:block">
            <ProductTable selectedDates={selectedDates} />
          </div>
        </dl>
      </section>
    </>
  );
}
