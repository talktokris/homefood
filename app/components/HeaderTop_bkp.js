import React, { Component, useContext, useState, useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  Text,
} from "react-native";
import Constants from "expo-constants";
import TopMenu from "./TopMenu";
import HeaderBackButton from "./HeaderBackButton";
import colors from "../config/colors";

function HeaderTop_Bkp(props) {
  const { route, navigation } = props;
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkGo();
    });
    return unsubscribe;
  }, [navigation]);

  function checkGo() {
    if (navigation.canGoBack()) {
      setShowBack(true);
    } else {
      setShowBack(false);
    }
  }
  return (
    <View style={styles.fullScreen}>
      <SafeAreaView style={styles.screens}>
        <View style={styles.container}>
          <View style={styles.backIconContainer}>
            {showBack && (
              <HeaderBackButton onPress={() => navigation.goBack()} />
            )}
          </View>
          <View>
            <Text style={styles.titleText}>{route.name}</Text>
          </View>
          <TopMenu />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.secondary,
    height: Constants.statusBarHeight,
  },
  screens: {
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: colors.secondary,
  },
  container: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  backIconContainer: { width: 50 },

  titleText: {
    padding: 5,
    marginTop: 2,
    fontSize: 16,
    fontWeight: "600",
  },
});
export default HeaderTop_Bkp;
