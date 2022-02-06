/** @format */
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { firebase, db } from "../firebase";

const Post = ({ post }) => {
  const userEmail = firebase.auth().currentUser.email;
  const TimePosted = firebase.firestore.FieldValue.serverTimestamp();

  const handleLike = (post) => {
    const currentLike = !post.likes_by_users.includes(userEmail);
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLike
          ? firebase.firestore.FieldValue.arrayUnion(userEmail)
          : firebase.firestore.FieldValue.arrayRemove(userEmail),
      })
      .then(() => {
        console.log("updated likes succesfully");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const PostFooterIcons = [
    {
      name: "Like",
      imageUrl:
        "https://i.pinimg.com/originals/a8/6c/65/a86c6588b77d6088c0ef6d2f2eca3b39.jpg",
      likedImageUrl:
        "https://www.transparentpng.com/thumb/instagram-heart/5AVRiZ-instagram-heart-background.png",
    },
    {
      name: "Comment",
      imageUrl: "https://cdn131.picsart.com/328472298029211.png",
    },
    {
      name: "Save",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/5661/5661642.png",
    },
  ];

  return (
    <View
      style={{
        borderBottomColor: "#fff",
        borderWidth: 0.3,
        paddingBottom: 5,
      }}
    >
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter
          PostFooterIcons={PostFooterIcons}
          post={post}
          handleLike={handleLike}
          TimePosted={TimePosted}
        />
        <PostLikes post={post} TimePosted={TimePosted} />
        <Captions post={post} />
        <Comments post={post} />
        <CommentSection post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 5,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: post.profile_picture }}
          style={styles.stories_image}
        />
        <Text
          style={{
            color: "white",
            marginLeft: 5,
            fontWeight: "700",
          }}
        >
          {post.user}
        </Text>
      </View>
      <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
    </View>
  );
};

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      style={{ resizeMode: "cover", height: "100%" }}
      source={{ uri: post.imageUrl }}
    />
  </View>
);

const PostFooter = ({ PostFooterIcons, handleLike, post }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        width: "32%",
        flex: 1,
      }}
    >
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.likes_by_users.includes(firebase.auth().currentUser.email)
              ? PostFooterIcons[0].likedImageUrl
              : PostFooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>
      <Icon
        Imagestyle={styles.footerIcon2}
        imageUrl={PostFooterIcons[1].imageUrl}
      />
    </View>
    <View>
      <Icon
        Imagestyle={styles.footerIcon3}
        imageUrl={PostFooterIcons[2].imageUrl}
      />
    </View>
  </View>
);

const Icon = ({ Imagestyle, imageUrl }) => (
  <TouchableOpacity>
    <Image style={Imagestyle} source={{ uri: imageUrl }} />
  </TouchableOpacity>
);

const PostLikes = ({ post, TimePosted }) => (
  <View
    style={{
      flexDirection: "row",
      marginLeft: -5,
      marginBottom: 3,
    }}
  >
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length}{" "}
      {post.likes_by_users.length > 1 ? "likes" : "like"} {""} {""}
    </Text>
  </View>
);

const Captions = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      marginLeft: -5,
      alignItems: "center",
      }}
  >
    <Text style={{ color: "white", fontWeight: "700", marginRight: 6 }}>
      {post.user} -
    </Text>
    <Text style={{ color: "white" }}>{post.caption}</Text>
  </View>
);

const Comments = ({ post }) => (
  <View style={{ marginLeft: -5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray", marginBottom: 4 }}>
        view {post.comments.length < 1 ? "comment" : "comments"}
      </Text>
    )}
  </View>
);

const CommentSection = ({ post }) => (
  <>
    {post.comments.map((comment, id) => (
      <View key={id} style={{ flexDirection: "row", marginLeft: -5 }}>
        <Text style={{ color: "white", marginRight: 6, fontWeight: "700" }}>
          {comment.user} -{" "}
        </Text>
        <Text style={{ color: "white" }}>{comment.comment}</Text>
      </View>
    ))}
  </>
);

export default Post;

const styles = StyleSheet.create({
  stories_image: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 1,
    left: 0,
    borderWidth: 2,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
    marginRight: 10,
    marginLeft: -8,
  },
  footerIcon2: {
    width: 23,
    height: 23,
  },
  footerIcon3: {
    width: 28,
    height: 28,
    backgroundColor: "#fff",
    marginRight: -10,
  },
});
