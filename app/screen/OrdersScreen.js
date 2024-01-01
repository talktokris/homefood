import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import Screen from "../components/Screen";

import ActivityIndicator from "../components/ActivityIndicator";
import { ErrorMessage } from "../components/forms";
import AppText from "../components/AppText";
import RestaurantOrderInfo from "./RestaurantOrderInfo";

import routes from "../navigation/routes";
import colors from "../config/colors";

import orderApi from "../api/order";
import useApi from "../hooks/useApi";

function OrdersScreen({ navigation }) {
  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getOrders = useApi(orderApi.pendingOrders);

  const {
    data: { data: getDataSet = [] },
    error,
    loading,
  } = getOrders;

  useEffect(() => {
    getOrders.request();
  }, []);

  useEffect(() => {
    setOrderData(getDataSet);
  }, [getOrders.data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrders.request();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  /*
 

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
    orderApi
      .pendingOrders()
      .then((data) => {
        if (data.ok) {
          //  setMenuData(data);
          setLoading(false);
          setEstatus(false);
          setOrderData(data.data.data);

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
      });
  }, []);
*/
  return (
    <>
      <ActivityIndicator visible={loading} />
      <ErrorMessage error={error} visible={error} />

      <Screen>
        {/* {error && (
          <>
            <View style={styles.retryView}>
              <AppText style={{ textAlign: "center" }}>
                Couldn't retrieve the orders.
              </AppText>
              <AppButton title="Retry" onPress={getOrders.request()} />
            </View>
          </>
        )} */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orderData.length >= 1 ? (
            <View>
              {orderData.map((item) => (
                <RestaurantOrderInfo
                  key={item.id.toString()}
                  id={item.id}
                  vData={item.vender}
                  oData={item.orders}
                  tPrice={item.customer_amount}
                  onDelete={() => console.log("Delete Clicked")}
                  onAddItem={(foodId) => {
                    navigation.navigate(routes.HOME_FOOD_DETAILS, {
                      // id: item.id,
                      foodId: foodId,
                      itemData: item,
                      venderId: item.id,
                      type: "list",
                    });
                  }}
                  onChecOut={() => {
                    // console.log("Hi Checkout " + item.id);
                    navigation.navigate(routes.PLACE_ORDER, {
                      venderId: item.id,
                      data: item,
                    });
                  }}
                />
              ))}
            </View>
          ) : (
            <View style={styles.noItemBox}>
              <AppText style={styles.noItemText}>No Orders found</AppText>
            </View>
          )}
        </ScrollView>
      </Screen>
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
  noItemBox: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  noItemText: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.medium,
  },
});

export default OrdersScreen;
