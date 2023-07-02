import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screen/HomeScreen";
import FoodListingScreen from "../screen/FoodListingScreen";
import FoodViewScreen from "../screen/FoodViewScreen";
import CartScreen from "../screen/CartScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Welcome to HomeFood" component={HomeScreen} />
    <Stack.Screen name="Food Menu" component={FoodListingScreen} />
    <Stack.Screen name="Food Details" component={FoodViewScreen} />
    <Stack.Screen name="Cart Items" component={CartScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
