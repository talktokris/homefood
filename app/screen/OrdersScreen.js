import React, { useState, useCallback, useContext, useEffect } from "react";

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
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    orderApi
      .pendingOrders()
      .then((data) => {
        if (data.ok) {
          setMenuData(data);
          setLoading(false);
          setMenuData(data.data.data);
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

  // Delete

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
    //  console.log(imaData);
    let imgUri = (imgUri = settings.imageUrl + "/menu/no_image.jpg");

    if (imaData != null)
      imgUri = settings.imageUrl + "/menu/" + defID + "/" + imaData.image_name;

    return imgUri;
  }

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <FlatList
            data={menuData}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <OrderItem
                id={item.id}
                data={item}
                title={item.menu.user_id}
                //  image={item.id}
                image={makeUri(item.menu_id, item.menu.default_image)}
                price={item.customer_price}
                qty={item.qty}
                trackButton={true}
                onTrack={() =>
                  navigation.navigate(routes.ORDER_TRACKING, { data: item })
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
      )}
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

export default OrdersScreen;
