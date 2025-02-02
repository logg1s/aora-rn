import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: {
  video: {
    title: string;
    thumbnail: string;
    video: string;
    creator: {
      username: string;
      avatar: string;
    };
  };
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>

      {play ? (
       <Video
       style={{ width: "100%", height: 240 }}
       source={{ uri: video }}
       rate={1.0}
       volume={1.0}
       isMuted={false}
       resizeMode={ResizeMode.CONTAIN}
       shouldPlay
       isLooping
       useNativeControls
     />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-xl mt-3"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
