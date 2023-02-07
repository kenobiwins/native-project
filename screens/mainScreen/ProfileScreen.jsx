import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { getDocs } from "firebase/firestore";
import { useDimensions } from "../../hooks/useDimensions";
import { colRefPosts } from "../../firebase/config";

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [showPhoto, setShowPhoto] = useState(false);
  const [dimensions] = useDimensions();

  useEffect(() => {
    getDocs(colRefPosts).then(async (snapshot) => {
      let collection = [];
      await snapshot.docs.forEach((doc) =>
        collection.push({
          ...doc.data(),
          docId: doc.id,
        })
      );
      setPosts(collection);
    });
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/images/backgrounds/PhotoBG.jpg")}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatarImage}
              source={
                showPhoto &&
                require("../../assets/images/content-images/yoda.jpg")
              }
            />
            <TouchableOpacity
              onPress={() => setShowPhoto(!showPhoto)}
              style={{
                width: 25,
                height: 25,
                position: "absolute",
                bottom: 14,
                left: showPhoto ? 100 : 107,
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: showPhoto ? 37 : 25,
                  height: showPhoto ? 37 : 25,
                  resizeMode: "cover",
                }}
                source={
                  showPhoto
                    ? require("../../assets/images/icons/delete.png")
                    : require("../../assets/images/icons/add.png")
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ padding: 14, alignSelf: "flex-end" }}>
            <Ionicons name="ios-exit-outline" size={38} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={{ ...styles.title, marginTop: 33, marginBottom: 32 }}>
            Profile name
          </Text>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View style={{ width: dimensions, marginBottom: 34 }}>
                <Image
                  style={{
                    width: dimensions,
                    height: 240,
                    marginBottom: 8,
                    borderRadius: 8,
                  }}
                  source={{ uri: item.photo }}
                />
                <Text
                  style={{
                    ...styles.title,
                    marginBottom: 11,
                    fontSize: 16,
                  }}
                >
                  {item.name}
                </Text>
                <View
                  style={{
                    width: dimensions,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Comments", {
                          ...item,
                        })
                      }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 22,
                      }}
                    >
                      <Image
                        style={{
                          width: 18,
                          height: 18,
                          marginRight: 9,
                          resizeMode: "contain",
                        }}
                        source={require("../../assets/images/icons/message-circle.png")}
                      />
                      <Text
                        style={{
                          ...styles.text,
                          color: "#BDBDBD",
                        }}
                      >
                        0
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        ...styles.text,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign
                        style={{ marginRight: 10 }}
                        name="like2"
                        size={21}
                        color="#FF6C00"
                      />
                      <Text style={styles.text}>152</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                    onPress={() =>
                      navigation.navigate("Map", {
                        ...item,
                      })
                    }
                  >
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        marginRight: 9,
                        resizeMode: "contain",
                      }}
                      source={require("../../assets/images/icons/map-pin.png")}
                    />
                    <Text
                      style={{
                        ...styles.text,
                        color: "#212121",
                        textDecorationLine: "underline",
                      }}
                    >
                      {item.regionName}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: {
    position: "relative",
    flex: 1,
    marginTop: 147,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // justifyContent: "center",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    // overflow: "hidden",
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -50,
    left: 150,
    zIndex: 100,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    flex: 1,
    resizeMode: "cover",
    // position: "absolute",
  },
  title: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
    color: "#212121",
  },
});
