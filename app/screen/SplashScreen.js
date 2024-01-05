import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";

function AccountScreen({ route, navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Text>SplashScreen Demo! 👋</Text>
        <Entypo name="rocket" size={30} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.lightGray },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountScreen;
