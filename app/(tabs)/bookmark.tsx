import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalContext";
import { getUserBookmark } from "../../lib/appwrite";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const {
    data: posts,
    refreshData
  } = useAppwrite(() => getUserBookmark(user.$id));

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    refreshData();
    setIsRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bookmark
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  bookmark
                </Text>
              </View>
            </View>
            <SearchInput initQuery={""} />

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Add your bookmark to view your favorite video"
          />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
