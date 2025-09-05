import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserAuthTo } from '../../../redux/reducer/auth';
import { Alert } from 'react-native';

export default function useLogInAlert() {
  const dispatch = useDispatch();

  const showLogInAlert = () => {
    Alert.alert(
      "Login Required",
      "You need to login first to continue.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("User canceled"),
        },
        {
          text: "Login",
          onPress: () => {
            console.log("Redirecting to login...");
            dispatch(setUserAuthTo(true));
            // navigation.navigate("Login"); // if using react-navigation
          },
        },
      ],
      { cancelable: false }
    );
  };

  return showLogInAlert;
}
