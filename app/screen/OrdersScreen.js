import React, { useState, useCallback, useContext, useEffect } from "react";

import { StyleSheet, FlatList, Alert } from "react-native";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
import routes from "../navigation/routes";
import settings from "../config/setting";
import colors from "../config/colors";

import AuthContext from "../auth/context";
import OrderItem from "../components/OrderItem";
import { ErrorMessage, NormalMessage } from "../components/forms";
import orderApi from "../api/order";

function OrdersScreen({ navigation }) {
  const [user, setUser] = useContext(AuthContext);
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
          setEstatus(false);
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
        console.log(error);
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
          {menuData.length <= 0 && (
            <NormalMessage visible={true} error="No recent order found" />
          )}
          <FlatList
            data={menuData}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <OrderItem
                id={item.id}
                data={item}
                title={item.menu.food_title}
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
