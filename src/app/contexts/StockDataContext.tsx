"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import StockService from '@/services/StockService';
import { Product, StockDatum } from '@/data/schema';
import ProductService from '@/services/ProductService';

// Stock Data Context
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

// Product Data Context
interface ProductDataContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductDataContext = createContext<ProductDataContextProps | undefined>(undefined);

export const useProductData = (): ProductDataContextProps => {
  const context = useContext(ProductDataContext);
  if (context === undefined) {
    throw new Error('useProductData must be used within a ProductDataProvider');
  }
  return context;
};

interface ProductDataProviderProps {
  children: ReactNode;
}

export const ProductDataProvider = ({ children }: ProductDataProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <ProductDataContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductDataContext.Provider>
  );
};

// Combined Provider
export const AppProvider = ({ children }: { children: ReactNode }) => (
  <StockDataProvider>
    <ProductDataProvider>
      {children}
    </ProductDataProvider>
  </StockDataProvider>
);

// "use client";
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import StockService from '@/services/StockService';
// import { Product, StockDatum } from '@/data/schema';
// import ProductService from '@/services/ProductService';

// interface StockDataContextProps {
//   stockData: StockDatum[];
//   setStockData: React.Dispatch<React.SetStateAction<StockDatum[]>>;
// }

// const StockDataContext = createContext<StockDataContextProps | undefined>(undefined);

// export const useStockData = (): StockDataContextProps => {
//   const context = useContext(StockDataContext);
//   if (context === undefined) {
//     throw new Error('useStockData must be used within a StockDataProvider');
//   }
//   return context;
// };

// interface StockDataProviderProps {
//   children: ReactNode;
// }

// export const StockDataProvider = ({ children }: StockDataProviderProps) => {
//   const [stockData, setStockData] = useState<StockDatum[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     StockService.getAllUserStocks().then((response) => {
//       console.log('REGENNING STOCK DATA');
//       setStockData(response.data);
//     });
//   }, []);

//   useEffect(() => {
//     ProductService.getProducts().then((response) => {
//       setProducts(response.data);
//     });
//   }, []);

//   return (
//     <StockDataContext.Provider value={{ stockData, setStockData }}>
//       {children}
//     </StockDataContext.Provider>
//   );
// };
