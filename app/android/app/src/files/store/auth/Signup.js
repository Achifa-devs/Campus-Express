import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropdownExample from '../../utils/DropDown.js';
import { data, school_choices } from './location.js';
import { getDeviceId } from '../utils/IdGen.js';
import { storeData } from '../../utils/AsyncStore.js.js';
import { useDispatch } from 'react-redux';
import { setUserAuthTo } from '../../../../../../redux/reducer/auth.js';

const Signup = ({updateActiveJsx}) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    state: '',
    campus: '',
    pwd: '',
    deviceId: getDeviceId().then(result => result)
  });
  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    state: '',
    campus: '',
    pwd: ''
  });
  const [serverLoading, setServerLoading] = useState(false);
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [campusLocaleList, setCampusLocaleList] = useState([]);
  const navigation = useNavigation();
  const [serverErr, setServerErr] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    if (formData.state) {
      const stateIndex = data.findIndex(item => 
        item.label.toLowerCase() === formData.state.toLowerCase()
      );
      const campuses = Object.values(school_choices).reverse();
      setCampusLocaleList(stateIndex >= 0 ? campuses[stateIndex] : []);
    }
  }, [formData]);

  const updateData = useCallback((value, name) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setServerErr('');
  }, []);

  const validateField = useCallback((field, value) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    switch(field) {
      case 'fname':
      case 'lname':
        if (!value) return `${field === 'fname' ? 'First' : 'Last'} name cannot be empty`;
        if (value.length < 3) return 'Must be at least 3 characters';
        return '';
      case 'email':
        if (!value) return 'Email cannot be empty';
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
      case 'phone':
        if (!value) return 'Phone cannot be empty';
        if (value.length<11) return 'Invalid number (must be 11 digits)';
        return '';
      case 'state':
      case 'campus':
        if (!value) return 'Please make a selection';
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
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);
    
  const dispatch = useDispatch();

  const handleSignup = useCallback(async () => {
    setServerErr('');
    if (!validateForm()) {
      Vibration.vibrate(300);
      return;
    }

    setServerLoading(true);
    try {
      const response = await fetch('https://cs-server-olive.vercel.app/vendor/registration', {
        method: 'POST',
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
       
      if (data.success) {
        await storeData('user', JSON.stringify(data.data.user));
        dispatch(setUserAuthTo(false));
      } else {
        setServerErr(data.message);
        Vibration.vibrate(300);
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    } finally {
      setServerLoading(false);
    }
  }, [formData, navigation, validateForm]);

  const inputRefs = useRef({});
  const scrollViewRef = useRef();

  const focusNextField = (nextField) => {
    inputRefs.current[nextField]?.focus();
  };

  const handleInputFocus = (fieldId) => {
    setFocusedInput(fieldId);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const formFields = [
    {
      id: 'fname',
      label: 'First name',
      type: 'text',
      placeholder: 'Enter first name',
      keyboardType: 'default',
      error: errors.fname,
      halfWidth: true
    },
    {
      id: 'lname',
      label: 'Last name',
      type: 'text',
      placeholder: 'Enter last name',
      keyboardType: 'default',
      error: errors.lname,
      halfWidth: true 
    }, 
    {
      id: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Enter email',
      keyboardType: 'email-address',
      error: errors.email
    },
    {
      id: 'phone',
      label: 'WhatsApp number',
      type: 'tel',
      placeholder: 'Enter your whatsapp number',
      keyboardType: 'numeric',
      error: errors.phone
    },
    {
      id: 'pwd',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      keyboardType: 'default',
      error: errors.pwd,
      rightIcon: (
        <TouchableOpacity 
          onPress={() => setIsPwdVisible(!isPwdVisible)}
          style={styles.eyeIcon}
        >
          <Text style={styles.eyeIconText}>{isPwdVisible ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      )
    },
    {
      id: 'state',
      label: 'State',
      type: 'dropdown',
      data: data,
      fieldName: 'label',
      name: 'state',
      placeholder: 'Select state',
      error: errors.state
    },
    {
      id: 'campus',
      label: 'Campus',
      type: 'dropdown',
      data: campusLocaleList,
      fieldName: 'text',
      name: 'campus',
      placeholder: 'Select campus',
      error: errors.campus
    }
  ];

  const renderInputField = useCallback((item) => {
    if (item.type === 'dropdown') {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <DropdownExample
            dropdownPosition="top"
            fieldName={item.fieldName}
            updateData={updateData}
            dropdownData={item.data}
            input_name={item.id}
            placeholder={item.placeholder}
          />
          {item.error ? <Text style={styles.errorText}>{item.error}</Text> : null}
        </View>
      );
    }

    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <View style={[
          styles.inputWrapper, 
          focusedInput === item.id && styles.inputFocused,
          item.error && styles.inputError
        ]}>
          <TextInput
            ref={ref => inputRefs.current[item.id] = ref}
            style={styles.input}
            placeholder={item.placeholder}
            value={formData[item.id]}
            onChangeText={(text) => updateData(text, item.id)}
            secureTextEntry={item.type === 'password' && !isPwdVisible}
            keyboardType={item.keyboardType || 'default'}
            onFocus={() => handleInputFocus(item.id)}
            onBlur={handleInputBlur}
            blurOnSubmit={item.id !== 'pwd'}
            onSubmitEditing={() => {
              if (item.id !== 'pwd') {
                const nextField = getNextField(item.id);
                if (nextField) {
                  focusNextField(nextField);
                }
              } else {
                Keyboard.dismiss();
              }
            }}
            returnKeyType={item.id === 'pwd' ? 'done' : 'next'}
            placeholderTextColor="#999"
            editable={!serverLoading}
          />
          {item.rightIcon || null}
        </View>
        {item.error ? <Text style={styles.errorText}>{item.error}</Text> : null}
      </View>
    );
  }, [formData, isPwdVisible, updateData, focusedInput, serverLoading]);

  const getNextField = (currentField) => {
    const currentIndex = formFields.findIndex(field => field.id === currentField);
    if (currentIndex < formFields.length - 1) {
      return formFields[currentIndex + 1].id;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {serverLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF4500" />
          <Text style={styles.loadingText}>Creating your account...</Text>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                style={styles.logo} 
                source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} 
              />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our community today</Text>
            
            {serverErr ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{serverErr}</Text>
              </View>
            ) : null}
          </View>
          
          {/* First row (fname + lname) */}
          <View style={styles.formRow}>
            {formFields.slice(0, 2).map((item) => (
              <View key={item.id} style={styles.halfWidthContainer}>
                {renderInputField(item)}
              </View>
            ))}
          </View>
          
          {/* Other fields */}
          {formFields.slice(2).map((item) => (
            <View key={item.id}>
              {renderInputField(item)}
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('user-login')} 
          style={styles.loginLink}
          disabled={serverLoading}
        >
          <Text style={styles.loginText}>Already have an account? </Text>
          <Text style={[styles.loginText, styles.loginTextBold]}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.signupButton, serverLoading && styles.signupButtonDisabled]} 
          onPress={handleSignup}
          disabled={serverLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.signupButtonText}>
            {serverLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    color: '#FF4500',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  errorBannerText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfWidthContainer: {
    width: '48%',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  inputFocused: {
    borderColor: '#FF4500',
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 15,
  },
  eyeIconText: {
    fontSize: 18,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 5,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 15,
  },
  loginTextBold: {
    fontWeight: '600',
    color: '#FF4500',
  },
  signupButton: {
    backgroundColor: '#FF4500',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonDisabled: {
    backgroundColor: '#FFA280',
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Signup;
