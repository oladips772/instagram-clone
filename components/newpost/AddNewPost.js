/** @format */
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = ({navigation}) => {
  return (
    <View style={styles.container}>
      <PostHeader navigation={navigation}/>
      <FormikPostUploader navigation={navigation}/>
    </View>
  );
};

const PostHeader = ({navigation}) => (
  <View style={styles.headercontainer}>
    <TouchableOpacity onPress={()=> navigation.goBack()}>
      <Image
        style={{ height: 20, width: 20 }}
        source={{
          uri: "https://universidadeniltonlins.com.br/wp-content/plugins/supportboard/supportboard/media/icons/png/icon-arrow-left-white.png",
        }}
      />
    </TouchableOpacity>
        <Text style={{
            color: "white",
            fontWeight: "700",
            fontSize: 20,
            marginRight:10,
        }}>New post</Text>
        <Text></Text>
  </View>
);

export default AddNewPost;

const styles = StyleSheet.create({
  headercontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  container: {
      marginHorizontal: 15,
      margin: 10,
  },
});
