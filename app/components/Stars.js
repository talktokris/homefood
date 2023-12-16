import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function Stars({
  star = 2.5,
  size = 12,
  backgroundColor = "#000",
  iconColor = "#fff",
}) {
  const [starsData, setStarsData] = useState([]);

  //Icons Names
  const full = "star";
  const half = "star-half-full";
  const blank = "star-outline";

  useEffect(() => {
    starCount();
    // console.log(starsData);
  }, []);

  const starCount = () => {
    let starArray = [];
    let last = 0;
    let status = 0;
    let balance = 0;
    for (let i = 1; i <= 5; i++) {
      balance = star - last;
      if (Number(balance) >= 1) {
        status = full;
      } else if (Number(balance) <= 0) {
        status = blank;
      } else if (Number(balance) > 0 && Number(balance) < 1) {
        status = half;
      }
      balance = star - i;

      starArray.push({ id: i, name: status });
      last = i;
      //  console.log("Count : " + i + " - star : " + star + "-logic: " + logic);
      // console.log(status);
    }

    setStarsData(starArray);
  };
  // console.log(starsData);
  return (
    <View style={styles.container}>
      {starsData.length >= 1 && (
        <>
          {starsData.map((s) => (
            <MaterialCommunityIcons
              style={styles.icon}
              name={s.name}
              size={size}
              color={colors.primary}
            />
          ))}
        </>
      )}
    </View>
  );
}

export default Stars;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
