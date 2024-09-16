"use client";
import { AreaChart } from "@tremor/react";
import React from "react";
import { cx } from "@/lib/utils";
import { StockDatum } from "@/data/schema";
import { InfoCard } from "./InfoCard";
import { useTheme } from "next-themes";
import { Indicator } from "./Indicator";
import { useTranslation } from "react-i18next";

export type CardProps = {
  id: string;
  data: StockDatum[];
  price: number;
  sales: number;
  ratingStars: number;
  ratingCount: number;
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

export function StockChartOldMobile({
  id,
  data,
  price,
  sales,
  ratingStars,
  ratingCount,
}: CardProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // const previousValue = chartData.length > 0 ? chartData[0].stock || 0 : 0;

  // const evolution =
  //   selectedPeriod !== "no-comparison" && previousValue !== 0
  //     ? (value - previousValue) / previousValue
  //     : 0;

  return (
    <div className="w-full">
      <span className="w-full">
        {/* Chart part of the component */}
        <div className={cx("transition")}>
          <AreaChart
            key={id}
            className="h-52"
            noDataText={t("stockchart.no_data")}
            data={data || []}
            index="formattedDate"
            yAxisWidth={45}
            categories={["stock"]}
            colors={theme === "light" ? ["#119da4"] : ["#E5E7EB"]}
            startEndOnly={true}
            showYAxis={true}
            showAnimation={true}
            showLegend={false}
            showTooltip={true}
            yAxisLabel={t("overview.sales")}
          />{" "}
          <br />
          {/*figure out how to add scatter points and stuff by checking the tremor docs*/}
          {/* Data FLEX part of the component */}
        </div>
      </span>
      <div className="flex justify-between">
        <span className={"w-1/2 text-center text-lg"}>
          <InfoCard
            title={t("stockchart.price")}
            value={"€" + price.toString()}
          />
          <InfoCard title={t("overview.sales")} value={sales.toString()} />
          <InfoCard
            title={t("stockchart.total")}
            value={"€" + (sales * price).toFixed(2)}
          />
        </span>
        <span className={"w-1/2 items-center text-center text-lg"}>
          <InfoCard
            title={t("stockchart.reviews")}
            value={ratingCount.toString()}
          />
          <InfoCard
            title={t("stockchart.rating")}
            value={ratingStars.toFixed(2)}
          />
          <InfoCard
            title={t("overview.indicator")}
            value={<Indicator id={id} />}
          />
        </span>
      </div>
    </div>
  );
}
