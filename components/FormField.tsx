import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  keyboardType,
  otherStyles,
  ...props
}: {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  otherStyles?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className={`flex-row bg-black-100 border-2 ${
          isFocus ? "border-secondary" : "border-black-200"
        } focus:border-secondary rounded-2xl h-16 px-2 justify-center items-center mt-1`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType ?? "default"}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
