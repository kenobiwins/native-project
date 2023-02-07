import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useDimensions } from "../../hooks/useDimensions";
import { addDoc } from "firebase/firestore";
import { colRefPosts } from "../../firebase/config";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  regionName: "",
  photo: null,
};

export const CreatePostsScreen = ({ navigation }) => {
  const [createPostForm, setCreatePostForm] = useState(initialState);
  const [location, setLocation] = useState(null);
  // const [currentLocation, setCurrentLocation] = useState(null);
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  // const [photo, setPhoto] = useState(null);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const { userId, login } = useSelector((state) => state.auth);
  const [dimensions] = useDimensions();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      // let { coords } = await Location.getCurrentPositionAsync();

      // setCurrentLocation({
      //   currentLocation: {
      //     latitude: coords.latitude,
      //     longitude: coords.longitude,
      //   },
      // });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const hideKeyboard = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const submitForm = async () => {
    hideKeyboard();
    UploadToCollection();

    navigation.navigate("DefaultScreen", {
      id: Math.random(),
      ...location,
      ...createPostForm,
    });

    setCreatePostForm(initialState);
  };

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setLocation({ photoLocation: { latitude, longitude } });

      const [{ city, country }] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      setCreatePostForm((prevState) => ({
        ...prevState,
        photo: uri,
        regionName: `${city} , ${country}`,
      }));
    }
  };

  const UploadToCollection = async () => {
    // console.log();
    // return after//
    try {
      await addDoc(colRefPosts, {
        userId,
        login,
        ...createPostForm,
        ...location,
        // comments: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const shouldSubmit =
    createPostForm.regionName === "" ||
    createPostForm.name === "" ||
    createPostForm.photo === null;

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View
            style={{
              ...styles.container,
              width: dimensions,
              alignSelf: "center",
            }}
          >
            {createPostForm.photo ? (
              <View
                style={{
                  width: dimensions,
                  height: 240,
                  marginBottom: 8,
                  borderRadius: 8,

                  backgroundColor: "transparent",
                }}
              >
                <Image
                  style={{
                    // flex: 1,
                    width: dimensions,
                    height: 240,
                    marginBottom: 8,
                    borderRadius: 8,
                  }}
                  source={{ uri: createPostForm.photo }}
                />
              </View>
            ) : (
              <Camera
                ref={setCamera}
                style={{ ...styles.camera, width: dimensions }}
              >
                <TouchableOpacity onPress={takePhoto}>
                  <View style={styles.cameraIcon}>
                    <FontAwesome5 name="camera" size={21} color="#BDBDBD" />
                  </View>
                </TouchableOpacity>
              </Camera>
            )}
            <Text
              style={{
                color: "#BDBDBD",
                fontSize: 16,
                alignSelf: "flex-start",
              }}
            >
              Load some picture
            </Text>
            <View style={{ ...styles.inputWrapper, width: dimensions }}>
              <TextInput
                keyboardType="name-phone-pad"
                placeholder="Name..."
                style={styles.input}
                value={createPostForm.name}
                onChangeText={(value) =>
                  setCreatePostForm((prevState) => ({
                    ...prevState,
                    name: value,
                  }))
                }
                onFocus={() => setIsShowKeyBoard(true)}
              />
            </View>
            <View style={{ ...styles.inputWrapper, width: dimensions }}>
              <TextInput
                keyboardType="name-phone-pad"
                placeholder="Location..."
                style={{ ...styles.input, paddingLeft: 24 }}
                value={createPostForm.regionName}
                onChangeText={(value) =>
                  setCreatePostForm((prevState) => ({
                    ...prevState,
                    regionName: value,
                  }))
                }
                onFocus={() => setIsShowKeyBoard(true)}
              />
              <TouchableOpacity
                style={styles.inputBtn}
                activeOpacity={0.7}
                onPress={() => console.log("hi")}
              >
                <Text style={{ ...styles.text }}>
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={submitForm}
              style={shouldSubmit ? styles.disabledBtn : styles.btn}
              disabled={shouldSubmit}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 18.75,
                  color: "#fff" /*"#BDBDBD"*/,
                }}
              >
                To publish
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
  },
  camera: {
    flex: 1,

    height: 240,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    padding: 22,
  },
  inputWrapper: {},
  input: {
    // width: "100%",
    height: 50,
    padding: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    // borderRadius: 8,
    // ...Platform.select({
    //   ios: {
    //     backgroundColor: "#E8E8E8",
    //   },
    //   android: {
    //     backgroundColor: "#E8E8E8",
    //   },
    // }),
  },
  inputBtn: {
    position: "absolute",
    top: "50%",
    left: 0,
    backgroundColor: "transparent",
    color: "#1B4371",
  },
  btn: {
    padding: 16,
    marginTop: 43,
    backgroundColor: "#FF6C00",
    color: "#fff",
    borderRadius: 100,
    alignItems: "center",
    alignSelf: "stretch",
  },
  disabledBtn: {
    padding: 16,
    marginTop: 43,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    borderRadius: 100,
    alignItems: "center",
    alignSelf: "stretch",
  },
});

// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
// import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";

// export function CreatePostsScreen() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();

//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={type}
//         ref={(ref) => {
//           setCameraRef(ref);
//         }}
//       >
//         <View style={styles.photoView}>
//           <TouchableOpacity
//             style={styles.flipContainer}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}
//           >
//             <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
//               {" "}
//               Flip{" "}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={async () => {
//               if (cameraRef) {
//                 const { uri } = await cameraRef.takePictureAsync();
//                 await MediaLibrary.createAssetAsync(uri);
//               }
//             }}
//           >
//             <View style={styles.takePhotoOut}>
//               <View style={styles.takePhotoInner}></View>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   camera: { flex: 1 },
//   photoView: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "flex-end",
//   },

//   flipContainer: {
//     flex: 0.1,
//     alignSelf: "flex-end",
//   },

//   button: { alignSelf: "center" },

//   takePhotoOut: {
//     borderWidth: 2,
//     borderColor: "white",
//     height: 50,
//     width: 50,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50,
//   },

//   takePhotoInner: {
//     borderWidth: 2,
//     borderColor: "white",
//     height: 40,
//     width: 40,
//     backgroundColor: "white",
//     borderRadius: 50,
//   },
// });
