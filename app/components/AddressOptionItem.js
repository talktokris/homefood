import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AddressOptionItem({ data, onPress }) {
  const { address, city_name, default_status, postal_code, state, street } =
    data;
  return (
    <TouchableHighlight
      underlayColor={colors.lightGray}
      onPress={() => onPress(data)}
    >
      <View style={styles.content}>
        <View style={styles.foodContainer}>
          <MaterialCommunityIcons
            name="map-marker"
            size={20}
            style={styles.iconAdd}
            color={colors.primary}
          />
          <View style={styles.headContainer}>
            {address && <AppText style={styles.heading}>{address}</AppText>}
            <AppText style={styles.text}>
              {street && street} {postal_code && ", " + postal_code}{" "}
              {city_name && ", " + city_name} {state && ", " + state}, Malaysia
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              console.log("Change Click");
            }}
          ></TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default AddressOptionItem;

const styles = StyleSheet.create({
  content: { flexDirection: "row", paddingVertical: 5 },
  foodContainer: { flex: 1, flexDirection: "row" },
  headContainer: { paddingLeft: 10, width: "80%" },
  text: { fontSize: 12 },
  heading: {
    fontWeight: "800",
    fontSize: 14,
    paddingTop: 0,
    color: colors.secondary,
  },
});
