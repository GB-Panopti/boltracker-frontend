"use client";
import React, { useState } from 'react';
import { SelectedItemProvider } from './contexts/SelectedItemContext';
import Header from '@/ui/header';
import Sidebar from '@/ui/sidebar';
import StockChart from '@/components/StockChart';
import ProductService from '@/services/ProductService';
import { useRouter } from 'next/router';

export default function Home() {

  var [blur, setBlur] =  useState('blur-xl');

  ProductService.getProductName(5).then(response => {
    setBlur('blur-none');
  }).catch(function (error) {
    console.log(error);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  });

  return (
    <SelectedItemProvider>
      <div className={"h-screen text-center " + blur}>
        <div className='h-[10%]'>
          <Header />
        </div>
        <div className='h-[80%] w-full'>
          <div className='h-full w-[15%] float-left'>
            <Sidebar />
          </div>
          <div className="h-full w-[85%] float-left">
            <StockChart />
          </div>
        </div>

        © 2024 Gill Bates
      </div>
    </SelectedItemProvider>
  );
}
