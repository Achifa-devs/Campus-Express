// screens/Subscription.js
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { set_shop } from '../../redux/info/shop';
import Memory from '../utils/memoryHandler';
import Tools from '../utils/generalHandler';
import { set_sub_modal } from '../../redux/modal/sub';

const { width } = Dimensions.get('window');

// Plan ranking order (lowest → highest)
const PLAN_ORDER = ["free", "basic", "standard", "premium"];

/**
 * Decide button state for a subscription plan
 * @param {string} currentPlan - user's current subscription (e.g., "standard")
 * @param {string} plan - plan we are rendering the button for (e.g., "premium")
 * @returns {{ label: string, disabled: boolean }}
 */
function getPlanButtonState(currentPlan, plan) {
  const currentIndex = PLAN_ORDER.indexOf(currentPlan?.toLowerCase());
  const targetIndex = PLAN_ORDER.indexOf(plan?.toLowerCase());

  if (currentIndex === -1 || targetIndex === -1) {
    return { label: "Select Plan", disabled: false };
  }

  if (currentIndex === targetIndex) {
    return { label: "Current Plan", disabled: true };
  }

  if (targetIndex < currentIndex) {
    return { label: "Unavailable", disabled: true };
  }

  if (targetIndex > currentIndex) {
    return { label: "Upgrade", disabled: false };
  }
}

