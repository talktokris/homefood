import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, FlatList, Image } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
import routes from "../navigation/routes";
import colors from "../config/colors";

import FoodItem from "../components/FoodItem";
import AppTextSearch from "../components/AppTextSearch";
import AppText from "../components/AppText";
import settings from "../config/setting";

function FoodTrackingScreen({ route, navigation }) {
  const { user, logOut } = useAuth();
  const item = route.params.data;
  const [imageName, setImageName] = useState();

  var currency = "RM";

  function totalCount(price, qty) {
    let total = Number(price) * Number(qty);
    return total.toFixed(2);
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      makeUri(item.menu_id, item.menu.default_image);
    });
    return unsubscribe;
  }, [navigation, item]);

  function makeUri(defID, imaData) {
    //  console.log(imaData);
    let imgUri = settings.imageUrl + "/menu/no_image.jpg";

    if (imaData != null)
      imgUri = settings.imageUrl + "/menu/" + defID + "/" + imaData.image_name;
    //  console.log(imgUri);
    // return imgUri;
    setImageName(imgUri);
  }

  function statusText(statusId) {
    const stateSelectedItem = user.options.order_status.find(
      (c) => c.id == statusId
    );
    return stateSelectedItem.title;
    // console.log(stateSelectedItem);
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={{
              uri: imageName,
            }}
          />

          <View style={styles.appTextContainer}>
            <AppText style={styles.title} numberOfLines={2}>
              {item.menu.food_title}
            </AppText>

            <View style={styles.bottomArea}>
              <View style={styles.bottomLeft}>
                <AppText style={styles.location} numberOfLines={1}>
                  Price
                </AppText>
                <AppText style={styles.price} numberOfLines={1}>
                  {currency} {item.customer_price}
                </AppText>
              </View>

              <View style={styles.bottomRight}>
                <AppText style={styles.location} numberOfLines={1}>
                  Qty
                </AppText>
                <AppText style={styles.price} numberOfLines={1}>
                  {item.qty}
                </AppText>
              </View>
            </View>

            <View style={styles.bottomArea}>
              <View style={styles.bottomLeft}>
                <AppText style={styles.location} numberOfLines={1}>
                  Total
                </AppText>
                <AppText style={styles.price} numberOfLines={1}>
                  {currency} {item.total_amount}
                </AppText>
              </View>

              <View style={styles.bottomRight}></View>
            </View>
          </View>
        </View>
      </View>
      <Separater />
      <View style={styles.bottomArea}>
        <View style={[styles.bottomLeft, { fontSize: 15, marginTop: 10 }]}>
          <AppText
            style={[styles.location, { fontSize: 15, marginLeft: 10 }]}
            numberOfLines={1}
          >
            Status
          </AppText>
          <View style={styles.statusBox}>
            <AppText style={styles.statusText} numberOfLines={1}>
              {statusText(item.order_status)}
            </AppText>
          </View>
        </View>
      </View>

      <Separater />
      <View></View>
      <AppText style={styles.text}>{item.menu.food_description}</AppText>
      <Separater />

      <View style={styles.imageFrame}>
        <Image
          source={require("../assets/images/map.jpg")}
          style={styles.imageTwo}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontWeight: "900",
    fontSize: 20,
    paddingLeft: 25,
    paddingBottom: 10,
    paddingTop: 10,
    color: colors.secondary,
  },
  image: {
    width: "100%",
    height: 250,
    alignSelf: "center",
  },
  nav: {
    flexDirection: "row",
    textAlign: "center",
    padding: 15,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
  itemArea: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
  },
  item: {
    fontSize: 20,
    fontWeight: "600",
  },
  itemInput: {
    width: 40,
    height: 40,
    border: 2,
    padding: 7,
    borderRadius: 4,
    borderColor: colors.secondary,
    backgroundColor: colors.lightGray,
    marginLeft: 20,
    marginRight: 20,
  },
  btnContainer: {
    padding: 5,
  },

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
  subTitle: {
    fontSize: 13,
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
  },
  bottomLeft: {
    width: "50%",
    flexDirection: "center",
    justifyContent: "center",
  },
  bottomRight: {
    width: "50%",
    flexDirection: "center",
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
  imageFrame: {
    marginVertical: 100,
    justifyContent: "center",
    backgroundColor: colors.secondary,
    width: 380,
    height: 209,
    borderRadius: 5,
  },
  imageTwo: {
    width: 375,
    height: 305,
    alignSelf: "center",
    margin: 0,
    marginTop: 0,
    borderRadius: 4,
  },
});

export default FoodTrackingScreen;
