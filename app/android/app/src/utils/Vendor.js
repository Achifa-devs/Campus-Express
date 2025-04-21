import CookieManager from "@react-native-cookies/cookies";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getData } from "./AsyncStore.js";
import { set_user } from "../../../../redux/vendor/user.js";
import { useEffect } from "react";
import store from "../../../../redux/store.js";
import Login from "../vendor/auth/Login.js";
import Signup from "../vendor/auth/Signup.js";
import { StatusBar, Text, View } from "react-native";
import Aside from "../vendor/utils/Aside.js";
import StudioTab from "../vendor/utils/StudioTab.js";



export default function Vendor() {
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
  
  useEffect(() => {
    async function get_user() {
      let data = await getData('user');
      if (data) { 
        dispatch(set_user(JSON.parse(data)))
      }
    }
    if (cookie) {
      get_user() 
    }
  }, [cookie]) 
  
  return (
    <Provider store={store}>
      {
        cookie !== true
        ?
          <>
            <Stack.Navigator>
              <Stack.Screen name={'login'} options={{
                
                header: ({navigation}) =>
                (
                  
                  <View style={{ height: 0, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#1E90FF', alignItems: 'center', justifyContent: 'center'}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" /> 
                    <Text style={{fontSize: 30, color: '#fff'}}>
                      Campus Sphere - For Vendors
                    </Text>
                  </View>
                ),
                            
                            
              }} component={Login} />  
              <Stack.Screen name={'registration'} options={{
    
                header: ({navigation}) =>
                (
                  <View style={{ height: 0, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#1E90FF', alignItems: 'center', justifyContent: 'center'}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" /> 
                    <Text style={{fontSize: 30, color: '#fff'}}>
                      Campus Sphere - For Vendors
                    </Text>
                  </View>
                ),
                            
                            
              }} component={Signup} />  
            </Stack.Navigator>
          </>
        :
          <>
            {/* <WelcomeScreen /> */}
            <Aside />
            <StudioTab />
          </>
        }
    </Provider>
  )
}

