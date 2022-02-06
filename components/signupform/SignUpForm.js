/** @format */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import Validator from "email-validator";
import { db,firebase } from "../../firebase";

const SignUpForm = ({ navigation }) => {
  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string()
      .required()
      .min(2, "user should have a uername of two charcaters and above"),
    password: Yup.string()
      .required()
      .min(6, "password should be at least 6 characters long"),
  });


    const getRandomProfilePicture = async () => {
        const response = await fetch("https://randomuser.me/api ");
        const data = await response.json();
        return data.results[0].picture.large;
    }

  const handleSignIn = async (email, password,username) => {
    try {
   const userAuth = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("we created in", email, password,username);
        db.collection("users").doc(userAuth.user.email).set({
            owner_uid: userAuth.user.uid,
            username: username,
            email: userAuth.user.email,
            profileUrl : await getRandomProfilePicture()
        })
    } catch (error) {
      Alert.alert("Dear User", error.message);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={(values) => {
          handleSignIn(values.email, values.password,values.username);
        }}
        validationSchema={SignUpFormSchema}
        validateOnMount={true}
      >
        {({
          errors,
          isValid,
          values,
          handleSubmit,
          handleBlur,
          handleChange,
        }) => (
          <>
            <View
              style={{
                paddingBottom: 20,
                padding: 10,
              }}
            >
              <TextInput
                style={{
                  padding: 6,
                  borderWidth: 1,
                  marginBottom: 7,
                  borderRadius: 3,
                  borderColor: Validator.validate(values.email)
                    ? "black"
                    : "red",
                }}
                type="text"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <Text style={{ color: "red" }}>{errors.email}</Text>
              <TextInput
                style={{
                  padding: 6,
                  borderWidth: 1,
                  marginBottom: 7,
                  borderRadius: 3,
                  borderColor:
                    values.username.length < 2 ||
                    Validator.validate(values.username)
                      ? "red"
                      : "black",
                }}
                type="text"
                placeholder="Username"
                autoCapitalize="none"
                autoFocus={true}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              <Text style={{ color: "red" }}>{errors.username}</Text>
              <TextInput
                style={{
                  padding: 6,
                  borderWidth: 1,
                  borderRadius: 3,
                  borderColor:
                    values.password.length < 6 ||
                    Validator.validate(values.password)
                      ? "red"
                      : "black",
                }}
                placeholder="Password"
                textContentType="password"
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <Text style={{ color: "red", marginBottom: 30 }}>
                {errors.password}
              </Text>
              <Button
                title="Sign up"
                onPress={handleSubmit}
                disabled={!isValid}
              ></Button>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 26,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ marginRight: 20, fontWeight: "700", fontSize: 16 }}
                >
                  Already have an account ?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.push("LoginScreen")}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#6bb0f5",
                      fontSize: 16,
                    }}
                  >
                    Login in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});
