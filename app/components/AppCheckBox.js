import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppCheckBox({ color, onPress }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsChecked(!isChecked) || onPress}>
      <View style={styles.container}>
        {isChecked ? (
          <MaterialCommunityIcons
            name="checkbox-outline"
            size={30}
            style={styles.icon}
            color={colors.color}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={30}
            style={styles.icon}
            color={colors.color}
          />
        )}
        <Text style={styles.text}> I accept all the</Text>
        <Text style={styles.link}> terms and conditions</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  link: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default AppCheckBox;
