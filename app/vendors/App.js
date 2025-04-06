
import { 
  NavigationContainer 
} from '@react-navigation/native';
import store from './redux/store';
import { 
  Provider,
  useDispatch,
  useSelector,
} from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import StackNavigator from './android/app/src/reusables/Nav';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './android/app/src/Auth/Signup';
import Login from './android/app/src/Auth/Login';
import { Alert, Text, View } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';
import StudioTab from './android/app/src/reusables/StudioTab';
import { set_cookie } from './redux/cookie';
import { get_cookie, getData } from './android/app/src/reusables/AsyncStore.js';
import { set_user } from './redux/user.js';


function App(){  
  
  return (
    
    <Provider store={store}>
      <NavigationContainer>
        <NavCnt />
      </NavigationContainer>
    </Provider> 

  );
}
export default App;



function NavCnt() {
  let dispatch = useDispatch()

  let {
    cookie
  }= useSelector(s=> s.cookie)
  let Stack = createNativeStackNavigator()


  useEffect(() => {
    CookieManager.get('https://campusexpressng.com')
    .then((result) => {
    // console.log(result)
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
      dispatch(set_user(JSON.parse(data)))
    }
    get_user() 
  }, []) 

  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
       {
          cookie !== true
          ?
            <>
              <Stack.Navigator>
                <Stack.Screen name={'login'} options={{
      
                  header: ({navigation}) =>
                  (
                    <View style={{ height: 0, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#1E90FF', alignItems: 'center', justifyContent: 'center'}}>
                      
                      <Text style={{fontSize: 30, color: '#fff'}}>
                        Paypenz
                      </Text>
                    </View>
                  ),
                              
                              
                }} component={Login} />  
                <Stack.Screen name={'registration'} options={{
      
                  header: ({navigation}) =>
                  (
                    <View style={{ height: 0, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#1E90FF', alignItems: 'center', justifyContent: 'center'}}>
                      
                      <Text style={{fontSize: 30, color: '#fff'}}>
                        Paypenz
                      </Text>
                    </View>
                  ),
                              
                              
                }} component={Signup} />  
              </Stack.Navigator>
            </>
          :
          <StudioTab />
        }
    </GestureHandlerRootView>
  )
}
  