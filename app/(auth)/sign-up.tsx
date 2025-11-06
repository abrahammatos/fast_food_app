import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SignUp = () => {
  return (
    <View className="flex-1 justify-center items-center gap-2">
      <Text>sign-up</Text>
      <Button
        title="Sign In"
        onPress={() => router.push("/sign-in")}
        color="#f53"
      />
    </View>
  );
};

export default SignUp;
