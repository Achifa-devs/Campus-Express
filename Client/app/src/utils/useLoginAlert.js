import React from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { set_mode } from '../../redux/info/mode';

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
            dispatch(set_mode('auth'));
            // navigation.navigate("Login"); // if using react-navigation
          },
        },
      ],
      { cancelable: false }
    );
  };

  return showLogInAlert;
}
