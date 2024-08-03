"use client";
import ProductService from '@/services/ProductService';
import { Card, SparkAreaChart } from '@tremor/react';
import { Button } from '@tremor/react';
import React, { useContext, useState, useEffect } from 'react';
import { SelectedItemContext } from '../app/contexts/SelectedItemContext';

const Sidebar = () => {

    return (
            <Card className='custom-card p-0 pt-3 '>
                        <Button className="rounded-lg w-full py-5 border-gb-background-suble text-gb-brand-subtle bg-gb-brand-inverted">
                            Dashboard
                        </Button>
                        <Button className="rounded-lg w-full py-5 border-gb-background-suble text-gb-brand-subtle bg-gb-brand-inverted">
                            Add Products
                        </Button>
                        <Button className="rounded-lg w-full py-5 border-gb-background-suble text-gb-brand-subtle bg-gb-brand-inverted">
                            Settings
                        </Button>
                        <Button className="rounded-lg w-full py-5 border-gb-background-suble text-gb-brand-subtle bg-gb-brand-inverted">
                            {/* TODO create dialog to ask confirmation https://www.tremor.so/docs/ui/dialog*/}
                            
                            Logout
                        </Button>
            </Card>
    );
};

export default Sidebar;