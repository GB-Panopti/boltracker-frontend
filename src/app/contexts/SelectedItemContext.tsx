import React, { useState, createContext} from 'react';

export const SelectedItemContext = createContext([{}, () => {}]);

export const SelectedItemProvider = (props) => {
  const [state, setState] = useState({ id: null,
    products: new Map(),
  });
  return (
    <SelectedItemContext.Provider value={[state, setState]}>
      {props.children}
    </SelectedItemContext.Provider>
  );
}