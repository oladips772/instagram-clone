/** @format */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import NewScreen from "./NewScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";

 
const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

export const SingedInStack = () => (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen component={HomeScreen} name="HomeScreen" />
        <Stack.Screen component={NewScreen} name="NewScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );


export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={SignupScreen} name="SignupScreen" />
    </Stack.Navigator>
  </NavigationContainer>
);

