import { Slot } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _Layout() {
  return (
    <SafeAreaView className="flex-1">
      <Text>Auth layout</Text>
      <Slot />
    </SafeAreaView>
  );
}
