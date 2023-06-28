import React, { useState, useEffect, useContext, useCallback } from "react";

import { View, StyleSheet, FlatList, Alert } from "react-native";
import MessageItem from "../components/MessageItem";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";
import AddressItem from "../components/AddressItem";
import { ErrorMessage, LinkButton } from "../components/forms";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import addressApi from "../api/address";
import usersApi from "../api/users";

function AddressScreen({ route, navigation }) {
  const [user, setUser] = useContext(AuthContext);
  const [error, setError] = useState();
  const [defaultAddress, setDefaultAddress] = useState(0);
  const [reload, setReload] = useState(false);
  const [eStatus, setEstatus] = useState(false);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    usersApi
      .userRefresh()
      .then((data) => {
        //  console.log(data.data);
        if (data.ok) {
          setLoading(false);
          setUser(data.data);
          if (data.data.results[0].default_address != null) {
            setDefaultAddress(data.data.results[0].default_address.id);
          }
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

  const onDefault = async (id) => {
    setLoading(true);

    const result = await addressApi.setDefaultAddress(id);

    setLoading(false);

    if (!result.ok) return;
    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.success == false) {
      setEstatus(true);
      setError(result.data.message);
    } else if (result.data.success == true) {
      const { data: id, message: messageSend } = result.data;

      getData();

      Alert.alert("Success", messageSend, [
        {
          text: "Ok",
          onPress: () => navigation.navigate(routes.ACCOUNT_ADDRESS),
        },
      ]);
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  const onDelete = async (id) => {
    setLoading(true);

    const result = await addressApi.deleteAddress(id);
    // const tokenSet= result.access_token;
    console.log(result.data);
    //console.log("==================");
    setLoading(false);

    if (!result.ok) return;
    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.success == false) {
      //  console.log("Krishna");
      setEstatus(true);
      setError(result.data.message);
    } else if (result.data.success == true) {
      const { data: id, message: messageSend } = result.data;
      getData();
      Alert.alert("Success", messageSend, [
        {
          text: "Ok",
          onPress: () => navigation.navigate(routes.ACCOUNT_ADDRESS),
        },
      ]);
      // navigation.navigate(routes.PRO_DONE, {
      //   message: messageSend,
      //   id: id,
      //   navRoute: routes.ACCOUNT_ADDRESS,
      // });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  const handlePress = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Yes",
        onPress: () => onDelete(id),
      },
      { text: "No" },
    ]);
  };

  const onEdit = (id) => {
    navigation.navigate(routes.SEARCH_DETAILS, { id: id });
    // console.log("Edit Clicked :" + id);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && user && (
        <Screen>
          <View>
            <FlatList
              data={user.results[0].address_list}
              keyExtractor={(message) => message.id.toString()}
              renderItem={({ item }) => (
                <AddressItem
                  id={item.id}
                  address={item.address}
                  addressData={item}
                  // onPress={() => console.log("Message Selected:- " + item.id)}
                  onDelete={handlePress}
                  onEdit={() =>
                    navigation.navigate(routes.ACCOUNT_EDIT_ADDRESS, {
                      item: item,
                    })
                  }
                  onDefault={onDefault}
                  defaultAddress={defaultAddress}
                  renderRightActions={() => (
                    <View style={{ backgroundColor: "red", height: 70 }}></View>
                  )}
                />
              )}
              ItemSeparatorComponent={Separater}
            />
            <View style={styles.buttonContainer}>
              <LinkButton
                title=" Add New Address"
                color="secondary"
                icon="google-maps"
                onPress={() => {
                  // console.log("Hi");
                  navigation.navigate(routes.ACCOUNT_ADD_ADDRESS);
                }}
                width="90"
              />
            </View>
          </View>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    flexDirection: "row",
  },
});

export default AddressScreen;
