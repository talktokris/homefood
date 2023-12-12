import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

function OrderItemListTotal({ text, price }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.checkBoxArea}>
          <Text style={styles.text}> {text} </Text>
        </View>
        <View style={styles.checkPrice}>
          {price && (
            <AppText style={styles.textPrice}>RM {price.toFixed(2)}</AppText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 7,
    borderTopWidth: 2,
    borderColor: "#ffffff",
  },
  checkBoxArea: { flexDirection: "row", width: "70%", paddingTop: 5 },
  text: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.medium,
  },
  checkPrice: {
    width: "30%",
  },
  textPrice: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.medium,
    textAlign: "right",
    paddingRight: 20,
  },
  link: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default OrderItemListTotal;
