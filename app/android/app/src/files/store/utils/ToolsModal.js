import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
import { useSelector, useDispatch } from 'react-redux';
import { set_shop } from '../../../../../../redux/shop';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getData } from '../../utils/AsyncStore.js';
import { capitalize } from './Capitalize.js';

const { width } = Dimensions.get('window');

const VendorSubscriptionsModal = ({ visible, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('Free');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [planToSubscribe, setPlanToSubscribe] = useState(null);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  const [subscriptionPlans, setsubscriptionPlans] = useState([])

  const { user } = useSelector((s) => s?.user);
  const { shop } = useSelector((s) => s?.shop);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const getToolsplan = async () => {  
    let data = await getData('tools_plan');
    console.log('tools_plan: ', data);

    if (data) {
      let parsedData = JSON.parse(data);

      // Sort by `id` (ascending: 1 → 4)
      let sortedData = parsedData.sort((a, b) => a.id - b.id);

      setsubscriptionPlans(sortedData);
    }
  }; 


  useEffect(() => {
    getToolsplan();
  }, [])


  const handleSubscribe = (plan) => {
    if (plan === 'Free') {
      setSelectedPlan('Free');
      Alert.alert('Selected', 'You have selected the Free plan.');
      return;
    }

    // show confirm modal for paid plan
    setPlanToSubscribe(plan);
    setConfirmModalVisible(true);
  };

  const { popup } = usePaystack();

  const payNow = (selectedPackage) => {
    if (!user) {
      Alert.alert('Login required', 'Please sign in to continue with payment.');
      return;
    }

    const start_date = new Date();
    const end_date = new Date();
    end_date.setMonth(end_date.getMonth() + 1);

    const reference = `REF-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // parse price safely (remove currency symbol and all commas)
    const raw = String(selectedPackage?.discountPrice || selectedPackage?.price || '0');
    const amountFloat = parseFloat(raw.replace(/[₦,]/g, '').trim()) || 0;

    // Paystack expects amount in kobo (if using NGN), convert to integer kobo
    // if your Paystack integration expects naira units, adjust accordingly.
    const amountKobo = 100;
    // const amountKobo = Math.round(amountFloat * 100);

    popup.newTransaction({
      email: user?.email,
      amount: amountKobo, // in kobo
      reference,
      metadata: {
        user_id: user.user_id,
        type: 'tools',
        plan: selectedPackage.name,
        start_date,
        end_date,
      },
      onSuccess: (res) => {
        console.log('Paystack response: ', res);
        Alert.alert('Payment Successful!', `Your subscription was successful.`, [
          {
            text: 'OK',
            onPress: () => {
              // Update shop locally
              const newShop = { ...shop, subscription: selectedPackage.name };
              dispatch(set_shop(newShop));
              setSelectedPlan(selectedPackage.name.charAt(0).toUpperCase() + selectedPackage.name.slice(1));
              setSubscriptionExpiry(end_date);
              setConfirmModalVisible(false);
              setPlanToSubscribe(null);
              navigation.navigate('Home');
            },
          },
        ]);
      },
      onCancel: () => {
        Alert.alert('Payment Cancelled', 'Your payment was cancelled.');
      },
      onError: (err) => {
        console.log('Payment Error:', err);
        Alert.alert('Payment Error', 'There was an error processing your payment.');
      },
    });
  };

  const completeSubscription = () => {
    // Proceed to payment for the selected plan
    const pkg = subscriptionPlans[planToSubscribe];
    if (!pkg) {
      Alert.alert('Invalid Plan', 'Selected plan is not available.');
      setConfirmModalVisible(false);
      return;
    }
    payNow(pkg);
  };

  const calculateDiscountPercentage = (price, discountPrice) => {
    const priceNum = parseFloat(String(price).replace(/[₦,]/g, '').trim()) || 0;
    const discountNum = parseFloat(String(discountPrice).replace(/[₦,]/g, '').trim()) || 0;

    if (priceNum === 0) return 0;

    const discountPercent = Math.round(((priceNum - discountNum) / priceNum) * 100);
    return discountPercent;
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const daysUntilExpiry = () => {
    const today = new Date();
    const expiry = new Date(subscriptionExpiry || Date.now());
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}> 
          <Text style={styles.modalTitle}>Vendor Subscription Plans</Text>
          <Pressable onPress={onClose} style={styles.closeButton} accessibilityLabel="Close">
            <Ionicons name="close" size={22} color="#000" />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Current Plan Dashboard */}
          <View style={styles.dashboard}>
            <View style={styles.dashboardHeader}>
              <Ionicons name="person-circle" size={26} color="#FF4500" />
              <Text style={styles.dashboardTitle}>Your Current Plan</Text>
            </View>
            <View style={styles.planInfo}>
              <View style={styles.planInfoLeft}>
                <Text style={styles.currentPlanName}>{shop.subscription.plan[0].toUpperCase()}{shop.subscription.plan.split('').splice(2, shop.subscription.plan.length)}</Text>
                <Text style={styles.currentPlanPrice}>
                  {shop.subscription.plan === 'free' ? 'Free Forever' : `${subscriptionPlans[shop.subscription.plan]?.discount_price}/month`}
                </Text>
              </View> 
              <View style={styles.planInfoRight}>
                <Text style={styles.expiryText}>Expires: {formatDate(subscriptionExpiry)}</Text>
                <View style={[styles.expiryBadge, daysUntilExpiry() <= 7 ? styles.expirySoon : styles.expiryOk]}>
                  <Text style={styles.expiryBadgeText}>{shop.subscription.plan === 'free' ? 'Till forever' : daysUntilExpiry() <= 0 ? 'Expired' : `${daysUntilExpiry()} days left`}</Text>
                </View>
              </View>
            </View> 
          </View>
 
          <View style={styles.header}>
            <Text style={styles.subtitle}>Upgrade your vendor account with powerful tools to grow your business</Text>
          </View>

          {/* Horizontal Plans */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalPlansContainer}
            decelerationRate="fast"
            snapToInterval={width * 0.85 + 20}
            snapToAlignment="center"
          >
            {Object.entries(subscriptionPlans).map(([planName, planDetails], index) => {
              const discountPercent = calculateDiscountPercentage(planDetails.price, planDetails.discountPrice);
              const isCurrentPlan = shop.subscription.plan === planDetails?.name;
              return (  
                <View  
                  key={planName}
                  style={[   
                    styles.planCard,
                    isCurrentPlan && styles.currentPlanCard,
                    index === 1 && styles.featuredPlan,
                    { width: width * 0.85, marginRight: 16 },
                  ]}
                >
                  {index === 1 && (
                    <LinearGradient colors={['#FF4500', '#FF6347']} style={styles.popularBadge}>
                      <Ionicons name="star" size={12} color="white" />
                      <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                    </LinearGradient>
                  )}

                  {isCurrentPlan && (
                    <View style={styles.currentBadge}>
                      <Ionicons name="checkmark-circle" size={14} color="white" />
                      <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
                    </View>
                  )} 

                  <View style={styles.planIconContainer}>
                    <Text style={styles.planIcon}>{planDetails.icon}</Text>
                  </View>
 
                  <View style={styles.planHeader}>
                    <Text style={styles.planName}>{capitalize(planDetails.name)}</Text>
                    <View style={styles.priceContainer}>
                      {planName !== 'Free' && <Text style={styles.originalPrice}>{planDetails.price}</Text>}
                      <Text style={styles.discountPrice}>{planName === 'Free' ? 'Free Forever' : `${planDetails.discount_price}/month`}</Text>
                      {discountPercent > 0 && ( 
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountText}>Save {discountPercent}%</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text style={styles.planDescription}>{planDetails.description}</Text>

                  <View style={styles.featuresContainer}>
                    <Text style={styles.featuresTitle}>What's included</Text>
                    {planDetails.features.map((feature, idx) => (
                      <View key={idx} style={styles.featureItem}>
                        <View style={styles.checkIcon}>
                          <Ionicons name="checkmark" size={14} color="white" />
                        </View>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[styles.subscribeButton, isCurrentPlan && styles.currentButton, index === 1 && styles.featuredButton]}
                    onPress={() => handleSubscribe(planName)}
                    disabled={isCurrentPlan}
                  >
                    <LinearGradient colors={isCurrentPlan ? ['#e0e0e0', '#e0e0e0'] : ['#FF6A00', '#FF4500']} style={styles.subscribeButtonInner}>
                      <Text style={[styles.subscribeButtonText, isCurrentPlan && styles.currentButtonText]}>
                        {isCurrentPlan ? 'Current Plan' : planName === 'Free' ? 'Select Free Plan' : 'Subscribe Now'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Why Upgrade Your Plan?</Text>

            <View style={styles.infoItem}>
              <LinearGradient colors={['#FF4500', '#FF6347']} style={styles.infoIcon}>
                <Ionicons name="trending-up" size={20} color="white" />
              </LinearGradient>
              <View style={styles.infoContent}>
                <Text style={styles.infoItemTitle}>Boost Sales & Visibility</Text>
                <Text style={styles.infoItemText}>Gain more exposure and increase your sales with advanced features.</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <LinearGradient colors={['#FF4500', '#FF6347']} style={styles.infoIcon}>
                <Ionicons name="analytics" size={20} color="white" />
              </LinearGradient>
              <View style={styles.infoContent}>
                <Text style={styles.infoItemTitle}>Advanced Analytics</Text>
                <Text style={styles.infoItemText}>Understand customer behavior and optimize your product offerings.</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <LinearGradient colors={['#FF4500', '#FF6347']} style={styles.infoIcon}>
                <Ionicons name="business" size={20} color="white" />
              </LinearGradient>
              <View style={styles.infoContent}>
                <Text style={styles.infoItemTitle}>Grow Your Business</Text>
                <Text style={styles.infoItemText}>Access premium tools designed to help you scale efficiently.</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Confirmation Modal */}
        <Modal animationType="fade" transparent={true} visible={confirmModalVisible} onRequestClose={() => setConfirmModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.confirmModalView}>
              <View style={styles.modalIcon}>
                <Ionicons name="help-circle" size={44} color="#FF4500" />
              </View>
              <Text style={[styles.modalTitle, { color: '#2d3436' }]}>Confirm Subscription</Text>
              <Text style={styles.modalText}>
                Are you sure you want to subscribe to the {planToSubscribe} plan for {planToSubscribe && subscriptionPlans[planToSubscribe].discountPrice}/month?
              </Text>

              <View style={styles.modalButtons}>
                <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => setConfirmModalVisible(false)}>
                  <Text style={styles.buttonCancelText}>Cancel</Text>
                </Pressable>

                <Pressable style={[styles.button, styles.buttonSubscribe]} onPress={completeSubscription}>
                  <Text style={styles.buttonSubscribeText}>Proceed to Pay</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  modalHeader: {
    paddingTop: Platform.OS === 'ios' ? 44 : 24,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 40,
  },
  dashboard: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 18,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dashboardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3436',
    marginLeft: 8,
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planInfoLeft: {
    flex: 1,
  },
  planInfoRight: {
    alignItems: 'flex-end',
  },
  currentPlanName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF4500',
    marginBottom: 4,
  },
  currentPlanPrice: {
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '700',
  },
  expiryText: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 6,
  },
  expiryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  expirySoon: {
    backgroundColor: '#FF4500',
  },
  expiryOk: {
    backgroundColor: '#4CAF50',
  },
  expiryBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  header: {
    marginBottom: 2,
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 10,
    backgroundColor: '#fff'

  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 700,
  },
  horizontalPlansContainer: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  currentPlanCard: {
    borderColor: '#FF4500',
    backgroundColor: '#fff',
    borderWidth: 2
  },
  featuredPlan: {
    borderColor: '#FF4500',
    transform: [{ scale: 1.015 }],
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2

  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 8,
  },
  currentBadge: {
    position: 'absolute',
    top: -10,
    right: 12,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
  },
  planIconContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  planIcon: {
    fontSize: 36,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  planName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2d3436',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 13,
    color: '#8a8a8a',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2d3436',
    marginTop: 4,
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  planDescription: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 18,
  },
  featuresTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#2d3436',
    lineHeight: 20,
  },
  subscribeButton: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  subscribeButtonInner: {
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredButton: {},
  currentButton: {
    opacity: 0.85,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
  },
  currentButtonText: {
    color: '#8a8a8a',
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 18,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 14,
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 4,
  },
  infoItemText: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  confirmModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 22,
    alignItems: 'center',
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  modalIcon: {
    marginBottom: 12,
  },
  modalText: {
    marginBottom: 18,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: '#636e72',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 4,
    padding: 12,
    elevation: 2,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonSubscribe: {
    backgroundColor: '#FF4500',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonCancelText: {
    color: '#2d3436',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonSubscribeText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 15,
  },
});

export default VendorSubscriptionsModal;
