import React, { useState, useContext, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [persons, setPerson] = useState([]);

  return (
    <AppContext.Provider value={{ persons, setPerson }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
