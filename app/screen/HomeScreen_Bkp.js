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
import { ErrorMessage, LinkButton } from "../components/forms";

import FoodItem from "../components/FoodItem";
import AppTextSearch from "../components/AppTextSearch";
import AppText from "../components/AppText";
import settings from "../config/setting";
import menuApi from "../api/menu";
import ImageSlideShow from "../components/ImageSlideShow";

function HomeScreen_Bkp({ navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true);
    setEstatus(false); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    menuApi
      .fetchAllHome()
      .then((data) => {
        if (data.ok) {
          setMenuData(data);
          setLoading(false);
          setEstatus(false);
          setMenuData(data.data.results);
          setImages(data.data.slides);
          // console.log(data.data.slides);
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

  function makeUri(defID, imaData) {
    // console.log(imaData.food_menu_id);
    let imgUri = settings.imageUrl + "/menu/no_image.jpg";

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
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          {/* <AppText style={styles.heading}> Recommended Foods</AppText> */}
          <Separater />
          <View style={styles.slideContainer}></View>
          <Separater />
          <AppText style={styles.heading}> Top Foods Nearby</AppText>
          <Separater />
          <FlatList
            data={menuData}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <FoodItem
                title={item.food_title}
                subTitle={item.food_description}
                //  image={item.id}
                image={makeUri(item.menu_profile_img_id, item.default_image)}
                price={item.customer_price}
                distance="1"
                distanceUnit="KM"
                onPress={() => {
                  navigation.navigate(routes.SEARCH_DETAILS, {
                    id: item.id,
                  });
                }}
                // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
                renderRightActions={() => (
                  <View style={{ backgroundColor: "red", height: 70 }}></View>
                )}
              />
            )}
            ItemSeparatorComponent={Separater}
          />
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
    fontSize: 19,
    paddingBottom: 5,
    color: colors.secondary,
    paddingTop: 10,
  },
  image: {
    width: "100%",
    height: 180,
    alignSelf: "center",
  },
  nav: {
    flexDirection: "row",
    textAlign: "center",
    padding: 15,
    justifyContent: "center",
  },
});

export default HomeScreen_Bkp;
