"use client";
import StockService from '@/services/StockService';
import { Card, BarChart } from '@tremor/react';
import React from 'react';
import { useContext } from 'react';
import { SelectedItemContext } from '@/app/contexts/SelectedItemContext';

export default function SalesBarChart() {

  const [data, setData] = React.useState([]);

  var [selectedItem, setSelectedItem] = useContext(SelectedItemContext);


  
  React.useEffect(() => {
    const chartDate = [];
    // Rest of the code...
  }, [selectedItem]);

  React.useEffect(() => {
      StockService.getStock(selectedItem.id).then((response) => {
            // Create an array to store the transformed data
        const transformedData = [];

        response.data = chartDate;

        // Iterate through the sorted data
        for (let i = 0; i < response.data.length - 1; i++) {
          const currentDate = response.data[i];
          const nextDate = response.data[i + 1];
          
          // Calculate the stock difference
          var stockDifference = currentDate.stock - nextDate.stock;

          if (stockDifference < 0) stockDifference = 0;

          // Push the transformed data to the array
          transformedData.push({
            id: currentDate.id,
            date: currentDate.date,
            stock: stockDifference
          });
        }

        // Set the transformed data to the state
        setData(transformedData);

        
      });
  }, [selectedItem]);

  return (
    <Card className="custom-card">
      <h2 className="text-gb-default text-gb-content dark:text-dark-gb-content">{selectedItem.name}</h2>
      <p className="text-gb-metric text-gb-content-strong dark:text-dark-gb-content-strong font-semibold">{data[data.length -1]?.stock}</p>
      <BarChart
        className="h-[90%] px-8"
        noDataText='Select a product to view stock data'
        data={data}
        index="date"
        yAxisWidth={65}
        categories={['stock']}
        colors={['#aa88b5']}
        minValue={0}
        showAnimation={true}
      />
    </Card>
  );
}