"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import StockService from '@/services/StockService';
import { StockDatum } from '@/data/schema';

interface StockDataContextProps {
  stockData: StockDatum[];
  setStockData: React.Dispatch<React.SetStateAction<StockDatum[]>>;
}

const StockDataContext = createContext<StockDataContextProps | undefined>(undefined);

export const useStockData = (): StockDataContextProps => {
  const context = useContext(StockDataContext);
  if (context === undefined) {
    throw new Error('useStockData must be used within a StockDataProvider');
  }
  return context;
};

interface StockDataProviderProps {
  children: ReactNode;
}

export const StockDataProvider = ({ children }: StockDataProviderProps) => {
  const [stockData, setStockData] = useState<StockDatum[]>([]);

  useEffect(() => {
    StockService.getAllUserStocks().then((response) => {
      setStockData(response.data);
    });
  }, []);

  return (
    <StockDataContext.Provider value={{ stockData, setStockData }}>
      {children}
    </StockDataContext.Provider>
  );
};
