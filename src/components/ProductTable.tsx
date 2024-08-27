import { Fragment, useState } from 'react';
import { RiFlag2Line } from '@remixicon/react';
import { useAppData } from "@/app/contexts/StockDataContext"
import {
  Badge,
  Accordion,  
  AccordionHeader, 
  AccordionBody,
  AccordionList,
  SparkAreaChart
} from '@tremor/react';
import { DateRange } from "react-day-picker";
import { StockChartOld } from './StockChartOld';
import { getFilteredStockData } from '@/data/StockProcessor';
import { StockDatum } from '@/data/schema';

export type ProductTableProps = {
    selectedDates: DateRange | undefined;
    };

export function ProductTable({
    selectedDates
}: ProductTableProps) {
    const { products } = useAppData();
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const { stockData } = useAppData(); // Access stockData from the context


    const toggleItem = (id: string) => {
      setOpenItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    return (
          <AccordionList>
            <Accordion key="header">
                <AccordionHeader key="header" className="bg-gray-100">
                    <div className="flex justify-between w-full">
                        <span className="w-1/6 text-left">Product</span>
                        <span className="w-1/6 text-center">Sales</span>
                        <span className="w-1/3 text-center">Revenue</span>
                        <span className="w-1/6 text-center">Rating</span>
                        <span className="w-1/6 text-right">Type</span>
                    </div>
                </AccordionHeader>
            </Accordion>
            <Fragment>
                {products.map((item) => {
                const isOpen = openItems[item.id];
                const data: StockDatum[] = getFilteredStockData(selectedDates, item.id, stockData);
                const sales = data.reduce((acc, datum) => acc + datum.stock, 0);
                const price = data[data.length - 1] ? data[data.length - 1].price : 0;
                const rating = data[data.length - 1] ? data[data.length - 1].ratingStars : 0;
                const reviews = data[data.length - 1] ? data[data.length - 1].ratingCount : 0;
        
                return (
                    <Accordion
                    key={item.id}
                    className="rounded-sm"
                    >
                    <AccordionHeader
                        className={`hover:bg-gray-100 ${
                        isOpen ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => toggleItem(item.id)}
                    >
                        <div className="flex justify-between w-full">
                            <span className="w-1/6 text-left">{item.name}</span>
                            <span className="w-1/6 flex">
                                <SparkAreaChart         
                                    data={data || []}
                                    index="formattedDate"
                                    categories={['stock']}
                                    colors={["#694873"]}
                                    className='w-20 h-8 ml-10 mr-8'
                                        />
                                        {sales}
                                </span>
                                <span className="w-1/3 text-center">{'€' + (price * sales).toFixed(2)}</span>
                                <span className="w-1/6 text-center">{rating.toFixed(1)}</span>
                                <span className="w-1/6 text-right">
                            <Badge color="emerald" icon={RiFlag2Line}>
                            Product
                            </Badge>
                        </span>
                        </div>  
                    </AccordionHeader>
                        <AccordionBody className="bg-gray-50">
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