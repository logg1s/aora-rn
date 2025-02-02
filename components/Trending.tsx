import {
  FlatList,
  TouchableOpacity,
  Image,
  ViewToken,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          style={{ width: 320, height: 240 }}
          source={{ uri: item.video }}
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
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
          className="relative justify-center items-center"
        >
          <Image
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: { $id: number }[] }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewableItemsChanged = ({
    viewableItems,
    changed,
  }: {
    viewableItems: ViewToken<{
      $id: number;
    }>[];
    changed: ViewToken<{
      $id: number;
    }>[];
  }) => {
    if (viewableItems?.length > 0) {
      setActiveItem(viewableItems[0]?.item);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id.toString()}
      renderItem={({ item }: { item: { $id: number } }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      horizontal={true}
    />
  );
};

export default Trending;
