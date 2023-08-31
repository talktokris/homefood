import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function LebelGreen({ text }) {
  return (
    <View style={styles.container}>
      {text && (
        <AppText style={styles.oPrice} numberOfLines={1}>
          {text}
        </AppText>
      )}
    </View>
  );
}

export default LebelGreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    fontSize: 12,
    color: colors.orangeDark,
    fontWeight: "500",
  },
  oPrice: {
    fontSize: 10,
    color: "#425d58",
    fontWeight: "500",
    backgroundColor: "#edffff",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
