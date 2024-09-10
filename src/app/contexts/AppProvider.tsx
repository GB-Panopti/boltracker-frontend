"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import StockService from '@/services/StockService';
import ProductService from '@/services/ProductService';
import LoginService from '@/services/LoginService';
import { Product, StockDatum, User } from '@/data/schema';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

interface AppDataContextProps {
  stockData: StockDatum[][];
  rawStockData: StockDatum[][];
  products: Product[];
  user: User | null;
  setStockData: React.Dispatch<React.SetStateAction<StockDatum[][]>>;
  setRawStockData: React.Dispatch<React.SetStateAction<StockDatum[][]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
  const [rawStockData, setRawStockData] = useState<StockDatum[][]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch user data from session on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await LoginService.getUserFromSession();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user session data:', error);
        setUser(null);

        // Redirect to login page if user is not authenticated
        if (typeof window !== 'undefined') {
          window.location.href = '/login'; // Static redirect
        }
      } finally {
        setLoading(false); // User has been fetched or login redirect is triggered
      }
    };

    fetchUser();
  }, []);

  // Fetch stock data and products when user is authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const stockResponse = await StockService.getAllUserStocks();
          const productResponse = await ProductService.getProducts();
          setStockData(stockResponse.data);
          setProducts(productResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  // Only render children when user data has been fetched (and loading is complete)
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AppDataContext.Provider value={{ stockData, products, rawStockData, setRawStockData, setStockData, setProducts, setUser, user }}>
        {children}
      </AppDataContext.Provider>
    </I18nextProvider>
  );
};
