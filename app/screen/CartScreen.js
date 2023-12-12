import React, { useState, useCallback, useContext, useEffect } from "react";

import { View, StyleSheet, FlatList, ScrollView, Alert } from "react-native";
//import MessageItem from "../components/MessageItem";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import settings from "../config/setting";

import colors from "../config/colors";
import Icon from "../components/Icon";
import * as Yup from "yup";

import CartContext from "../auth/cartContext";
import AuthContext from "../auth/context";
import CartItem from "../components/CartItem";
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

const validationSchema = Yup.object().shape({
  payment_options: Yup.object().required().nullable().label("Payment Options"),
  delivery_address: Yup.object()
    .required()
    .nullable()
    .label("Delivery Address"),
});

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
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

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
  });

  const handleSubmit = async ({ payment_options, delivery_address }) => {
    const result = await orderApi.storeOrders(
      JSON.stringify(cart),
      payment_options,
      delivery_address
    );
    // const tokenSet= result.access_token;

    //console.log("==================");
    setLoading(false);

    if (!result.ok) return;
    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.success == false) {
      //  console.log("Krishna");
      setEstatus(true);

      setError(result.data.message);
    } else if (result.data.success == true) {
      setCart([]);
      const { data: id, message: messageSend } = result.data;

      Alert.alert("Success", messageSend, [
        {
          text: "Ok",
          onPress: () => {
            setCart([]);
            navigation.navigate(routes.SEARCH_FOOD);
          },
        },
      ]);
      // navigation.navigate(routes.PRO_DONE, {
      //   message: messageSend,
      //   id: id,
      //   navRoute: routes.ACCOUNT_ADDRESS,
      // });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  const onDelete = (id) => {
    // console.log(cart);
    const newCartData = cart.filter((c) => c.data.id !== id);
    setCart(newCartData);
    //  console.log("Delete Clicked :" + id);
  };

  const handlePress = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Yes",
        onPress: () => onDelete(id),
      },
      { text: "No" },
    ]);
  };

  const onEdit = (id) => {
    navigation.navigate(routes.SEARCH_DETAILS, { id: id });
    // console.log("Edit Clicked :" + id);
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

  function totalCount() {
    if (cart) {
      let grandTotal = 0;
      cart.forEach((e) => {
        let price = Number(e.data.customer_price);
        let qty = Number(e.qnt);
        let total = price * qty;
        // setTotalAmount(totalAmount + total);
        // return total;
        grandTotal += total;
      });

      return grandTotal.toFixed(2);
    }
  }

  //console.log(cart.food_id);
  // console.log(cart.length);
  const formatCartData = () => {
    let foods = [];
    let venders = [];
    let venderDat = [];
    cart.map((n) => {
      //  console.log(n.food_id);
      foods.push(n.food_id);
      venders.push(n.vender_id);
      //  venders.push(n.vender_id);
    });
    //   console.log("-----foods--------");
    //   console.log(foods);
    // console.log("-------------");
    // console.log(venders);
    // console.log("-----unique--------");

    let uniqueVandersID = venders.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
    // console.log(uniqueVandersID);

    let uniqueVandersData = [];
    let productData = [];

    uniqueVandersID.map((v) => {
      // console.log(count + " ----------");
      let venderData = "";
      let totalPrice = 0;
      cart.map((n) => {
        if (n.vender_id === v) {
          productData.push({ food: n.fData, arguments: n.arguments });
          venderData = n.vData;
          totalPrice = n.tPrice;
        }
      });

      uniqueVandersData.push({
        id: v,
        vData: venderData,
        tPrice: totalPrice,
        mData: productData,
      });
    });

    //   console.log(uniqueVandersData);

    uniqueVandersData.map((vD) => {
      // console.log(vD.id);
      // console.log(vD.vData);
      // console.log(vD.tPrice);
      // console.log(vD.mData);
      // console.log("++++++++++++++");
    });

    console.log(JSON.stringify(uniqueVandersData));
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />

      <Screen>
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {item.image_name && (
              <Image
                style={styles.image}
                source={{ uri: makeUri(restData.id, item.image_name) }}
              />
            )}
          </View>

          <View
            key={op.id.toString()}
            style={[styles.container, { flexDirection: "column" }]}
          >
            <View style={styles.titleContainer}>
              <AppText style={styles.headingSmall}>{op.title}</AppText>
              <AppText style={styles.textPd}>Pick 1</AppText>
            </View>

            <View style={styles.optionsContainer}>
              {op.list.map((m) => (
                <AppRadioCustom
                  key={m.id.toString()}
                  text={m.description}
                  price={m.price}
                  data={m}
                  onPress={addItem}

                  // onCheck={onCheck}
                />
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              title={"Add To Basket (RM " + totalPrice + ")"}
              color="green"
              onPress={handleAddCart}
            />
          </View>
        </ScrollView> */}
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
});

export default CartScreen;
