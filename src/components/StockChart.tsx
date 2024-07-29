"use client";
import StockService from '@/services/StockService';
import { AreaChart } from '@tremor/react';
import { Badge } from '@/components/Badge';
import React, { useEffect, useState } from 'react';
import { StockDatum } from '@/data/schema';
import { useContext } from 'react';
import { SelectedItemContext } from '@/app/contexts/SelectedItemContext';
import { cx, formatters, percentageFormatter } from '@/lib/utils';
import { PeriodValue } from "@/app/(main)/overview/page"
import { DateRange } from "react-day-picker"
import { interval, eachDayOfInterval, formatDate, isWithinInterval } from 'date-fns';
import { getPeriod } from './ui/overview/DashboardFilterbar';


export type CardProps = {
  title: string
  id: number
  selectedDates: DateRange | undefined
  selectedPeriod: PeriodValue
}

export const getBadgeType = (value: number) => {
  if (value > 0) {
    return "success"
  } else if (value < 0) {
    if (value < -50) {
      return "warning"
    }
    return "error"
  } else {
    return "neutral"
  }
}

export function StockChart({
  title,
  id,
  selectedDates,
  selectedPeriod,
}: CardProps) {
  const [stockData, setStockData] = useState<StockDatum[]>([]);
  
  useEffect(() => {
    StockService.getStock(id).then((response) => {
        setStockData(response.data);
      });
  }, [id]);

  const formatter = formatters.unit

  const selectedDatesInterval =
    selectedDates?.from && selectedDates?.to
      ? interval(selectedDates.from, selectedDates.to)
      : null
  const allDatesInInterval =
    selectedDates?.from && selectedDates?.to
      ? eachDayOfInterval(interval(selectedDates.from, selectedDates.to))
      : null
  // getPeriod is a function from DashboardFilterbar.tsx that subtracts a year to get a previous year's date range
  const prevDates = getPeriod(selectedDates) 
  const prevDatesInterval =
    prevDates?.from && prevDates?.to
      ? interval(prevDates.from, prevDates.to)
      : null

  const data = stockData
    .filter((datum) => {
      if (selectedDatesInterval) {
        return isWithinInterval(datum.date, selectedDatesInterval)
      }
      return true
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const prevData = stockData
    .filter((datum) => {
      if (prevDatesInterval) {
        return isWithinInterval(datum.date, prevDatesInterval)
      }
      return false
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
  const chartData = allDatesInInterval
    ?.map((date, index) => {
      const stockDatum = data[index]
      const prevDatum = prevData[index]
      const value = stockDatum?.stock || null
      const previousValue = prevDatum?.stock || null

      return {
        title,
        date: date,
        formattedDate: formatDate(date, "dd/MM/yyyy"),
        value,
        previousDate: prevDatum?.date,
        previousFormattedDate: prevDatum
          ? formatDate(prevDatum.date, "dd/MM/yyyy")
          : null,
        previousValue:
          selectedPeriod !== "no-comparison" ? previousValue : null,
        evolution:
          selectedPeriod !== "no-comparison" && value && previousValue
            ? (value - previousValue) / previousValue
            : undefined,
      }
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const categories =
    selectedPeriod === "no-comparison" ? ["value"] : ["value", "previousValue"]
  const value =
    chartData?.reduce((acc, item) => acc + (item.value || 0), 0) || 0
  const previousValue =
    chartData?.reduce((acc, item) => acc + (item.previousValue || 0), 0) || 0
  const evolution =
    selectedPeriod !== "no-comparison"
      ? (value - previousValue) / previousValue
      : 0
      
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
              {console.log(stockData)}{console.log(data)}{console.log(chartData)}
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
            up from {formatter(previousValue)}
          </dd>
        )}
      </div>
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{chartData[chartData.length -1]?.stock}</p>
      <AreaChart
        className="mt-6 h-32"
        noDataText='Select a product to view stock data'
        data={chartData || []}
        index="formattedDate"
        yAxisWidth={65}
        categories={categories}
        colors={['tremor.bol', 'tremor.amazon']}
        // startEndOnly={true}
        minValue={0}
        showYAxis={false}
        showLegend={false}
        showTooltip={true}
        autoMinValue
        // maxValue={500}
      />
    </div>
  );
}