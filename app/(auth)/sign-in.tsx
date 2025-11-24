import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { User } from "@/type";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser, setIsAuthenticated } = useAuthStore();

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password)
      return Alert.alert("Error", "Please enter valid email & password.");

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      const result = await getCurrentUser();

      setUser(result as unknown as User);
      setIsAuthenticated(true);

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter you email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter you password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton isLoading={isSubmitting} title="Sign In" onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
