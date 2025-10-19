import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import NavigationHandler from './src/navigation/Index'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppState, Linking, StatusBar } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import notifee, { AndroidImportance } from '@notifee/react-native';
import Memory from './src/utils/memoryHandler'
import axios from 'axios'
import { navigate } from './src/navigation/root_nav'

export default function App() {


  const [resumeTick, setResumeTick] = useState(0);


 
  async function setupNotifee() {
    await notifee.requestPermission();
    await messaging().requestPermission();

    // Create notification channel (Android only)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  }

  useEffect(() => {
    setupNotifee(); 

    // Request permission
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };
    requestPermission();

    // Get and log FCM token
    messaging()
      .getToken()
      .then(token => {
        console.log('Device FCM Token:', token);
        Memory.store('fcm', token)
      });

    // Foreground listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    
      console.log("room",JSON.parse(partner))
      // Show local notification with Notifee
      await notifee.displayNotification({
        title: remoteMessage.data?.title || 'New message',
        body: remoteMessage.data?.body || 'You have a new message!',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_notification', // make sure this icon exists in android/app/src/main/res/
          color: '#FF4500'
        },
      });
    });

    return unsubscribe;
  }, []);



  // Listen for app returning from background and deep link events
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        setResumeTick(t => t + 1);
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    const onUrl = ({ url }) => {
      // Treat deep links or return from external share as a resume trigger
      setResumeTick(t => t + 1);
    };

    const linkingSubscription = Linking.addEventListener('url', onUrl);

    // Check if app was opened via a link
    Linking.getInitialURL()
      .then((url) => {
        if (url) onUrl({ url });
      })
      .catch(() => {});

    return () => {
      appStateSubscription.remove();
      linkingSubscription.remove();
    };
  }, []);

  useEffect(() => {
    StatusBar.setBackgroundColor('#FF4500'); // orange-red
    StatusBar.setBarStyle('dark-content');  // white text/icons

    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(false);
    }
  }, []);

  useEffect(() => {
    async function checkInitialNotification() {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification?.notification?.data) {
        const { room } = initialNotification.notification.data;
        navigate('Chat', { 
          room,
          from: 'notifee',
          id: Tools.generateId(10) 
        });
      }
    }
    checkInitialNotification();
  }, []);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
      
        <Provider store={store}>
          <NavigationHandler />
        </Provider>
  
      </SafeAreaView>
    </>
  )
}
