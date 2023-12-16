import React, { useState, useEffect, useCallback } from "react";

import { View, StyleSheet, FlatList, Image, ScrollView } from "react-native";
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
import FoodGridItem from "../components/FoodGridItem";
import HomeBannerSlider from "./HomeBannerSlider";
import HomeGridItem from "./HomeGridItem";

function HomeScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [bannersDb, setBannersDb] = useState([]);
  const [searchMenuData, setSearchMenuData] = useState([]);
  const [searchStatus, setSearchStatus] = useState(true);
  const [resultText, setResultText] = useState("");

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
          //  setMenuData(data);
          setLoading(false);
          setEstatus(false);
          setMenuData(data.data.top_food);
          setBannersDb(data.data.slides);
          setGridData(data.data.rec_food);
          // console.log(data.data.results);
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

  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";

    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }

  const handleSearch = (searchQuery) => {
    if (searchQuery.length == 0) {
      setSearchStatus(true);
    }
    //let searchQuery = e.nativeEvent.text;
    // let items = cart;
    else {
      setLoading(true);
      setEstatus(false); // Start the loader, So when you start fetching data, you can display loading UI
      // useApi(resume.getResumeData, { currrentUser });
      menuApi
        .fetchAllSearch(searchQuery)
        .then((data) => {
          if (data.ok) {
            //  setMenuData(data);
            setLoading(false);
            setEstatus(false);
            setSearchMenuData(data.data.top_food);
            if (data.data.top_food.length == 0) {
              setResultText("No result found");
            } else if (data.data.top_food.length === 1) {
              setResultText(data.data.top_food.length + " result found");
            } else if (data.data.top_food.length >= 1) {
              setResultText(data.data.top_food.length + " results found");
            }
            setSearchStatus(false);
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
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
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
        />
      </View>
      <Screen>
        {!isLoading && menuData && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <AppText style={styles.heading}> Recommended Foods</AppText> */}

            <Separater />

            {searchStatus ? (
              <View style={styles.homeUpperContainer}>
                <View style={styles.container}>
                  <View>
                    <AppText style={styles.heading}> Order Now </AppText>
                  </View>
                  <View style={styles.hsliderContainer}>
                    <HomeBannerSlider
                      navigation={navigation}
                      bannerData={bannersDb}
                    />
                  </View>
                </View>

                <Separater />

                <View style={styles.container}>
                  <View>
                    <AppText style={styles.heading}> Recommended Foods</AppText>
                  </View>
                  <HomeGridItem gridData={gridData} navigation={navigation} />
                </View>

                <Separater />
                <AppText style={styles.heading}> Top Foods Nearby</AppText>
                <Separater />

                <View style={styles.flatListContainer}>
                  {menuData.map((item) => (
                    <FoodItem
                      key={item.id.toString()}
                      title={item.food_title}
                      subTitle={item.food_description}
                      //  image={item.id}
                      image={makeUri(item.user_id, item.image_name)}
                      price={item.customer_price}
                      distance="1"
                      distanceUnit="KM"
                      foodCategory={item.food_category}
                      halalStatus={item.halal_status}
                      vegStatus={item.veg_status}
                      starStatus={item.rating}
                      discount={item.discount_per}
                      onPress={() => {
                        navigation.navigate(routes.HOME_FOOD_DETAILS, {
                          // id: item.id,
                          foodId: item.id,
                          itemData: item,
                          venderId: item.user_id,
                          type: "list",
                        });
                      }}
                      // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.homeSearchContainer}>
                <AppText style={styles.headingSearch}>{resultText}</AppText>
                <Separater />

                <View style={styles.flatListContainer}>
                  {searchMenuData.map((item) => (
                    <FoodItem
                      key={item.id.toString()}
                      title={item.food_title}
                      subTitle={item.food_description}
                      //  image={item.id}
                      image={makeUri(item.user_id, item.image_name)}
                      price={item.customer_price}
                      distance="1"
                      distanceUnit="KM"
                      onPress={() => {
                        navigation.navigate(routes.HOME_FOOD_DETAILS, {
                          // id: item.id,
                          foodId: item.id,
                          itemData: item,
                          venderId: item.user_id,
                          type: "list",
                        });
                      }}
                      // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
                    />
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  homeSearchContainer: {},
  homeUpperContainer: {},

  searchBox: { marginLeft: 15, marginRight: 15 },
  container: {
    flexDirection: "coloum",
    height: "auto",
  },

  heading: {
    fontWeight: "900",
    fontSize: 19,
    paddingBottom: 15,
    color: colors.secondary,
    paddingTop: 15,
  },
  headingSearch: {
    fontWeight: "900",
    fontSize: 19,
    paddingBottom: 15,
    color: colors.secondary,
    paddingTop: 15,
    textAlign: "center",
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

export default HomeScreen;
