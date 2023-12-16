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

const validationSchema = Yup.object().shape({
  payment_options: Yup.object().required().nullable().label("Payment Options"),
  delivery_address: Yup.object()
    .required()
    .nullable()
    .label("Delivery Address"),
});
const sampleCartData = [
  {
    arguments: [],
    fData: {
      discription:
        "1 Regular Cheeeeeeeza Pizza + 1 Huts Breadstix Mozzarella + 2 Cream of Mushroom Soup + 2 Can Drinks",
      id: 53,
      image: "2.jpg",
      price: "12.00",
      title: "Cheeeeeeeza Combo 1",
    },
    food_id: 53,
    tPrice: "12.00",
    vData: {
      id: 30,
      image: "rest_logo.png",
      location: "Bangsar",
      name: "Pizza Hut",
    },
    vender_id: 30,
  },
  {
    arguments: [],
    fData: {
      discription: "2 Persoal Pizza + 2 Sides + 2 Soft Drinks",
      id: 54,
      image: "3.jpg",
      price: "12.00",
      title: "Hut’s Lava Onde Onde Cake",
    },
    food_id: 54,
    tPrice: "12.00",
    vData: {
      id: 30,
      image: "rest_logo.png",
      location: "Bangsar",
      name: "Pizza Hut",
    },
    vender_id: 30,
  },
  {
    arguments: [2, 4, 5],
    fData: {
      discription:
        "Crispy vegetables tossed with lotus stem in tangy chili sauce",
      id: 41,
      image: "1.jpg",
      price: "16.00",
      title: "Baos & Dimsums-Asian Street Kitchen",
    },
    food_id: 41,
    tPrice: 22,
    vData: {
      id: 23,
      image: "rest_logo.png",
      location: "Bangsar Park",
      name: "Mandala Restaurant",
    },
    vender_id: 23,
  },
  {
    arguments: [22, 20],
    fData: {
      discription: "Desserts, Cafe",
      id: 45,
      image: "7.jpg",
      price: "4.00",
      title: "Dunkin' - Donuts & Coffee",
    },
    food_id: 45,
    tPrice: 8,
    vData: {
      id: 23,
      image: "rest_logo.png",
      location: "Bangsar Park",
      name: "Mandala Restaurant",
    },
    vender_id: 23,
  },
  {
    arguments: [37, 34, 38],
    fData: {
      discription: "Fine Chocolate Silk Ice Cream [SWISS] 140 ML",
      id: 48,
      image: "5.jpg",
      price: "17.00",
      title: "GLOBO Ice Creams Of The World",
    },
    food_id: 48,
    tPrice: 23,
    vData: {
      id: 23,
      image: "rest_logo.png",
      location: "Bangsar Park",
      name: "Mandala Restaurant",
    },
    vender_id: 23,
  },
];

const cartDataSet = [
  {
    id: 23,
    vData: {
      id: 23,
      name: "Mandala Restaurant",
      location: "Bangsar Park",
      image: "rest_logo.png",
    },
    tPrice: 22,
    mData: [
      {
        food: {
          id: 43,
          title: "Third Wave Coffee",
          discription:
            "Serves 1 | A rich shot of espresso, diluted to create a weakened black coffee.",
          image: "9.jpg",
          price: "5.00",
        },
        arguments: [7, 10],
      },
      {
        food: {
          id: 41,
          title: "Baos & Dimsums-Asian Street Kitchen",
          discription:
            "Crispy vegetables tossed with lotus stem in tangy chili sauce",
          image: "1.jpg",
          price: "16.00",
        },
        arguments: [3, 5, 4],
      },
    ],
  },
];

