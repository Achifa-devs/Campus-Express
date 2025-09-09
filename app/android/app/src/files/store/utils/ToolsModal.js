import React, { useState } from 'react';
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
} from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
import { useSelector } from 'react-redux';
import { set_shop } from '../../../../../../redux/shop';

const { width } = Dimensions.get('window');

const VendorSubscriptionsModal = ({ visible, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState("Free"); // Default to Free plan
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [planToSubscribe, setPlanToSubscribe] = useState(null);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // 30 days from now
  const { user } = useSelector(s => s?.user);
  const { shop } = useSelector(s => s?.shop);

  const subscriptionPlans = {
  "Free": {
    "name": "free",
    "description": "A starter plan with essential features to begin selling.",
    "price": "₦0.00",
    "discountPrice": "₦0.00",
    "features": [
      "List up to 2 products",
      "Access to basic performance metrics (views)"
    ],
    "current": true
  },
  "Basic": {
    "name": "basic",
    "description": "Perfect for new vendors looking to establish their presence with core selling tools and increased visibility.",
    "price": "₦500.00",
    "discountPrice": "₦450.00",
    "features": [
      "List up to 12 products",
      "Improved visibility in customer searches",
      "Essential performance insights (impressions, views, and shares)"
    ]
  },
  "Standard": {
    "name": "standard",
    "description": "Tailored for growing vendors who want broader reach and actionable insights for better performance.",
    "price": "₦1,200.00",
    "discountPrice": "₦960.00",
    "features": [
      "List up to 25 products",
      "Enhanced placement in search results",
      "Detailed analytics (impressions, views, shares, and search performance)"
    ]
  },
  "Pro": {
    "name": "pro",
    "description": "The ultimate plan for professional vendors seeking maximum reach, credibility, and advanced selling tools.",
    "price": "₦2,500.00",
    "discountPrice": "₦1,750.00",
    "features": [
      "Unlimited product listings",
      "Complete analytics suite (impressions, views, shares, search trends, and conversions)",
      "Sponsored badge for premium trust and recognition",
      "Priority visibility in search results"
    ]
  }
};


  const handleSubscribe = (plan) => {
    const res = Object.entries(subscriptionPlans).find(item => item[0] === plan)
    console.log(res)
    if (plan === "Free") {
      setSelectedPlan("Free");
      return;
    }
    setPlanToSubscribe(plan);
    payNow(res[1])
    // setConfirmModalVisible(true);
  };

  const { popup } = usePaystack();
  const payNow = (selectedPackage) => {
        
    const start_date = new Date();
    const end_date = new Date();
    end_date.setMonth(end_date.getMonth() + 1);

    const reference = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    // setLoading(true);
    popup.newTransaction({
      email: user?.email,
      amount: parseFloat(selectedPackage?.discountPrice.replace('₦', '').replace(',', '')),
      reference: reference,
      metadata: {
        user_id: user.user_id,
        type: 'tools',
        plan: selectedPackage.name,
        start_date,
        end_date
      },
      
      onSuccess: (res) => {
        // setLoading(false);
        Alert.alert(
          'Payment Successful!',
          `Your subscription was successful.`,
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );
        let newShop = { ...shop };
        newShop.tools = selectedPackage.name;
        dispatch(set_shop(newShop));
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

  const completeSubscription = () => {
    // In a real app, this would integrate with your payment processing
    console.log(`Subscribed to ${planToSubscribe} plan`);
    setSelectedPlan(planToSubscribe);
    
    // Set expiry date to 30 days from now
    setSubscriptionExpiry(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    
    setConfirmModalVisible(false);
    setPlanToSubscribe(null);
  };

  const calculateDiscountPercentage = (price, discountPrice) => {
    const priceNum = parseFloat(price.replace('₦', '').replace(',', ''));
    const discountNum = parseFloat(discountPrice.replace('₦', '').replace(',', ''));
    
    // Don't calculate for free plan
    if (priceNum === 0) return 0;
    
    const discountPercent = Math.round(((priceNum - discountNum) / priceNum) * 100);
    return discountPercent;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const daysUntilExpiry = () => {
    const today = new Date();
    const expiry = new Date(subscriptionExpiry);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Vendor Subscription Plans</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Current Plan Dashboard */}
          <View style={styles.dashboard}>
            <Text style={styles.dashboardTitle}>Your Current Plan</Text>
            <View style={styles.planInfo}>
              <View style={styles.planInfoLeft}>
                <Text style={styles.currentPlanName}>{selectedPlan}</Text>
                <Text style={styles.currentPlanPrice}>
                  {selectedPlan === "Free" ? "Free Forever" : `${subscriptionPlans[selectedPlan].discountPrice}/month`}
                </Text>
              </View>
              <View style={styles.planInfoRight}>
                <Text style={styles.expiryText}>
                  Expires: {formatDate(subscriptionExpiry)}
                </Text>
                <View style={[
                  styles.expiryBadge, 
                  daysUntilExpiry() <= 7 ? styles.expirySoon : styles.expiryOk
                ]}>
                  <Text style={styles.expiryBadgeText}>
                    {daysUntilExpiry() <= 0 ? "Expired" : `${daysUntilExpiry()} days left`}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.subtitle}>
              Upgrade your vendor account with powerful tools to grow your business
            </Text>
          </View>

          <View style={styles.plansContainer}>
            {Object.entries(subscriptionPlans).map(([planName, planDetails], index) => {
              const discountPercent = calculateDiscountPercentage(planDetails.price, planDetails.discountPrice);
              const isCurrentPlan = selectedPlan === planName;
              
              return (
                <View 
                  key={planName} 
                  style={[
                    styles.planCard,
                    isCurrentPlan && styles.currentPlanCard,
                    index === 2 && styles.featuredPlan // Highlight the Standard plan now
                  ]}
                >
                  {index === 2 && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                    </View>
                  )}
                  
                  {isCurrentPlan && (
                    <View style={styles.currentBadge}>
                      <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
                    </View>
                  )}
                  
                  <View style={styles.planHeader}>
                    <Text style={styles.planName}>{planName}</Text>
                    <View style={styles.priceContainer}>
                      {planName !== "Free" && (
                        <Text style={styles.originalPrice}>{planDetails.price}</Text>
                      )}
                      <Text style={styles.discountPrice}>
                        {planName === "Free" ? "Free Forever" : `${planDetails.discountPrice}/month`}
                      </Text>
                      {discountPercent > 0 && (
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountText}>Save {discountPercent}%</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  
                  <Text style={styles.planDescription}>{planDetails.description}</Text>
                  
                  <View style={styles.featuresContainer}>
                    <Text style={styles.featuresTitle}>Features:</Text>
                    {planDetails.features.map((feature, idx) => (
                      <View key={idx} style={styles.featureItem}>
                        <View style={styles.checkIcon}>
                          <Text style={styles.checkIconText}>✓</Text>
                        </View>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <TouchableOpacity
                    style={[
                      styles.subscribeButton,
                      isCurrentPlan && styles.currentButton
                    ]}
                    onPress={() => handleSubscribe(planName)}
                    disabled={isCurrentPlan}
                  >
                    <Text style={[
                      styles.subscribeButtonText,
                      isCurrentPlan && styles.currentButtonText
                    ]}>
                      {isCurrentPlan ? 'Current Plan' : planName === "Free" ? 'Select Free' : 'Subscribe Now'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Why Upgrade?</Text>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>📈</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoItemTitle}>Boost Your Visibility</Text>
                <Text style={styles.infoItemText}>Get your products seen by more potential customers</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>🔍</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoItemTitle}>Advanced Analytics</Text>
                <Text style={styles.infoItemText}>Understand your customers and optimize your offerings</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>💼</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoItemTitle}>Grow Your Business</Text>
                <Text style={styles.infoItemText}>Access tools designed to help you scale efficiently</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Confirmation Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={confirmModalVisible}
          onRequestClose={() => {
            setConfirmModalVisible(!confirmModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.confirmModalView}>
              <Text style={styles.modalTitle}>Confirm Subscription</Text>
              <Text style={styles.modalText}>
                Are you sure you want to subscribe to the {planToSubscribe} plan for {planToSubscribe && subscriptionPlans[planToSubscribe].discountPrice}/month?
              </Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setConfirmModalVisible(false)}
                >
                  <Text style={styles.buttonCancelText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSubscribe]}
                  onPress={completeSubscription}
                >
                  <Text style={styles.buttonSubscribeText}>Subscribe</Text>
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
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  // Dashboard styles
  dashboard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 15,
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planInfoLeft: {
    flex: 1,
  },
  planInfoRight: {
    alignItems: 'flex-end',
  },
  currentPlanName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 5,
  },
  currentPlanPrice: {
    fontSize: 18,
    color: '#2d3436',
    fontWeight: '600',
  },
  expiryText: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 5,
  },
  expiryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  expirySoon: {
    backgroundColor: '#FF4500',
  },
  expiryOk: {
    backgroundColor: '#FF4500',
  },
  expiryBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  plansContainer: {
    marginBottom: 30,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  currentPlanCard: {
    borderColor: '#FF4500',
    backgroundColor: '#fff4e0',
  },
  featuredPlan: {
    borderColor: '#FF4500',
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: '#FF4500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  currentBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: '#FF4500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  currentBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  planName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 16,
    color: '#636e72',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 2,
  },
  discountBadge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planDescription: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkIconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#2d3436',
    lineHeight: 20,
  },
  subscribeButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  currentButton: {
    backgroundColor: '#FF4500',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentButtonText: {
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff4e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIconText: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  infoItemText: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
  // Confirmation Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
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
    minWidth: 100,
  },
  buttonCancel: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonSubscribe: {
    backgroundColor: '#FF4500',
  },
  buttonCancelText: {
    color: '#2d3436',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSubscribeText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default VendorSubscriptionsModal;