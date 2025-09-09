import React from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { set_connect_purchase_modal } from '../../../../../../redux/connect_purchase';

export default function useInsufficientConnectAlert() {
  const dispatch = useDispatch();

  const showInsufficientConnectAlert = () => {
    Alert.alert(
      "Insufficient connect",
      "You need more connects to contact this vendor.",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("User canceled"),
        },
        {
          text: "Purchase now",
          onPress: () => {
            console.log("Redirecting to login...");
            dispatch(set_connect_purchase_modal(1));
            // navigation.navigate("Login"); // if using react-navigation
          },
        },
      ],
      { cancelable: false }
    );
  };

  return showInsufficientConnectAlert;
}
