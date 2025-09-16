import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';

const PasswordScreen = ({ route, navigation }) => {
  const { email, hasToken: initialHasToken } = route.params || {};
  const [hasToken, setHasToken] = useState(initialHasToken || false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const validateToken = (token) => {
    if (!token) {
      return 'Token is required';
    }
    if (token.length !== 5) { // Assuming 6-digit token
      return 'Token must be 5 digits';
    }
    return '';
  };

  const handleVerifyToken = () => {
    const tokenValidationError = validateToken(token);
    if (tokenValidationError) {
      setTokenError(tokenValidationError);
      return;
    }

    setTokenError('');
    ConfirmToken()
  };


  function ConfirmToken() {
    setLoading(true)
    axios.post("https://cs-server-olive.vercel.app/verify-token", {
      email,
      token,
    })
    .then((result) => {
      setLoading(false)

      const response = result.data; // axios auto-parses JSON
      console.log(response);

      if (response.success && response.data) {
        setHasToken(true)
      } else {
        setTokenError("Invalid token")
        setHasToken(false)
      }

    })
    .catch((err) => {
      setLoading(false)
      console.log(err);
      setHasToken(false)
      Alert.alert("Internal server error", "please try again!")
    });

  }

  const handleChangePassword = () => {
    const passwordValidationError = validatePassword(password);
    const confirmValidationError = password !== confirmPassword ? 
      'Passwords do not match' : '';

    if (passwordValidationError || confirmValidationError) {
      setPasswordError(passwordValidationError);
      setConfirmPasswordError(confirmValidationError);
      return;
    }
    setLoading(true)


    axios.post("https://cs-server-olive.vercel.app/reset-password", {
      email,
      password: password,
    })
    .then((result) => {
      setLoading(false)

      const response = result.data; // axios parses JSON automatically

      if (response.success && response.data) {
        Alert.alert("Password changed successfully!")
        navigation.navigate('login')
      } else {
        Alert.alert("Password was not changed successfully!", "Please try again")
      }
    })
    .catch((err) => {
      setLoading(false)

      console.log(err);
      Alert.alert("Internal server error!", "Please try again")
    });

  };

  if(loading){
    return (

      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    )
  }

  if (!hasToken) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Token Verification</Text>
            <Text style={styles.subtitle}>
              Please enter the verification token sent to {email}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, tokenError && styles.inputError]}
                placeholder="Enter verification token"
                placeholderTextColor="#999"
                value={token}
                onChangeText={setToken}
                keyboardType="number-pad"
                maxLength={6}
              />
              {tokenError ? (
                <Text style={styles.errorText}>{tokenError}</Text>
              ) : null}
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleVerifyToken}
            >
              <Text style={styles.buttonText}>Verify Token</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Please enter your new password
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, passwordError && styles.inputError]}
              placeholder="Enter new password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, confirmPasswordError && styles.inputError]}
              placeholder="Confirm new password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordScreen;