import AsyncStorage from "@react-native-async-storage/async-storage";
// import CookieManager from "@react-native-cookies/cookies";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { set_cookie } from "../../../../redux/cookie";

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
};
 
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log('Data retrieved:', value);
      return value;
    }else{
      return null
    }
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
};

export const binData = async (key) => {
  try {
    const value = await AsyncStorage.clear();
    if (value) {
      console.log('Data binned:', value);
      return value;
    }
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
};



