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
import AppButton from "../components/AppButton";
import RetryComponent from "../components/RetryComponent";

function OrdersScreen({ navigation }) {
  const [orderData, setOrderData] = useState([]);
  const [busy, setBusy] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const getOrders = useApi(orderApi.pendingOrders);

  const {
    data: { data: getDataSet = [] },
    error,
    result,
    loading,
  } = getOrders;

  useEffect(() => {
    const responseData = navigation.addListener("focus", () => {
      setBusy(true);

      getOrders.request();
    });
    return responseData;
  }, [navigation]);

  useEffect(() => {
    // console.log(JSON.stringify(getOrders.data.data[0].id));
    setBusy(getOrders.loading);
    setErrorStatus(getOrders.error);
    setOrderData(getDataSet);
  }, [getOrders.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      autoUpdateData();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const autoUpdateData = useCallback(() => {
    orderApi
      .pendingOrders()
      .then((response) => {
        if (response.ok) {
          const newData = response.data.data;
          setOrderData(newData);
        }
      })
      .catch((error) => {});
  }, []);

  const onRefresh = () => {
    getOrders.request();
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // console.log(getDataSet);
  return (
    <>
      <ActivityIndicator visible={busy} />

      <Screen>
        {errorStatus ? (
          <RetryComponent
            onPress={() => getOrders.request()}
            message=" Couldn't retrieve the orders."
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => getOrders.request()}
              />
            }
          >
            {orderData.length >= 1 ? (
              <View>
                {orderData.map((item) => (
                  <RestaurantOrderInfo
                    key={item.id.toString()}
                    id={item.id}
                    data={item}
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
        )}
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
