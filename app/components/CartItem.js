import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Stars from "./Stars";
import AppCircleButton from "./AppCircleButton";

function CartItem({
  id,
  title,
  price,
  currency = "RM ",
  image,
  onDelete,
  onEdit,
  qty,
}) {
  function totalCount(price, qty) {
    let total = Number(price) * Number(qty);
    return total.toFixed(2);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          {image && <Image style={styles.image} source={{ uri: image }} />}

          <View style={styles.appTextContainer}>
            <TouchableOpacity
              underlayColor={colors.lightGray}
              onPress={() => onDelete(id)}
            >
              <View style={styles.close}>
                <MaterialCommunityIcons
                  name="trash-can"
                  size={32}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
            <AppText style={styles.title} numberOfLines={2}>
              {title}
            </AppText>

            <View style={styles.bottomArea}>
              <View style={styles.bottomLeft}>
                <AppText style={styles.location} numberOfLines={1}>
                  Price
                </AppText>
                <AppText style={styles.price} numberOfLines={1}>
                  {currency} {price}
                </AppText>
              </View>

              <View style={styles.bottomRight}>
                <AppText style={styles.location} numberOfLines={1}>
                  Qty
                </AppText>
                <AppText style={styles.price} numberOfLines={1}>
                  {qty}
                </AppText>
              </View>
            </View>

            <View style={styles.bottomArea}>
              <View style={styles.bottomLeft}>
                <AppText style={styles.location} numberOfLines={1}>
                  Total
                </AppText>
                <AppText style={styles.price} numberOfLines={1}>
                  {currency} {totalCount(price, qty)}
                </AppText>
              </View>

              <View style={styles.bottomRight}>
                <View style={styles.close}>
                  <TouchableOpacity
                    underlayColor={colors.lightGray}
                    onPress={() => onEdit(id)}
                  >
                    <MaterialCommunityIcons
                      name="pencil-circle"
                      size={32}
                      color={colors.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    width: "100%",

    // backgroundColor: "red",
  },
  close: { position: "absolute", right: 1, top: 0 },
  appTextContainer: {
    width: "70%",
    paddingLeft: 5,
    justifyContent: "center",
  },
  image: {
    flexDirection: "row",
    width: 100,
    height: 100,
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.secondary,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  price: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "800",
  },
  bottomArea: {
    flexDirection: "row",
    paddingTop: 5,
  },
  bottomLeft: {
    width: "50%",
    justifyContent: "center",
  },
  bottomRight: {
    width: "50%",
    justifyContent: "center",
  },

  item: {
    fontSize: 20,
    fontWeight: "600",
    backgroundColor: colors.lightGray,
    padding: 5,
    height: 35,
    width: 40,
    textAlign: "center",
  },
  location: {
    fontSize: 12,
    fontWeight: "600",
  },
});
