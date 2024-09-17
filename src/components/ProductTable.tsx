import { Fragment, useState } from "react";
import { useAppData } from "@/app/contexts/AppProvider";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionList,
  SparkAreaChart,
} from "@tremor/react";
import { DateRange } from "react-day-picker";
import { StockChartOld } from "./StockChartOld";
import { getFilteredStockData } from "@/data/StockProcessor";
import { SalesDatum } from "@/data/schema";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Indicator } from "./Indicator";

export type ProductTableProps = {
  selectedDates: DateRange | undefined;
};

export function ProductTable({ selectedDates }: ProductTableProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const { stockData, products } = useAppData(); // Access stockData from the context
  const { theme } = useTheme();
  const { t } = useTranslation();

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <AccordionList className="rounded-t-md">
      <Accordion key="header" className="rounded-t-lg">
        <AccordionHeader
          key="header"
          className="bg-gb-primarylite-500 text-gb-primarylite-50  dark:bg-dark-tremor-background-subtle font-semibold"
        >
          <div className="flex justify-between w-full" id="product-table">
            <span className="w-1/6 text-left">{t("overview.product")}</span>
            <span className="w-1/6 text-center">{t("overview.sales")}</span>
            <span id="revenue-table-head" className="w-1/3 text-center">
              {t("overview.revenue")}
            </span>
            <span className="w-1/6 text-center">{t("overview.rating")}</span>
            <span className="w-1/6 text-right">{t("overview.indicator")}</span>
          </div>
        </AccordionHeader>
      </Accordion>
      <Fragment>
        {products.map((item) => {
          const isOpen = openItems[item.id];
          const data: SalesDatum[] = getFilteredStockData(
            selectedDates,
            item.id,
            stockData,
          );
          const sales = data.reduce((acc, datum) => acc + datum.sales, 0);
          const price = data[data.length - 1] ? data[data.length - 1].price : 0;
          const rating = data[data.length - 1]
            ? data[data.length - 1].ratingStars
            : 0;
          const reviews = data[data.length - 1]
            ? data[data.length - 1].ratingCount
            : 0;

          return (
            <Accordion key={item.id} className="product-row rounded-sm">
              <AccordionHeader
                className={`hover:bg-gray-100 hover:dark:bg-dark-tremor-background-subtle ${
                  isOpen
                    ? "bg-gray-50 dark:bg-dark-tremor-background-subtle"
                    : ""
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex justify-between items-center   w-full">
                  <span className="w-1/6 text-left">{item.name}</span>
                  <span className="w-1/6 flex">
                    <SparkAreaChart
                      data={data || []}
                      index="formattedDate"
                      noDataText={t("stockchart.no_data")}
                      categories={["sales"]}
                      colors={theme === "light" ? ["#119da4"] : ["#E5E7EB"]}
                      className="w-20 h-8 ml-10 mr-8"
                    />
                    {sales}
                  </span>
                  <span className="w-1/3 flex items-center text-center">
                    <div className="w-1/5 mx-auto flex justify-between items-center text-center">
                      <span className="mr-auto left">€</span>
                      <span>{(price * sales).toFixed(2)}</span>
                    </div>
                  </span>
                  <span className="w-1/6 text-center">{rating.toFixed(1)}</span>
                  <span className="w-1/6 text-right">
                    <Indicator id={item.id} />
                  </span>
                </div>
              </AccordionHeader>
              <AccordionBody className="bg-gray-50 dark:bg-dark-tremor-background">
                <StockChartOld
                  key={item.name}
                  id={item.id}
                  data={data}
                  price={price}
                  sales={sales}
                  ratingStars={rating}
                  ratingCount={reviews}
                />
              </AccordionBody>
            </Accordion>
          );
        })}
      </Fragment>
    </AccordionList>
  );
}
