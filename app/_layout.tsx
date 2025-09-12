import { Tabs } from "expo-router";
import React from "react";
import { Home, Plus } from "lucide-react-native";
import { AppContextProvider } from "@/contexts/AppContexts";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
  return (
    <GestureHandlerRootView>
      <AppContextProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#fb8c00",
            headerShown: false,
            animation: "shift",
            tabBarStyle: {
              backgroundColor: "#ffe4c2ff",
              paddingTop: 4,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Home color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Add",
              headerTitle: "Add new guests",
              tabBarIcon: ({ color, size }) => (
                <Plus color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </AppContextProvider>
    </GestureHandlerRootView>
  );
}
