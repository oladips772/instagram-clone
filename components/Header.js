/** @format */
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {firebase } from ".././firebase";

const Header = ({ navigation }) => {

  const handleSignOut = () => {
    firebase.auth().signOut().catch((error)=> console.log(error.message));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png",
          }}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewScreen")}>
          <Image
            style={styles.icon1}
            source={{
              uri: "https://icon-library.com/images/white-plus-icon/white-plus-icon-3.jpg",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={{
              uri: "https://i.pinimg.com/originals/a8/6c/65/a86c6588b77d6088c0ef6d2f2eca3b39.jpg",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.redBadge}>
            <Text style={styles.redText}>8</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: "https://i.pinimg.com/originals/ce/d3/ca/ced3ca22a00d68bf71170b421bd37fd1.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  logo: {
    height: 40,
    width: 100,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon1: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 10,
  },
  icon: {
    width: 33,
    height: 33,
    resizeMode: "contain",
    marginLeft: 10,
  },
  redBadge: {
    position: "absolute",
    top: -9,
    right: -6,
    zIndex: 9,
    backgroundColor: "red",
    borderRadius: 50,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  redText: {
    color: "white",
    fontWeight: "800",
  },
});
