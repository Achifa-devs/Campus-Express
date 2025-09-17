import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You'll need to install this

export default function ChangePwd({ route, navigation }) {
  const { token } = route.params || {};
  const [token_sent, set_token_sent] = useState(false);
  const [pwd_set, set_pwd_set] = useState(false);
  const [isFocused, setIsFocused] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const { user } = useSelector(s => s.user);
  const [pwd, set_pwd] = useState('');
  const [current_pwd, set_current_pwd] = useState('');
  const [c_pwd, set_c_pwd] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [c_pwdErr, set_c_pwdErr] = useState('');
  const [currentPwdErr, set_currentPwdErr] = useState('');

  async function update_pwd_pin() {
    return await axios.post('https://estate-dun-eta.vercel.app/system.passcode-update', 
      { pin: pwd, old_pin: current_pwd, id: user?.id })
      .then(({ data }) => ({ success: data.success }))
      .catch(err => (err.response?.data));
  }

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!current_pwd) {
      set_currentPwdErr('Current passcode is required');
      isValid = false;
    } else {
      set_currentPwdErr('');
    }
    
    if (!pwd || pwd.length < 6) {
      setPwdErr('Passcode must be at least 6 digits');
      isValid = false;
    } else {
      setPwdErr('');
    }
    
    if (pwd !== c_pwd) {
      set_c_pwdErr('Passcodes do not match');
      isValid = false;
    } else {
      set_c_pwdErr('');
    }
    
    return isValid;
  };

  const handleSubmit = async () => {
    if (token === undefined) {
      set_token_sent(true);
      // Send token logic would go here
      // let response = await send_token(user?.phone);
      // if (response) {
      //   navigation.navigate('Token', { redirect: 'Password' });
      //   set_token_sent(false);
      // }
    } else {
      if (validateForm()) {
        set_pwd_set(true);
        try {
          const response = await update_pwd_pin();
          if (response.success) {
            Alert.alert('Success', 'Passcode was updated successfully.');
            set_pwd('');
            set_c_pwd('');
            set_current_pwd('');
            navigation.goBack();
          } else {
            Alert.alert('Error', response.err || 'Failed to update passcode. Please try again.');
          }
        } catch (error) {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        } finally {
          set_pwd_set(false);
        }
      } else {
        Vibration.vibrate(100);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Loading Overlays */}
        {token_sent && (
          <View style={styles.overlay}>
            <View style={styles.overlayContent}>
              <ActivityIndicator size="large" color="#FF4500" />
              <Text style={styles.overlayText}>Sending verification token{'\n'}Please wait...</Text>
            </View>
          </View>
        )}
        
        {pwd_set && (
          <View style={styles.overlay}>
            <View style={styles.overlayContent}>
              <ActivityIndicator size="large" color="#FF4500" />
              <Text style={styles.overlayText}>Updating passcode{'\n'}Please wait...</Text>
            </View>
          </View>
        )}

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Information Cards */}
          <View style={styles.infoCard}>
            <Icon name="security" size={20} color="#4CAF50" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              For security, we need to verify your identity with a token sent to your phone number.
            </Text>
          </View>

          <View style={styles.warningCard}>
            <Icon name="warning" size={20} color="#FF9800" style={styles.warningIcon} />
            <Text style={styles.warningText}>
              We will never send you a temporary passcode by phone, email or text message.
              Always use something that's only known to you.
            </Text>
          </View>

          {/* Forgot Password Link */}
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot passcode? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('recover-pwd')}>
              <Text style={styles.recoverLink}>Recover it now</Text>
            </TouchableOpacity>
          </View>

          {/* Password Inputs (only shown if token exists) */}
          {token && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Current Passcode</Text>
                <View style={[
                  styles.inputWrapper, 
                  isFocused.current && styles.inputFocused,
                  currentPwdErr ? styles.inputError : null
                ]}>
                  <TextInput
                    placeholder="Enter current passcode"
                    placeholderTextColor="#999"
                    secureTextEntry
                    keyboardType="numeric"
                    maxLength={6}
                    value={current_pwd}
                    onChangeText={set_current_pwd}
                    style={styles.input}
                    onFocus={() => handleFocus('current')}
                    onBlur={() => handleBlur('current')}
                  />
                </View>
                {currentPwdErr !== '' && (
                  <View style={styles.errorContainer}>
                    <Icon name="error-outline" size={16} color="#FF3B30" />
                    <Text style={styles.errorText}>{currentPwdErr}</Text>
                  </View>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Passcode</Text>
                <View style={[
                  styles.inputWrapper, 
                  isFocused.new && styles.inputFocused,
                  pwdErr ? styles.inputError : null
                ]}>
                  <TextInput
                    placeholder="Enter new passcode (6 digits)"
                    placeholderTextColor="#999"
                    secureTextEntry
                    keyboardType="numeric"
                    maxLength={6}
                    value={pwd}
                    onChangeText={set_pwd}
                    style={styles.input}
                    onFocus={() => handleFocus('new')}
                    onBlur={() => handleBlur('new')}
                  />
                </View>
                {pwdErr !== '' && (
                  <View style={styles.errorContainer}>
                    <Icon name="error-outline" size={16} color="#FF3B30" />
                    <Text style={styles.errorText}>{pwdErr}</Text>
                  </View>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm New Passcode</Text>
                <View style={[
                  styles.inputWrapper, 
                  isFocused.confirm && styles.inputFocused,
                  c_pwdErr ? styles.inputError : null
                ]}>
                  <TextInput
                    placeholder="Confirm new passcode"
                    placeholderTextColor="#999"
                    secureTextEntry
                    keyboardType="numeric"
                    maxLength={6}
                    value={c_pwd}
                    onChangeText={set_c_pwd}
                    style={styles.input}
                    onFocus={() => handleFocus('confirm')}
                    onBlur={() => handleBlur('confirm')}
                  />
                </View>
                {c_pwdErr !== '' && (
                  <View style={styles.errorContainer}>
                    <Icon name="error-outline" size={16} color="#FF3B30" />
                    <Text style={styles.errorText}>{c_pwdErr}</Text>
                  </View>
                )}
              </View>
            </>
          )}
        </ScrollView>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSubmit}
          >
            <Text style={styles.actionButtonText}>
              {token ? 'Update Passcode' : 'Send Verification Token'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    fontSize: 16,
    color: '#333',
    marginTop: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1B5E20',
    lineHeight: 20,
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  warningIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#5E4200',
    lineHeight: 20,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#666',
  },
  recoverLink: {
    color: '#FF4500',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFocused: {
    borderColor: '#FF4500',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 14,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginLeft: 4,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});