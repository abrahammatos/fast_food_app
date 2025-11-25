import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Tipo auxiliar para os Toppings/Sides (apenas visual por enquanto)
type ExtraOption = {
  id: string;
  name: string;
  image: string;
  type: "topping" | "side";
};

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const productId = (params.id || params.$id) as string;
  const item = params;
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState(1);

  const toppings: ExtraOption[] = [
    {
      id: "1",
      name: "Tomato",
      image: "https://i.imgur.com/7X5Q5Yp.png",
      type: "topping",
    },
    {
      id: "2",
      name: "Onions",
      image: "https://i.imgur.com/P4S8h5v.png",
      type: "topping",
    },
    {
      id: "3",
      name: "Cheese",
      image: "https://i.imgur.com/2X5Q5Yp.png",
      type: "topping",
    }, // Use urls reais
    {
      id: "4",
      name: "Bacons",
      image: "https://i.imgur.com/9X5Q5Yp.png",
      type: "topping",
    },
  ];

  const sideOptions: ExtraOption[] = [
    {
      id: "5",
      name: "Fries",
      image: "https://i.imgur.com/qX5Q5Yp.png",
      type: "side",
    },
    {
      id: "6",
      name: "Coleslaw",
      image: "https://i.imgur.com/rX5Q5Yp.png",
      type: "side",
    },
    {
      id: "7",
      name: "Salad",
      image: "https://i.imgur.com/sX5Q5Yp.png",
      type: "side",
    },
  ];

  const handleAddToCart = () => {
    if (!params.name || !params.price) return;

    const priceNumber = parseFloat(params.price as string);

    addItem({
      id: productId,
      name: params.name as string,
      price: priceNumber,
      image_url: params.image as string,
      customizations: [],
      quantity: quantity,
    });

    router.push("/cart");
  };

  const ratingNumber = Number(item.rating);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        {/* Header */}
        <View className="px-5 pt-5">
          <CustomHeader title="Info" />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section (Info + Imagem Grande) */}
          <View className="flex-row px-5 mt-4 justify-between">
            {/* Coluna Esquerda: Texto */}
            <View className="flex-1 pr-2">
              <Text className="text-2xl font-bold text-gray-900 leading-tight">
                {item.name || "Wendy's Burger"}
              </Text>
              <Text className="text-gray-400 text-sm mt-1">Cheeseburger</Text>

              {/* Rating */}
              <View className="flex-row items-center mt-2">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <FontAwesome
                    key={starIndex}
                    name="star"
                    size={14}
                    color={starIndex <= ratingNumber ? "#FFA726" : "#E5E7EB"}
                    style={{ marginRight: 2 }}
                  />
                ))}
                <Text className="text-xs text-gray-400 ml-1">
                  {item.rating}
                </Text>
              </View>

              {/* Price */}
              <Text className="text-2xl font-bold text-gray-900 mt-3">
                <Text className="text-[#FFA726]">$</Text>{" "}
                {item.price || "10.02"}
              </Text>

              {/* Stats Grid */}
              <View className="flex-row flex-wrap mt-4 gap-4">
                <View>
                  <Text className="text-gray-400 text-xs">Calories</Text>
                  <Text className="font-bold text-gray-800">
                    {item.calories} Cal
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-400 text-xs">Protein</Text>
                  <Text className="font-bold text-gray-800">
                    {item.protein}g
                  </Text>
                </View>
              </View>
              <View className="mt-2">
                <Text className="text-gray-400 text-xs">Bun Type</Text>
                <Text className="font-bold text-gray-800">{item.type}</Text>
              </View>
            </View>

            <View className="w-[45%] h-52 justify-center items-center">
              <Image
                source={{
                  uri:
                    (item.image as string) ||
                    "https://www.pngmart.com/files/16/Bacon-Cheese-Burger-Transparent-Background.png",
                }}
                className="w-48 h-48"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="flex-row px-5 mt-6 justify-between gap-2">
            <Badge icon="dollar-sign" text="Free Delivery" />
            <Badge icon="clock" text="20 - 30 mins" />
            <View className="flex-row items-center bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100">
              <FontAwesome name="star" size={12} color="#FFA726" />
              <Text className="ml-1 text-xs font-bold">{item.rating}</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="px-5 mt-6 text-gray-500 leading-6">
            {item.description}
          </Text>

          {/* Toppings Section */}
          <View className="mt-6">
            <Text className="px-5 text-lg font-bold text-gray-900 mb-3">
              Toppings
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 15 }}
            >
              {toppings.map((top) => (
                <OptionCard key={top.id} item={top} />
              ))}
            </ScrollView>
          </View>

          {/* Side Options Section */}
          <View className="mt-6">
            <Text className="px-5 text-lg font-bold text-gray-900 mb-3">
              Side options
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 15 }}
            >
              {sideOptions.map((side) => (
                <OptionCard key={side.id} item={side} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Floating Bar */}
      <View className="absolute bottom-0 w-full bg-white px-5 pt-4 pb-12 rounded-t-3xl shadow-[0_-4px_6px_rgba(0,0,0,0.05)] flex-row justify-between items-center">
        {/* Quantity Selector */}
        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 gap-4">
          <TouchableOpacity
            onPress={() => quantity > 1 && setQuantity((q) => q - 1)}
          >
            <Feather name="minus" size={20} color="#FFA726" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
            <Feather name="plus" size={20} color="#FFA726" />
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          onPress={handleAddToCart}
          className="flex-1 ml-5 bg-[#FFA726] rounded-full py-4 flex-row justify-center items-center shadow-lg shadow-orange-200"
        >
          <Feather
            name="shopping-bag"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-bold text-lg">
            Add to cart ($
            {(parseFloat((item.price as string) || "10.02") * quantity).toFixed(
              2
            )}
            )
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Componentes Auxiliares ---

// 1. Badge (Free Delivery, Time)
const Badge = ({
  icon,
  text,
}: {
  icon: keyof typeof Feather.glyphMap;
  text: string;
}) => (
  <View className="flex-row items-center bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100 flex-1 justify-center">
    <Feather name={icon} size={14} color="#FFA726" />
    <Text className="ml-2 text-xs font-semibold text-gray-700">{text}</Text>
  </View>
);

// 2. Option Card (Ingredientes/Sides)
const OptionCard = ({ item }: { item: ExtraOption }) => (
  <View className="w-24 items-center">
    <View className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 items-center justify-center mb-2 relative overflow-hidden p-2">
      {/* Placeholder de imagem */}
      <View className="w-14 h-14 bg-red-100 rounded-full items-center justify-center">
        {/* Em produção, use <Image source={{uri: item.image}} /> */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1134/1134447.png",
          }} // Exemplo genérico
          className="w-12 h-12"
          resizeMode="contain"
        />
      </View>

      {/* Botão de adicionar (+) pequeno no canto */}
      <TouchableOpacity className="absolute bottom-1 right-1 bg-red-500 w-6 h-6 rounded-full items-center justify-center">
        <Feather name="plus" size={14} color="white" />
      </TouchableOpacity>
    </View>
    <View className="bg-gray-800 px-3 py-1 rounded-full">
      <Text className="text-white text-[10px] font-bold">{item.name}</Text>
    </View>
  </View>
);
