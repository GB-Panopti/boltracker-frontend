import { DateRange } from "react-day-picker";
import { StockDatum } from "./schema";
import { format, isWithinInterval } from "date-fns";


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


