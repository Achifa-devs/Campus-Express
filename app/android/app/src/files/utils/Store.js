import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StackNavigator from "../store/utils/Nav.js";
import { binData, getData, storeData } from "./AsyncStore.js.js";
import { set_user } from "../../../../../redux/user.js";
import { StatusBar } from "react-native";
import axios from "axios";

export function Shop() {
  let dispatch = useDispatch()
  let Stack = createNativeStackNavigator()

  let {
    user
  } = useSelector(s => s.user); 
 
  useEffect(() => {
    
    async function getter() {

      try {
        let json_user = await getData('user');
        let parsed_user = JSON.parse(json_user);
        if (parsed_user) {
          const userRes = await axios.get('https://cs-server-olive.vercel.app/vendor', {params: {user_id: parsed_user?.user_id}})
          const user = await userRes.data;
          console.log(user, parsed_user.user_id)
    
          if(user.success && user.data){
            binData('user')
            storeData('user', JSON.stringify(user.data))
            dispatch(set_user((user?.data)))
          }else{
            dispatch(set_user(parsed_user))
          }
        } else {
          dispatch(set_user(null))
        }
      } catch (error) {
        console.log("error: ", error)
      }

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
