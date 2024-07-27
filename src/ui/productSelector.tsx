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
  const [products, setProducts] = useState<Product[]>([]);
  const pathname = usePathname()

  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);

  useEffect(() => {
    ProductService.getProducts().then((response) => {
      setProducts(response.data);
    }).catch(function (error) {
        // Error handling
    });    
  
      // StockService.getAllUserStocks().then((response) => {
      //     response.data.forEach((stock) => {
      //       // Handle stock data
      //     })
      // });  
  }, [selectedItem]);
  
  // function handleProductClick(product: Product) {
  //   setSelectedItem((selectedItem: Stock) => ({...selectedItem, id: product.id, name: product.name}));
  // }

    return (
            <ul aria-label="shortcuts" role="list" className="space-y-0.5">
            {products.map((product) => (
              <li key={product.name}>
                <Link
                  href='#'
                  className={cx(
                    pathname === product.name || pathname.startsWith(product.name)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                    "flex products-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                    focusRing,
                  )}
                >
                  {/* <product.icon
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  /> */}
                  {product.name}
                  
                  <Badge variant='default'>?? in stock</Badge>
                </Link>
              </li>
            ))}
          </ul>
    );
};

export default ProductSelector;