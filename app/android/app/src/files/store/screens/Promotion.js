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
  ActivityIndicator,
} from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
import { useSelector, useDispatch } from 'react-redux';
import { set_shop } from '../../../../../../redux/shop';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../../utils/AsyncStore.js';
import { set_sub_modal } from '../../../../../../redux/sub.js';
import { capitalize } from '../utils/Capitalize.js';

const { width } = Dimensions.get('window');

const VendorSubscriptionsScreen = () => {
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((s) => s?.user);
  const { shop } = useSelector((s) => s?.shop);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setSubscriptionExpiry(new Date(shop?.subscription?.end_date));
  }, [shop]); 

  const getToolsplan = async () => {  
    try {
      let data = await getData('tools_plan');
      console.log('tools_plan: ', data);

      if (data) {
        let parsedData = JSON.parse(data);
        let sortedData = parsedData.sort((a, b) => a.id - b.id);
        setSubscriptionPlans(sortedData);
      }
    } catch (error) {
      console.error('Error fetching tools plan:', error);
      Alert.alert('Error', 'Failed to load subscription plans');
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    getToolsplan();
  }, []);

  const handleSubscribe = (planDetails) => {
    if (planDetails.name.toLowerCase() === 'free') {
      Alert.alert('Selected', 'You have selected the Free plan.');
      return;
    }   
    payNow(planDetails);
  };

  const { popup } = usePaystack();

  const payNow = (selectedPackage) => {
    if (!user) {
      Alert.alert('Login required', 'Please sign in to continue with payment.');
      navigation.navigate('Login');
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

  const currentPlan = subscriptionPlans.find(p => p.name === shop.subscription.plan);

  const getButtonLabel = (currentPlan, planName) => {
    if (planName === 'free') {
      return 'Select Free Plan';
    }

    if (currentPlan === 'basic') {
      if (planName === 'standard' || planName === 'premium') return 'Upgrade now';
      if (planName === 'basic') return 'Current Plan';
      return 'Disabled';
    }

    if (currentPlan === 'standard') {
      if (planName === 'premium') return 'Upgrade';
      if (planName === 'standard') return 'Current Plan';
      return 'Disabled';
    }

    if (currentPlan === 'premium') {
      if (planName === 'premium') return 'Current Plan';
      return 'Disabled';
    }

    return 'Subscribe Now';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6A00" />
        <Text style={styles.loadingText}>Loading subscription plans...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Current Plan Dashboard */}
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

        <View style={styles.headerSection}>
          <Text style={styles.subtitle}>Upgrade your vendor account with powerful tools to grow your business</Text>
        </View>

        {/* Horizontal Plans */}
        <View style={styles.packagesSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          <Text style={styles.sectionSubtitle}>
            Select the plan that works best for your business needs
          </Text>
          
          <View style={styles.packageCardsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.horizontalScrollContainer}
              decelerationRate="fast"
              snapToInterval={width * 0.8 + 16}
              snapToAlignment="center"
            >
              {subscriptionPlans.map((planDetails, index) => {
                const discountPercent = calculateDiscountPercentage(planDetails.price, planDetails.discount_price);
                const isCurrentPlan = shop.subscription.plan === planDetails?.name;
                
                return (  
                  <View  
                    key={planDetails.id}
                    style={[   
                      styles.planCard,
                      isCurrentPlan && styles.currentPlanCard,
                      // index === 1 && styles.featuredPlan,
                      { width: width * 0.8, marginRight: 16 },
                    ]}
                  >
                    {index === 2 && (
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
                      <Text style={styles.planName}>{capitalize(planDetails?.name)}</Text>
                      <View style={styles.priceContainer}>
                        {planDetails.name !== 'free' && (
                          <Text style={styles.originalPrice}>{planDetails.price}</Text>
                        )}
                        <Text style={styles.discountPrice}>
                          {planDetails.name === 'free' ? 'Free Forever' : `${planDetails.discount_price}/month`}
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
                      style={[styles.subscribeButton, isCurrentPlan && styles.currentButton]} 
                      onPress={() => handleSubscribe(planDetails)}
                      disabled={isCurrentPlan || shop.subscription.plan !== 'free' && planDetails.name === 'free'}
                    >
                      <LinearGradient 
                        colors={isCurrentPlan ? ['#e0e0e0', '#e0e0e0'] : shop.subscription.plan !== 'free' && planDetails.name === 'free'?  ['#e0e0e0', '#e0e0e0'] : ['#FF6A00', '#FF4500']} 
                        style={styles.subscribeButtonInner}
                      >
                        <Text style={[styles.subscribeButtonText, isCurrentPlan && styles.currentButtonText, shop.subscription.plan !== 'free' && planDetails.name === 'free' ?  styles.currentButtonText : '']}>
                          {/* {isCurrentPlan ? 'Current Plan' : planDetails.name === 'free' ? 'Select Free Plan' : 'Subscribe Now'} */}
                          {getButtonLabel(shop.subscription.plan, planDetails.name)}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
            
            {/* Scroll indicator */}
            <View style={styles.scrollIndicator}>
              {subscriptionPlans.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.scrollDot,
                    index === 1 && styles.scrollDotActive
                  ]} 
                />
              ))}
            </View>
          </View>
        </View>

        {/* Info Section */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
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
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
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
    fontSize: 22,
    fontWeight: '800',
    color: '#FF4500',
    marginBottom: 4,
  },
  currentPlanPrice: {
    fontSize: 18,
    color: '#2d3436',
    fontWeight: '700',
  },
  expiryText: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 8,
  },
  expiryBadge: {
    paddingHorizontal: 12,
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
  headerSection: {
    marginBottom: 8,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  packagesSection: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 20,
    textAlign: 'center',
  },
  packageCardsContainer: {
    marginBottom: 10,
  },
  horizontalScrollContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  featuredPlan: {
    borderColor: '#FF4500',
    // transform: [{ scale: 1.02 }],
  },
  currentPlanCard: {
    borderColor: '#00b894',
    backgroundColor: '#f8fff9',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 6,
  },
  currentBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
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
    fontSize: 40,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2d3436',
    flex: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginLeft: 16,
  },
  originalPrice: {
    fontSize: 14,
    color: '#8a8a8a',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2d3436',
    marginTop: 4,
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  planDescription: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
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
    borderRadius: 8,
    overflow: 'hidden',
  },
  subscribeButtonInner: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
  currentButtonText: {
    color: '#8a8a8a',
  },
  scrollIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  scrollDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  scrollDotActive: {
    backgroundColor: '#FF4500',
    width: 12,
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 4,
  },
  infoItemText: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
});

export default VendorSubscriptionsScreen