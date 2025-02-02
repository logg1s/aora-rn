import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchBookmarkPost, searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";

enum ScreenSearchType {
  HOME = "home",
  BOOKMARK = "bookmark"
}

const Search = () => {
  const { user } = useGlobalContext();
  const { query, fromScreen } = useLocalSearchParams();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const funcData = () => {
    switch (fromScreen) {
      case ScreenSearchType.HOME: return searchPosts(query)
      default: return searchBookmarkPost(user.$id, query);
    }
  }
  const {
    data: posts,
    refreshData,
  } = useAppwrite(funcData);

  const onRefresh = () => {
    setIsRefreshing(true);
    refreshData();
    setIsRefreshing(false);
  }

  useEffect(() => {
    refreshData();
  }, [query]);

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
                  Search Result
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
              </View>
            </View>
            <SearchInput initQuery={query.toString()} fromScreen={fromScreen} />

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for the search query"
          />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Search;
