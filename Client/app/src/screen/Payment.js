import React, { useEffect, useState } from 'react';
import { 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Alert, 
  ActivityIndicator,
  SafeAreaView,
  StatusBar 
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DropdownComp from '../reusables/Dropdown';
import { set_shop } from '../../redux/info/shop';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Payment() {
  const { user } = useSelector(s => s.user);
  const navigation = useNavigation();
  
  const [banks, setBanks] = useState([]);
  const [bankName, setBankName] = useState('');
  const [acctNo, setAcctNo] = useState('');
  const [validatedAcct, setValidatedAcct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await axios.get('https://api.paystack.co/bank', {
        headers: {
          Authorization: 'Bearer YOUR_SECRET_KEY',
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.status) {
        setBanks(response.data.data);
      } else {
        Alert.alert('Error', 'Failed to load banks from Paystack');
      }
    } catch (error) {
      console.error('Error fetching banks:', error);
      Alert.alert('Network Error', 'Unable to fetch bank list. Please check your connection.');
    }
  };

  const updateData = (data, name, value, custom_field) => {
    if (name === 'bank_input') {
      setBankName(custom_field);
      // Clear beneficiary when bank changes
      if (isVerified) {
        setBeneficiary('');
        setIsVerified(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!acctNo.trim()) {
      newErrors.acctNo = 'Account number is required';
    } else if (acctNo.length !== 10) {
      newErrors.acctNo = 'Account number must be 10 digits';
    } else if (!/^\d+$/.test(acctNo)) {
      newErrors.acctNo = 'Account number must contain only numbers';
    }

    if (!bankName) {
      newErrors.bankName = 'Please select a bank';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyAccount = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    const body = {
      account_number: acctNo,  
      bank_code: bankName
    };

    fetch(`https://base-three-opal.vercel.app/bank/verification`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })   
    .then(async (result) => {
      let response = await result.json();
      setIsLoading(false);
      
      if (response.success) {
        setValidatedAcct(response.data)
        setIsVerified(true);
        Alert.alert('Success', 'Bank account verified successfully!');
      } else {
        Alert.alert('Verification Failed', 'Unable to verify account details. Please check and try again.');
      }
    })
    .catch((err) => {
      setIsLoading(false);
      
      Alert.alert('Network Error', 'Unable to verify account. Please check your connection.');
    });
  };

  const dispatch = useDispatch()
  const handleAddBank = () => {
    if (!isVerified) {
      Alert.alert('Verification Required', 'Please verify your bank account first.');
      return;
    }
    setIsLoading(true);
    axios.post('https://base-three-opal.vercel.app/shop/payment/update', {
      validatedAcct, user_id: user.user_id
    }).then(({data}) => {
      // console.log(data.data)
      if(data.success){
        dispatch(set_shop(data.data))
        navigation.goBack()
      }else{
        Alert.alert("Internal server error:", "An error occured, please try again!")
      }
    }).catch(err => Alert.alert("Internal server error:", "An error occured, please try again!"))
  };

  const getSelectedBankName = () => {
    const bank = banks.find(b => b.code === bankName);
    return bank ? bank.name : '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>
              {isVerified ? 'Adding your bank account...' : 'Verifying bank details...'}
            </Text>
          </View>
        </View>
      )}

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Account Number Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Account Number</Text>
          <TextInput 
            style={[
              styles.textInput,
              errors.acctNo && styles.inputError
            ]}
            placeholder="Enter 10-digit account number"
            placeholderTextColor="#9CA3AF"
            value={acctNo}
            onChangeText={(text) => {
              setAcctNo(text);
              if (errors.acctNo) setErrors(prev => ({ ...prev, acctNo: '' }));
              if (isVerified) {
                setBeneficiary('');
                setIsVerified(false);
              }
            }}
            maxLength={10}
            keyboardType="numeric"
          />
          {errors.acctNo && (
            <Text style={styles.errorText}>{errors.acctNo}</Text>
          )}
          <Text style={styles.helperText}>
            Must be exactly 10 digits
          </Text>
        </View>

        {/* Bank Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Select Bank</Text>
          <DropdownComp
            updateData={updateData}
            fieldName={'name'}
            isValueField={true}
            input_name={'bank_input'}
            dropdownData={banks}
            customField={'code'}
            placeholder="Choose your bank"
            // error={errors.bankName}
          />
          {errors.bankName && (
            <Text style={styles.errorText}>{errors.bankName}</Text>
          )}
          {bankName && (
            <Text style={styles.selectedBank}>
              Selected: {getSelectedBankName()}
            </Text>
          )}
        </View>

        {/* Beneficiary Display */}
        {(validatedAcct.account_name || isVerified) && (
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Account Holder Name</Text>
            <View style={styles.beneficiaryContainer}>
              <Icon name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.beneficiaryText}>{validatedAcct?.account_name}</Text>
            </View>
            <Text style={styles.successText}>
              ✓ Account verified successfully
            </Text>
          </View>
        )}

        {/* Security Notice */}
        <View style={styles.securityCard}>
          <Icon name="shield-checkmark" size={20} color="#10B981" />
          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>Your Security is Our Priority</Text>
            <Text style={styles.securityText}>
              • Bank-level encryption{'\n'}
              • No sensitive data stored{'\n'}
              • Verified through secure channels
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.actionButton,
            isVerified ? styles.addButton : styles.verifyButton,
            (!acctNo || !bankName) && styles.buttonDisabled
          ]}
          onPress={isVerified ? handleAddBank : verifyAccount}
          disabled={!acctNo || !bankName || isLoading}
        >
          <Icon 
            name={isVerified ? "checkmark-circle" : "shield-checkmark"} 
            size={20} 
            color="#FFFFFF" 
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>
            {isVerified ? 'Add Bank Account' : 'Verify Bank Account'}
          </Text>
        </TouchableOpacity>

        {!isVerified && (
          <Text style={styles.footerNote}>
            Verify your account first before adding it to your profile
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 100,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  inputSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  inputError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  selectedBank: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 8,
    fontWeight: '500',
  },
  beneficiaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#10B981',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  beneficiaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    flex: 1,
  },
  successText: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 8,
    fontWeight: '500',
  },
  securityCard: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    marginHorizontal: 20,
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  securityContent: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 4,
  },
  securityText: {
    fontSize: 12,
    color: '#047857',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  verifyButton: {
    backgroundColor: '#3B82F6',
  },
  addButton: {
    backgroundColor: '#10B981',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footerNote: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});