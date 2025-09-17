import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Vibration,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setUserAuthTo } from '../../../../../../redux/reducer/auth';
import { useDispatch } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import Memory from '../../utils/memoryHandler.js';
import { set_user } from '../../../redux/info/user.js';
import { set_mode } from '../../../redux/info/mode.js';
import { set_campus } from '../../../redux/info/campus.js';

const { width, height } = Dimensions.get('window');

const Login = ({ updateActiveJsx }) => {
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
  const [serverErr, setServerErr] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  
  const dispatch = useDispatch();

  // Animation for the login button
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const buttonScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.03]
  });

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
        await Memory.store('user', (data.data.user));
        dispatch(set_user(data.data.user))
        dispatch(set_campus(data.data.user?.campus))
        dispatch(set_mode('main'))

      } else {
        // Handle specific errors
        setServerErr(data.message)
        Vibration.vibrate(300);
      }
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
    if (serverErr) setServerErr('');
  }, [errors, serverErr]);

  const handleFocus = (field) => {
    setFocusedInput(field);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
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
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>
              {serverErr ? (
                <View style={styles.serverErrorContainer}>
                  <Text style={styles.serverErrorText}>{serverErr}</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={[
                    styles.input, 
                    focusedInput === 'email' && styles.inputFocused,
                    errors.email && styles.inputError
                  ]}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={[
                  styles.passwordContainer,
                  focusedInput === 'pwd' && styles.inputFocused,
                  errors.pwd && styles.inputError
                ]}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={formData.pwd}
                    onChangeText={(text) => handleInputChange('pwd', text)}
                    secureTextEntry={!isPwdVisible}
                    onFocus={() => handleFocus('pwd')}
                    onBlur={handleBlur}
                  />
                  <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={() => setIsPwdVisible(!isPwdVisible)}
                  >
                    
                    <Ionicons
                      name={isPwdVisible ? "eye" : "eye-off"}
                      size={24} // adjust size as needed
                      color="#333" // adjust color as needed
                      style={styles.eyeIconImage}
                    />
                  </TouchableOpacity>
                </View>
                {errors.pwd ? (
                  <Text style={styles.errorText}>{errors.pwd}</Text>
                ) : null}
              </View>

              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('email-confirmation')}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity 
                  style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.loginButtonText}>Sign In</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('signup')}
              >
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    padding: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  serverErrorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  serverErrorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333',
  },
  inputFocused: {
    borderColor: '#FF4500',
    backgroundColor: '#FFF',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
  },
  eyeIcon: {
    padding: 10,
  },
  eyeIconImage: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    height: 56,
    backgroundColor: '#FF4500',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: '#FFA07A',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
    marginRight: 5,
  },
  signupLink: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Login;