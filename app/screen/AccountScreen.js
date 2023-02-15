import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import Separater from "../components/Separater";
//import useAuth from "../auth/useAuth";
//import routes from "../navigation/routes";
//import setting from "../config/setting";
import ListItemProfile from "../components/ListItemProfile";
import routes from "../navigation/routes";

const menuItems = [
  {
    title: "Profile",
    icon: {
      name: "account-box-outline",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.ACCOUNT_PROFILE,
  },
  {
    title: "Address",
    icon: {
      name: "map-marker-check-outline",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.ACCOUNT_ADDRESS,
  },
  {
    title: "Messages",
    icon: {
      name: "email-multiple",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.ACCOUNT_MESSAGES,
  },
  {
    title: "Search Radius",
    icon: {
      name: "target",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.ACCOUNT_SEARCH_RADIUS,
  },
  {
    title: "Order History",
    icon: {
      name: "view-list",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.ACCOUNT_ORDER_HISTORY,
  },
  {
    title: "Support",
    icon: {
      name: "chat",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.ACCOUNT_SUPPORT,
  },
  {
    title: "Change Password",
    icon: {
      name: "lock",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.ACCOUNT_CHANGE_PASSWORD,
  },
];

function AccountScreen({ route, navigation }) {
  // const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItemProfile
          title="Full Name"
          subTitle="test@domain.com"
          image={require("../assets/images/av.png")}
          imgStatus={null}
        />
        <Separater />
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                iconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() => {
                  navigation.navigate(item.targetScreen);
                }}
              />
            )}
            ItemSeparatorComponent={Separater}
          />
        </View>
        <Separater />
        <ListItem
          title="Logout"
          iconComponent={
            <Icon
              name="logout"
              size={32}
              backgroundColor={colors.primary}
              iconColor="white"
            />
          }
          onPress={() => console.log("Logout")}
        />
      </View>
      <Separater />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.lightGray },
  container: {
    marginVertical: 1,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: colors.white,
    borderWidth: 5,
  },
});

export default AccountScreen;
