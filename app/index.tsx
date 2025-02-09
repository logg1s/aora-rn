import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalContext";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView>
        <View className="items-center justify-center px-4 min-h-[80vh]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="w-[380px] h-[300px]"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="absolute -bottom-3 right-20 w-[140px] h-[15px]"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          {isLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <CustomButton
              title="Continue with Email"
              containerStyles="w-full mt-7"
              handlePress={() => router.push("/sign-in")}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
