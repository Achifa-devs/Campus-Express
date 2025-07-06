import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PasswordRecoveryScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView 
        source={{ uri: 'https://www.campussphere.net/password-recovery' }} 
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default PasswordRecoveryScreen;
