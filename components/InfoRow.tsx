import { InfoRowProps } from "@/type";
import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import { Text, View } from "react-native";

const InfoRow = ({ icon, label, value, isLast }: InfoRowProps) => {
  return (
    <View className={cn("flex-row items-center", isLast ? "mb-0" : "mb-5")}>
      <View className="w-10 h-10 rounded-full items-center justify-center mr-4 bg-[#FFF3E0]">
        <Feather name={icon} size={20} color="#ffa726" />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-gray-400 mb-0.5">{label}</Text>
        <Text className="text-sm text-gray-800 font-medium">{value}</Text>
      </View>
    </View>
  );
};

export default InfoRow;
