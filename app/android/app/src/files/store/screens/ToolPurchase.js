import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const VendorSubscriptionsScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  const subscriptionPlans = {
    "Free": {
      "description": "Perfect for getting started with basic selling capabilities.",
      "price": "₦0.00",
      "discountPrice": "₦0.00",
      "features": [
        "Basic product listing",
        "Up to 10 products",
        "Standard search visibility",
        "Basic seller profile"
      ]
    },
    "Basic": {
      "description": "Ideal for new vendors who want to start selling with essential tools and visibility.",
      "price": "₦500.00",
      "discountPrice": "₦450.00",
      "features": [
        "Essential performance metrics (views, impressions, search performance)",
        "Basic visibility in customer searches",
        "Up to 50 products",
        "Basic customer insights"
      ]
    },
    "Standard": {
      "description": "Best for growing vendors seeking deeper insights and improved visibility.",
      "price": "₦1,200.00",
      "discountPrice": "₦960.00",
      "features": [
        "Comprehensive analytics (views, impressions, search performance, shares)",
        "Enhanced visibility in search results",
        "Access to customer engagement insights",
        "Up to 200 products"
      ]
    },
    "Pro": {
      "description": "Designed for professional vendors who want maximum reach, trust, and advanced tools.",
      "price": "₦2,500.00",
      "discountPrice": "₦1,750.00",
      "features": [
        "Full advanced analytics suite (search trends, shares, conversions, clicks)",
        "Sponsored badge for premium trust and visibility",
        "Priority placement in listings and promotions",
        "Early access to new vendor tools and features",
        "Unlimited products"
      ]
    }
  };

  const handleSubscribe = (plan) => {
    if (plan === "Free") {
      setSelectedPlan("Free");
      Alert.alert('Plan Selected', 'You have selected the Free plan.');
      return;
    }
    
    Alert.alert(
      'Confirm Subscription',
      `Are you sure you want to subscribe to the ${plan} plan for ${subscriptionPlans[plan].discountPrice}/month?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Subscribe', 
          onPress: () => completeSubscription(plan),
          style: 'default'
        },
      ]
    );
  };

  const completeSubscription = (plan) => {
    // In a real app, this would integrate with your payment processing
    Alert.alert('Success', `You have successfully subscribed to the ${plan} plan!`);
    setSelectedPlan(plan);
    setSubscriptionExpiry(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
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
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.title}>Vendor Subscription Plans</Text>
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
                  index === 2 && styles.featuredPlan // Highlight the Standard plan
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#FFA500',
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
    textAlign: 'center',
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
});

export default VendorSubscriptionsScreen;