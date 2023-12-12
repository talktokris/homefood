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
import { TouchableOpacity } from "react-native-gesture-handler";
import AppCircleButton from "../components/AppCircleButton";
import cartStorage from "../auth/cartStorage";
import CartContext from "../auth/cartContext";
import MenuSlideShow from "../components/MenuSlideShow";
import settings from "../config/setting";

function FoodViewScreen_bkp({ route, navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const fethcID = route.params.id;
  const { user, logOut } = useAuth();

  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [qnt, setQnt] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [chanage, SetChange] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    SetChange(true);
    // getData();
  }, [chanage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback((id) => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    //console.log(fethcID);
    menuApi
      .fetchSingleMenu(fethcID)
      .then((data) => {
        //   console.log(data.data.results);
        if (data.ok) {
          setMenuData(data);

          setLoading(false);
          setMenuData(data.data.results[0]);
          setImages(data.data.results[0].images);
          setTotalPrice(data.data.results[0].customer_price);
          qtyUpdate(); // to update the edit qty.

          // to get the stored cart Info
          //  cartStorage.removeCart();

          // cartStorage.storeCart("krisdfds");
          // const fatchCart = cartStorage.getCart();
          //   console.log(cartStorage.getCart());
          //  if (fatchCart != null) setCartItems(fatchCart);

          //   console.log(data.data.results[0].images);
          //  console.log("Krishna : " + data.data.results[0].id);
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

  function qtyUpdate() {
    if (cart.length >= 1) {
      const viewData = cart.filter((i) => i.data.id == fethcID);

      if (viewData != null) {
        setQnt(viewData[0].qnt);
      }
    }
  }
  /*
  async function getCart() {
    await cartStorage.storeCart("Raja");
    const data = await cartStorage.getCart();
    console.log(data);
  }
  */

  const EnterEmail = ({ navigation }) => {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => null,
      });
    }, [navigation]);
  };

  const handlePlus = () => {
    const newQnt = qnt + 1;
    setQnt(newQnt);
    setTotalPrice(roundFunction(menuData.customer_price * newQnt));
  };
  const handleMinus = () => {
    if (qnt > 1) {
      setQnt(qnt - 1);
      setTotalPrice(roundFunction(menuData.customer_price * (qnt - 1)));
    }
  };
  function roundFunction(amount) {
    return parseFloat(amount).toFixed(0);
  }

  const handleCart = (item) => {
    let items = cart;

    const newItem = { data: item, qnt };
    // console.log(newItem);

    var index = items.findIndex((x) => x.data.id == item.id);
    // here you can check specific property for an object whether it exist in your array or not

    if (index === -1) {
      items.push(newItem);
      setCart(items);
      Alert.alert("Success", "Item added to cart successfully.", [
        {
          text: "Ok",
          onPress: () => navigation.navigate(routes.SEARCH_FOOD),
        },
      ]);
      //  alert("Item added to cart successfully");
    } else {
      var filterData = items.filter((d) => d.data.id !== item.id);
      filterData.push(newItem);

      setCart(filterData);

      Alert.alert("Success", "Cart updated successfully.", [
        {
          text: "Ok",
          onPress: () => navigation.navigate(routes.FOOD_CART),
        },
      ]);
      // alert("Cart updated successfully");
    }

    /*
    const newCartData =
      items.indexOf(newItem) === -1
        ? items.push(newItem)
        : console.log("This item already exists");
        */

    //  SetChange(false);
    //  console.log(items);

    // console.log("Cart Id : " + id);
    // console.log(cartItems);
  };
  //console.log(menuData.default_image.food_menu_id);

  function makeUri(defID, imaData) {
    // console.log(imaData.food_menu_id);
    let imgUri = settings.imageUrl + "/slider/images/loader.jpg";

    if (imaData != null)
      imgUri =
        settings.imageUrl +
        "/menu/" +
        imaData.food_menu_id +
        "/" +
        imaData.image_name;

    return imgUri;
  }
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <AppText style={styles.heading}>{menuData.food_title}</AppText>
          <Separater />

          <View style={styles.slideContainer}>
            {images.length >= 1 && (
              <MenuSlideShow images={images} defaultImg={makeUri(images[0])} />
            )}
          </View>

          <AppText style={styles.text}>{menuData.food_description}</AppText>
          <Separater />
          <View style={styles.itemArea}>
            <AppCircleButton icon="minus-circle" onPress={handleMinus} />
            <View style={styles.itemInput}>
              <AppText style={styles.item}> {qnt} </AppText>
            </View>
            <AppCircleButton icon="plus-circle" onPress={handlePlus} />
          </View>
          <Separater />
          <View style={styles.bottomArea}>
            <View style={styles.bottomLeft}>
              <AppText style={styles.location} numberOfLines={1}>
                Price
              </AppText>
              <AppText style={styles.price} numberOfLines={1}>
                RM {roundFunction(menuData.customer_price)}
              </AppText>
            </View>

            <View style={styles.bottomRight}>
              <AppText style={styles.price} numberOfLines={1}>
                RM {roundFunction(totalPrice)}
              </AppText>
              <AppText style={styles.location} numberOfLines={1}>
                Total
              </AppText>
            </View>
          </View>
          <Separater />
          <View style={styles.bottomArea}>
            <View style={styles.bottomLeft}>
              <AppButton
                title="  Add to Cart"
                onPress={() => handleCart(menuData)}
                color="secondary"
                icon="cart-plus"
              />
            </View>

            <View style={styles.bottomRight}>
              <AppButton
                title="  Check Out"
                onPress={() => {
                  navigation.navigate(routes.FOOD_CART);
                }}
                icon="logout"
              />
            </View>
          </View>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  slideContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    marginTop: 0,
  },
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
    height: 200,
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
  price: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "800",
  },
  bottomArea: { flexDirection: "row" },
  bottomLeft: { width: "50%", padding: 10 },
  bottomRight: {
    width: "50%",
    flexDirection: "column-reverse",
    justifyContent: "center",
    padding: 10,
  },
});

export default FoodViewScreen_bkp;
