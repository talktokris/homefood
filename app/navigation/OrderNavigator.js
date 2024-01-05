import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrdersScreen from "../screen/OrdersScreen";
import FoodTrackingScreen from "../screen/FoodTrackingScreen";
import HeaderTop from "../components/HeaderTop";
import RetryScreen from "../screen/RetryScreen";

const Stack = createNativeStackNavigator();

const OrderNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      lazy: false,
      headerShown: true,
      height: 250,
      backgroundColor: "#111",
      headerMode: "screen",
      animation: "fade",
      header: (props) => <HeaderTop {...props} />,
    }}
  >
    <Stack.Screen name="Recent Orders" component={OrdersScreen} />
    <Stack.Screen name="Order Tracking" component={FoodTrackingScreen} />
    <Stack.Screen name="Ops Something went wrong" component={RetryScreen} />
  </Stack.Navigator>
);

export default OrderNavigator;
