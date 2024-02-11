import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import useMessage from "../api/message";

function MsgAlertIcon({ color, size, onPress }) {
  const [item, setItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      autoUpdateData();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const autoUpdateData = useCallback(() => {
    useMessage
      .messageReadCount()
      .then((response) => {
        if (response.ok) {
          // console.log(response.data.data);
          setItem(response.data.data);
          // setMsgCount(response.data.data);
          // console.log(response.data.data);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <View style={styles.iconBg}>
      {item > 0 && (
        <View style={styles.aletBox}>
          <AppText style={styles.text}>{item}</AppText>
        </View>
      )}
      <MaterialCommunityIcons name="email" size={27} color={color} />
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
    // paddingRight: 20,
  },
  text: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 10,
    paddingTop: 2,
    textAlign: "center",
  },
  aletBox: {
    backgroundColor: colors.orangeDark,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    position: "absolute",
    zIndex: 2,
    left: 20,
    top: -10,
  },
});
export default MsgAlertIcon;
