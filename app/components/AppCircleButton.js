import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
function AppCircleButton({ color = "primary", size = 40, icon, onPress }) {
  return (
    <TouchableOpacity
      style={([styles.button], { width: size + 5 })}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        style={styles.icon}
        name={icon}
        size={size}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    color: colors.primary,
  },
});

export default AppCircleButton;
