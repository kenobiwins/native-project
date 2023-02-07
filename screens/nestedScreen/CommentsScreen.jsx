import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { colRefPosts } from "../../firebase/config";
import { doc, collection, addDoc, getDoc, getDocs } from "firebase/firestore/";

export const CommentsScreen = ({ route }) => {
  const { docId } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [photo, setPhoto] = useState("");

  const login = useSelector((state) => state.auth.login);

  useEffect(async () => {
    getAllComments(docId);
    getPhotoById();
  }, []);

  const commitComment = async () => {
    const colRef = collection(colRefPosts, docId, "comments");
    addDoc(colRef, { comment, login, date: new Date().getTime() });
    getAllComments(docId);
  };

  const getAllComments = async (id) => {
    const colRefComments = await collection(colRefPosts, id, "comments");
    getDocs(colRefComments).then(async (snapshot) => {
      let collection = [];
      await snapshot.docs.forEach((doc) => {
        collection.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setAllComments(collection.sort((a, b) => a.date - b.date));
    });
  };

  const getPhotoById = async () => {
    const getPhoto = (await getDoc(await doc(colRefPosts, docId))).data();

    setPhoto(getPhoto.photo);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
      <SafeAreaView style={styles.commentsContainer}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.login}</Text>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <TextInput
            placeholder="Comment..."
            style={styles.input}
            onChangeText={setComment}
          />
        </View>
        <TouchableOpacity onPress={commitComment} style={styles.sendBtn}>
          {/* <Text style={styles.sendLabel}>add post</Text> */}
          <Ionicons name="arrow-up-circle" size={34} color="#FF6C00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    // justifyContent: 'center',
    paddingHorizontal: 16,
  },
  commentsContainer: {
    flex: 1,
  },
  commentContainer: {
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: "100%",
    marginBottom: 24,
  },
  comment: { color: "#212121", fontSize: 13, fontFamily: "Roboto-Regular" },
  sendBtn: {
    borderRadius: 50,
    position: "absolute",
    top: 0,
    left: "100%",
    transform: [{ translateX: -42 }, { translateY: 8 }],
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 16,
    marginTop: 31,
    // marginHorizontal: 10,
    // marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    // borderBottomColor: '#20b2aa',
    borderRadius: 100,
    padding: 16,
    color: "#212121",
    placeholderTextColor: "#BDBDBD",
  },
  image: {
    width: "100%",
    marginTop: 32,
    marginBottom: 32,
    // flex: 1,
    height: 240,
    borderRadius: 8,
  },
});
