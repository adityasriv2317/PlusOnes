import { Tabs } from "expo-router";
import React from "react";
import { Home, Plus } from "lucide-react-native";

export default function TabLayout() {
  return (
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
  );
}
