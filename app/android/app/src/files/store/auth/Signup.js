import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropdownExample from '../../utils/DropDown.js';
import { data, school_choices } from './location.js';
import { getDeviceId } from '../utils/IdGen.js';
import { storeData } from '../../utils/AsyncStore.js.js';
import { useDispatch } from 'react-redux';
import { setUserAuthTo } from '../../../../../../redux/reducer/auth.js';

const Signup = ({updateActiveJsx}) => {
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
    const [id, setId] = useState('')
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
 

  // Form fields configuration
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
      error: errors.email,
      halfWidth: false
    },
    {
      id: 'phone',
      label: 'WhatsApp number',
      type: 'tel',
      placeholder: 'Enter your whatsapp number',
      keyboardType: 'numeric',
      error: errors.phone,
      halfWidth: false
    },
    {
      id: 'pwd',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      keyboardType: 'default',
      error: errors.pwd,
      halfWidth: false,
      rightIcon: (
        <TouchableOpacity 
          onPress={() => setIsPwdVisible(!isPwdVisible)}
          style={styles.eyeIcon}
        >
          <Text>{isPwdVisible ? '👁️' : '👁️‍🗨️'}</Text>
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
      error: errors.state,
      halfWidth: false
    },
    {
      id: 'campus',
      label: 'Campus',
      type: 'dropdown',
      data: campusLocaleList,
      fieldName: 'text',
      name: 'campus',
      placeholder: 'Select campus',
      error: errors.campus,
      halfWidth: false
    }
  ];

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
    // Clear error when field is updated
    setErrors(prev => ({ ...prev, [name]: '' }));
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
    
    const dispatch = useDispatch()

  const handleSignup = useCallback(async () => {
    setServerErr('')
    if (!validateForm()) {
      Vibration.vibrate(300);
      return;
    }

    setServerLoading(true);
    try {
      // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with actual API call
      
      const response = await fetch('http://192.168.0.4:9090/vendor/registration', {
        method: 'POST',
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data)
       
    if (data.success) {
        await storeData('user', JSON.stringify(data.data.user));
        dispatch(setUserAuthTo(false))
        console.log(data)
    } else {
        // Handle specific errors
        setServerErr(data.message)
        Vibration.vibrate(300);
 
    }
      
      
      // For demo purposes, navigate after "successful" signup
    //   navigation.navigate('user-login');
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

  const handleInputFocus = (event, fieldId) => {
      // Measure the input position and scroll to it
      const scrollResponder = scrollViewRef.current?.getScrollResponder();
      if (scrollResponder) {
          scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
              event.target,
              0, // extra offset
              true
          );
      }
  };

    const renderItem = useCallback(({ item }) => {
      if (item.type === 'dropdown') {
        return (
          <View style={[styles.inputContainer, item.halfWidth && styles.halfWidthContainer]}>
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
            <View style={[styles.inputContainer, item.halfWidth && styles.halfWidthContainer]}>
                <Text style={styles.label}>{item.label}</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        ref={ref => inputRefs.current[item.id] = ref}
                        style={styles.input}
                        placeholder={item.placeholder}
                        value={formData[item.id]}
                        onChangeText={(text) => updateData(text, item.id)}
                        secureTextEntry={item.type === 'password' && !isPwdVisible}
                        keyboardType={item.keyboardType || 'default'}
                        onFocus={(event) => handleInputFocus(event, item.id)}
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
                    />
                    {item.rightIcon || null}
                </View>
                {item.error ? <Text style={styles.errorText}>{item.error}</Text> : null}
            </View>
        );
    }, [formData, isPwdVisible, updateData]);

    const getNextField = (currentField) => {
        const currentIndex = formFields.findIndex(field => field.id === currentField);
        if (currentIndex < formFields.length - 1) {
            return formFields[currentIndex + 1].id;
        }
        return null;
    };

    return (
        <>
          
            {serverLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#FF4500" />
                </View>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                style={{ flex: 1 }}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    contentContainerStyle={styles.formContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    automaticallyAdjustContentInsets={false}
                    contentInset={{ bottom: 100 }} // Extra space at bottom
                >
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Image 
                                style={styles.logo} 
                                source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} 
                            />
                        </View>
                        <Text style={styles.title}>Registration Form</Text>
                        <Text style={[styles.title, {fontSize: 12, color: 'red', textDecoration: 'underline'}]}>{serverErr}</Text>
                    </View>
                    
                    {formFields.map((item) => renderItem({ item }))}
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('user-login')} 
                    style={styles.loginLink}
                    disabled={serverLoading ? true : false}
                >
                    <Text style={styles.loginText}>Already Have An Account? </Text>
                    <Text style={[styles.loginText, styles.loginTextBold]}>SignIn Here</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.signupButton} 
                    onPress={handleSignup}
                    disabled={serverLoading}
                >
                    <Text style={styles.signupButtonText}>
                        {serverLoading ? 'Processing...' : 'Signup'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};











// ... (keep your existing styles)
const screenWidth = Dimensions.get("window").width;

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
  header: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#fff',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 30,
  },
  logoContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  title: {
    color: '#FF4500',
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 10,
  },
  formContainer: {
    padding: 16,
    paddingBottom: 200,
    display: 'flex', justifyContent: 'space-between',backgroundColor: '#fff', flexDirection: 'row', flexWrap: 'wrap'
  },
  inputContainer: {
    marginBottom: 15,
    width: screenWidth*.9
  },
  halfWidthContainer: {
    width: screenWidth*.4,
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 3,
    paddingLeft: 5,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
    position: 'absolute', bottom: 0, zIndex: 1000, width: '100%'
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: '#FF4500',
    fontSize: 14,
  },
  loginTextBold: {
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#FF4500',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Signup;