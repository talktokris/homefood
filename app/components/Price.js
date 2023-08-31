import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function Price({ price, oldPrice, currency = "RM" }) {
  return (
    <View style={styles.container}>
      {price && (
        <AppText style={styles.price} numberOfLines={1}>
          {currency} {price}
        </AppText>
      )}

      {oldPrice && (
        <AppText style={styles.oPrice} numberOfLines={1}>
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
    fontSize: 12,
    color: colors.primary,
    fontWeight: "800",
  },
  oPrice: {
    fontSize: 12,
    color: colors.price,
    fontWeight: "500",
    marginLeft: 3,
    textDecorationLine: "line-through",
  },
});
