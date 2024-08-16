import { Card, Tracker, CategoryBar, Color } from '@tremor/react';
import React from 'react';
import { useContext } from 'react';
import { SelectedItemContext } from '@/app/contexts/SelectedItemContext';
import StockService from '@/services/StockService';
import { gray, green } from 'tailwindcss/colors';


const data2 = [
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'rose', tooltip: 'Downtime' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
  { color: 'yellow', tooltip: 'Degraded' },
  { color: 'gb-primarylite', tooltip: 'Operational' },
];

export function RestockTracker() {

const [data, setData] = React.useState([]);

var [selectedItem, setSelectedItem] = useContext(SelectedItemContext);

React.useEffect(() => {
  StockService.getStock(selectedItem.id).then((response) => {
    const insertData = []

    for (let i = 0; i < response.data.length - 1; i++) {
      const currentDate = response.data[i];
      const nextDate = response.data[i + 1];

      // Calculate the stock difference
      var stockDifference = currentDate.stock - nextDate.stock;

      var color = 'gray';

      if (stockDifference < 0) {
        color = 'green';
        insertData.push({color: color, tooltip: 'Restocked'})
      } else {
        insertData.push({color: color, tooltip: ''})
      }

    }
    setData(insertData);
  });
}, [selectedItem]);

  return (
    <Card className="custom-card flex flex-col items-center justify-center">
      <p className="text-gb-default flex justify-between w-full">
        <span className="text-gb-content-strong dark:text-dark-gb-content-strong font-medium">example.com</span>
        <span className="text-gb-content dark:text-dark-gb-content">uptime 99.1%</span>
      </p>
      <Tracker data={data} className="mt-2 w-full" />
      <p className="w-full">
        <span className="text-gb-content-strong dark:text-dark-gb-content-strong font-medium">There have been 3 stock refills in the last 3 months.
        </span>
      </p><br />
      <CategoryBar
            className="w-full"
            values={[40, 30, 20, 10]}
            colors={['gb-primarylite', 'yellow', 'orange', 'rose']}
            markerValue={62}
          />
        
    </Card>
  );
}