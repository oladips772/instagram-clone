/** @format */
import React from "react";
import { StyleSheet, Text, View,SafeAreaView,StatusBar } from "react-native";
import AuthNavigate from "./AuthNavigate";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.container}>
           <AuthNavigate />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});
