import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Image, Text, View } from "react-native";

export const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View className="flex-1 items-center justify-center gap-1">
      <Image
        source={icon}
        className="size-7"
        resizeMode="contain"
        tintColor={focused ? "#FE8C00" : "#5D5F6D"}
      />
      <Text
        className={cn(
          "text-xs font-bold",
          focused ? "text-primary" : "text-gray-200"
        )}
      >
        {title}
      </Text>
    </View>
  );
};
