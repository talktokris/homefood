import React, { useState, useCallback, useContext } from "react";

import { View, StyleSheet, FlatList, Alert } from "react-native";
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
import OrderItem from "../components/OrderItem";
import AppTextSearch from "../components/AppTextSearch";
import {
  AppForm,
  AppFormField,
  LinkButton,
  SubmitButton,
  AppFormPicker,
  ErrorMessage,
  AppFormPickerMultiLine,
} from "../components/forms";
import AppText from "../components/AppText";
import orderApi from "../api/order";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  payment_options: Yup.object().required().nullable().label("Payment Options"),
  delivery_address: Yup.object()
    .required()
    .nullable()
    .label("Delivery Address"),
});

function OrdersScreen({ navigation }) {
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

  return (
    <Screen>
      <FlatList
        data={cart}
        keyExtractor={(message) => message.data.id.toString()}
        renderItem={({ item }) => (
          <OrderItem
            id={item.data.id}
            title={item.data.food_title}
            //  image={item.id}
            image={makeUri(
              item.data.menu_profile_img_id,
              item.data.default_image
            )}
            price={item.data.customer_price}
            qty={item.qnt}
            trackButton={true}
            onTrack={() =>
              navigation.navigate(routes.ORDER_TRACKING, { id: id })
            }
            // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
          />
        )}
        ItemSeparatorComponent={Separater}
      />
      <Separater />
      <AppForm
        initialValues={{
          payment_options: "",
          delivery_address: stateSelectedItem,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      ></AppForm>
    </Screen>
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

export default OrdersScreen;
