/** @format */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { Formik, validateYupSchema } from "formik";
import Validator from "email-validator";
import { firebase } from "../../firebase";

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "password should be at least 6 characters long"),
  });

  const handleLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("we logged in", email, password);
    } catch (error) {
      Alert.alert(
        "Dear User",
        error.message + "\n\n... what would you like to do next ?",
        [
          {
                text: "Ok",
                onPress: () => console.log("OK"),
              style: "cancel",
            },
            {
                text: "SignUp",
                onPress: () => navigation.push("SignupScreen")
            }
        ]
      );
    }
  };

  return (
    <View style={{ padding: 7 }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleLogin(values.email, values.password);
        }}
        validationSchema={loginFormSchema}
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
                placeholder="Email , Phone Number or username"
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
                  borderRadius: 3,
                  marginBottom: -20,
                  borderColor:
                    values.password.length < 6 ||
                    Validator.validate(values.password)
                      ? "red"
                      : "black",
                }}
                placeholder="password"
                textContentType="password"
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <Text style={{ color: "red" }}>{errors.password}</Text>
            <View style={{ alignItems: "flex-end", padding: 10 }}>
              <TouchableOpacity>
                <Text
                  style={{ color: "#6bb0f5", fontWeight: "700", fontSize: 14 }}
                >
                  forgot password ?
                </Text>
              </TouchableOpacity>
            </View>
            <Button title="Log in" onPress={handleSubmit} disabled={!isValid} />
            <View style={styles.signupContainer}>
              <Text style={{ marginRight: 7, fontSize: 16, fontWeight: "600" }}>
                Don't have an account yet ?
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => navigation.push("SignupScreen")}
                  style={{ fontSize: 16, color: "#6bb0f5", fontWeight: "700" }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  signupContainer: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
