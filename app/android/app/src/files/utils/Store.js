import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StackNavigator from "../store/utils/Nav.js";
import { getData } from "./AsyncStore.js.js";
import { set_user } from "../../../../../redux/user.js";
import { StatusBar } from "react-native";

export function Shop() {
  let dispatch = useDispatch()
  let Stack = createNativeStackNavigator()

  let {
    user
  } = useSelector(s => s.user); 
 
  useEffect(() => {
    
    async function getter() {
      let r = await getData('user');
      dispatch(set_user(JSON.parse(r)))
    }
    getter()
  }, [])
  
 
  
  return (
    <> 
      {/* <Aside /> */}
      
      <StackNavigator />
    </>     
  )
}
