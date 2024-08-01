"use client";
import { AreaChart } from '@tremor/react';
import { Badge } from '@/components/Badge';
import React from 'react';
import { useStockData } from '@/app/contexts/StockDataContext';
import { cx, formatters, percentageFormatter } from '@/lib/utils';
import { PeriodValue } from "@/app/(main)/overview/page";
import { DateRange } from "react-day-picker";
import { eachHourOfInterval, eachDayOfInterval, eachMinuteOfInterval, format, isWithinInterval, add, Interval } from 'date-fns';

export type CardProps = {
  title: string;
  id: number;
  selectedDates: DateRange | undefined;
  selectedPeriod: PeriodValue;
  granularity: 'hour' | 'day' | 'minute'; // Add granularity parameter
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

const getEachIntervalOfSelectedDates = (selectedDatesInterval: Interval, granularity: string) => {
  switch (granularity) {
    case 'hour':
      return eachHourOfInterval(selectedDatesInterval);
    case 'minute':
      return eachMinuteOfInterval(selectedDatesInterval);
    case 'day':
    default:
      return eachDayOfInterval(selectedDatesInterval);
  }
};

export function StockChart({
  title,
  id,
  selectedDates,
  selectedPeriod,
  granularity = 'hour',
}: CardProps) {

  const { stockData } = useStockData(); // Access stockData from the context
  

  const formatter = formatters.unit;

  const selectedDatesInterval =
    selectedDates?.from && selectedDates?.to
      ? { start: selectedDates.from, end: selectedDates.to }
      : null;

  const filteredStockData = selectedDatesInterval
    ? stockData.filter((datum) =>
        isWithinInterval(new Date(datum.date), selectedDatesInterval)
      ).filter((datum) => datum.id === id)
    : stockData;

  const chartData = filteredStockData.map((datum) => ({
    date: new Date(datum.date),
    stock: datum.stock,
    formattedDate: format(new Date(datum.date), 'yyyy-MM-dd HH:mm'),
  }));

  const categories =
    selectedPeriod === "no-comparison" ? ["stock"] : ["stock", "previousStock"];
  
  const value = chartData.length > 0 ? (chartData[chartData.length - 1].stock || 0) : 0;
  const previousValue = chartData.length > 0 ? (chartData[0].stock || 0) : 0;

  const evolution =
    selectedPeriod !== "no-comparison" && previousValue !== 0
      ? (value - previousValue) / previousValue
      : 0;

  return (
    <div className={cx("transition")}>
      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <dt className="font-bold text-gray-900 sm:text-sm dark:text-gray-50">
            {title}
          </dt>
          {selectedPeriod !== "no-comparison" && (
            <Badge variant={getBadgeType(evolution)}>
              {percentageFormatter(evolution)}
            </Badge>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <dd className="text-xl text-gray-900 dark:text-gray-50">
          {formatter(value)}
        </dd>
        {selectedPeriod !== "no-comparison" && (
          <dd className="text-sm text-gray-500">
            {value > previousValue ? 'up' : 'down'} from {formatter(previousValue)}
          </dd>
        )}
      </div>
      <AreaChart
        className="mt-6 h-32"
        noDataText="No data, is product still for sale?"
        data={chartData || []}
        index="formattedDate"
        yAxisWidth={65}
        categories={categories}
        colors={['blue', 'yellow']}
        startEndOnly={true}
        minValue={0}
        showYAxis={true}
        showLegend={false}
        showTooltip={true}
        autoMinValue
        maxValue={500}
      >
        {/*figure out how to add scatter points and stuff by checking the rechart docs*/}
      </AreaChart>
    </div>
  );
}
