import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { register } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await register(
        formData.email,
        formData.password,
        formData.username
      );
      if (setUser && setIsLoggedIn) {
        setUser(result);
        setIsLoggedIn(true);
      }

      router.replace("/home");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView>
        <View className="px-4 my-6 flex-1">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />
          <Text className="text-2xl text-white font-psemibold">
            Signup to Aora
          </Text>

          <FormField
            title="Username"
            value={formData.username}
            handleChangeText={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  username: e,
                };
              });
            }}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={formData.email}
            handleChangeText={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  email: e,
                };
              });
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={formData.password}
            handleChangeText={(e) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  password: e,
                };
              });
            }}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center mt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-secondary text-lg font-psemibold"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
