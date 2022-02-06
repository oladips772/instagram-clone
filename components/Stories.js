/** @format */
import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { USERS } from "../data/users";

const Stories = () => {
  return (
    <View style={styles.storyView}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS &&
          USERS.map((user, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <Image
                style={styles.storyimage}
                source={{
                  uri: user.image,
                }}
              />
              <Text style={{ color: "white" }}>
                {user.name.length > 11
                  ? user.name.slice(0, 10) + "..."
                  : user.name.toLowerCase()}
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storyimage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  storyView: {
    marginBottom: 2,
    borderBottomColor: "#fff",
    borderWidth: 0.3,
    marginBottom: 5,
    paddingBottom: 5,
  },
});

export default Stories;
