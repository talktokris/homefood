import React, { useState } from "react";
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
import Stars from "./Stars";
import Price from "./Price";
import CatHalal from "./CatHalal";
import LocationTime from "./LocationTime";
import VegStatus from "./VegStatus";
import PromoTop from "./PromoTop";

function FoodItem({
  id,
  title,
  subTitle,
  price,
  currency = "RM ",
  image,
  distance,
  distanceUnit,
  onPress,
}) {
  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
          <View style={styles.content}>
            {image && <Image style={styles.image} source={{ uri: image }} />}

            <View style={styles.appTextContainer}>
              <PromoTop lebel="PROMO" text="SPONSORED" />
              <AppText style={styles.title} numberOfLines={2}>
                {title}
              </AppText>
              {subTitle && (
                <AppText style={styles.subTitle} numberOfLines={3}>
                  {subTitle}
                </AppText>
              )}
              <View style={styles.vListContainer}>
                <LocationTime time="30 min" distance="2.1 KM" />
                <Stars />
              </View>

              <View style={styles.vListContainer}>
                <Price price="20" oldPrice="10" />
                <VegStatus status="0" />
                <CatHalal halalStatus="Non Halal" foodCategory="Asian Food" />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
}

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
  },
  content: {
    flexDirection: "row",
    width: "100%",

    // backgroundColor: "red",
  },
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
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.secondary,
  },
  subTitle: {
    fontSize: 13,
    color: colors.secondary,
    paddingRight: 4,
  },

  vListContainer: { flexDirection: "row", justifyContent: "space-between" },
  promoContainer: { flexDirection: "row" },
});
