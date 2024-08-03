"use client";
import StockService from '@/services/StockService';
import { Card, BarChart } from '@tremor/react';
import React from 'react';
import { useContext } from 'react';
import { SelectedItemContext } from '@/app/contexts/SelectedItemContext';

export default function SalesBarChart() {

  const [data, setData] = React.useState([]);

  var [selectedItem, setSelectedItem] = useContext(SelectedItemContext);


  
  const chartDate = [
    {"id": 1004004006487390, "date": "2021-06-01", "stock": 150},
    {"id": 1004004006487390, "date": "2021-06-02", "stock": 147},
    {"id": 1004004006487390, "date": "2021-06-03", "stock": 145},
    {"id": 1004004006487390, "date": "2021-06-04", "stock": 141},
    {"id": 1004004006487390, "date": "2021-06-05", "stock": 138},
    {"id": 1004004006487390, "date": "2021-06-06", "stock": 135},
    {"id": 1004004006487390, "date": "2021-06-07", "stock": 131},
    {"id": 1004004006487390, "date": "2021-06-08", "stock": 128},
    {"id": 1004004006487390, "date": "2021-06-09", "stock": 126},
    {"id": 1004004006487390, "date": "2021-06-10", "stock": 123},
    {"id": 1004004006487390, "date": "2021-06-11", "stock": 120},
    {"id": 1004004006487390, "date": "2021-06-12", "stock": 421}, // Refill
    {"id": 1004004006487390, "date": "2021-06-13", "stock": 418},
    {"id": 1004004006487390, "date": "2021-06-14", "stock": 415},
    {"id": 1004004006487390, "date": "2021-06-15", "stock": 412},
    {"id": 1004004006487390, "date": "2021-06-16", "stock": 409},
    {"id": 1004004006487390, "date": "2021-06-17", "stock": 406},
    {"id": 1004004006487390, "date": "2021-06-18", "stock": 403},
    {"id": 1004004006487390, "date": "2021-06-19", "stock": 400},
    {"id": 1004004006487390, "date": "2021-06-20", "stock": 397},
    {"id": 1004004006487390, "date": "2021-06-21", "stock": 394},
    {"id": 1004004006487390, "date": "2021-06-22", "stock": 391},
    {"id": 1004004006487390, "date": "2021-06-23", "stock": 388},
    {"id": 1004004006487390, "date": "2021-06-24", "stock": 385},
    {"id": 1004004006487390, "date": "2021-06-25", "stock": 382},
    {"id": 1004004006487390, "date": "2021-06-26", "stock": 379},
    {"id": 1004004006487390, "date": "2021-06-27", "stock": 376},
    {"id": 1004004006487390, "date": "2021-06-28", "stock": 373},
    {"id": 1004004006487390, "date": "2021-06-29", "stock": 370},
    {"id": 1004004006487390, "date": "2021-06-30", "stock": 367}
  ]

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