import React, { useState, useCallback, useContext } from "react";

import { View, StyleSheet, FlatList, Alert } from "react-native";
//import MessageItem from "../components/MessageItem";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import settings from "../config/setting";

import colors from "../config/colors";
import Icon from "../components/Icon";

import CartContext from "../auth/cartContext";
import CartItem from "../components/CartItem";
import AppTextSearch from "../components/AppTextSearch";
import { LinkButton } from "../components/forms";
import AppText from "../components/AppText";

function CartScreen({ navigation }) {
  const [cart, setCart] = useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState(0);
  // console.log("This is order Screen");
  /*
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    userUpdate
      .messageFatch(currrentUser)
      .then((data) => {
        setUsers(data);
        // console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);
  // console.log(users);
  var key = 1;
  */

  const onDelete = (id) => {
    // console.log(cart);
    const newCartData = cart.filter((c) => c.data.id !== id);
    setCart(newCartData);
    //  console.log("Delete Clicked :" + id);
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

  function totalCount() {
    if (cart) {
      let grandTotal = 0;
      cart.forEach((e) => {
        let price = Number(e.data.customer_price);
        let qty = Number(e.qnt);
        let total = price * qty;
        // setTotalAmount(totalAmount + total);
        // return total;
        grandTotal += total;
      });

      return grandTotal.toFixed(2);
    }
  }

  return (
    <Screen>
      <FlatList
        data={cart}
        keyExtractor={(message) => message.data.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            id={item.data.id}
            title={item.data.food_title}
            //  image={item.id}
            image={makeUri(
              item.data.menu_profile_img_id,
              item.data.default_image
            )}
            price={item.data.customer_price}
            qty={item.qnt}
            onDelete={handlePress}
            onEdit={onEdit}
            // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
            renderRightActions={() => (
              <View style={{ backgroundColor: "red", height: 70 }}></View>
            )}
          />
        )}
        ItemSeparatorComponent={Separater}
      />
      <Separater />
      <View style={styles.container}>
        <View style={styles.innterContainer}>
          <View style={styles.left}>
            <AppText style={styles.lebel}>Total Amount</AppText>
          </View>
          <View style={styles.right}>
            <AppText style={styles.price}>RM {totalCount()}</AppText>
          </View>
        </View>
      </View>
      <Separater />
      <View style={styles.container}>
        <View style={styles.innterContainer}>
          <LinkButton
            title=" Check Out"
            color="secondary"
            icon="cart-plus"
            onPress={() => {
              navigation.navigate(routes.AUTH_REGISTER);
            }}
          />
        </View>
      </View>
    </Screen>
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
  price: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "800",
  },
});

export default CartScreen;
