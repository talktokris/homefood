import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useLayoutEffect,
} from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";

import AppTextSearch from "../components/AppTextSearch";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { ErrorMessage, LinkButton } from "../components/forms";

import CartContext from "../auth/cartContext";

import RestaurantInfo from "./RestaurantInfo";
import FoodGridItem from "../components/FoodGridItem";

import menuApi from "../api/menu";
import useApi from "../hooks/useApi";

function FoodViewScreen({ route, navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const fethcID = route.params.venderId;
  const fethcType = route.params.type;
  const fethcData = route.params.itemData;
  const foodId = route.params.foodId;
  // console.log(route.params);
  const { user, logOut } = useAuth();

  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);

  // const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [memuFilttred, setMemuFilttred] = useState([]);
  const [resultText, setResultText] = useState("");
  const [restData, setRestData] = useState([]);
  const [chanage, SetChange] = useState(false);
  const [gHeight, setGHeight] = useState(0);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    if (gHeight <= 50) {
      setGHeight(height);
      //  console.log(height);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const getFetchData = useApi(menuApi.fetchSingleMenu);

  const {
    data: { vender: venderData = [], food: foodData = [] },
    error,
    loading,
  } = getFetchData;

  useEffect(() => {
    getFetchData.request(fethcID);
  }, []);

  useEffect(() => {
    setRestData(venderData);
    setMenuData(foodData);
    setMemuFilttred(foodData);
  }, [getFetchData.data, getFetchData.loading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFetchData.request(fethcID);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   SetChange(true);
  //   // getData();
  // }, [chanage]);

  /*
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
          setRestData(data.data.vender);
          setMenuData(data.data.food);
          setMemuFilttred(data.data.food);

          setLoading(false);
          //    setMenuData(data.data.results[0]);
          //   setImages(data.data.results[0].images);
          //   setTotalPrice(data.data.results[0].customer_price);
          //    qtyUpdate(); // to update the edit qty.

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
*/
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

  // const EnterEmail = ({ navigation }) => {
  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerLeft: () => null,
  //     });
  //   }, [navigation]);
  // };

  // const handlePlus = () => {
  //   const newQnt = qnt + 1;
  //   setQnt(newQnt);
  //   setTotalPrice(roundFunction(menuData.customer_price * newQnt));
  // };
  // const handleMinus = () => {
  //   if (qnt > 1) {
  //     setQnt(qnt - 1);
  //     setTotalPrice(roundFunction(menuData.customer_price * (qnt - 1)));
  //   }
  // };
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
  };

  const handleSearch = (searchQuery) => {
    let filtered = menuData.filter((m) =>
      m.food_title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    if (searchQuery.length >= 1) {
      setMemuFilttred(filtered);
      if (filtered.length == 0) {
        setResultText("No results found");
      } else if (filtered.length == 1) {
        setResultText(memuFilttred.length + " result found");
      } else if (filtered.length <= 1) {
        setResultText(filtered.length + " results found");
      }
    } else {
      setResultText("");
      setMemuFilttred(menuData);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        {error && (
          <>
            <View style={styles.retryView}>
              <AppText style={{ textAlign: "center" }}>
                Couldn't retrieve the service provider.
              </AppText>
              <AppButton
                title="Retry"
                onPress={getFetchData.request(fethcID)}
              />
            </View>
          </>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {restData.length >= 1 && <RestaurantInfo restData={restData} />}
          <AppText style={styles.heading}> For you </AppText>
          <Separater />

          <View style={styles.searchBox}>
            <AppTextSearch
              name="words"
              autoCapitalize="none"
              autoCorrect={false}
              icon="magnify"
              textContentType="jobTitle"
              placeholder="Search here"
              onPress={handleSearch}
              // onChange={(e) => handleSearch(e)}
              //  onChange={(e) => console.log(e.nativeEvent.text)}
            />
            <AppText style={styles.searchHeading}>{resultText}</AppText>
          </View>
          <View
            onLayout={onLayout}
            style={[styles.gridContainer, { flex: 1, minHeight: gHeight }]}
          >
            {memuFilttred.map((item) => (
              <FoodGridItem
                key={item.id.toString()}
                id={item.id}
                venderId={item.user_id}
                category={item.food_category}
                title={item.food_title}
                price={item.customer_price}
                oldPrice={item.vender_price}
                //image={item.image}
                image={item.image_name}
                discount={item.discount_per}
                onPress={() => {
                  navigation.navigate(routes.FOOD_OPTIONS, {
                    item: item,
                    vender: restData,
                  });
                }}
                // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
                renderRightActions={() => (
                  <View style={{ backgroundColor: "red", height: 70 }}></View>
                )}
              />
            ))}
          </View>
        </ScrollView>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  logoContainer: { justifyContent: "center" },

  heading: {
    fontWeight: "900",
    fontSize: 16,
    paddingLeft: 25,
    paddingBottom: 10,
    paddingTop: 10,
    color: colors.secondary,
  },

  searchHeading: {
    fontWeight: "900",
    fontSize: 14,
    paddingLeft: 25,
    paddingBottom: 5,
    paddingTop: 5,
    color: colors.secondary,
    textAlign: "center",
  },

  image: {
    alignSelf: "center",
    width: "100%",
    height: 150,
    resizeMode: "contain",
    borderRadius: 5,
    margin: 5,
    marginLeft: 10,
  },
  restContainer: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 10,
    borderColor: colors.separator,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
  },
  restItem: {
    flexDirection: "row",
    paddingTop: 10,
    PaddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  restItemContainer: { flex: 1 },
  icon: {
    marginTop: 10,
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  searchBox: { marginLeft: 15, marginTop: 10, marginRight: 15 },
  bottomArea: { flexDirection: "row" },
  bottomLeft: { width: "50%", padding: 10 },
  bottomRight: {
    width: "50%",
    flexDirection: "column-reverse",
    justifyContent: "center",
    padding: 10,
  },
});

export default FoodViewScreen;
