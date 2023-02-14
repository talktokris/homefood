import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



import AccountPasswordScreen from "./app/screen/AccountPasswordScreen";
import AccountScreen from "./app/screen/AccountScreen";
import AddressScreen from "./app/screen/AddressScreen";
//import FoodListingScreen from "./app/screen/FoodListingScreen";
import ForgetPasswordScreen from "./app/screen/ForgetPasswordScreen";
import LoginEmailOtpScreen from "./app/screen/LoginEmailOtpScreen";

import LoginMobileOtpScreen from "./app/screen/LoginMobileOtpScreen";
import LoginMobileScreen from "./app/screen/LoginMobileScreen";

import LoginScreen from "./app/screen/LoginScreen";
import MessagesScreen from "./app/screen/MessagesScreen";
import ProfileScreen from "./app/screen/ProfileScreen";
import RegisterScreen from "./app/screen/RegisterScreen";
import SearchRadiusScreen from "./app/screen/SearchRadiusScreen";

export default function App() {
  return <AddressScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
