import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // const [persons, setPerson] = useState(async () => {
  //   const jsonValue = await AsyncStorage.getItem("persons");
  //   return jsonValue != null ? JSON.parse(jsonValue) : [];
  // });

  const [persons, setPerson] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("persons");
        const storedPersons = jsonValue != null ? JSON.parse(jsonValue) : [];
        setPerson(storedPersons);
      } catch (e) {
        console.error("Failed to load persons from storage", e);
      }
    };
    fetchData();
  }, []);

  async function addPerson(newPerson) {
    setPerson((prevPersons) => [...prevPersons, newPerson]);
    const jsonValue = JSON.stringify([...persons, newPerson]);
    await AsyncStorage.setItem("persons", jsonValue);
  }

  return (
    <AppContext.Provider value={{ persons, addPerson }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
