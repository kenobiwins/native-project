import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nestedScreen/DefaultScreenPosts";
import { CommentsScreen } from "../nestedScreen/CommentsScreen";
import { MapScreen } from "../nestedScreen/MapScreen";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations.redux";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogOut}
              style={{ paddingRight: 16 }}
            >
              <Ionicons name="ios-exit-outline" size={38} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
