"use client";

import { useState, useEffect } from 'react';
import ProductService from '@/services/ProductService';

export function useAuthRedirect() {
  const [blur, setBlur] = useState('blur-xl');

  useEffect(() => {
    ProductService.getProducts()
      .then(() => {
        setBlur('blur-none');
      })
      .catch(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return blur;
}