import { DateRange } from "react-day-picker";
import { StockDatum } from "./schema";
import { format, isWithinInterval } from "date-fns";
import { Badge } from "@tremor/react";
import { RiErrorWarningLine, RiLoader2Line, RiCheckboxCircleLine, RiAlertLine } from "@remixicon/react";
import { useAppData } from "@/app/contexts/StockDataContext";


export function getFilteredStockData(selectedDates: DateRange | undefined, id: string, stockData: StockDatum[][]): StockDatum[] {
    const selectedDatesInterval =
    selectedDates?.from && selectedDates?.to
        ? { start: selectedDates.from, end: selectedDates.to }
        : null;

    const data = stockData[id as keyof typeof stockData];

    const filteredStockData = selectedDatesInterval && Array.isArray(data)
        ? data.filter((datum) => isWithinInterval(new Date(datum.date), selectedDatesInterval))
        : [];


    const chartData = (filteredStockData as StockDatum[]).map((datum) => ({
    id : datum.id,
    date: new Date(datum.date),
    stock: datum.stock,
    formattedDate: format(new Date(datum.date), "yyyy-MM-dd"),
    price: datum.price,
    ratingStars: datum.ratingStars,
    ratingCount: datum.ratingCount


    }));    

return chartData;

}

export function getLatestPrice(selectedDates: DateRange | undefined, id: string, stockData: StockDatum[][]) { 
    const data = getFilteredStockData(selectedDates, id, stockData);
    return data[data.length - 1].price;

}

export function getTotalSales(selectedDates: DateRange | undefined, id: string, stockData: StockDatum[][]) {
    const data = getFilteredStockData(selectedDates, id, stockData);
    return data.reduce((acc, datum) => acc + datum.stock, 0);
}

export function getIndicator(id: string) {
    const {rawStockData} = useAppData();
    const {products} = useAppData();
    const index = products.findIndex((product) => product.id === id);
    // If the created at date is less than 2 days ago, return a new badge
    if (new Date(products[index].createdAt) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)) {
        return <Badge color="blue" icon={RiLoader2Line}>
                    New
                </Badge>;
    }
    
    const data = rawStockData[id as keyof typeof rawStockData];

    if (!data) {
        return <Badge color="red" icon={RiErrorWarningLine}>
                    Error
                </Badge>;
    }

    if (Array.isArray(data) && data.every((datum) => datum.stock === 500)) {
        return <Badge color="yellow" icon={RiAlertLine}>
                    Uncertain
                </Badge>;
    }

    return  <Badge color="emerald" icon={RiCheckboxCircleLine}>
             Accurate
            </Badge>;

}


