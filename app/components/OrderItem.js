import React, { useState, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Stars from "./Stars";
import AppCircleButton from "./AppCircleButton";
import AppButtonSmall from "./AppButtonSmall";
import AuthContext from "../auth/context";

function OrderItem({
  id,
  title,
  price,
  currency = "RM ",
  image,
  onTrack,
  trackButton,
  qty,
  data,
}) {
  const [user, setUser] = useContext(AuthContext);
  function totalCount(price, qty) {
    let total = Number(price) * Number(qty);
    return total.toFixed(2);
  }

  function statusText(statusId) {
    const stateSelectedItem = user.options.order_status.find(
      (c) => c.id == statusId
    );
    return stateSelectedItem.title;
    // console.log(stateSelectedItem);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          {image && <Image style={styles.image} source={{ uri: image }} />}

          <View style={styles.appTextContainer}>
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

              <View style={styles.bottomRight}></View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomArea}>
        <View style={styles.bottomLeft}>
          {trackButton && (
            <AppButtonSmall
              title="  Order Tracking"
              onPress={() => onTrack()}
              color="secondary"
              icon="crosshairs-gps"
            />
          )}
        </View>

        <View style={[styles.bottomRight, { paddingLeft: 20 }]}>
          <AppText
            style={[styles.location, { fontSize: 15, marginLeft: 10 }]}
            numberOfLines={1}
          >
            Status
          </AppText>
          <View style={styles.statusBox}>
            <AppText style={styles.statusText} numberOfLines={1}>
              {statusText(data.order_status)}
            </AppText>
          </View>
        </View>
      </View>
    </>
  );
}

export default OrderItem;

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
  },

  price: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "800",
  },
  bottomArea: {
    flexDirection: "row",
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
  statusBox: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 7,
    marginBottom: 3,
  },
  statusText: {
    color: colors.orange,
    fontWeight: "900",
  },
});
