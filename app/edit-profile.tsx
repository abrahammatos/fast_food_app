import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { updateUser, uploadFile } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";

const EditProfile = () => {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: user?.avatar || null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1], // Quadrado para avatar
      quality: 0.5, // Qualidade menor para upload rápido
    });

    if (!result.canceled) {
      setForm({ ...form, avatar: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    if (!user?.$id) return;
    setIsLoading(true);

    try {
      let finalAvatarUrl = user.avatar;

      if (form.avatar && form.avatar.startsWith("file://")) {
        const file = {
          uri: form.avatar,
          name: `avatar-${user.$id}-${Date.now()}.jpg`,
          type: "image/jpeg",
        };

        const uploadedUrl = await uploadFile(file);

        if (uploadedUrl) {
          finalAvatarUrl = uploadedUrl;
        }
      }

      const dataToUpdate = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        avatar: finalAvatarUrl === "" ? undefined : finalAvatarUrl,
      };

      const updatedUser = await updateUser(user.$id, dataToUpdate);

      setUser(updatedUser);

      Alert.alert("Sucesso", "Perfil atualizado!");
      router.back();
    } catch (error: any) {
      Alert.alert("Erro", "Falha ao atualizar: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-4">Editar Perfil</Text>
      </View>

      <ScrollView key={user?.$id} className="p-5">
        {/* Avatar Upload */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={pickImage} className="relative">
            <Image
              source={{ uri: form.avatar || "https://i.pravatar.cc/300" }}
              className="w-32 h-32 rounded-full bg-gray-200"
            />
            <View className="absolute bottom-0 right-0 bg-[#FFA726] p-2 rounded-full border-2 border-white">
              <Feather name="camera" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text className="text-gray-500 mt-2 text-sm">
            Toque para alterar a foto
          </Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-500 mb-1 ml-1">Nome Completo</Text>
            <TextInput
              value={form.name}
              onChangeText={(t) => setForm({ ...form, name: t })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
              placeholder="Seu nome"
            />
          </View>

          <View className="mt-4">
            <Text className="text-gray-500 mb-1 ml-1">Telefone</Text>
            <TextInput
              value={form.phone}
              onChangeText={(t) => setForm({ ...form, phone: t })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
            />
          </View>

          <View className="mt-4">
            <Text className="text-gray-500 mb-1 ml-1">Endereço</Text>
            <TextInput
              value={form.address}
              onChangeText={(t) => setForm({ ...form, address: t })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800"
              placeholder="Seu endereço completo"
              multiline
            />
          </View>
        </View>

        {/* Botão de Salvar */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          className={`w-full py-4 rounded-full items-center justify-center mt-4 ${isLoading ? "bg-orange-300" : "bg-[#FFA726]"}`}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">
              Salvar Alterações
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditProfile;
