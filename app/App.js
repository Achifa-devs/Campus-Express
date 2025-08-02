import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TextInput,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import store from './redux/store';
import { Shop } from './android/app/src/files/utils/Store.js';

import { DownloadAppScreen } from './android/app/src/files/utils/Stacks/Update.js';
import AuthStackScreen from './android/app/src/files/store/utils/Auth.js';

function App() {

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;

  

  const [version, setVersion] = useState('1.0.2');

  const checkAppVersion = async () => {
  try {
    // Fetch latest version from your API
    const response = await fetch('https://cs-server-olive.vercel.app/version-check', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        current_version: version,
        platform: Platform.OS, // 'ios' or 'android'
      }),
    });
    const data = await response.json();
    return data;
    } catch (error) {
      console.error('Version check failed:', error);
      // If any error occurs, still navigate to home as fallback
      throw Error('Error occured')
    }
  };
  const [update, setUpdate] = useState(false);
  const [data, setdata] = useState('');

  useEffect(() => {
    try {
      checkAppVersion().then((data) => {
        if (data.success) {
          if (!data.is_latest) {
            setdata(data)
            setUpdate(true);
          }
        } 
      })  
    } catch (error) {
      console.log(error)
    }
  }, [])
   
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"rgba(255,0,0,1)"} barStyle={'dark-content'} />
      {!update && <Provider store={store}>
        
        <NavigationContainer>
          <NavCnt />
        </NavigationContainer> 
      </Provider>}
      {
        update && <DownloadAppScreen url={data?.url} summary={data?.summary} />
      } 
    </SafeAreaView> 
  );
}

export default App;

function NavCnt() {
  const [mode, setMode] = useState('shop');

  const {auth} = useSelector(s => s.auth);
  useEffect(() => {
    if(auth){
      setMode('auth')
    }else{
      setMode('shop')
    }
  }, [auth])

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {mode === 'shop' && <Shop />}
      {mode === 'auth' && <AuthStackScreen />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flashMessage: {
    borderRadius: 5,
    height: 50,
    width: '70%',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginBottom: '25%',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  customContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4500',
    borderRadius: 5,
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 10,
  },
  messageText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
    flexShrink: 1,
  },
});
