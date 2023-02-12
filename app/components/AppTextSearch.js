import React from "react";
import { useFormikContext } from "formik";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";

function AppTextSearch({
  icon,
  color = "primary",
  lebel,
  width = "100%",
  onPress,
  ...otherProps
}) {
  const { handleSubmit } = useFormikContext();

  return (
    <>
      {lebel && <Text style={styles.lebel}>{lebel} :</Text>}
      <View style={[styles.container, { width: width }]}>
        <TextInput
          placeholderTextColor={colors.medium}
          style={styles.textInput}
          {...otherProps}
        />
        <TouchableOpacity
          style={[styles.buttonRight, { backgroundColor: colors[color] }]}
          onPress={handleSubmit}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              style={styles.icon}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  textInput: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    color: colors.dark,
    marginLeft: 15,
  },
  icon: {
    marginRight: 10,
    padding: Platform.OS === "android" ? 7 : 5,
  },
  lebel: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.medium,
  },
  buttonRight: {
    position: "absolute",
    right: 10,
    paddingLeft: 20,
    width: 70,
    height: 50,
    padding: 10,
    color: "#fff",

    alignSelf: "flex-end",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default AppTextSearch;
