import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './redux/store';
import { Shop } from './android/app/src/files/utils/Store.js';
import { setToggleMessage } from './redux/toggleMssg.js';

import notifee, {
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
  AuthorizationStatus
} from '@notifee/react-native';

import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage
} from '@react-native-firebase/messaging';
import { getData } from './android/app/src/files/utils/AsyncStore.js.js';
import { setUserAuthTo } from './redux/reducer/auth.js';

const flashMessageRef = React.createRef();

function App() {
  useEffect(() => {
    (async () => {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Notification permissions granted.');
      } else {
        console.log('Notification permissions not granted.');
      }
    })();
  }, []);

  useEffect(() => {
    const app = getApp();
    const messaging = getMessaging(app);

    // Setup FCM token
    requestPermission(messaging).then(() => {
      getToken(messaging).then(token => {
        console.log('FCM Token:', token);
      });
    });

    // Create notification channels
    (async () => {
      await notifee.createChannel({
        id: 'remoteMessage',
        name: 'Remote Messages',
        importance: AndroidImportance.HIGH,
        sound: 'default', // Enables sound
        visibility: AndroidVisibility.PUBLIC, // For lockscreen
        vibration: true,
      });
    })();

    // Foreground message handler
    const unsubscribe = onMessage(messaging, async remoteMessage => {
      console.log('Foreground FCM:', remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.data?.title,
        body: remoteMessage.data?.body,
        android: {
          channelId: 'remoteMessage',
          smallIcon: 'ic_notification', // White-only icon for status bar
          largeIcon: 'ic_notification_large', // Your colored logo
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: remoteMessage.data?.media,
          },
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
        },
      });
    });

    return unsubscribe;
  }, []);
   
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
  const [mode, setMode] = useState('shop');
  const { toggleMessage } = useSelector(state => state.toggleMessage);
  const dispatch = useDispatch();

  function handleShowMessage() {
    if (flashMessageRef.current) {
      flashMessageRef.current.showMessage({
        message: '',
        position: 'bottom',
        style: styles.flashMessage,
        renderCustomContent: () => (
          <View style={styles.customContent}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/t_logo%20resize/v1743769930/2024-06-27_dqlq3a.png',
              }}
              style={styles.logo}
            />
            <Text style={styles.messageText}>{toggleMessage}</Text>
          </View>
        ),
      });
    }
  }

  useEffect(() => {
    if (toggleMessage !== null) {
      handleShowMessage();
    }
    dispatch(setToggleMessage(null));
  }, [toggleMessage]);

  useEffect(() => {
    (async function Auth() {
      let response = await getData('user');
      const user = (JSON.parse(response));
      console.log("user auth:", user)
      if (user.user_id) {
        dispatch(setUserAuthTo(true))
      } else {
        dispatch(setUserAuthTo(true))
      }
    })();
  }, [])
      

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {mode === 'shop' && <Shop />}
      <FlashMessage ref={flashMessageRef} position="bottom" />
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
