import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcons = ({
  focused,
  color,
  name,
  icon,
}: {
  focused: boolean;
  color: any;
  name: string;
  icon: any;
}) => {
  return (
    <View className="items-center justify-center gap-2 mt-7">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs w-full `} style={{color: color}}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232523",
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <TabIcons
              color={color}
              focused={focused}
              icon={icons.home}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <TabIcons
              color={color}
              focused={focused}
              icon={icons.bookmark}
              name="Bookmark"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <TabIcons
              color={color}
              focused={focused}
              icon={icons.plus}
              name="Create"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <TabIcons
              color={color}
              focused={focused}
              icon={icons.profile}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
