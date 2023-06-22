import React, { useState, useEffect, useCallback } from "react";

import { View, StyleSheet, FlatList, Image } from "react-native";

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

const messages = [
  {
    id: 1,
    title: "Non Veg Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img1.jpg"),
    price: 15,
    currency: "RM",
    distance: 3,
    distanceUnit: "KM",
  },
  {
    id: 2,
    title: "Mutton Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img2.jpg"),
    price: 12,
    currency: "RM",
    distance: 0.5,
    distanceUnit: "KM",
  },
  {
    id: 3,
    title: "Fish Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img3.jpg"),
    price: 17,
    currency: "RM",
    distance: 1.5,
    distanceUnit: "KM",
  },

  {
    id: 4,
    title: "Special Cheese Dosa",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img4.jpg"),
    price: 19,
    currency: "RM",
    distance: 1.8,
    distanceUnit: "KM",
  },

  {
    id: 5,
    title: "Non Veg Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img5.jpg"),
    price: 11,
    currency: "RM",
    distance: 2.3,
    distanceUnit: "KM",
  },
];

function FoodViewScreen({ route, navigation }) {
  const fethcID = route.params.id;
  const { user, logOut } = useAuth();

  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [qnt, setQnt] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

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
          setTotalPrice(data.data.results[0].customer_price);

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
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <AppText style={styles.heading}>{menuData.food_title}</AppText>
          <Separater />
          <View>
            <Image
              source={require("../assets/images/img1.jpg")}
              style={styles.image}
            />
            <View style={styles.nav}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="circle"
                size={20}
                color={colors.primary}
              />

              <MaterialCommunityIcons
                style={styles.icon}
                name="circle"
                size={20}
                color={colors.primary}
              />

              <MaterialCommunityIcons
                style={styles.icon}
                name="circle"
                size={20}
                color={colors.primary}
              />

              <MaterialCommunityIcons
                style={styles.icon}
                name="circle"
                size={20}
                color={colors.primary}
              />
            </View>
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
                onPress={() => {
                  navigation.navigate(routes.MENU_EDIT_FOOD, {
                    itemData: menuData,
                  });
                }}
                color="secondary"
                icon="cart-plus"
              />
            </View>

            <View style={styles.bottomRight}>
              <AppButton
                title="  Check Out"
                onPress={() => {
                  handleDelete(menuData.id);
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

export default FoodViewScreen;
