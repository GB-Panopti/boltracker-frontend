"use client";
import StockService from '@/services/StockService';
import {Card,AreaChart} from '@tremor/react';
import React from 'react';
import { useContext } from 'react';
import { SelectedItemContext } from '@/app/contexts/SelectedItemContext';

export default function StockChart() {

  const [data, setData] = React.useState([]);

  var [selectedItem, setSelectedItem] = useContext(SelectedItemContext);
  

  React.useEffect(() => {
      StockService.getStock(selectedItem.id).then((response) => {
        setData(response.data);
      });
  }, [selectedItem]);

  return (
    <Card className="h-full w-full mx-auto">
      <h2 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{selectedItem.name}</h2>
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{data[data.length -1]?.stock}</p>
      <AreaChart
        className="h-[90%] px-8"
        noDataText='Select a product to view stock data'
        data={data}
        index="date"
        yAxisWidth={65}
        categories={['stock']}
        colors={['indigo', 'cyan']}
        minValue={0}
        showAnimation={true}
        maxValue={500}
      />
    </Card>
  );
}