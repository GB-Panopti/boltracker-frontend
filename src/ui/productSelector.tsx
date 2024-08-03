"use client";
import ProductService from '@/services/ProductService';
import { Card, SparkAreaChart } from '@tremor/react';
import { Button } from '@tremor/react';
import React, { useContext, useState, useEffect } from 'react';
import Link from "next/link"
import { cx, focusRing } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { SelectedItemContext } from '../app/contexts/SelectedItemContext';
import StockService from '@/services/StockService';
import { RiLinkM } from '@remixicon/react';
import { Badge } from "@/components/Badge";
import { useProductData } from '@/app/contexts/StockDataContext';

// const howProductsShouldBeDefined = [
//   {
//     name: "Add new user",
//     href: "#",
//     icon: RiLinkM,
//   },
//   {
//     name: "Workspace usage",
//     href: "#",
//     icon: RiLinkM,
//   },
//   {
//     name: "Cost spend control",
//     href: "#",
//     icon: RiLinkM,
//   },
//   {
//     name: "Overview – Rows written",
//     href: "#",
//     icon: RiLinkM,
//   },
// ] as const;

interface Product {
  id: number;
  name: string;
  url: string;
  stock: number;
}

interface Stock {
  id: number;
  name: string;
  amount: number;
  date: string;
}

const ProductSelector = () => {
  const pathname = usePathname()
  const { products } = useProductData();

    return (
            <ul aria-label="shortcuts" role="list" className="space-y-0.5 border-l-2 border-gray-300 dark:border-gb-primary-400">
            {products.map((product) => (
              <li key={product.name} className='ml-1 p-1 rounded-md hover:bg-gb-secondary-200 hover:dark:bg-gb-primary-900 text-gb-primarylite-50 hover:text-gray-900 dark:text-gb-primarylite-100 hover:dark:text-gray-50'>
                <Link
                  href='#'
                  className={cx(
                    pathname === product.name || pathname.startsWith(product.name)
                      ? "text-gb-secondary-600 dark:text-gb-secondary-400" : "",
                    "products-center gap-x-2.5 px-2 py-1.5 text-xs font-medium mr-3",
                    focusRing,
                  )}>
                  {product.name}
                  <div className='float-right ml-3 mr-2 mt-0.5'>
                    <Badge variant='neutral' className='text-xs'>-??% last week</Badge>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
    );
};

export default ProductSelector;