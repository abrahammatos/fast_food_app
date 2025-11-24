import CustomHeader from "@/components/CustomHeader";
import InfoRow from "@/components/InfoRow";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, setUser, setIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert("Sair", "Tem certeza que deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            // A. Logout no Appwrite (Backend)
            await signOut();

            // B. Limpar o estado global (Zustand)
            setUser(null);
            setIsAuthenticated(false);

            // C. Redirecionar
            router.replace("/sign-in");
          } catch (error) {
            Alert.alert("Erro", "Erro ao sair da conta.");
            console.error(error);
          }
        },
      },
    ]);
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-5">
        <CustomHeader title="Profile" />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-5"
      >
        <View className="items-center my-6">
          <View className="relative">
            <Image
              source={{ uri: user?.avatar }}
              className="w-28 h-28 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full border-2 border-white">
              <Feather name="edit-2" size={14} color="#fff" />
            </View>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-5 mb-6 shadow-lg">
          <InfoRow icon="user" label="Full Name" value={user?.name!} />
          <InfoRow icon="mail" label="Email" value={user?.email!} />
          <InfoRow icon="phone" label="Phone number" value="+1 555 123 4567" />
          <InfoRow
            icon="map-pin"
            label="Address 1 - (Home)"
            value="123 Main Street, Springfield, IL 62704"
          />
          <InfoRow
            icon="map-pin"
            label="Address 2 - (Work)"
            value="221B Rose Street, Foodville, FL 12345"
            isLast
          />
        </View>

        <TouchableOpacity className="flex-row justify-center items-center py-4 rounded-full border border-[#ffa726] mb-4">
          <Text className="text-primary font-bold text-base">Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row justify-center items-center py-4 rounded-full border border-red-100 bg-red-50"
        >
          <Text className="text-[#FF5252] font-bold text-base">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
