import React, { useState, useCallback, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import AppLoading from "expo-app-loading";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";

import navigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import RetryNavigator from "./app/navigation/RetryNavigator";

import CartContext from "./app/auth/cartContext";
import TokenContext from "./app/auth/tokenContext";

import authStorage from "./app/auth/storage";
import RetryScreen from "./app/screen/RetryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  //  const [token, setToken] = useContext(TokenContext);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  // const [isReady, setIsReady] = useState(false);

  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   console.log("User--");
  //   console.log(user);
  //   console.log("Token --");
  //   console.log(token);
  // });

  // App Loading Start

  const restoreUser = async () => {
    const readToken = await authStorage.getToken(null);
    // console.log(readToken);
    if (readToken) setToken(readToken);
    // console.log("token 1: " + token);
    const user = await authStorage.getUser();
    // console.log(user);
    if (user) setUser(user);

    // return user;
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // console.log("app Started" + user);
        await restoreUser();
        // restoreUser();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // restoreUser;
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        // console.log("app Started" + user);
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  // console.log(appIsReady);
  // console.log(activeToken);

  // App Loading end

  function RenderComponent() {
    if (token) return <RetryNavigator />;
    else return <AuthNavigator />;
  }

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <TokenContext.Provider value={[token, setToken]}>
        <CartContext.Provider value={[cart, setCart]}>
          <NavigationContainer
            theme={navigationTheme}
            onReady={onLayoutRootView}
          >
            {/* {user ? <AppNavigator /> : RenderComponent()} */}

            {/* {activeToken ? conditionalRender : <AuthNavigator />} */}
            {user ? <AppNavigator /> : <AuthNavigator />}
            {/* <AppNavigator /> */}
          </NavigationContainer>
        </CartContext.Provider>
      </TokenContext.Provider>
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
