"use client";
import React, { useContext, useState } from 'react';
import { SelectedItemProvider } from './contexts/SelectedItemContext';
import Header from '@/ui/header';
import Sidebar from '@/ui/sidebar';
import ProductSelector from '@/ui/productSelector';
import StockChart from '@/components/StockChart';
import SalesBarChart from '@/components/SalesBarChart';
import ProductService from '@/services/ProductService';
import { useEffect } from 'react';
import { RestockTracker } from '@/components/RestockTracker';
import { ProductInfo } from '@/components/ProductInfo';

export default function Home() {

  var [blur, setBlur] =  useState('blur-xl');

  useEffect(() => {
    ProductService.getProductName(5)
      .then(() => {
        setBlur('blur-none');
      })
      .catch(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <SelectedItemProvider>
      <div className={"h-screen text-center " + blur}>
        <div className='h-[10%]'>
          <Header />
        </div>

        <div className='h-[85%] w-full'>
          <div className='h-full w-[10%] float-left'>
            <Sidebar />
          </div>
          <div className="h-full space-x-5 flex w-[88%] float-left">
            <div className='h-full w-[30%]'>
              <ProductSelector />
            </div> 

            <div className='h-[50%] w-[70%] space-y-5 pt-5'>
              <StockChart />
              <SalesBarChart />
            </div>
          
            <div className='h-[50%] w-[70%] space-y-5 pt-5'>
              <RestockTracker />
              <ProductInfo />
              {/* <StockChart /> */}
            </div>
          </div>
        </div>

        © 2024 Panopti
      </div>
    </SelectedItemProvider>
  );
}
