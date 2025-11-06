import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const SignIn = () => {
  return (
    <View className="flex-1 justify-center items-center gap-2">
      <Text>sign-in</Text>
      <Button title="Sign Up" onPress={() => router.push("/sign-up")} />
    </View>
  );
};

export default SignIn;
