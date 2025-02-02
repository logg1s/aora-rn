import {
  View,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  otherStyles,
  initQuery,
  fromScreen,
  ...props
}: {
  otherStyles?: string;
  initQuery?: string;
  fromScreen: string;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const pathName = usePathname();
  const [query, setQuery] = useState(initQuery ?? "");
  return (
    <View
      className={`flex-row bg-black-100 border-2 ${isFocus ? "border-secondary" : "border-black-200"
        } focus:border-secondary rounded-2xl h-16 px-2 justify-center items-center mt-1 space-x-4`}
    >
      <TextInput
        className="flex-1 text-white font-psemibold text-base py-0"
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(text) => {
          setQuery(text);
        }}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        value={query}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) return;
          if (pathName.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}?fromScreen=${fromScreen}`);
          }
        }}
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
