import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricAuth = () => {
  const handleBiometricAuth = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert('Biometrics not available');
        return;
      }

      if (biometryType === 'TouchID' || biometryType === 'FaceID' || biometryType === 'Biometrics') {
        const result = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm your identity' });

        if (result.success) {
          Alert.alert('Authentication Successful');
        } else {
          Alert.alert('Authentication Cancelled');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Authentication Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Biometric Authentication</Text>
      <Button title="Authenticate" onPress={handleBiometricAuth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default BiometricAuth;
