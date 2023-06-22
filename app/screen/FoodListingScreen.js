import React, { useState, useEffect, useCallback } from "react";

import { View, StyleSheet, FlatList } from "react-native";
//import MessageItem from "../components/MessageItem";

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
import settings from "../config/setting";
import menuApi from "../api/menu";

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
  {
    id: 6,
    title: "Non Veg Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img6.jpg"),
    price: 15,
    currency: "RM",
    distance: 3,
    distanceUnit: "KM",
  },
  {
    id: 7,
    title: "Mutton Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img7.jpg"),
    price: 12,
    currency: "RM",
    distance: 0.5,
    distanceUnit: "KM",
  },
  {
    id: 8,
    title: "Fish Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img8.jpg"),
    price: 17,
    currency: "RM",
    distance: 1.5,
    distanceUnit: "KM",
  },

  {
    id: 9,
    title: "Special Cheese Dosa",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img9.jpg"),
    price: 19,
    currency: "RM",
    distance: 1.8,
    distanceUnit: "KM",
  },

  {
    id: 10,
    title: "Non Veg Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img10.jpg"),
    price: 11,
    currency: "RM",
    distance: 2.3,
    distanceUnit: "KM",
  },
  {
    id: 11,
    title: "Non Veg Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img11.jpg"),
    price: 11,
    currency: "RM",
    distance: 2.3,
    distanceUnit: "KM",
  },
];

function FoodListingScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [filtterdData, setFiltterdData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    menuApi
      .fetchAllSearch()
      .then((data) => {
        if (data.ok) {
          //  setMenuData(data);
          setLoading(false);
          setMenuData(data.data.results);
          setFiltterdData(data.data.results);
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

  // Delete

  const handleSearch = (e) => {
    let searchQuery = e.nativeEvent.text;

    if (searchQuery != "") {
      const searchResult = menuData.filter((m) =>
        m.food_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFiltterdData(searchResult);
    } else {
      setFiltterdData(menuData);
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
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && filtterdData && (
        <Screen>
          <AppTextSearch
            name="words"
            autoCapitalize="none"
            autoCorrect={false}
            icon="magnify"
            textContentType="jobTitle"
            placeholder="Search here"
            onChange={(e) => handleSearch(e)}
          />
          <FlatList
            data={filtterdData}
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
const styles = StyleSheet.create({});

export default FoodListingScreen;
