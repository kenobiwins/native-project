import React, { useEffect, useState } from "react";

import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDimensions } from "../../hooks/useDimensions";
import { getDocs } from "firebase/firestore";
import { colRefPosts } from "../../firebase/config";
import { useSelector } from "react-redux";

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [dimensions] = useDimensions();
  const { login, email } = useSelector((state) => state.auth);
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

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.container, width: dimensions }}>
        <View
          style={{
            width: dimensions,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 32,
            marginBottom: 32,
            // backgroundColor: "red",
          }}
        >
          <View
            style={{ borderRadius: 16, overflow: "hidden", marginRight: 8 }}
          >
            <Image
              style={{ width: 60, height: 60, resizeMode: "cover" }}
              source={require("../../assets/images/content-images/yoda.jpg")}
            />
          </View>
          <View>
            <Text style={styles.title}>{login}</Text>
            <Text style={{ ...styles.text, fontSize: 11 }}>{email}</Text>
          </View>
        </View>
        {/* <Button title="Map" onPress={() => navigation.navigate("Map")} />
        <Button
          title="Comments"
          onPress={() => navigation.navigate("Comments")}
        /> */}
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", {
                      ...item,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: "400",
    color: "#212121CC",
  },
});
