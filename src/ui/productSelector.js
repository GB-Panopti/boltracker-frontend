"use client";
import ProductService from '@/services/ProductService';
import { Card, SparkAreaChart } from '@tremor/react';
import { Button } from '@tremor/react';
import React, { useContext, useState, useEffect } from 'react';
import { SelectedItemContext } from '../app/contexts/SelectedItemContext';
import StockService from '@/services/StockService';

const ProductSelector = () => {
    const [items, setItems] = useState([]);

    const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);

    useEffect(() => {
      console.log('useEffect');
        ProductService.getProducts().then((response) => {
            setItems(response.data);
        }).catch(function (error) {
            // TODO fix error handling
        });    
        
        StockService.getAllUserStocks().then((response) => {
            // Populate map with stock data
            response.data.forEach((stock) => {
              // console.log(stock)
              var date = stock.date;
              var amount = stock.stock;
              // If product id is not in map, add it and initialize the array
              if (!selectedItem.products.has(stock.id)) {
                selectedItem.products.set(stock.id, [{date, amount}]);
                // if the date is not earlier than the last date in the array, add it
              } else if (date > selectedItem.products.get(stock.id)[selectedItem.products.get(stock.id).length - 1].date) {
                selectedItem.products.get(stock.id).push({date, amount});
              }  
            })
        });  
    }, []);

    function handleItemClick(item) {
      setSelectedItem(selectedItem => ({...selectedItem, id: item.id, name: item.name}));
    }

    return (
            <Card className='h-full rounded-xl w-full p-0 pt-3 ring-0'>
                {items.map((item) =>
                        <Button key={item.id} onClick={() => handleItemClick(item)} 
                        className="rounded-lg w-full py-5 border-tremor-background-suble shadow-none text-tremor-brand-subtle bg-tremor-brand-inverted">
                            <div className="flex items-center space-x-3 w-full px-2"> 
                                <span>{item.name}</span>
                                <SparkAreaChart data={selectedItem.products.get(item.id)} categories={['amount']} 
                                index={'date'} colors={['#aa88b5']} className="h-4 w-10 sm:h-4 sm:w-15"/>
                                <span className="rounded bg-tremor-secondary-emphasis px-2 py-1 text-tremor-default font-medium text-white">+1.72%</span>
                            </div>
                        </Button>
                    )
                }
            </Card>
    );
};

export default ProductSelector;