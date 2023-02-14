import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
import ProfileScreen from "./app/screen/ProfileScreen";
import RegisterScreen from "./app/screen/RegisterScreen";
import SearchRadiusScreen from "./app/screen/SearchRadiusScreen";
import SupportScreen from "./app/screen/SupportScreen";

export default function App() {
  return <FoodViewScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
