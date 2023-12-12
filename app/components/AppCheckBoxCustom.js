import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

function AppCheckBoxCustom({ text, price, data, onPress, color }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsChecked(!isChecked) || onPress(data, isChecked)}
    >
      <View style={styles.container}>
        <View style={styles.checkBoxArea}>
          {isChecked ? (
            <MaterialCommunityIcons
              name="checkbox-outline"
              size={20}
              style={styles.icon}
              color={colors.primary}
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={20}
              style={styles.icon}
              color={colors.medium}
            />
          )}
          <Text style={styles.text}> {text} </Text>
        </View>
        <View style={styles.checkPrice}>
          {price && <AppText style={styles.textPrice}> +{price}</AppText>}
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
  checkBoxArea: { flexDirection: "row", width: "80%", paddingTop: 5 },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.medium,
  },
  checkPrice: {
    width: "20%",
  },
  textPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.orangeDark,
    textAlign: "right",
    paddingRight: 20,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default AppCheckBoxCustom;
