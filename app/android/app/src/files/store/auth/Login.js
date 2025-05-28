import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Vibration
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setUserAuthTo } from '../../../../../../redux/reducer/auth';
import { useDispatch } from 'react-redux';
import { storeData } from '../../utils/AsyncStore.js';

const Login = ({updateActiveJsx}) => {
  const [formData, setFormData] = useState({
    email: '',
    pwd: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    pwd: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const navigation = useNavigation();
  const [serverErr, setServerErr] = useState('')

  const validateField = useCallback((field, value) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    switch(field) {
      case 'email':
        if (!value) return 'Email cannot be empty';
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
      case 'pwd':
        if (!value) return 'Password cannot be empty';
        if (value.length < 8) return 'Must be at least 8 characters';
        return '';
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {
      email: validateField('email', formData.email),
      pwd: validateField('pwd', formData.pwd)
    };
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.pwd;
  }, [formData, validateField]);
    const dispatch = useDispatch()

  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      Vibration.vibrate(300);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with actual API call
      const response = await fetch('https://cs-server-olive.vercel.app/vendor/login', {
        method: 'POST',
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(formData)
      });
        const data = await response.json();
        
        console.log(data)
      
      if (data.success) {
        await storeData('user', JSON.stringify(data.data.user));
        dispatch(setUserAuthTo(true))
      } else {
        // Handle specific errors
        setServerErr(data.message)
        Vibration.vibrate(300);
      }
      
      // For demo purposes, navigate after "successful" login
      // navigation.navigate('user-home');
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ ...prev, pwd: 'Login failed. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigation, validateForm]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF4500" />
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              style={styles.logo} 
              source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} 
            />
          </View>
                <Text style={styles.title}>Login Form</Text>
                <Text style={[styles.title, {fontSize: 12, color: 'red', textDecoration: 'underline'}]}>{serverErr}</Text>
                  
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                value={formData.pwd}
                onChangeText={(text) => handleInputChange('pwd', text)}
                secureTextEntry={!isPwdVisible}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setIsPwdVisible(!isPwdVisible)}
              >
                <Text style={styles.eyeIconText}>
                  {isPwdVisible ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.pwd ? <Text style={styles.errorText}>{errors.pwd}</Text> : null}
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.signupLink}
          onPress={() => navigation.navigate('user-signup')}
        >
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Text style={[styles.signupText, styles.signupTextBold]}>Sign up here</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FF4500',
    marginTop: 15,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 10,
  },
  eyeIconText: {
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#FF4500',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#FF4500',
    fontSize: 14,
  },
  signupTextBold: {
    fontWeight: 'bold',
  },
});

export default Login;