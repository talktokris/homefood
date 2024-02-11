import React, { useState, useEffect, useCallback, useContext } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";

import FoodItem from "../components/FoodItem";
import AppText from "../components/AppText";

import AppButton from "../components/AppButton";
import { ErrorMessage, LinkButton } from "../components/forms";
import menuApi from "../api/menu";
import CartContext from "../auth/cartContext";
import AppCheckBoxCustom from "../components/AppCheckBoxCustom";
import AppRadioCustom from "../components/AppRadioCustom";
import settings from "../config/setting";

function FoodOptionsScreen({ route, navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const item = route.params.item;
  const options = item.arguments;
  const vender = route.params.vender;
  const restData = vender[0];
  const { user, logOut } = useAuth();

  // const currrentUser = user.id;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const [totalPrice, setTotalPrice] = useState(item.customer_price);
  const [items, setItems] = useState([]);
  const [optionData, setOptionData] = useState([]);

  function choiseObjectSet() {
    const choiseDataFilter = options.filter((item) => item.data == 1);
    if (choiseDataFilter.length >= 1) {
      let sn = 1;
      // let list = choiseDataFilter[0].list;

      let optionsChoiseData = [];
      choiseDataFilter.forEach((element) => {
        let optionsChoise = [];
        element.list.forEach((item) => {
          let option = {
            id: sn,
            head: element.id,
            title: item.description,
            status: false,
            price: item.price,
          };
          optionsChoise.push(option);

          sn++;
        });
        // setting first option true
        optionsChoise[0].status = true;
        let choiseDataSet = { head: element.id, optionsData: optionsChoise };
        optionsChoiseData.push(choiseDataSet);
      });
      setOptionData(optionsChoiseData);

      // console.log(optionsChoiseData);
    }
  }

  useEffect(() => {
    choiseObjectSet();
    // console.log(cart);
  }, []);

  //console.log(item.arguments);
  function onCheck(value) {
    // console.log(value);
    //  setComStatus(false);
  }

  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";
    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }

  const addItem = (m, status) => {
    let itemPrice = m.price;
    let id = m.id;
    const getItems = [...items];
    if (status) {
      setTotalPrice(+totalPrice - +itemPrice);
      const index = getItems.indexOf(id);
      getItems.splice(index, 1);
      setItems(getItems);
    } else {
      setTotalPrice(+totalPrice + +itemPrice);
      // items.push(m.id);
      getItems.push(id);
      setItems(getItems);
    }
    // console.log(m);
  };

  const handleAddCart = () => {
    const venderData = {
      id: restData.id,
      name: restData.name,
      location: restData.location_lebel,
      image: restData.banner_image,
    };

    const foodData = {
      id: item.id,
      title: item.food_title,
      discription: item.food_description,
      image: item.image_name,
      price: item.customer_price,
    };
    // console.log(restData);

    const cartObj = {
      vender_id: item.user_id,
      vData: venderData,
      food_id: item.id,
      fData: foodData,
      tPrice: totalPrice,
      arguments: items,
    };
    const getCarts = [...cart, cartObj];
    setCart(getCarts);

    Alert.alert("", "Item added successfully", [
      {
        text: "Ok",
        onPress: () => navigation.goBack(),
      },
    ]);
    // console.log(getCarts);

    // navigation.navigate(routes.HOME_FOOD_DETAILS, {
    //   foodId: item.id,
    //   itemData: item,
    //   venderId: item.user_id,
    //   type: "list",
    // });
  };

  const onCheckPress = (data) => {
    // console.log(data);
    // full array  cloning
    const getOptionDataFull = [...optionData];

    // filttering curent options
    const getOptionData = getOptionDataFull.filter(
      (item) => item.head === data.head
    );
    // finding main Array Index c
    const mainIndex = getOptionDataFull.indexOf(getOptionData[0]);

    // over ridding all status value to false
    getOptionData[0].optionsData.forEach((element, index) => {
      getOptionData[0].optionsData[index].status = false;
    });

    // finding index of clicked option
    const index = getOptionData[0].optionsData.indexOf(data);

    // changind status to oposite

    getOptionData[0].optionsData[index] = { ...data };
    getOptionData[0].optionsData[index].status =
      !getOptionData[0].optionsData[index].status;

    // full array  cloning
    const cloneFullArrayData = [...optionData];
    cloneFullArrayData[mainIndex].optionsData = getOptionData[0].optionsData;

    setOptionData(cloneFullArrayData);
    // setPayOptions(getPaymentData);
    // setPayMethod(data.id);
    // console.log(data);
    // console.log(getPaymentData);
    // console.log(id + "---" + status);
  };

  // console.log(item.arguments);
  // console.log(restData.name);
  function getSingleOption(headId) {
    let newData = optionData.filter((fi) => fi.head == headId);
    // console.log(newData);
    // console.log(newData[0].optionsData);
    if (newData.length >= 1) {
      return newData[0].optionsData;
    } else {
      return newData;
    }

    // return optionData.filter((fi) => fi.head == headId);
  }
  // getSingleOption(headId)
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {item.image_name && (
                <Image
                  style={styles.image}
                  source={{ uri: makeUri(restData.id, item.image_name) }}
                />
              )}
            </View>
            <View style={styles.container}>
              <View style={styles.foodContainer}>
                <View style={styles.headContainer}>
                  <AppText style={styles.heading}>{item.food_title}</AppText>
                  <AppText style={styles.text}>{item.food_description}</AppText>
                </View>
                <View style={styles.priceContainer}>
                  <AppText style={styles.price}>
                    RM {item.customer_price}
                  </AppText>
                  <AppText style={styles.bPrice}>Best Price</AppText>
                </View>
              </View>
            </View>

            {/* <View style={[styles.container, { flexDirection: "column" }]}>
              <View style={styles.titleContainer}>
                <AppText style={styles.headingSmall}>Extras</AppText>
                <AppText style={styles.textPd}>Optional max 2</AppText>
              </View>

              <View style={styles.optionsContainer}>
                {extraData.map((e) => (
                  <AppCheckBoxCustom
                    key={e.id.toString()}
                    text={e.title}
                    price={e.price}
                    onPress={() => console.log("I accept")}
                  />
                ))}
              </View>
            </View> */}

            {/* <View style={[styles.container, { flexDirection: "column" }]}>
              <View style={styles.titleContainer}>
                <AppText style={styles.headingSmall}>
                  Choice of Preparation
                </AppText>
                <AppText style={styles.textPd}>Pick 1</AppText>
              </View>

              <View style={styles.optionsContainer}>
                {MixDataChoice.map((m) => (
                  <AppRadioCustom
                    key={m.id.toString()}
                    id={m.id}
                    text={m.title}
                    price={m.price}
                    onPress={onCheck}
                    status={comStatus}
                    // onCheck={onCheck}
                  />
                ))}
              </View>
            </View> */}
            {options.map((op) =>
              op.pick_type ? (
                <View
                  key={op.id.toString()}
                  style={[styles.container, { flexDirection: "column" }]}
                >
                  <View style={styles.titleContainer}>
                    <AppText style={styles.headingSmall}>{op.title}</AppText>
                    <AppText style={styles.textPd}>Pick 1</AppText>
                  </View>

                  <View style={styles.optionsContainer}>
                    {optionData.length >= 1 &&
                      getSingleOption(op.id).map((m, index) => (
                        <AppRadioCustom
                          id={m.id}
                          key={index.toString()}
                          text={m.title}
                          status={m.status}
                          price={m.price}
                          data={m}
                          // onPress={addItem}

                          onPress={onCheckPress}

                          // onCheck={onCheck}
                        />
                      ))}
                  </View>
                </View>
              ) : (
                <View
                  key={op.id.toString()}
                  style={[styles.container, { flexDirection: "column" }]}
                >
                  <View style={styles.titleContainer}>
                    <AppText style={styles.headingSmall}>{op.title}</AppText>
                    <AppText style={styles.textPd}></AppText>
                  </View>

                  <View style={styles.optionsContainer}>
                    {op.list.map((n) => (
                      <AppCheckBoxCustom
                        key={n.id.toString()}
                        text={n.description}
                        price={n.price}
                        data={n}
                        onPress={addItem}
                      />
                    ))}
                  </View>
                </View>
              )
            )}

            <View style={styles.buttonContainer}>
              <AppButton
                title={"Add To Basket (RM " + totalPrice + ")"}
                color="green"
                onPress={handleAddCart}
              />
            </View>
          </ScrollView>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingBottom: 5,
  },
  foodContainer: { flex: 1, flexDirection: "row" },
  headContainer: { padding: 10, width: "75%" },
  priceContainer: {
    flexDirection: "column",
    with: "25%",
    padding: 10,
  },
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

export default FoodOptionsScreen;
