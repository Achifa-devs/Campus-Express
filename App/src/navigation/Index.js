import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Memory from "../utils/memoryHandler";
import { set_user } from "../../redux/info/user";
import GetStartedScreen from "./Intro";
import AuthStackScreen from "./Auth";
import Main from "./Tab";
import WelcomeScreen from "./Welcome";
import { set_mode } from "../../redux/info/mode";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

function NavigationHandler() {
  const { mode } = useSelector((s) => s.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await Memory.get("user");
        if (user) {
          dispatch(set_user(user));
          dispatch(set_mode("main"));
          return;
        }

        const anon = await Memory.get("anon");
        if (anon) {
          dispatch(set_mode("auth"));
        } else {
          dispatch(set_mode("intro"));
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        dispatch(set_mode("intro"));
      }
    };

    setTimeout(() => {
      checkAuthStatus();
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={"#FF4500"} />

      <NavigationContainer>
        {mode === null && <WelcomeScreen />}
        {mode === "main" && <Main />}
        {mode === "intro" && <GetStartedScreen />}
        {mode === "auth" && <AuthStackScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default NavigationHandler;
