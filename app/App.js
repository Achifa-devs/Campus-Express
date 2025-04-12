
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
import Video from 'react-native-video';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Dimensions, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';
import { set_user } from './redux/vendor/user';
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import { getData, storeData } from './android/app/src/utils/AsyncStore.js';
import StackNavigator from './android/app/src/utils/store/Nav';
import Login from './android/app/src/Auth/Vendor/Login.js';
import Signup from './android/app/src/Auth/Vendor/Signup.js';


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
 
  let [mode, set_mode] = useState('')

  useEffect(() => {
    let get_mode = async () => {
      let data = await getData('mode');
      if (data) { 
        set_mode(data)
      }
    }
    get_mode()
  }, []) 


  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      {
        mode === 'vendor'
        ?
        <Vendor />
        :
        mode === 'shop'
        ?
        <Shop />
        :
        <DualScreen />
      }
    </GestureHandlerRootView>
  )
}
  

function Vendor() {
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

function Shop() {
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
    <>
        
      <StackNavigator />
    </>
  )
}



function DualScreen() {
  const { width, height } = Dimensions.get('window');

  function toggleMode(mode) {
    storeData('mode', mode)
  }
  return(
    <>
      <StatusBar hidden={true} backgroundColor="#FF4500" barStyle="light-content" />
      <View>
        <View style={{
          height: (height*0.8),
          width: '100%',
          backgroundColor: '#000'
        }}>
          <Video
            source={{uri: 'https://res.cloudinary.com/daqbhghwq/video/upload/v1742848434/c3e28ead-c062-44d2-b791-d38d7d210eee/2aukVOrfv%7Cc3e28ead-c062-44d2-b791-d38d7d210eee.mp4'}}  // Local or remote video URL
            ref={(ref) => { this.player = ref }} // Reference to the video player
            onBuffer={this.onBuffer} // Buffering callback
            onError={this.videoError} // Error callback
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            controls={false} // Shows play, pause, etc.
          />
        </View>
        <View style={{
          height: '20%',
          width: '100%',
          backgroundColor: '#fff'
        }}>
          <TouchableOpacity onPress={e=>{
            toggleMode('shop')
          }} style={{
            height: 160,
            width: '45%',
            position: 'absolute',
            top: -60,
            zIndex: 100,
            elevation: 2,
            padding: 8,
            left: 10,
            borderRadius: 6,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center' 
          }}>
            <View style={{height: '40%'}}>
              <Ionicons name={'bag-outline'} size={40} color={'#000'} />
            </View>
            
            <Text style={{fontWeight: 500, color: '#000', fontSize: 18, width: '100%', textAlign: 'center', height: '20%'}}>Start shopping</Text>
            <Text style={{fontWeight: 400, color: '#000', fontSize: 14, width: '100%', textAlign: 'center', height: '40%'}}>Discover deals. Shop now with ease.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={e=>{
            toggleMode('vendor')
          }} style={{
            height: 160,
            width: '45%',
            position: 'absolute',
            top: -60,
            zIndex: 100,
            elevation: 2,
            padding: 8,
            right: 10,
            borderRadius: 6,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center' 
          }}>
            <View style={{height: '40%'}}>
              <Ionicons name={'storefront-outline'} size={40} color={'#000'} />
            </View>
            
            <Text style={{fontWeight: 500, color: '#000', fontSize: 18, width: '100%', textAlign: 'center', height: '20%'}}>Start selling</Text>
            <Text style={{fontWeight: 400, color: '#000', fontSize: 14, width: '100%', textAlign: 'center', height: '40%'}}>List products. Reach buyers. Sell fast.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}