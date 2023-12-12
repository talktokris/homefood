import React, { useRef } from "react";

import { View, StyleSheet, Image, ScrollView } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LocationTime from "../components/LocationTime";
import Stars from "../components/Stars";
import RightArrow from "./RightArrow";
import Price from "../components/Price";
import FoodGridItem from "../components/FoodGridItem";
import FoodGridItemHome from "../components/FoodGridItemHome";
import routes from "../navigation/routes";
import settings from "../config/setting";

function HomeGridItem({ navigation, gridData }) {
  const scrollView = useRef();

  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";

    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }

  return (
    <View style={[styles.gridContainer, { flex: 1 }]} key="1212">
      {gridData.map((item) => (
        <FoodGridItemHome
          key={item.id.toString()}
          id={item.id}
          category={item.food_category}
          title={item.food_title}
          price={item.customer_price}
          oldPrice=""
          //image={item.image}
          image={makeUri(item.user_id, item.image_name)}
          //  image={item.default_image}
          onPress={() => {
            navigation.navigate(routes.SEARCH_DETAILS, {
              foodId: item.id,
              itemData: item,
              venderId: item.user_id,
              type: "grid",
            });
          }}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});

export default HomeGridItem;
