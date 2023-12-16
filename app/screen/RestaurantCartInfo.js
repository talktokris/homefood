import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ScrollView,
  TouchableHighlight,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LocationTime from "../components/LocationTime";
import Stars from "../components/Stars";
import RightArrow from "./RightArrow";
import Price from "../components/Price";
import settings from "../config/setting";
import VegStatus from "../components/VegStatus";
import CatHalal from "../components/CatHalal";
import AppButton from "../components/AppButton";
import CartItem from "../components/CartItem";

function RestaurantCartInfo({
  id,
  vData,
  tPrice,
  mData,
  onDelete,
  onAddItem,
  onChecOut,
}) {
  const scrollView = useRef();

  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";

    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }
  // console.log(mData);
  // console.log(mData[0].fData.image);

  return (
    <>
      <Screen>
        <View style={styles.restContainer}>
          <View style={styles.restItem}>
            <View style={styles.restItemContainer}>
              <Image
                style={styles.image}
                source={{ uri: makeUri(vData.id, vData.image) }}
              />
              <AppText style={styles.heading}>{vData.name}</AppText>
              <AppText style={[styles.text, { marginLeft: 0 }]}>
                {vData.location} <Stars />
              </AppText>
            </View>
            <View style={styles.addBtnBox}>
              <TouchableHighlight
                underlayColor={colors.lightGray}
                onPress={() => onAddItem(vData.id)}
              >
                <View style={styles.addBtn}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="plus-circle-outline"
                    size={12}
                    color={colors.dark}
                  />
                  <AppText style={styles.addBtnText}> Add Item</AppText>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.vListContainer}>
                <LocationTime time="30 min" distance="2.1 KM" />
              </View>

              <View style={styles.vListContainer}>
                <Price price={tPrice} size={14} lebel="Total " />
              </View>
            </View>
          </View>

          <View style={styles.restItem}>
            {mData.map((ci, i) => (
              <CartItem
                sn={i + 1}
                id={ci.fData.id}
                key={ci.fData.id + i.toString()}
                venderId={vData.id}
                title={ci.fData.title}
                price={ci.fData.price}
                tPrice={ci.tPrice}
                image={ci.fData.image}
                onDelete={() => onDelete(ci.fData.id, i)}
              />
            ))}
          </View>
          <View style={styles.restItem}>
            <AppButton
              title="Confirm the order"
              color="secondary"
              onPress={onChecOut}
            />
          </View>
        </View>
      </Screen>
    </>
  );
}
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
    marginTop: 20,
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

  heading: {
    fontWeight: "900",
    fontSize: 14,
    color: colors.secondary,
    textAlign: "center",
  },

  text: {
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 10,
  },
  vListContainer: { flexDirection: "row", justifyContent: "space-between" },
  addBtnBox: { position: "absolute", right: 0, top: 80 },
  addBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
    width: 100,
    borderRadius: 20,
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.dark,
    padding: 5,
  },
});

export default RestaurantCartInfo;
