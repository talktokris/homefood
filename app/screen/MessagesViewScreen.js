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



function MessagesViewScreen({ navigation, route }) {
  const item = route.params.item;
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
  return (
    <Screen>
      <View>
        <AppText style={styles.heading}>{item.title}</AppText>
        <AppText style={styles.subHeading}>{item.subTitle}</AppText>
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
});

export default MessagesViewScreen;
