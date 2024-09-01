"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import StockService from '@/services/StockService';
import ProductService from '@/services/ProductService';
import { Product, StockDatum, User } from '@/data/schema';

// Combined Data Context
interface AppDataContextProps {
  stockData: StockDatum[][];
  products: Product[];
  user: User;
  setStockData: React.Dispatch<React.SetStateAction<StockDatum[][]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AppDataContext = createContext<AppDataContextProps | undefined>(undefined);

export const useAppData = (): AppDataContextProps => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [stockData, setStockData] = useState<StockDatum[][]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockResponse = await StockService.getAllUserStocks();
        const productResponse = await ProductService.getProducts();
        console.log('user', user);
        setStockData(stockResponse.data);
        setProducts(productResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppDataContext.Provider value={{ stockData, products, user, setStockData, setProducts, setUser }}>
      {children}
    </AppDataContext.Provider>
  );
};
