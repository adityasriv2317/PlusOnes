import { Slot, SplashScreen } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppContextProvider } from "@/contexts/AppContexts";
import React from "react";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import WelcomeScreen from "./welcome";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [isWelcome, setIsWelcome] = useState<boolean | null>(null);
  const [fontsLoaded, fontError] = useFonts({
    Lobster: require("../assets/fonts/Lobster.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    async function check() {
      const isShown = await AsyncStorage.getItem("isWelcome");
      setIsWelcome(isShown !== "true");
    }
    check();
  }, []);

  useEffect(() => {
    async function check() {
      const isShown = await AsyncStorage.getItem("isWelcome");
      setIsWelcome(isShown !== "true");
    }
    check();
  }, []);

  if ((!fontsLoaded && !fontError) || isWelcome === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff00f7ff" />
      </View>
    );
  }

  if (isWelcome) {
    return <WelcomeScreen />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContextProvider>
        <Slot />
      </AppContextProvider>
    </GestureHandlerRootView>
  );
}
