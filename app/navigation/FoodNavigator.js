import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodListingScreen from "../screen/FoodListingScreen";
import FoodViewScreen from "../screen/FoodViewScreen";
import CartScreen from "../screen/CartScreen";
import FoodOptionsScreen from "../screen/FoodOptionsScreen";
import PlaceOrderScreen from "../screen/PlaceOrderScreen";

const Stack = createNativeStackNavigator();

const FoodNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Food Menu" component={FoodListingScreen} />
    <Stack.Screen name="Food Details" component={FoodViewScreen} />
    <Stack.Screen name="Food Options" component={FoodOptionsScreen} />
    <Stack.Screen name="Place Order" component={PlaceOrderScreen} />
    <Stack.Screen name="Cart Items" component={CartScreen} />
  </Stack.Navigator>
);

export default FoodNavigator;
