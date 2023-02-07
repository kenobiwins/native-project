import { useState } from "react";
import {
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { useDimensions } from "../../hooks/useDimensions";
import { authSignUpUser } from "../../redux/auth/authOperations.redux";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [registerForm, setRegisterForm] = useState(initialState);
  const [unvisiblePass, setUnvisiblePass] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);

  const [dimensions] = useDimensions();

  const dispatch = useDispatch();

  const hideKeyboard = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const submitForm = () => {
    // console.log(registerForm);
    hideKeyboard();
    dispatch(authSignUpUser(registerForm));
    setRegisterForm(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/backgrounds/PhotoBG.jpg")}
        >
          <View
            style={{
              ...styles.container,
              position: "relative",
              ...Platform.select({
                ios: { marginTop: isShowKeyBoard ? 132 : 260 },
                android: {
                  marginTop: isShowKeyBoard ? 0 : 220,
                },
              }),
            }}
          >
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
            <View style={{ ...styles.form, width: dimensions }}>
              <Text style={styles.title}>Registration</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Login"
                  style={styles.input}
                  value={registerForm.login}
                  onChangeText={(value) =>
                    setRegisterForm((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                  onFocus={() => setIsShowKeyBoard(true)}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={registerForm.email}
                  onChangeText={(value) =>
                    setRegisterForm((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  onFocus={() => setIsShowKeyBoard(true)}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="visible-password"
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry={unvisiblePass}
                  value={registerForm.password}
                  onChangeText={(value) =>
                    setRegisterForm((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  onFocus={() => setIsShowKeyBoard(true)}
                />
                <TouchableOpacity
                  style={styles.inputBtn}
                  activeOpacity={0.7}
                  onPress={() => setUnvisiblePass(!unvisiblePass)}
                >
                  <Text style={{ ...styles.text, color: "#1B4371" }}>
                    {unvisiblePass ? "SHOW" : "HIDE"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={submitForm} style={styles.btn}>
                <Text style={{ ...styles.text, color: "#fff" }}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{ ...styles.text, color: "#1B4371", marginTop: 16 }}
                >
                  Do you have acc? Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // borderRadius: "25px 25px 0 0",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "flex-start",
    // fontFamily: "Roboto",
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    // overflow: "hidden",
    backgroundColor: "#F6F6F6",
    top: -50,
    left: 0,
    zIndex: 100,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },

  form: {
    flex: 1,
    // height: 100,
    // backgroundColor: "#fff",
    alignItems: "stretch",
  },
  title: {
    marginTop: 0,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    ...Platform.select({
      ios: {},
      android: {},
    }),
  },
  text: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
  },
  inputWrapper: {
    alignItems: "stretch",
    position: "relative",
  },
  inputBtn: {
    position: "absolute",
    top: "50%",
    right: 16,
    backgroundColor: "transparent",
    color: "#1B4371",
  },
  input: {
    width: "100%",
    height: 50,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        backgroundColor: "#E8E8E8",
      },
      android: {
        backgroundColor: "#E8E8E8",
      },
    }),
  },
  btn: {
    padding: 16,
    backgroundColor: "#FF6C00",
    color: "#fff",
    borderRadius: 100,
    ...Platform.select({
      ios: {
        marginTop: 43,
      },
      android: {
        marginTop: 16,
      },
    }),
  },
});
