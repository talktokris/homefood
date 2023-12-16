import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";

function CartAlertIcon({ Items = 0, onPress }) {
  return (
    <TouchableOpacity style={styles.iconBg} onPress={onPress}>
      {Items > 0 && (
        <View style={styles.aletBox}>
          <AppText style={styles.text}>{Items}</AppText>
        </View>
      )}
      <MaterialCommunityIcons name="cart" size={30} color={colors.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBg: {
    //backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
  },
  text: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 12,
    paddingTop: 2,
    textAlign: "center",
  },
  aletBox: {
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colors.white,
    position: "absolute",
    zIndex: 2,
    left: 25,
    top: -7,
  },
});
export default CartAlertIcon;
