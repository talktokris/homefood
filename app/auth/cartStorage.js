import * as SecureStore from "expo-secure-store";
//import jwtDecode from "jwt-decode";

const key = "cart";

const storeCart = async (cartItem) => {
  try {
    await SecureStore.setItemAsync(key, cartItem);
    //console.log(cartItem);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getCart = async () => {
  try {
    // const data = await SecureStore.getItemAsync(key);
    // console.log(data);
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const removeCart = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { storeCart, getCart, removeCart };