const Subscription = () => {
  const navigation = useNavigation();
  const { user } = useSelector((s) => s?.user);
  const { shop } = useSelector((s) => s?.shop);
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    if (shop?.subscription?.end_date) {
      setSubscriptionExpiry(new Date(shop.subscription.end_date));
    }
  }, [shop]);

  const getToolsplan = async () => {  
    try {
      let data = await Memory.get('tools_plan');
      if (data) {
        let parsedData = (data);
        let sortedData = parsedData.sort((a, b) => a.id - b.id);
        setSubscriptionPlans(sortedData);
      }
    } catch (error) {
      console.error('Error loading subscription plans:', error);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    getToolsplan();
  }, []);

  const handleSubscribe = (plan) => {
    if (plan.name.toLowerCase() === 'free') {
      Alert.alert('Selected', 'You have selected the Free plan.');
      return;
    }   
    payNow(plan);
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

    const raw = String(selectedPackage?.discount_price);
    const amountFloat = parseFloat(raw.replace(/[₦,]/g, '').trim()) || 0;

    popup.newTransaction({
      email: user?.email,
      amount: amountFloat,
      reference,
      metadata: {
        user_id: user.user_id,
        type: 'tools',
        plan: selectedPackage.name,
        start_date,
        end_date,
      },
      onSuccess: (res) => {
        let subscription = {
          "plan": selectedPackage.name,
          "start_date": start_date,
          "end_date": end_date,
          "updated_at": start_date
        };
        Alert.alert('Payment Successful!', `Your subscription was successful.`, [
          {
            text: 'OK',
            onPress: () => {
              const newShop = { ...shop, subscription: subscription };
              dispatch(set_shop(newShop));
              setSubscriptionExpiry(end_date);
              dispatch(set_sub_modal(0));
              navigation.navigate('Sell');
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

  const currentPlan = subscriptionPlans.find(p => p.name === shop?.subscription?.plan);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.loadingText}>Loading subscription plans...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Current Plan Dashboard */}
        {shop?.subscription && (
          <View style={styles.dashboard}>
            <View style={styles.dashboardHeader}>
              <Ionicons name="person-circle" size={26} color="#FF4500" />
              <Text style={styles.dashboardTitle}>Your Current Plan</Text>
            </View>
            <View style={styles.planInfo}>
              <View style={styles.planInfoLeft}>
                <Text style={styles.currentPlanName}>
                  {shop?.subscription?.plan[0]?.toUpperCase()}{shop?.subscription?.plan?.slice(1)}
                </Text>
                <Text style={styles.currentPlanPrice}>
                  {shop.subscription.plan === 'free' 
                    ? 'Free Forever' 
                    : `${currentPlan?.discount_price}/month`}
                </Text>
              </View> 
              <View style={styles.planInfoRight}>
                <Text style={styles.expiryText}>Expires: {formatDate(subscriptionExpiry)}</Text>
                <View style={[styles.expiryBadge, daysUntilExpiry() <= 7 ? styles.expirySoon : styles.expiryOk]}>
                  <Text style={styles.expiryBadgeText}>
                    {shop.subscription.plan === 'free' ? 'Till forever' : daysUntilExpiry() <= 0 ? 'Expired' : `${daysUntilExpiry()} days left`}
                  </Text>
                </View>
              </View>
            </View> 
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upgrade Your Plan</Text>
          <Text style={styles.sectionSubtitle}>
            Choose the plan that works best for your business needs
          </Text>
        </View>

        {/* Subscription Plans Grid */}
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
            const { label, disabled } = getPlanButtonState(shop?.subscription?.plan, planDetails?.name);
            const isCurrentPlan = shop.subscription.plan === planDetails?.name;
            
            return (  
              <View  
                key={planName}
                style={[   
                  styles.planCard,
                  isCurrentPlan && styles.currentPlanCard,
                  index === 2 && styles.featuredPlan,
                  { width: width * 0.85, marginRight: 16 },
                ]}
              >
                {index === 2 && (
                  <LinearGradient colors={['#FF4500', '#FF6347']} style={styles.popularBadge}>
                    <Ionicons name="star" size={12} color="white" />
                    <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                  </LinearGradient>
                )}

                {label === "Current Plan" && (
                  <View style={styles.currentBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="white" />
                    <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
                  </View>
                )} 

                <View style={styles.planIconContainer}>
                  <Text style={styles.planIcon}>{planDetails.icon}</Text>
                </View>

                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{Tools.capitalize(planDetails?.name)}</Text>
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
                  style={[styles.subscribeButton, disabled && styles.currentButton, index === 1 && styles.featuredButton]}
                  onPress={() => !disabled && handleSubscribe(planDetails)}
                  disabled={disabled}
                >
                  <LinearGradient colors={disabled ? ['#e0e0e0', '#e0e0e0'] : ['#FF6A00', '#FF4500']} style={styles.subscribeButtonInner}>
                    <Text style={[styles.subscribeButtonText, disabled && styles.currentButtonText]}>
                      {label}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Why Upgrade Your Plan?</Text>
          
          <View style={styles.benefitItem}>
            <LinearGradient colors={['#FF4500', '#FF6347']} style={styles.benefitIcon}>
              <Ionicons name="trending-up" size={20} color="white" />
            </LinearGradient>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitItemTitle}>Boost Sales & Visibility</Text>
              <Text style={styles.benefitItemText}>Gain more exposure and increase your sales with advanced features.</Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <LinearGradient colors={['#FF4500', '#FF6347']} style={styles.benefitIcon}>
              <Ionicons name="analytics" size={20} color="white" />
            </LinearGradient>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitItemTitle}>Advanced Analytics</Text>
              <Text style={styles.benefitItemText}>Understand customer behavior and optimize your product offerings.</Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <LinearGradient colors={['#FF4500', '#FF6347']} style={styles.benefitIcon}>
              <Ionicons name="business" size={20} color="white" />
            </LinearGradient>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitItemTitle}>Grow Your Business</Text>
              <Text style={styles.benefitItemText}>Access premium tools designed to help you scale efficiently.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // (no changes in styles, left same as your code)
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    padding: 8,
    paddingBottom: 40,
  },
  dashboard: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 12,
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
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 4,
  },
  currentPlanPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  currentPlanCard: {
    borderColor: '#FF4500',
    backgroundColor: '#fff',
    borderWidth: 2
  },
  expiryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  expiryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
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
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: 5,
    alignItems: 'left',
    backgroundColor: '#fff',
    padding: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
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
    borderColor: '#4CAF50',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#4CAF50',
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
    marginBottom: 16,
  },
  planName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    flexWrap: 'wrap',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF4500',
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  planDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  subscribeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  subscribeButtonInner: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  featuredButton: {
    // Additional styles for featured button if needed
  },
  currentButton: {
    opacity: 0.8,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  currentButtonText: {
    color: '#666',
  },
  benefitsSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    gap: 20,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitContent: {
    flex: 1,
  },
  benefitItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  benefitItemText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default Subscription;
