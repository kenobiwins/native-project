import { useEffect, useState } from "react";
import { RegistrationScreen } from "../screens/auth/RegistrationScreen";
import { LogInScreen } from "../screens/auth/LoginScreen";
import { PostsScreen } from "../screens/mainScreen/PostsScreen";
import { CreatePostsScreen } from "../screens/mainScreen/CreatePostsScreen";
import { ProfileScreen } from "../screens/mainScreen/ProfileScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Text, TouchableOpacity } from "react-native";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth = false) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LogInScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      tabBarOptions={{ showLabel: false }}
      sceneContainerStyle={{ backgroundColor: "#fff" }}
    >
      <MainTab.Screen
        options={({ route, navigation }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#FF6C00",
          headerRight: (props) => (
            <TouchableOpacity
              style={{ marginRight: 21 }}
              onPress={() => console.log(route)}
            >
              <Ionicons name="ios-exit-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="ios-grid-outline" size={size} color={color} />
          ),
        })}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={({ route }) => ({
          // tabBarItemStyle: { height: 22 },
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <Text
                onPress={() => console.log(route)}
                style={{
                  backgroundColor: "#F6F6F6",
                  overflow: "hidden",
                  borderRadius: 20,
                  width: 70,
                  height: 40,
                  padding: 7,
                  textAlign: "center",
                }}
              >
                <FontAwesome name="trash-o" size={size} color={"#DADADA"} />
              </Text>
            ) : (
              <Text
                style={{
                  backgroundColor: "#FF6C00",

                  overflow: "hidden",
                  borderRadius: 20,
                  width: 70,
                  height: 40,
                  padding: 7,
                  textAlign: "center",
                }}
              >
                <Ionicons name="ios-add" size={size} color={"#fff"} />
              </Text>
            ),
        })}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarActiveTintColor: "#FF6C00",
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
