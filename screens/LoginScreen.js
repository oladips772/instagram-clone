/** @format */

import React from "react";
import { StyleSheet, Text, SafeAreaView, Image, View } from "react-native";
import LoginForm from "../components/loginfolders/LoginForm";

const LoginScreen = ({navigation}) => {
  const InstagramLogo =
    "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png";
  return (
    <SafeAreaView stye={styles.container}>
      <View>
        <Image
          style={{
            height: 70,
            width: 70,
            paddingBottom: 10,
            marginBottom: 120,
            left: 140,
            top: 60,
          }}
          source={{
            uri: InstagramLogo,
          }}
              />
              <LoginForm navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "white",
    marginHorizontal: 12,
    flexDirection: "column",
  },
});
