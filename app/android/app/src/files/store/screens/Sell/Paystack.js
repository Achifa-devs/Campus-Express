// components/Payment/PaystackPayment.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import { Paystack } from 'react-native-paystack-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PaystackPayment = ({ route, navigation }) => {
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const { amount, subscriptionPlan } = route.params;

  const onSuccess = (response) => {
    // Handle successful payment
    setPaymentInProgress(false);
    Alert.alert(
      'Payment Successful',
      `Your ${subscriptionPlan} subscription has been activated!`,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
    // Here you would typically send the payment reference to your backend
    // to verify and activate the subscription
  };

  const onCancel = () => {
    // Handle cancelled payment
    setPaymentInProgress(false);
    Alert.alert(
      'Payment Cancelled',
      'You cancelled the payment process',
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Payment</Text>
        <View style={{ width: 24 }} /> {/* For alignment */}
      </View>

      <View style={styles.paymentDetails}>
        <Text style={styles.planName}>{subscriptionPlan} Plan</Text>
        <Text style={styles.amount}>${amount}</Text>
        <Text style={styles.email}>Paying with: {email}</Text>
      </View>

      {paymentInProgress && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF4500" />
          <Text style={styles.loadingText}>Processing Payment...</Text>
        </View>
      )}

      <Paystack
        paystackKey="your_paystack_public_key" // Replace with your Paystack public key
        amount={amount * 100} // Paystack amount is in kobo (multiply by 100)
        billingEmail={email}
        activityIndicatorColor="#FF4500"
        onCancel={onCancel}
        onSuccess={onSuccess}
        autoStart={false} // We'll trigger manually
        refNumber={`SUB${Math.random().toString(36).substring(2, 11)}`}
        ref={(ref) => (paystackWebViewRef = ref)}
      />

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => {
          setPaymentInProgress(true);
          paystackWebViewRef.startTransaction();
        }}
        disabled={paymentInProgress}
      >
        <Text style={styles.payButtonText}>
          {paymentInProgress ? 'Processing...' : 'Pay Now'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 10,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  payButton: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default PaystackPayment;