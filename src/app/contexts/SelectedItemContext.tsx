import React, { useState, createContext, ReactNode } from 'react';

// Define the interface for the props
interface SelectedItemProviderProps {
  children: ReactNode;
}

// Create the context
const SelectedItemContext = createContext<any>(null);

const SelectedItemProvider: React.FC<SelectedItemProviderProps> = (props) => {
  const [state, setState] = useState({
    id: null,
    products: new Map(),
  });

  return (
    <SelectedItemContext.Provider value={[state, setState]}>
      {props.children}
    </SelectedItemContext.Provider>
  );
};

export { SelectedItemProvider, SelectedItemContext };