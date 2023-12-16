import React, { useState, useEffect, useCallback, useContext } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";

import AppText from "../components/AppText";

import AppButton from "../components/AppButton";
import { ErrorMessage, LinkButton } from "../components/forms";
import menuApi from "../api/menu";
import CartContext from "../auth/cartContext";
import settings from "../config/setting";
import AppRadioPayment from "../components/AppRadioPayment";
import OrderItemList from "../components/OrderItemList";
import OrderItemListTotal from "../components/OrderItemListTotal";
import PlaceOrderItem from "../components/PlaceOrderItem";

const TestData = {
  id: 23,
  vData: {
    id: 23,
    name: "Mandala Restaurant",
    location: "Bangsar Park",
    image: "rest_logo.png",
  },
  tPrice: 31,
  mData: [
    {
      vender_id: 23,
      vData: {
        id: 23,
        name: "Mandala Restaurant",
        location: "Bangsar Park",
        image: "rest_logo.png",
      },
      food_id: 41,
      fData: {
        id: 41,
        title: "Baos & Dimsums-Asian Street Kitchen",
        discription:
          "Crispy vegetables tossed with lotus stem in tangy chili sauce",
        image: "1.jpg",
        price: "16.00",
      },
      tPrice: 22,
      arguments: [2, 4, 5],
    },
    {
      vender_id: 23,
      vData: {
        id: 23,
        name: "Mandala Restaurant",
        location: "Bangsar Park",
        image: "rest_logo.png",
      },
      food_id: 43,
      fData: {
        id: 43,
        title: "Third Wave Coffee",
        discription:
          "Serves 1 | A rich shot of espresso, diluted to create a weakened black coffee.",
        image: "9.jpg",
        price: "5.00",
      },
      tPrice: 9,
      arguments: [11, 12],
    },
  ],
};

const dataPayment = [
  { id: 1, title: "Cash On Delivery", status: false },
  { id: 2, title: "Card Payment", status: false },
  { id: 3, title: "eWallet Payment", status: false },
];

function PlaceOrderScreen({ route, navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const fethcID = route.params.venderId;
  const cartData = route.params.data;

  const { user, logOut } = useAuth();

  // const currrentUser = user.id;
  const [subTotal, setSubTotal] = useState(cartData.tPrice);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [payOptions, setPayOptions] = useState(dataPayment);
  const [payMethod, setPayMethod] = useState(null);

  const delivryFee = 5;
  const TaxPercentage = 6;
  const taxPrice = (subTotal * TaxPercentage) / 100;
  const grandTotal = taxPrice + subTotal + delivryFee;

  // console.log(cartData.reduce((n, { tPrice }) => n + tPrice, 0));
  // const sum = cartData.reduce((accumulator, object) => {
  //   console.log(accumulator);
  //   //  return accumulator + object.salary;
  // }, 0);

  // console.log(cartData.mData);
  // console.log(JSON.stringify(cartData));

  const onCheckPress = (data) => {
    const getPaymentData = [...payOptions];
    getPaymentData.forEach((element, index) => {
      getPaymentData[index].status = false;
    });
    const index = getPaymentData.indexOf(data);
    getPaymentData[index] = { ...data };
    getPaymentData[index].status = !getPaymentData[index].status;
    setPayOptions(getPaymentData);
    setPayMethod(data);

    // console.log(getPaymentData);
    // console.log(id + "---" + status);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && cartData && (
        <Screen>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <AppText
                style={[styles.heading, { marginLeft: 10, marginTop: 5 }]}
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
                      style={[styles.priceItem, { fontSize: 13, right: 15 }]}
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
              <View style={styles.orderItemHeader}>
                <AppText
                  style={[styles.heading, { marginLeft: 15, marginTop: 5 }]}
                >
                  Order Summary
                </AppText>
                <AppText
                  style={[styles.heading, { marginRight: "5%", marginTop: 5 }]}
                >
                  Price
                </AppText>
              </View>

              {cartData.mData.map((item, index) => (
                <PlaceOrderItem
                  sn={index}
                  title={item.fData.title}
                  extra={item.fData.title}
                  price={item.fData.price}
                  tPrice={item.tPrice}
                />
              ))}
              <View style={styles.content}>
                <View
                  style={[
                    styles.foodContainer,
                    { marginLeft: 10, flexDirection: "column" },
                  ]}
                >
                  <OrderItemList text="Subtotal" price={subTotal} />
                  <OrderItemList text="Incl. Tax" price={taxPrice} />
                  <OrderItemList text="Delivery fee" price={delivryFee} />
                </View>
              </View>
            </View>

            <View style={[styles.container, { flexDirection: "column" }]}>
              <View style={styles.titleContainer}>
                <AppText
                  style={[styles.heading, { marginLeft: 15, marginTop: 5 }]}
                >
                  Payment Method
                </AppText>
              </View>

              <View style={styles.optionsContainer}>
                {payOptions.map((m) => (
                  <AppRadioPayment
                    key={m.id.toString()}
                    id={m.id}
                    text={m.title}
                    status={m.status}
                    data={m}
                    onPress={onCheckPress}
                  />
                ))}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <OrderItemListTotal text="Total (incl. tax)" price={grandTotal} />
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
  content: { flexDirection: "row", paddingVertical: 5 },
  calender: {
    backgroundColor: "#fff4ee",
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 20,
    borderColor: colors.orange,
    borderWidth: 1,
  },
  foodContainer: { flex: 1, flexDirection: "row" },
  headContainer: { paddingLeft: 10, width: "80%" },
  priceContainer: {},
  image: {
    width: "100%",
    height: 200,
    alignSelf: "center",
  },
  heading: {
    fontWeight: "900",
    fontSize: 14,
    paddingTop: 0,
    color: colors.secondary,
  },

  headingSmall: {
    fontWeight: "800",
    fontSize: 12,
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.secondary,
  },
  orderItemHeader: { flexDirection: "row", justifyContent: "space-between" },

  text: {
    fontSize: 12,
  },
  textPd: {
    fontSize: 10,
    paddingBottom: 5,
    paddingTop: 12,
    paddingLeft: 10,
    color: colors.medium,
  },
  iconAdd: { marginTop: 12, marginLeft: 10 },
  price: {
    color: colors.primary,
    fontWeight: "800",
    textAlign: "center",
  },
  priceItem: {
    color: colors.primary,
    fontWeight: "800",
    textAlign: "right",
    fontSize: 12,
  },
  bPrice: { fontSize: 12, textAlign: "center" },
  titleContainer: { flexDirection: "row" },
  optionsContainer: { flexDirection: "column", paddingLeft: 10 },
  buttonContainer: {
    padding: 10,
  },
  itemTextBold: {
    color: colors.secondary,
    fontWeight: "800",
    fontSize: 12,
  },
  itemTextNormal: {
    color: colors.primary,
    fontWeight: "800",
    textAlign: "center",
    fontSize: 12,
  },
});

export default PlaceOrderScreen;
