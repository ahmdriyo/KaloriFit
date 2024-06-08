import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { bgNew, logo } from "../../assets/";



const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("ScreenInputName");
    }, 3000);
  });
  return (
    <ImageBackground source={bgNew} style={styles.background}></ImageBackground>
  );
};

export default Splash;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3DD4F5",
  },
  logo: {
    width: 105,
    height: 181,
  },
  Text: {
    position: "absolute",
    paddingTop: 600,
  },
  Text2: {
    position: "absolute",
    paddingTop: 650,
  },
});
