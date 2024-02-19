"use client";
import ProductService from '@/services/ProductService';
import { Card } from '@tremor/react';
import { Button } from '@tremor/react';
import React, { useContext, useState, useEffect } from 'react';
import { SelectedItemContext } from '../app/contexts/SelectedItemContext';

const Sidebar = () => {
    const [items, setItems] = useState([]);

    const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);

    useEffect(() => {
        ProductService.getProducts().then((response) => {
            setItems(response.data);
        }).catch(function (error) {
            // TODO fix error handling
        });
    }, []);

    function handleItemClick(item) {
      setSelectedItem(selectedItem => ({...selectedItem, id: item.id, name: item.name}));
    }

    return (
            <Card className='h-full rounded-none w-full p-0 border-tremor-background-suble'>
                {items.map((item) => 
                    <Button key={item.id} onClick={() => handleItemClick(item)} 
                    className="w-full py-5 border-tremor-background-suble text-tremor-brand-subtle bg-tremor-brand-inverted">{item.name}</Button>
                    )
                }
            </Card>
    );
};

export default Sidebar;