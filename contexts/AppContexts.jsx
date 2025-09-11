import React, { useState, useContext, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [persons, setPersons] = useState([]);

  return (
    <AppContext.Provider value={{ persons, setPersons }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
