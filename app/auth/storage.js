import * as SecureStore from "expo-secure-store";
//import jwtDecode from "jwt-decode";
import userRetrive from "./userRetrive";

const key = "authTokenClient";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();

  const profile = await userRetrive(token);
  if (!profile.ok) return;
  // console.log(profile);
  if (profile.status == 401) return null;
  return token ? profile.data : null;
};

export default { getToken, getUser, removeToken, storeToken };
