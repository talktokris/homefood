import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import CartAlertIcon from "./CartAlertIcon";
import CartContext from "../auth/cartContext";
import routes from "../navigation/routes";
import { useNavigation } from "@react-navigation/native";

function TopMenu() {
  const navigation = useNavigation();
  const [cart, SetCart] = useContext(CartContext);

  const handlePress = () => {
    navigation.navigate(routes.FOOD_CART, {
      id: 5,
    });
  };

  return (
    <View style={styles.container}>
      <CartAlertIcon onPress={handlePress} Items={cart.length} />
      {/* <TouchableOpacity
        style={styles.iconBg}
        onPress={() => console.log("Send OTP Account")}
      >
        <MaterialCommunityIcons
          name="account-circle"
          size={42}
          color={colors.secondary}
        />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBg: {
    //backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  text: {
    padding: 5,
    backgroundColor: "#eee",
    marginTop: 2,
  },
});
export default TopMenu;
