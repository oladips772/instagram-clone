/** @format */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { db, firebase } from "../../firebase";

const uploadPostScheme = Yup.object().shape({
  imageUrl: Yup.string().url().required(" A url is required"),
  caption: Yup.string().max(2200, "reached caption character limit"),
});

const Placeholder_Img =
  "https://awcci.af/wp-content/uploads/2017/10/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323037383234352f3235393331332f35653833313336322d386362612d313165322d383435332d6536626439353663383961342e706e67.png";
const FormikPostUploader = ({ navigation }) => {
  const [thumbnail, setThumbnail] = useState(Placeholder_Img);
  const [CloggedInUser, setCloggedInUser] = useState([]);

  const user = firebase.auth().currentUser;

  const getUserName = () => {
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCloggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profileUrl,
          });
        })
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
    .collection("users")
    .doc(user.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: CloggedInUser.username,
        profile_picture: CloggedInUser.profilePicture,
        owner_uid: user.uid,
        owner_email: user.email,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        caption: caption,
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());
      return unsubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostScheme}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              padding: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              borderWidth: 0.4,
              borderBottomColor: "gray",
              width: "100%",
              paddingBottom: 12,
            }}
          >
            <Image
              style={{ height: 80, width: 100 }}
              source={{
                uri: thumbnail ? thumbnail : Placeholder_Img,
              }}
            />
            <TextInput
              style={{
                color: "white",
                fontSize: 20,
                flex: 1,
                marginLeft: 12,
                top: -30,
              }}
              placeholder="Write a caption.."
              placeholderTextColor="gray"
              multiline={true}
              onChangeText={handleChange("caption")}
              onBlur={handleBlur("caption")}
              value={values.caption}
            />
          </View>
          <TextInput
            onChange={(e) => setThumbnail(e.nativeEvent.text)}
            style={{ color: "white" }}
            placeholder="image url"
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ color: "red", fontWeight: "700" }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button
            title="Share"
            onPress={handleSubmit}
            disabled={!isValid}
          ></Button>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
