import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";

import colors from "../config/colors";
import routes from "../navigation/routes";
import usersApi from "../api/users";
import authStorage from "../auth/storage";
import AuthContext from "../auth/context";

import ActivityIndicator from "../components/ActivityIndicator";
import TokenContext from "../auth/tokenContext";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().min(2).label("First Name"),
  last_name: Yup.string().required().min(2).label("Last Name"),
  email: Yup.string().required().email().label("Email"),
});

function ProfileScreen({ navigation }) {
  const [user, setUser] = useContext(AuthContext);
  const [token, setToken] = useContext(TokenContext);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const userData = user.results[0];

  const [isLoading, setLoading] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    // return user;
  };

  const handleSubmit = async ({ first_name, last_name, email }) => {
    // console.log(first_name + "-" + last_name + "+" + email);
    setLoading(true);

    const result = await usersApi.userProfileUpdate(
      first_name,
      last_name,
      email
    );

    setLoading(false);
    // console.log(result.data);
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

      restoreUser();

      Alert.alert("Success", messageSend, [
        {
          text: "Ok",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && user && (
        <Screen>
          <View style={styles.container}>
            <View style={styles.imageFrame}>
              <Image
                source={require("../assets/images/av.png")}
                style={styles.image}
              />
              {/* <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => console.log("Click Picture Upload")}
            >
              <View style={styles.uploadBtn}>
                <MaterialCommunityIcons
                  name="camera"
                  size={20}
                  color={colors.white}
                />
              </View>
            </TouchableOpacity>
          </View> */}
            </View>
            <AppForm
              initialValues={{
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={styles.otp}>
                <View style={styles.viewHalf}>
                  <AppFormField
                    name="first_name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder=" First Name"
                    textContentType="name"
                    secureTextEntry={false}
                    maxLength={70}
                  />
                </View>
                <View style={styles.viewHalf}>
                  <AppFormField
                    name="last_name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder=" Last Name"
                    textContentType="name"
                    secureTextEntry={false}
                    maxLength={50}
                  />
                </View>
              </View>
              <View style={styles.otp}>
                <View style={styles.viewHalf}>
                  <AppFormField
                    name="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder=" Email Address"
                    textContentType="emailAddress"
                    editable={true}
                  />
                </View>
              </View>

              <SubmitButton title="Save" color="secondary" />
            </AppForm>
          </View>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 10,
  },
  imageFrame: {
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    margin: 5,
    marginTop: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: -40,
    left: 40,
  },
  uploadBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 2,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.white,
  },

  viewStyleForLine: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginBottom: 30,
    marginTop: 30,
  },
  msg: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  otp: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewHalf: { flex: 1, width: "50%", padding: 5 },
  resend: {
    color: colors.primary,
    fontWeight: "800",
  },
});

export default ProfileScreen;
