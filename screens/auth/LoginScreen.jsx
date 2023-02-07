import { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useRoute } from "../../router/router";
import { useDimensions } from "../../hooks/useDimensions";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations.redux";

const initialState = {
  email: "",
  password: "",
};

export const LogInScreen = ({ navigation }) => {
  const [logInForm, setLogInForm] = useState(initialState);
  const [unvisiblePass, setUnvisiblePass] = useState(true);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);

  const dispatch = useDispatch();

  const [dimensions] = useDimensions();

  const hideKeyboard = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const submitForm = async () => {
    console.log(logInForm);
    hideKeyboard();
    dispatch(authSignInUser(logInForm));
    setLogInForm(initialState);
    // navigation.navigate("Posts");
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
              marginTop: isShowKeyBoard ? 273 : 323,
            }}
          >
            <View style={styles.form}>
              <Text style={styles.title}>Log in</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={logInForm.email}
                  onChangeText={(value) =>
                    setLogInForm((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  onFocus={() => setIsShowKeyBoard(true)}
                />
              </View>
              <View style={{ ...styles.inputWrapper, width: dimensions }}>
                <TextInput
                  keyboardType="visible-password"
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry={unvisiblePass}
                  value={logInForm.password}
                  onChangeText={(value) =>
                    setLogInForm((prevState) => ({
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
                <Text style={{ ...styles.text, color: "#fff" }}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text
                  style={{ ...styles.text, color: "#1B4371", marginTop: 16 }}
                >
                  Do you havn't acc? Sign up
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
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: "center",
    // fontFamily: "Roboto",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },

  form: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
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
    marginTop: 43,
    backgroundColor: "#FF6C00",
    color: "#fff",
    borderRadius: 100,
  },
});
