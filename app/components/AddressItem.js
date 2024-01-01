import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AddressItem({
  id,
  address,
  addressData,
  iconComponent,
  image,
  onDelete,
  onEdit,
  onDefault,
  defaultAddress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity
          underlayColor={colors.lightGray}
          onPress={() => onEdit(id)}
        >
          <MaterialCommunityIcons
            name="pencil-circle-outline"
            size={25}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>
      {iconComponent}
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.appTextContainer}>
        <AppText style={styles.title} numberOfLines={3}>
          {address}
        </AppText>
        {addressData && (
          <AppText style={styles.subTitle} numberOfLines={4}>
            {addressData.street}, {addressData.city_name}, {addressData.state}{" "}
            {addressData.postal_code}
          </AppText>
        )}
        {defaultAddress === id ? (
          <View>
            <MaterialCommunityIcons
              name="check-circle"
              size={25}
              color={colors.green}
            />
          </View>
        ) : (
          <TouchableOpacity
            underlayColor={colors.lightGray}
            onPress={() => onDefault(id)}
          >
            <View style={styles.dafault}>
              <AppText style={styles.titlebtn} numberOfLines={1}>
                Make Default
              </AppText>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.edit}>
        <TouchableOpacity
          underlayColor={colors.lightGray}
          onPress={() => onDelete(id)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddressItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: colors.light,
    alignItems: "center",
  },
  appTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
    padding: 5,
    flex: 1,
    width: "90%",
    marginRight: 35,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  dafault: {
    backgroundColor: colors.secondary,
    width: 120,
    padding: 2,

    borderRadius: 5,
    marginTop: 10,
  },
  titlebtn: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: colors.white,
  },
  subTitle: {
    fontSize: 12,
    color: colors.secondary,
  },
  close: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  edit: { position: "absolute", right: 10, bottom: 0, cursor: "pointer" },
});
