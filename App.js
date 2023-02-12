import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginEmailOtpScreen from "./app/screen/LoginEmailOtpScreen";

import LoginMobileOtpScreen from "./app/screen/LoginMobileOtpScreen";
import LoginMobileScreen from "./app/screen/LoginMobileScreen";

import LoginScreen from "./app/screen/LoginScreen";
import RegisterScreen from "./app/screen/RegisterScreen";



export default function App() {
  return <LoginEmailOtpScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
