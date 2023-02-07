import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store.redux";
import { Main } from "./components/Main/Main";

const customFonts = {
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  console.log(onLayoutRootView());
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
