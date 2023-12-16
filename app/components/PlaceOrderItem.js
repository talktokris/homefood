import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

import AppText from "../components/AppText";

function PlaceOrderItem({ sn, title, extra, tPrice, price }) {
  const exPrice = tPrice - price;

  function decimalFix() {
    let num = parseFloat(tPrice);
    return num.toFixed(2);
  }
  return (
    <View style={styles.content}>
      <View style={styles.foodContainer}>
        <View style={styles.snView}>
          <AppText style={[styles.text, { padding: 5 }]}>{sn + 1}.</AppText>
        </View>

        <View style={styles.headContainer}>
          {title && <AppText style={styles.itemTextBold}>RM {title}</AppText>}
          {exPrice >= 1 && (
            <View style={{ flexDirection: "row" }}>
              <AppText style={styles.text}>Extra : </AppText>
              <AppText style={styles.text}> RM {exPrice}</AppText>
            </View>
          )}
        </View>
        <View style={styles.priceBox}>
          <AppText style={styles.priceItem}>{decimalFix()}</AppText>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: { flexDirection: "row", paddingVertical: 5 },
  foodContainer: { flex: 1, flexDirection: "row" },
  snView: { width: "5%" },
  text: {
    fontSize: 12,
  },
  headContainer: { paddingLeft: 10, width: "80%" },
  itemTextBold: {
    color: colors.secondary,
    fontWeight: "800",
    fontSize: 12,
  },

  priceItem: {
    color: colors.primary,
    fontWeight: "800",
    textAlign: "right",
    fontSize: 12,
  },
  priceBox: {
    flexDirection: "row",
    width: "10%",
    justifyContent: "flex-end",
  },
});

export default PlaceOrderItem;
