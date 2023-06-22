import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
function AppCircleButton({ color = "primary", icon, onPress }) {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={icon}
        size={40}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    width: 45,
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
