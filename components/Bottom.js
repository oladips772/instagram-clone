/** @format */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  useState,
  TouchableOpacity,
  Image,
} from "react-native";

export const BottomIcons = [

  {
    name: "home",
    image:
      "https://www.stonybrook.edu/commcms/studentaffairs/res/_images/home_icon.png",
  },
  {
    name: "search",
    image:
      "https://icon-library.com/images/search-icon-transparent/search-icon-transparent-5.jpg",
  },
  {
    name: "reels",
    image:
      "https://flaticons.net/icon.php?slug_category=miscellaneous&slug_icon=film-reel",
  },
  {
    name: "shop",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8hNO1xwD6lSOvG-GXwwaU4QfD4X2Z5NOKDw&usqp=CAU",
  },
  {
    name: "home",
    image:
      "https://media-exp1.licdn.com/dms/image/C4E03AQFOfPu93n6Kxw/profile-displayphoto-shrink_100_100/0/1632301101571?e=1640217600&v=beta&t=ZIz_KuC4p5YQT3ABVGEHWun6DN18uKQNeMPAaaqqGdE",
  },
];

const Bottom = ({ Icons }) => {
  const Icon = ({ icon }) => (
    <TouchableOpacity >
      <Image
        style={styles.icon}
        source={{
          uri: icon.image,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: "row",
        height: 40,
        justifyContent: "space-around",
      }}
    >
      {Icons.map((icon, id) => (
        <View key={id}>
          <Icon icon={icon} key={id} />
        </View>
      ))}
    </View>
  );
};

export default Bottom;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    margin: 10,
  },
});
