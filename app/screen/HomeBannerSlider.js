import React, { useRef } from "react";

import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LocationTime from "../components/LocationTime";
import Stars from "../components/Stars";
import RightArrow from "./RightArrow";
import Price from "../components/Price";
import setting from "../config/setting";

function HomeBannerSlider({ navigation, bannerData }) {
  const scrollView = useRef();
  const imagePath = setting.imageUrl;

  function test(a) {
    console.log(a);
  }
  return (
    <View>
      <View style={styles.logoContainer}></View>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
        horizontal={true}
      >
        {bannerData.map((b) => (
          <TouchableHighlight
            underlayColor={colors.lightGray}
            key={b.id.toString()}
            onPress={() => {
              navigation.navigate(routes.HOME_FOOD_DETAILS, {
                foodId: b.vender_id,
                itemData: b,
                venderId: b.vender_id,
                type: "banner",
              });
            }}
          >
            <View style={styles.reviewBox}>
              <Image
                style={styles.image}
                source={{
                  uri: imagePath + "/banners/" + b.image_name,
                }}
              />
              <AppText style={styles.heading} numberOfLines={2}>
                {b.title}
              </AppText>
              <AppText style={styles.text} numberOfLines={2}>
                Sponsored: {b.description}
              </AppText>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  logoContainer: { flexDirection: "row", justifyContent: "center" },
  image: {
    alignSelf: "center",
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 5,
    backgroundColor: "#cccccc",
  },

  heading: {
    fontWeight: "900",
    fontSize: 16,
    color: colors.secondary,
    paddingLeft: 10,
    paddingTop: 10,
  },

  text: {
    fontSize: 14,
    justifyContent: "center",
    paddingLeft: 10,
  },
  icon: { paddingTop: 5, marginRight: 5 },
  reviewBox: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: 350,
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 2,
    padding: 6,
  },
  reviewFooter: { flexDirection: "row" },
});

export default HomeBannerSlider;
