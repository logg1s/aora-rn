import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";
import { saveBookmark } from "../lib/appwrite";
import { usePathname } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
interface Creator {
  username: string;
  avatar: string;
}

interface VideoProps {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator;
  isSave: boolean;
}

const VideoCard = ({
  video: { $id, title, thumbnail, video, creator, isSave },
}: {
  video: VideoProps;
}) => {
  const [play, setPlay] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const dotRef = useRef<TouchableOpacity>(null);
  const { user } = useGlobalContext();
  const pathName = usePathname();

  const closeMenu = () => {
    setShowMenu(false);
  };

  const addToBookmark = async () => {
    const videoId = $id;
    try {
      const newBookmark = await saveBookmark(user.$id, videoId);
      if (newBookmark) {
        Alert.alert("Video added to bookmark successfully");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed when add to bookmark");
    }
  };

  const showPopupMenu = () => {
    if (dotRef.current) {
      dotRef.current.measureInWindow((x, y, width, height) => {
        setMenuPosition({ x: x + width - 200, y: y + height });
        setShowMenu(true);
      });
    }
  };

  return (
    <View className="items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start w-full">
        <View className="flex-row flex-1 items-center">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: creator.avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="flex-1 ml-3">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {creator.username}
            </Text>
          </View>
        </View>
        {isSave && (
          <AntDesign name="star" size={22} className="mt-1" color="orange" />
        )}
        <TouchableOpacity ref={dotRef} onPress={showPopupMenu} className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </TouchableOpacity>
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
            className="w-full h-full rounded-xl"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      <Modal
        visible={showMenu}
        animationType="fade"
        transparent
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View className="flex-1">
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            position: "absolute",
            top: menuPosition.y,
            left: menuPosition.x,
          }}
        >
          <View
            className="bg-white rounded-xl p-4 shadow-lg"
            style={{ width: 200 }}
          >
            {pathName.startsWith("/bookmark") ? null : (
              <TouchableOpacity
                onPress={() => {
                  addToBookmark();
                  closeMenu();
                }}
                className="py-2 border-b border-gray-200 mb-2"
              >
                <Text className="text-base font-psemibold text-center">
                  Add to Bookmark
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                closeMenu();
              }}
              className="py-2"
            >
              <Text className="text-base font-psemibold text-center">
                Share Video
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VideoCard;
