import { Tabs } from "expo-router";
import React from "react";
import { Home, Plus } from "lucide-react-native";
import { AppContextProvider } from "@/contexts/AppContexts";

export default function TabLayout() {
  return (
    <AppContextProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ff4d00",
          headerStyle: {
            backgroundColor: "#fde4da",
          },
          headerTitleAlign: "center",
          animation: "fade",
          tabBarStyle: {
            backgroundColor: "#fde4da",
            paddingTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Add",
            headerTitle: "Add new guests",
            tabBarIcon: ({ color, size }) => <Plus color={color} size={size} />,
          }}
        />
      </Tabs>
    </AppContextProvider>
  );
}
