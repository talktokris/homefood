import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
//import SlideShow from "./components/SlideShow";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import settings from "../config/setting";
import AppText from "./AppText";

function ImageSlideShow({ images, titleStatus }) {
  const imgFirst = settings.imageUrl + "/slider/images/loader.jpg";
  const [activeImage, setActiveImage] = useState(imgFirst);
  const [activeIndex, setActiveIndex] = useState(0);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    //handler to get device Height
    setHeight(Dimensions.get("window").height);
    //handler to get device Width
    setWidth(Dimensions.get("window").width);
  }, []);

  const [count, setCount] = useState(0); //initial value of this

  const logResult = useCallback(() => {
    const total = images.length;
    if (count < total) {
      setTimeout(() => {
        setCount(count + 1);
        var uri = makeUri(images[count].id, images[count]);
        setActiveImage(uri);
        //  console.log(images[count]);
      }, 3050);
    } else {
      setCount(0);
    }
    // if (count < 10) {
    // setCount(5);
    // console.log(count);
    // return count;
    // }
    //  setCount(0);
  }, [count, images]); //logResult is memoized now.

  useEffect(() => {
    logResult();
  }, [count]);

  function onNavClick(item) {
    //   const newImage = item.uri;
    // setActiveImage(newImage);
    var uri = makeUri(item.id, item);
    setActiveImage(uri);
  }

  function makeUri(defID, imaData) {
    // console.log(imaData.food_menu_id);
    let imgUri = settings.imageUrl + "/slider/images/loader.jpg";

    if (imaData != null)
      imgUri =
        settings.imageUrl +
        "/slider/images/" +
        imaData.id +
        "/" +
        imaData.image_name;
    //  console.log(imgUri);

    return imgUri;
  }

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: activeImage }}
          style={[styles.image, { width: width, animation: "flash 1.5s .5s" }]}
        />
        <View style={styles.nav}>
          {images.map((item) => (
            <TouchableOpacity
              underlayColor={colors.lightGray}
              onPress={() => onNavClick(item)}
              key={item.id}
            >
              <View key={item.id} style={styles.iconDiv}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="circle"
                  size={15}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    height: 250,
    alignSelf: "center",
  },
  nav: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    marginTop: -25,
  },
  iconDiv: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
});
export default ImageSlideShow;
