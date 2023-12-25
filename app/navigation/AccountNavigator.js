import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screen/AccountScreen";
import ProfileScreen from "../screen/ProfileScreen";
import MessagesScreen from "../screen/MessagesScreen";
import SearchRadiusScreen from "../screen/SearchRadiusScreen";
import OrdersHistoryScreen from "../screen/OrdersHistoryScreen";
import SupportScreen from "../screen/SupportScreen";
import AccountPasswordScreen from "../screen/AccountPasswordScreen";
import AddressScreen from "../screen/AddressScreen";
import AddressAddScreen from "../screen/AddressAddScreen";
import AddressEditScreen from "../screen/AddressEditScreen";
import HeaderTop from "../components/HeaderTop";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
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
    <Stack.Screen name="Account Menu" component={AccountScreen} />
    <Stack.Screen name="Address" component={AddressScreen} />
    <Stack.Screen name="New Address" component={AddressAddScreen} />
    <Stack.Screen name="Edit Address" component={AddressEditScreen} />

    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Search Radius" component={SearchRadiusScreen} />
    <Stack.Screen name="Order History" component={OrdersHistoryScreen} />
    <Stack.Screen name="Support" component={SupportScreen} />
    <Stack.Screen name="Change Password" component={AccountPasswordScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
