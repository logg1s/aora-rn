import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[55px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50': ''}`}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`text-lg text-primary font-psemibold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
