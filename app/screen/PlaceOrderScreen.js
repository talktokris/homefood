import React, { useState, useEffect, useCallback, useContext } from "react";

import { View, StyleSheet, FlatList, Image, Alert } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";

import FoodItem from "../components/FoodItem";
import AppTextSearch from "../components/AppTextSearch";
import AppText from "../components/AppText";

import AppButton from "../components/AppButton";
import { ErrorMessage, LinkButton } from "../components/forms";
import menuApi from "../api/menu";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AppCircleButton from "../components/AppCircleButton";
import cartStorage from "../auth/cartStorage";
import CartContext from "../auth/cartContext";
import MenuSlideShow from "../components/MenuSlideShow";
import settings from "../config/setting";
import AppCheckBoxCustom from "../components/AppCheckBoxCustom";
import AppRadioCustom from "../components/AppRadioCustom";
import OrderItemList from "../components/OrderItemList";
import OrderItemListTotal from "../components/OrderItemListTotal";

const FoodData = {
  id: 2,
  category: "Most ordered",
  title: "Rice and Sambal Chicken",
  discription: "Rice and Sambal Chicken with Spicy sweet and sour flavor",
  price: 8,
  oldPrice: 10,
  image: require("../assets/images/img2.jpg"),
};

const extraData = [
  { id: 1, title: "Vegetarian Sambal Belacan", price: 2 },
  { id: 2, title: "Non-Vegetarian Sambal Belacan", price: 1 },
  { id: 3, title: "Chili Padi With Soy Sauce", price: 4 },
  { id: 4, title: "Vegetarian Sambal Belacan", price: 1 },
];

const choiceData = [
  { id: 1, title: "Vegetarian" },
  { id: 2, title: "Non-Vegetarian" },
];

const dataPayment = [
  { id: 1, title: "Cash On Delivery" },
  { id: 2, title: "Card Payment" },
  { id: 3, title: "eWallet Payment" },
];

function PlaceOrderScreen({ route, navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const fethcID = route.params.id;
  const { user, logOut } = useAuth();

  // const currrentUser = user.id;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <AppText
                style={[styles.heading, { marginLeft: 15, marginTop: 15 }]}
              >
                Deliver to
              </AppText>
              <View style={styles.content}>
                <View style={styles.foodContainer}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    style={styles.iconAdd}
                    color={colors.primary}
                  />
                  <View style={styles.headContainer}>
                    <AppText style={styles.heading}>
                      KLIA Terminal 2 - Level Door 5
                    </AppText>
                    <AppText style={styles.text}>
                      Jalan Kila 2/2 Labu, 64000, Sepang, Selangor, Malaysia
                    </AppText>
                  </View>
                  <TouchableOpacity onPress={() => console.log("Change Click")}>
                    <AppText
                      style={[styles.price, { fontSize: 13, right: 15 }]}
                    >
                      Change
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.content}>
                <View style={styles.foodContainer}>
                  <MaterialCommunityIcons
                    name="bike-fast"
                    size={20}
                    style={styles.iconAdd}
                    color={colors.primary}
                  />
                  <View style={[styles.headContainer, { width: "70%" }]}>
                    <AppText style={styles.heading}>Delivery</AppText>
                    <AppText style={styles.text}>Deliver now (25 mins)</AppText>
                  </View>
                  <TouchableOpacity onPress={() => console.log("Change Click")}>
                    <AppText
                      style={[styles.price, { fontSize: 13, right: 15 }]}
                    >
                      Change options
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.content, styles.calender]}>
                <View style={styles.foodContainer}>
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={20}
                    style={styles.iconAdd}
                    color={colors.primary}
                  />
                  <View style={styles.headContainer}>
                    <AppText style={styles.heading}>
                      Want more flexibility ?
                    </AppText>
                    <AppText style={styles.text}>
                      Order for later to pick the best delivery time slot and
                      fees for your.
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.container}>
              <AppText
                style={[styles.heading, { marginLeft: 15, marginTop: 15 }]}
              >
                Order Summary
              </AppText>
              <View style={styles.content}>
                <View style={styles.foodContainer}>
                  <AppText style={[styles.text, { padding: 10 }]}>1.</AppText>

                  <View style={styles.headContainer}>
                    <AppText style={styles.heading}>
                      R3, 1977 Signature Honey BBQ Chicken Rice
                    </AppText>
                    <AppText style={styles.text}>
                      Take Away Packagin (1 X 19.93)
                    </AppText>
                  </View>
                  <AppText style={[styles.price, { fontSize: 13, right: 15 }]}>
                    RM 19.93
                  </AppText>
                </View>
              </View>
              <View style={styles.content}>
                <View
                  style={[
                    styles.foodContainer,
                    { marginLeft: 10, flexDirection: "column" },
                  ]}
                >
                  <OrderItemList text="Subtotal" price={10.93} />
                  <OrderItemList text="Incl. Tax" price={1.13} />
                  <OrderItemList text="Delivery fee" price={4} />
                </View>
              </View>
            </View>

            <View style={[styles.container, { flexDirection: "column" }]}>
              <View style={styles.titleContainer}>
                <AppText
                  style={[styles.heading, { marginLeft: 15, marginTop: 15 }]}
                >
                  Payment Method
                </AppText>
              </View>

              <View style={styles.optionsContainer}>
                {dataPayment.map((m) => (
                  <AppRadioCustom
                    key={m.id.toString()}
                    text={m.title}
                    onPress={() => console.log("I accept")}
                  />
                ))}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <OrderItemListTotal text="Total (incl. tax)" price={23.93} />
              <AppButton title="Place Order" color="green" />
            </View>
          </ScrollView>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 5,
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingBottom: 5,
  },
  content: { flexDirection: "row" },
  calender: {
    backgroundColor: "#fff4ee",
    borderRadius: 10,
    margin: 20,
    borderColor: colors.orange,
    borderWidth: 1,
  },
  foodContainer: { flex: 1, flexDirection: "row" },
  headContainer: { padding: 10, width: "80%" },
  priceContainer: {},
  image: {
    width: "100%",
    height: 200,
    alignSelf: "center",
  },
  heading: {
    fontWeight: "900",
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 0,
    color: colors.secondary,
  },

  headingSmall: {
    fontWeight: "800",
    fontSize: 14,
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.secondary,
  },

  text: {
    fontSize: 14,
  },
  textPd: {
    fontSize: 12,
    paddingBottom: 5,
    paddingTop: 12,
    paddingLeft: 10,
    color: colors.medium,
  },
  iconAdd: { marginTop: 12, marginLeft: 10 },
  price: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "800",
    textAlign: "center",
  },
  bPrice: { fontSize: 14, textAlign: "center" },
  titleContainer: { flexDirection: "row" },
  optionsContainer: { flexDirection: "column", paddingLeft: 10 },
  buttonContainer: {
    padding: 10,
  },
});

export default PlaceOrderScreen;
