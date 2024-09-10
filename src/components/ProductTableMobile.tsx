import { Fragment, useState } from 'react';
import { useAppData } from "@/app/contexts/StockDataContext"
import {
  Accordion,  
  AccordionHeader, 
  AccordionBody,
  AccordionList,
} from '@tremor/react';
import { getFilteredStockData } from '@/data/StockProcessor';
import { StockDatum } from '@/data/schema';
import { ProductTableProps } from './ProductTable';
import { StockChartOldMobile } from './StockChartOldMobile';
import { useTranslation } from 'react-i18next';

export function ProductTableMobile({
    selectedDates
}: ProductTableProps) {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const { stockData, products } = useAppData(); // Access stockData from the context
    const { t } = useTranslation();


    const toggleItem = (id: string) => {
      setOpenItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    return (
          <AccordionList className='rounded-t-md'>
            <Accordion key="header" className='rounded-t-lg'>
                <AccordionHeader key="header" className="bg-gb-primarylite-500 text-gb-primarylite-50  dark:bg-dark-tremor-background-subtle font-semibold">
                    <div className="flex justify-between w-full">
                        <span className="w-1/6 text-left">{t("overview.product")}</span>
                        <span className="w-1/6 text-center">{t("overview.sales")}</span>
                        <span className="w-1/6 text-right">{t("overview.revenue")}</span>
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
                    className=""
                    >
                    <AccordionHeader
                        className={`hover:bg-gray-100 hover:dark:bg-dark-tremor-background-subtle ${
                        isOpen ? 'bg-gray-50 dark:bg-dark-tremor-background-subtle' : ''
                        }`}
                        onClick={() => toggleItem(item.id)}
                    >
                        <div className="flex justify-between items-center w-full">
                            <span className="w-1/6 text-left">{item.name}</span>
                            <span className="w-1/6 flex text-center ml-auto">
                                {sales}
                            </span>
                            <span className="w-1/3 flex items-center text-center">
                                <div className='w-1/5 mx-auto flex justify-between items-center text-center'>
                                    <span className='mr-auto left'>€</span>
                                    <span>{(price * sales).toFixed(2)}</span>
                                </div>
                            </span>
                        </div>  
                    </AccordionHeader>
                        <AccordionBody className="bg-gray-50 dark:bg-dark-tremor-background">
                        <StockChartOldMobile
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