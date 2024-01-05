import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screen/HomeScreen";
import FoodListingScreen from "../screen/FoodListingScreen";
import FoodViewScreen from "../screen/FoodViewScreen";
import CartScreen from "../screen/CartScreen";
import FoodOptionsScreen from "../screen/FoodOptionsScreen";
import PlaceOrderScreen from "../screen/PlaceOrderScreen";


import HeaderTop from "../components/HeaderTop";
import RetryScreen from "../screen/RetryScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      lazy: false,
      headerShown: true,
      height: 250,
      backgroundColor: "#111",
      headerMode: "screen",
      animation: "fade",

      header: (props) => <HeaderTop style="light" {...props} />,
    }}
  >
    <Stack.Screen name="Home Food" component={HomeScreen} />
    <Stack.Screen name="Food Menu" component={FoodListingScreen} />
    <Stack.Screen name="Food Details" component={FoodViewScreen} />
    <Stack.Screen name="Food Options" component={FoodOptionsScreen} />
    <Stack.Screen name="Place Order" component={PlaceOrderScreen} />
    <Stack.Screen name="Cart Items" component={CartScreen} />
    <Stack.Screen name="Ops Something went wrong" component={RetryScreen} />
  </Stack.Navigator>
);



export default HomeNavigator;
