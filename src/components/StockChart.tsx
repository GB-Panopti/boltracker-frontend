"use client";
// import { Badge } from "@/components/Badge";
// import React from "react";
import { useAppData } from "@/app/contexts/AppProvider";
// import { percentageFormatter  } from "@/lib/utils";
import { PeriodValue } from "@/app/(main)/page";
import { DateRange } from "react-day-picker";
import { format, isWithinInterval } from "date-fns";

export type CardProps = {
  title: string;
  id: string;
  selectedDates: DateRange | undefined;
  selectedPeriod: PeriodValue;
  granularity: "hour" | "day" | "minute"; // Add granularity parameter
};

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export type daataa = {
  date: Date;
  stock: number;
  price: number;
};

const data2: daataa[] = [
  { date: new Date("2024-08-01"), stock: 10, price: 100 },
  { date: new Date("2024-08-02"), stock: 20, price: 200 },
  { date: new Date("2024-08-03"), stock: 15, price: 150 },
];

function StockChart({ id, selectedDates }: CardProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const { stockData } = useAppData(); // Access stockData from the context

  const selectedDatesInterval =
    selectedDates?.from && selectedDates?.to
      ? { start: selectedDates.from, end: selectedDates.to }
      : null;

  const data = stockData[id as keyof typeof stockData];

  const filteredStockData =
    selectedDatesInterval && Array.isArray(data)
      ? data.filter((datum) =>
        isWithinInterval(new Date(datum.date), selectedDatesInterval),
      )
      : [];

  const chartData: daataa[] = (filteredStockData as daataa[]).map((datum) => ({
    date: new Date(datum.date),
    stock: datum.stock,
    price: datum.price,
    formattedDate: format(new Date(datum.date), "yyyy-MM-dd"),
  }));

  useEffect(() => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg =
      svgRef.current &&
      d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .style("overflow", "visible");

    const x = d3
      .scaleUtc()
      .domain([
        selectedDates?.from ?? new Date(),
        selectedDates?.to ?? new Date(),
      ])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, 500])
      .range([height - margin.bottom, margin.top]);

    if (svg) {
      svg.selectAll(".x-axis").remove();
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0),
        );

      svg.selectAll(".y-axis").remove();
      svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(height / 40));

      const line = d3
        .line<daataa>()
        .x((d) => x(d.date))
        .y((d) => y(d.stock));

      svg.selectAll(".line").remove();
      svg
        .append("path")
        .datum(chartData)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    }
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default StockChart;
