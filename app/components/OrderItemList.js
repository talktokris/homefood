import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

function OrderItemList({ text, price }) {
  const [isChecked, setIsChecked] = useState(false);
  const priceFormat = parseFloat(price).toFixed(2);

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.checkBoxArea}>
          <Text style={styles.text}> {text} </Text>
        </View>
        <View style={styles.checkPrice}>
          {price && <AppText style={styles.textPrice}> {priceFormat}</AppText>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 2,
    borderTopWidth: 2,
    borderColor: "#ffffff",
  },
  checkBoxArea: { flexDirection: "row", width: "80%", paddingTop: 5 },
  text: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.medium,
  },
  checkPrice: {
    width: "20%",
  },
  textPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.medium,
    textAlign: "right",
    paddingRight: 20,
  },
  link: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default OrderItemList;
