/** @format */
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Bottom, { BottomIcons } from "../components/Bottom";
import Header from "../components/Header";
import Post from "../components/Post";
import Stories from "../components/Stories";
import { db } from ".././firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collectionGroup("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <Bottom Icons={BottomIcons} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: 16,
  },
});
