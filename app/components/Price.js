import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function Price({ price, size = 12, oldPrice, currency = "RM" }) {
  return (
    <View style={styles.container}>
      {price && (
        <AppText style={[styles.price, { fontSize: size }]} numberOfLines={1}>
          {currency} {price}
        </AppText>
      )}

      {oldPrice && (
        <AppText style={[styles.oPrice, { fontSize: size }]} numberOfLines={1}>
          {currency} {oldPrice}
        </AppText>
      )}
    </View>
  );
}

export default Price;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 2,
    paddingTop: 2,
  },

  price: {
    color: colors.primary,
    fontWeight: "800",
  },
  oPrice: {
    color: colors.price,
    fontWeight: "500",
    marginLeft: 3,
    textDecorationLine: "line-through",
  },
});
