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
  View 
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default function ChangeEmail({ route, navigation }) {
  const { token } = route.params || {};
  const { user } = useSelector(s => s.user);
  const [token_sent, set_token_sent] = useState(false);
  const [email_sent, set_email_sent] = useState(false);
  const [new_email, set_new_email] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  async function update_email() {
    return await axios.post('https://estate-dun-eta.vercel.app/system.email-update', { 
      email: new_email, 
      id: user?.id 
    })
    .then(({ data }) => ({ success: data.success }))
    .catch(err => (err.response?.data));
  }

  // Function to send token (placeholder - implement based on your backend)
  const send_token = async (email) => {
    // Implement your token sending logic here
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (token === undefined) {
      // Send token flow
      setEmailErr('');
      set_token_sent(true);
      
      let response = await send_token(user?.email);
      
      if (response) {
        navigation.navigate('Token', { redirect: 'Email' });
        set_token_sent(false);
      }
    } else {
      // Update email flow
      Vibration.vibrate(30);

      if (!new_email) {
        Vibration.vibrate(90);
        setEmailErr('Email is required');
        return;
      }

      if (!validateEmail(new_email)) {
        Vibration.vibrate(90);
        setEmailErr('Please enter a valid email address');
        return;
      }

      set_email_sent(true);
      let response = await update_email();
      
      if (response.success) {
        Alert.alert('Success', 'Your email has been updated successfully.');
        set_email_sent(false);
        set_new_email('');
        navigation.goBack();
      } else {
        set_email_sent(false);
        Alert.alert('Error', 'Failed to update email. Please try again.');
      }
    }
  };

  return (
    <>
      {/* Loading Overlays */}
      {token_sent && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#FF4500" />
          <Text style={styles.overlayText}>
            Sending verification token to your email.{'\n'}Please wait...
          </Text>
        </View>
      )}
      
      {email_sent && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#FF4500" />
          <Text style={styles.overlayText}>
            Updating your email address.{'\n'}Please wait...
          </Text>
        </View>
      )}

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 16}}>
          <View style={styles.infoCard}>
            <Icon name="information-circle-outline" size={20} color="#1976D2" />
            <Text style={styles.infoText}>
              We'll send a verification code to your new email address to confirm the change.
            </Text>
          </View>

          <View style={styles.securityNote}>
            <Icon name="shield-checkmark-outline" size={18} color="#388E3C" />
            <Text style={styles.securityText}>
              For security reasons, we require verification to change your email address.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Email</Text>
            <View style={styles.currentEmailContainer}>
              <Text style={styles.currentEmail}>{user?.email}</Text>
            </View>
          </View>

          {token && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Email Address</Text>
              <TextInput
                style={[styles.input, emailErr ? styles.inputError : null]}
                placeholder="Enter your new email address"
                placeholderTextColor="#9E9E9E"
                value={new_email}
                onChangeText={set_new_email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {emailErr ? (
                <View style={styles.errorContainer}>
                  <Icon name="alert-circle-outline" size={14} color="#D32F2F" />
                  <Text style={styles.errorText}>{emailErr}</Text>
                </View>
              ) : null}
            </View>
          )}

          <TouchableOpacity 
            style={styles.helpLink}
            // onPress={() => navigation.navigate('recover-pwd')}
          >
            <Icon name="help-circle-outline" size={16} color="#FF4500" />
            <Text style={styles.helpLinkText}>Need help with email verification?</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleSubmit}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>
              {token ? 'Update Email' : 'Send Verification Code'}
            </Text>
            <Icon 
              name={token ? "checkmark-circle-outline" : "arrow-forward-outline"} 
              size={20} 
              color="#FFF" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    marginLeft: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  securityText: {
    fontSize: 14,
    color: '#388E3C',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
    marginLeft: 4,
  },
  currentEmailContainer: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 16,
  },
  currentEmail: {
    fontSize: 16,
    color: '#616161',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#212121',
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    marginLeft: 6,
  },
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#FF4500',
    marginLeft: 6,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  primaryButton: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});