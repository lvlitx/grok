import React from "react";
import { Tabs } from "expo-router";
import { Camera, Info } from "lucide-react-native";
import { colors } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.cardBackground,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Food Scanner",
          tabBarIcon: ({ color }) => <Camera size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => <Info size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}