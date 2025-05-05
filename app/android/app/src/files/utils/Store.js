import CookieManager from "@react-native-cookies/cookies";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StackNavigator from "../store/utils/Nav.js";
import Aside from "../vendor/utils/Aside.js";

export function Shop() {
  let dispatch = useDispatch()
  let Stack = createNativeStackNavigator()

  let {
    cookie
  } = useSelector(s => s.cookie); 
 
  useEffect(() => {
    CookieManager.get('https://campussphere.net')
    .then((result) => {
      if(result.jwt_token.value !== null && result.jwt_token.value !== '') {
        dispatch(set_cookie(true))
      }else{
        dispatch(set_cookie(false))
      }
    })
    .catch(err => console.log(err))
  }, [])
  
 
  
  return (
    <> 
      {/* <Aside /> */}
      <StackNavigator />
    </>     
  )
}
