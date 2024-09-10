"use client";
import React from 'react';
import { useAppData } from '@/app/contexts/AppProvider';
import ModalEditProduct from '@/components/ui/navigation/ModalEditProduct';
import { Product } from '@/data/schema';

const ProductSelector = () => {
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)
  const handleProductSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const { products } = useAppData();
  return (
          <ul id="product-list" aria-label="shortcuts" role="list" className="space-y-0.5 border-l-2 border-gray-300 dark:border-gb-primary-400">
          {products.map((product: Product) => (
            <ModalEditProduct 
              key={product.id}
              _name={product.name} 
              _id={product.id} 
              _url={product.url}
              onSelect={handleProductSelect} />
          ))}
        </ul>
  );
};

export default ProductSelector;