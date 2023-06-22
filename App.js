import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTextSearch from "./app/components/AppTextSearch";
import FoodItem from "./app/components/FoodItem";

import AccountPasswordScreen from "./app/screen/AccountPasswordScreen";
import AccountScreen from "./app/screen/AccountScreen";
import AddressAddScreen from "./app/screen/AddressAddScreen";
import AddressScreen from "./app/screen/AddressScreen";
import FoodListingScreen from "./app/screen/FoodListingScreen";
import FoodViewScreen from "./app/screen/FoodViewScreen";
import ForgetPasswordScreen from "./app/screen/ForgetPasswordScreen";
import HomeScreen from "./app/screen/HomeScreen";
import LoginEmailOtpScreen from "./app/screen/LoginEmailOtpScreen";

import LoginMobileOtpScreen from "./app/screen/LoginMobileOtpScreen";
import LoginMobileScreen from "./app/screen/LoginMobileScreen";

import LoginScreen from "./app/screen/LoginScreen";
import MessagesScreen from "./app/screen/MessagesScreen";
import OrdersHistoryScreen from "./app/screen/OrdersHistoryScreen";
import ProfileScreen from "./app/screen/ProfileScreen";
import RegisterScreen from "./app/screen/RegisterScreen";
import SearchRadiusScreen from "./app/screen/SearchRadiusScreen";
import SupportScreen from "./app/screen/SupportScreen";

import navigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  return (
    <AuthContext.Provider value={[user, setUser]}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
