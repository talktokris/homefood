import React, { useState, useCallback } from "react";

import { View, StyleSheet, FlatList } from "react-native";
import MessageItem from "../components/MessageItem";
import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";
import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function MessagesViewScreen({ navigation, route }) {
  const item = route.params.item;

  return (
    <Screen>
      <View style={styles.messageBox}>
        <View style={styles.iconTop}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="email-outline"
            size={25}
            color="#ccc"
          />
          <AppText style={styles.iconText}>{item.humanDate}</AppText>
        </View>
        <View style={styles.msgTitleBox}>
          <AppText style={styles.heading}>{item.title}</AppText>
        </View>
        <View style={styles.msgBox}>
          <AppText style={styles.subHeading}>{item.message}</AppText>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  heading: { padding: 10, fontSize: 16, fontWeight: "800" },

  subHeading: {
    padding: 10,
    fontSize: 14,
  },
  messageBox: {
    marginHorizontal: 20,
    backgroundColor: "#f7f7f7",
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  msgTitleBox: { marginTop: 20, backgroundColor: "#eeeeee" },
  msgBox: {},
  iconTop: { justifyContent: "center", alignItems: "center" },
  iconText: { fontSize: 12, color: colors.medium },
});

export default MessagesViewScreen;
