import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import NavigationHandler from './src/navigation/Index'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppState, Linking } from 'react-native'

export default function App() {


  const [resumeTick, setResumeTick] = useState(0);

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
