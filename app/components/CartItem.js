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
import settings from "../config/setting";
import Price from "../components/Price";
import VegStatus from "../components/VegStatus";
import CatHalal from "../components/CatHalal";

function CartItem({ id, sn, venderId, title, price, tPrice, image, onDelete }) {
  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";

    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }
  const exPrice = (tPrice - price).toFixed(2);
  // console.log(tPrice);
  // console.log(exPrice);

  return (
    <>
      <View style={styles.content}>
        <View style={styles.snText}>
          <AppText>{sn}.</AppText>
        </View>
        <Image
          style={styles.imageItem}
          source={{ uri: makeUri(venderId, image) }}
        />

        <View style={styles.appTextContainer}>
          <AppText style={styles.title} numberOfLines={2}>
            {title}
          </AppText>

          <View style={styles.vListContainer}>
            <VegStatus status="0" />
            <CatHalal halalStatus="Non Halal" foodCategory="Asian Food" />
          </View>
          <View style={styles.vListContainer}>
            <Price price={price} />
            {exPrice >= 1 && (
              <View style={styles.addOn}>
                <AppText style={styles.addOnText}>Extra : </AppText>
                <AppText style={styles.addOnPrice}> RM {exPrice}</AppText>
              </View>
            )}
          </View>
        </View>
        <View style={styles.delBtn}>
          <TouchableHighlight
            underlayColor={colors.lightGray}
            onPress={() => onDelete()}
          >
            <MaterialCommunityIcons
              style={styles.icon}
              name="delete"
              size={30}
              color={colors.medium}
            />
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}

export default CartItem;

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: "100%",
    height: 60,
    resizeMode: "contain",
    borderRadius: 5,
    margin: 1,
    marginLeft: 10,
  },
  imageItem: {
    width: 55,
    height: 55,
    borderRadius: 5,
    margin: 5,
  },

  restContainer: {
    flexDirection: "column",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 0,
    backgroundColor: "#f7f7f7",
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 5,
    borderColor: colors.separator,
    borderRadius: 10,
    justifyContent: "center",
  },

  restItem: {
    flexDirection: "column",
    paddingTop: 5,
    PaddingBottom: 10,
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: colors.separator,
    minHeight: 45,
    width: "auto",
  },
  restItemContainer: { flex: 1 },
  content: {
    flexDirection: "row",

    // backgroundColor: "red",
  },
  appTextContainer: {
    width: "70%",
    alignItems: "flex-start",
  },
  snText: { alignItems: "center", justifyContent: "center", width: 20 },
  delBtn: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "900",
    fontSize: 12,
    color: colors.secondary,
    textAlign: "center",
  },

  text: {
    fontSize: 10,
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 10,
  },
  vListContainer: { flexDirection: "row", justifyContent: "space-between" },
  addOn: {
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addOnText: {
    fontSize: 12,
    color: colors.medium,
    fontWeight: "600",
  },
  addOnPrice: {
    fontSize: 12,
    color: colors.medium,
    fontWeight: "900",
  },
});