function CartScreen({ navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const [user, setUser] = useContext(AuthContext);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);

  const userData = user.results[0];
  //console.log(userData.default_address.id);

  function seletedAddress(data) {
    d.id == userData.default_address.id;
  }
  const stateSelectedItem = userData.address_list.find(
    (c) => c.id == userData.default_address.id
  );

  useEffect(() => {
    formatCartData();
  }, [cart]);

  // const handleSubmit = async ({ payment_options, delivery_address }) => {
  //   const result = await orderApi.storeOrders(
  //     JSON.stringify(cart),
  //     payment_options,
  //     delivery_address
  //   );
  //   // const tokenSet= result.access_token;

  //   //console.log("==================");
  //   setLoading(false);

  //   if (!result.ok) return;
  //   if (!result.data) {
  //     setEstatus(true);
  //     setError(
  //       "Unable to connect to server. Please check your Internet connection"
  //     );
  //   } else if (result.data.success == false) {
  //     //  console.log("Krishna");
  //     setEstatus(true);

  //     setError(result.data.message);
  //   } else if (result.data.success == true) {
  //     setCart([]);
  //     const { data: id, message: messageSend } = result.data;

  //     Alert.alert("Success", messageSend, [
  //       {
  //         text: "Ok",
  //         onPress: () => {
  //           setCart([]);
  //           navigation.navigate(routes.SEARCH_FOOD);
  //         },
  //       },
  //     ]);
  //     // navigation.navigate(routes.PRO_DONE, {
  //     //   message: messageSend,
  //     //   id: id,
  //     //   navRoute: routes.ACCOUNT_ADDRESS,
  //     // });
  //   } else {
  //     setEstatus(true);
  //     setError("Unknown error");
  //   }
  // };

  const onDelete = (id) => {
    // console.log(cart);
    const newCartData = cart.filter((c) => c.data.id !== id);
    setCart(newCartData);
    //  console.log("Delete Clicked :" + id);
  };

  const handleDeletePress = (d, ai) => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Yes",
        onPress: handleDelete(d, ai),
      },
      { text: "No" },
    ]);
  };

  function makeUri(defID, imaData) {
    // console.log(imaData.food_menu_id);
    let imgUri = (imgUri = settings.imageUrl + "/menu/no_image.jpg");

    if (imaData != null)
      imgUri =
        settings.imageUrl +
        "/menu/" +
        imaData.food_menu_id +
        "/" +
        imaData.image_name;
    //  console.log(imgUri);

    return imgUri;
  }

  const formatCartData = () => {
    let foods = [];
    let venders = [];
    let venderDat = [];
    cart.map((n) => {
      foods.push(n.food_id);
      venders.push(n.vender_id);
    });

    let uniqueVandersID = venders.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );

    let uniqueVandersData = [];
    uniqueVandersID.map((v) => {
      // console.log(v + " ----------");
      let venderData = "";
      let totalPrice = 0;
      let productData = cart.filter((item) => item.vData.id === v);
      cart.map((n) => {
        if (n.vender_id === v) {
          venderData = n.vData;
          totalPrice += +n.tPrice;

          //  console.log(n.fData);
        }
      });

      uniqueVandersData.push({
        id: v,
        vData: venderData,
        tPrice: totalPrice,
        mData: productData,
      });
    });

    uniqueVandersData.map((vD) => {
      // console.log(vD.id);
      // console.log(vD.vData);
      // console.log(vD.tPrice);
      // console.log(vD.mData);
      // console.log("++++++++++++++");
    });

    setCartData(uniqueVandersData);

    // console.log(JSON.stringify(uniqueVandersData));
  };

  const handleDelete = (d, ai) => {
    (item, i, ar) => ar.indexOf(item);
    let newProductData = cart.filter((item, i) => ai != i);
    // let newProductData = cart.filter((item) => item.food_id != d);

    setCart(newProductData);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />

      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cart.length >= 1 ? (
            <View>
              {cartData.map((item) => (
                <RestaurantCartInfo
                  key={item.id.toString()}
                  id={item.id}
                  vData={item.vData}
                  tPrice={item.tPrice}
                  mData={item.mData}
                  onDelete={handleDeletePress}
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
              <AppText style={styles.noItemText}>No item in cart found</AppText>
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

export default CartScreen;
