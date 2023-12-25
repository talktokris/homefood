import React, { useState, useCallback, useContext, useEffect } from "react";

import { View, StyleSheet, FlatList, ScrollView, Alert } from "react-native";
//import MessageItem from "../components/MessageItem";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
import routes from "../navigation/routes";
import settings from "../config/setting";

import colors from "../config/colors";
import Icon from "../components/Icon";
import * as Yup from "yup";

import CartContext from "../auth/cartContext";
import AuthContext from "../auth/context";
import AppTextSearch from "../components/AppTextSearch";
import {
  AppForm,
  AppFormField,
  LinkButton,
  SubmitButton,
  AppFormPicker,
  ErrorMessage,
  NormalMessage,
  AppFormPickerMultiLine,
} from "../components/forms";
import AppText from "../components/AppText";
import orderApi from "../api/order";
import RestaurantCartInfo from "./RestaurantCartInfo";
import RestaurantOrderInfo from "./RestaurantOrderInfo";

const validationSchema = Yup.object().shape({
  payment_options: Yup.object().required().nullable().label("Payment Options"),
  delivery_address: Yup.object()
    .required()
    .nullable()
    .label("Delivery Address"),
});
const sampleData = [
  {
    id: 1,
    user_id: 25,
    total_items: 2,
    deliver_fee: "5.00",
    tax: "1.60",
    customer_amount: "26.80",
    grand_total: "33.40",
    payment_type: 1,
    deliver_status: 0,
    vender_id: 23,
    vender: {
      id: 23,
      name: "Mandala Restaurant",
      first_name: "Arati",
      last_name: "Thakur",
      banner_image: "rest_logo.png",
      location_lebel: "Bangsar Park",
      altitude: "0.00000",
      latitude: "0.00000",
      rating: "0.00",
    },
    orders: [
      {
        id: 1,
        menu_id: 41,
        customer_price: "15.51",
        discount_per: 6,
        price_after_discount: "14.10",
        order_status: "1",
        order_status_word: "Pending",
        menu: {
          id: 41,
          food_title: "Baos & Dimsums-Asian Street Kitchen",
          food_description:
            "Crispy vegetables tossed with lotus stem in tangy chili sauce",
          image_name: "1.jpg",
          veg_status: 1,
          halal_status: "0",
          customer_price: "16.00",
          discount_per: 6,
          extra: [
            {
              id: 1,
              customer_price: "1.88",
              discount: 6,
              title: "Vegetarian Sambal Belacan",
              price: "2.00",
              heading: "Extras",
            },
            {
              id: 2,
              customer_price: "1.88",
              discount: 6,
              title: "Vegetarian Sambal Belacan",
              price: "2.00",
              heading: "Extras",
            },
            {
              id: 3,
              customer_price: "1.88",
              discount: 6,
              title: "Mee",
              price: "2.00",
              heading: "Choice of Preparation",
            },
          ],
        },
      },
      {
        id: 2,
        menu_id: 45,
        customer_price: "4.14",
        discount_per: 6,
        price_after_discount: "3.76",
        order_status: "1",
        order_status_word: "Pending",
        menu: {
          id: 45,
          food_title: "Dunkin' - Donuts & Coffee",
          food_description: "Desserts, Cafe",
          image_name: "7.jpg",
          veg_status: 1,
          halal_status: "0",
          customer_price: "4.00",
          discount_per: 0,
          extra: [
            {
              id: 3,
              customer_price: "1.88",
              discount: 6,
              title: "Tofu",
              price: "2.00",
              heading: "Choice of Preparation",
            },
            {
              id: 4,
              customer_price: "1.88",
              discount: 6,
              title: "Non-Vegetarian Sambal Belacan",
              price: "2.00",
              heading: "Extras",
            },
            {
              id: 5,
              customer_price: "1.88",
              discount: 6,
              title: "Non-Vegetarian Sambal Belacan",
              price: "2.00",
              heading: "Extras",
            },
          ],
        },
      },
    ],
  },
];

function OrdersScreen({ navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const [user, setUser] = useContext(AuthContext);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true);
    setEstatus(false); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    orderApi
      .pendingOrders()
      .then((data) => {
        if (data.ok) {
          //  setMenuData(data);
          setLoading(false);
          setEstatus(false);
          setOrderData(data.data.data);

          // console.log(data.data.data);
        } else {
          setError(
            "Unable to get the database. Please check your internet connection"
          );
          setEstatus(true);
        }
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />

      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orderData.length >= 1 ? (
            <View>
              {orderData.map((item) => (
                <RestaurantOrderInfo
                  key={item.id.toString()}
                  id={item.id}
                  vData={item.vender}
                  oData={item.orders}
                  tPrice={item.customer_amount}
                  onDelete={() => console.log("Delete Clicked")}
                  onAddItem={(foodId) => {
                    navigation.navigate(routes.HOME_FOOD_DETAILS, {
                      // id: item.id,
                      foodId: foodId,
                      itemData: item,
                      venderId: item.id,
                      type: "list",
                    });
                  }}
                  onChecOut={() => {
                    // console.log("Hi Checkout " + item.id);
                    navigation.navigate(routes.PLACE_ORDER, {
                      venderId: item.id,
                      data: item,
                    });
                  }}
                />
              ))}
            </View>
          ) : (
            <View style={styles.noItemBox}>
              <AppText style={styles.noItemText}>No Orders found</AppText>
            </View>
          )}
        </ScrollView>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  innterContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  left: { width: "60%" },
  right: { width: "40%" },
  lebel: {
    fontSize: 22,
    color: colors.secondary,
    fontWeight: "800",
  },
  lebelSm: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "800",
  },
  price: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "800",
  },
  noItemBox: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  noItemText: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.medium,
  },
});

export default OrdersScreen;
