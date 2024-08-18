"use client";
import { AreaChart } from "@tremor/react";
// import { Badge } from "@/components/Badge";
import React from "react";
import { useAppData } from "@/app/contexts/StockDataContext";
import { cx, formatters,  } from "@/lib/utils";
// import { percentageFormatter  } from "@/lib/utils";
import { PeriodValue } from "@/app/(main)/page";
import { DateRange } from "react-day-picker";
import { format, isWithinInterval } from "date-fns";
import { StockDatum } from "@/data/schema";

export type CardProps = {
  title: string;
  id: string;
  selectedDates: DateRange | undefined;
  selectedPeriod: PeriodValue;
  granularity: "hour" | "day" | "minute"; // Add granularity parameter
};

export const getBadgeType = (value: number) => {
  if (value > 0) {
    return "success";
  } else if (value < 0) {
    if (value < -50) {
      return "warning";
    }
    return "error";
  } else {
    return "neutral";
  }
};

export function StockChart({
  title,
  id,
  selectedDates,
  selectedPeriod,
}: CardProps) {
  const { stockData } = useAppData(); // Access stockData from the context
  const formatter = formatters.unit;

  const selectedDatesInterval =
    selectedDates?.from && selectedDates?.to
      ? { start: selectedDates.from, end: selectedDates.to }
      : null;

  const data = stockData[id as keyof typeof stockData];

  const filteredStockData = selectedDatesInterval && Array.isArray(data)
      ? data.filter((datum) => isWithinInterval(new Date(datum.date), selectedDatesInterval))
      : data;


  const chartData = (filteredStockData as StockDatum[]).map((datum) => ({
    date: new Date(datum.date),
    sales: datum.stock,
    formattedDate: format(new Date(datum.date), "yyyy-MM-dd"),
  }));

  const categories =
    selectedPeriod === "no-comparison" ? ["sales"] : ["sales", "previousSales"];

  // const value = chartData.length > 0 ? chartData[chartData.length - 1].stock || 0 : 0;
  // Value is the sum of all stock values in the selected period
  const value = chartData.reduce((acc, curr) => acc + curr.sales, 0);
  
  // const previousValue = chartData.length > 0 ? chartData[0].stock || 0 : 0;

  // const evolution =
  //   selectedPeriod !== "no-comparison" && previousValue !== 0
  //     ? (value - previousValue) / previousValue
  //     : 0;

  return (
    <div className={cx("transition")}>
      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <dt className="font-bold text-gray-900 sm:text-sm dark:text-gray-50">
            {title}
          </dt>
          {/* {selectedPeriod !== "no-comparison" && (
            <Badge variant={getBadgeType(evolution)}>
              {percentageFormatter(evolution)}
            </Badge>
          )} */}
        </div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <dd className="text-xl text-gray-900 dark:text-gray-50">
          {formatter(value)} sales
        </dd>
        {/* {selectedPeriod !== "no-comparison" && (
          <dd className="text-sm text-gray-500">
            {value > previousValue ? "up" : "down"} from{" "}
            {formatter(previousValue)}
          </dd>
        )} */}
      </div>
      <AreaChart
        className="mt-6 h-32"
        noDataText="No data"
        data={chartData || []}
        index="formattedDate"
        yAxisWidth={45}
        categories={categories}
        colors={["#694873"]}
        startEndOnly={true}
        showYAxis={true}
        showAnimation={true}
        showLegend={false}
        showTooltip={true}
        yAxisLabel="Sales"
      >
        {/*figure out how to add scatter points and stuff by checking the tremor docs*/}
      </AreaChart>
    </div>
  );
}
