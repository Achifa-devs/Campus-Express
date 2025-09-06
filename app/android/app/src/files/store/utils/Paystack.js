// screens/PaymentScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { usePaystack } from 'react-native-paystack-webview';
import { useDispatch, useSelector } from 'react-redux';
import { set_payment_method } from '../../../../../../redux/paystack';
import { set_tier } from '../../../../../../redux/tier';

const { width, height } = Dimensions.get('window');

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector(s => s?.user);
  const { selectedPackage, packageName } = route.params;

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const { payment_method } = useSelector(s=>s?.payment_method)


  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card', 
      icon: 'card-outline',
      description: 'Pay with Visa, Mastercard or Verve',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'business-outline',
      description: 'Direct bank transfer',
    },
    {
      id: 'ussd',
      name: 'USSD',
      icon: 'phone-portrait-outline',
      description: 'Pay using USSD code',
    }
  ];
 
  const { popup } = usePaystack();

  const {tier} = useSelector(s => s.tier)

  const payNow = () => {
    
    const start_date = new Date();
    const end_date = new Date();
    end_date.setMonth(end_date.getMonth() + 1);

    const reference = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    // setLoading(true);
    popup.newTransaction({
      email: user?.email,
      amount: parseFloat(selectedPackage?.discount_price.replace('₦', '').replace(',', '')),
      reference: reference,
      metadata: {
        plan: selectedPackage.tier, 
        start_date, 
        end_date, 
        user_id: user.user_id
      },
     
      onSuccess: (res) => {
        // setLoading(false);
        Alert.alert(
          'Payment Successful!',
          `Your ${selectedPackage?.tier} subscription has been activated.`,
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );
        let newTier = { ...tier };
        newTier.start_date = start_date.toISOString();
        newTier.end_date = end_date.toISOString();
        newTier.plan = selectedPackage?.tier;
        dispatch(set_tier(newTier));
        navigation.goBack();
      },
      onCancel: () => {
        // setLoading(false);
        Alert.alert('Payment Cancelled', 'Your payment was cancelled.');
      },
      onError: (err) => {
        // setLoading(false);
        Alert.alert('Payment Error', 'There was an error processing your payment.');
        console.log('Payment Error:', err);
      }
    });
  };

  // Render feature items with checkmarks
  const renderFeature = (feature, index) => (
    <View key={index} style={styles.featureItem}>
      <Icon name="checkmark-circle" size={16} color="#4CAF50" />
      <Text style={styles.featureText}>{feature}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Package Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.packageInfo}>
            <Text style={styles.packageName}>{selectedPackage?.tier} Plan</Text>
            {selectedPackage?.hint && (
              <Text style={styles.packageHint}>{selectedPackage.hint}</Text>
            )}
            <View style={styles.priceContainer}>
              {selectedPackage?.discount_price && selectedPackage.discount_price !== selectedPackage.price && (
                <Text style={styles.originalPrice}>{selectedPackage.price}</Text>
              )}
              <Text style={styles.finalPrice}>
                {selectedPackage?.discount_price || selectedPackage?.price}
              </Text>
            </View>
          </View>

          {/* Package Features */}
          {selectedPackage?.features && selectedPackage.features.length > 0 && (
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>What's included:</Text>
              {selectedPackage.features.map(renderFeature)}
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              {selectedPackage?.discount_price || selectedPackage?.price}
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodCard,
                payment_method === method.id && styles.selectedPaymentMethod,
              ]}
              onPress={() => dispatch(set_payment_method(method?.id))}
            >
              <View style={styles.methodLeft}>
                <Icon 
                  name={method.icon} 
                  size={24} 
                  color={payment_method === method.id ? '#FF4500' : '#666'} 
                />
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodDescription}>{method.description}</Text>
                </View>
              </View>
              
              {payment_method === method.id && (
                <Icon name="checkmark-circle" size={24} color="#FF4500" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
           
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Package</Text>
            <Text style={styles.detailValue}>{selectedPackage?.tier}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Billing Cycle</Text>
            <Text style={styles.detailValue}>Monthly</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{user?.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method</Text>
            <Text style={styles.detailValue}>
              {paymentMethods.find(m => m.id === payment_method)?.name}
            </Text>
          </View>
        </View>

        <Text style={styles.securityText}>
          <Icon name="lock-closed" size={14} color="#666" /> 
          Your payment is secure and encrypted
        </Text>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={payNow}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : ( 
            <View style={styles.payButtonContent}>
              <Text style={styles.payButtonText}>
                Pay {selectedPackage?.discount_price || selectedPackage?.price}
              </Text>
              <Text style={styles.payButtonSubtext}>
                {selectedPackage?.tier} Plan • One-time payment
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  packageInfo: {
    marginBottom: 16,
  },
  packageName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 4,
  },
  packageHint: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  finalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF4500',
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 8,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF4500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  selectedPaymentMethod: {
    borderColor: '#FF4500',
    backgroundColor: '#FFF6F2',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodInfo: {
    marginLeft: 12,
    flex: 1,
  },
  methodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  methodDescription: {
    fontSize: 12,
    color: '#666',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333'
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  payButton: {
    backgroundColor: '#FF4500',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#CCC',
  },
  payButtonContent: {
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  payButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  securityText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 20,
  },
});

export default PaymentScreen;