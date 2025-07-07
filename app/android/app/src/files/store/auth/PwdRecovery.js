import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PasswordRecoveryScreen = () => {

  let navigation = useNavigation()

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('WebView sent:', data);

    if (data.success) {
      Alert.alert('Success', data.message);
      navigation.navigate('user-login')
      // Optional: navigate away, update state, close WebView, etc.
    }else{

      Alert.alert('Error', data.message);
      navigation.navigate('user-login')

    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView 
        source={{ uri: 'https://www.campussphere.net/password-recovery?app=true' }} 
        // source={{ uri: 'https://www.campussphere.net/password-recovery' }} 
        style={{ flex: 1 }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        injectedJavaScript={`
          window.addEventListener('message', function(event) {
            window.ReactNativeWebView.postMessage(event.data);
          });
        `}
      />
    </SafeAreaView>
  );
};

export default PasswordRecoveryScreen;
