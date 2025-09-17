import React, { useState } from 'react'
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

export default function ChangePhone({ route, navigation }) {
  const { token } = route.params || {};
  const { user } = useSelector(s => s.user);
  const [token_sent, set_token_sent] = useState(false);
  const [phone_sent, set_phone_sent] = useState(false);
  const [new_phone, set_new_phone] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  function check_number_config(num) {
    if (parseInt(num[0]) === 0) {
      return 11;
    } else {
      return 10;
    }
  }

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  async function update_phone_pin() {
    return await axios.post('https://estate-dun-eta.vercel.app/system.phone-update', { phone: new_phone, id: user?.userid })
      .then(({ data }) => ({ bool: data.success }))
      .catch(err => (err.response?.data));
  }

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
        
        {phone_sent && (
          <View style={styles.overlay}>
            <View style={styles.overlayContent}>
              <ActivityIndicator size="large" color="#FF4500" />
              <Text style={styles.overlayText}>Updating phone number{'\n'}Please wait...</Text>
            </View>
          </View>
        )}


        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Information Cards */}
          <View style={styles.infoCard}>
            <Icon name="info-outline" size={20} color="#FFA500" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              We'll text a verification code to your new number to confirm it.
            </Text>
          </View>

          <View style={styles.securityCard}>
            <Icon name="security" size={20} color="#4CAF50" style={styles.securityIcon} />
            <View>
              <Text style={styles.securityText}>
                For security purposes, we need to verify your identity with a token sent to your current number.
              </Text>
              <TouchableOpacity style={styles.learnMoreBtn}>
                <Text style={styles.learnMoreText}>Learn how to keep your account safe</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Phone Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Phone Number</Text>
            <View style={styles.phoneInputWrapper}>
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryCodeText}>+234</Text>
              </View>
              <View style={[styles.inputWrapper, styles.disabledInput]}>
                <Text style={styles.disabledText}>{user?.phone || 'Not provided'}</Text>
              </View>
            </View>
          </View>

          {/* New Phone Number Input (only shown if token exists) */}
          {token && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Phone Number</Text>
              <View style={styles.phoneInputWrapper}>
                <View style={styles.countryCodeContainer}>
                  <Text style={styles.countryCodeText}>+234</Text>
                </View>
                <View style={[styles.inputWrapper, isFocused && styles.inputFocused, phoneErr ? styles.inputError : null]}>
                  <TextInput
                    placeholder="Enter new phone number"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    maxLength={11}
                    value={new_phone}
                    onChangeText={set_new_phone}
                    style={styles.phoneInput}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
              </View>
              {phoneErr !== '' && (
                <View style={styles.errorContainer}>
                  <Icon name="error-outline" size={16} color="#FF3B30" />
                  <Text style={styles.errorText}>{phoneErr}</Text>
                </View>
              )}
            </View>
          )}

          {/* Alternative Option */}
          <TouchableOpacity style={styles.alternativeOption} onPress={() => navigation.navigate('recover-pwd')}>
            <Text style={styles.alternativeOptionText}>Register new number instead</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, (!token && new_phone !== '' && new_phone.length < 10) && styles.buttonDisabled]}
            onPress={async () => {
              // Implementation logic here
            }}
            disabled={(!token && new_phone !== '' && new_phone.length < 10)}
          >
            <Text style={styles.actionButtonText}>
              {token ? 'Save Changes' : 'Send Verification Token'}
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
    backgroundColor: '#FFF8E1',
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
    color: '#5E4200',
    lineHeight: 20,
  },
  securityCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  securityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: '#1B5E20',
    lineHeight: 20,
    marginBottom: 8,
  },
  learnMoreBtn: {
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    color: '#4CAF50',
    fontWeight: '500',
    textDecorationLine: 'underline',
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
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRightWidth: 0,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  inputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 14,
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
  },
  disabledText: {
    fontSize: 16,
    color: '#666',
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
  alternativeOption: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  alternativeOptionText: {
    color: '#FF4500',
    fontWeight: '500',
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
  buttonDisabled: {
    backgroundColor: '#FFA285',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});