import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";

function PickerItemMultiLine({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>
        {item.address +
          ", " +
          item.street +
          ", " +
          item.city_name +
          ", " +
          item.state +
          ", " +
          item.postal_code}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 10,
    backgroundColor: "#eee",
    marginTop: 2,
  },
});

export default PickerItemMultiLine;
