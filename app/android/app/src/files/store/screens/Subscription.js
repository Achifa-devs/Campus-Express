// screens/SubscriptionScreen.js
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
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getData } from '../../utils/AsyncStore.js';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

// Define the order of plans from lowest to highest
const PLAN_ORDER = ['Free', 'Basic', 'Standard', 'Premium'];

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector(s => s?.user);
  const { subscribed } = useSelector(s => s.subscribed);
  const { tier } = useSelector(s => s.tier);

  const [loading, setLoading] = useState(true);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptionPackages, setSubscriptionPackages] = useState([]);
  const [PACKAGES, setPACKAGES] = useState({});

  useEffect(() => {
    let isMounted = true;

    const loadAll = async () => {
      try {
        setLoading(true);

        // 1) Load packages saved in AsyncStore
        const res = await getData('PACKAGES');
        const parsed = res ? JSON.parse(res) : {};
        if (!isMounted) return;

        setPACKAGES(parsed);
        let entries = Object.entries(parsed);

        // 2) Check current user subscription
        if (user?.user_id) {
          try {
            if (tier) {
              const plan = String(tier.plan).toLowerCase();

              // Add current flag to packages
              const updatedObj = Object.fromEntries(
                entries.map(([key, value]) => [
                  key,
                  { ...value, current: key.toLowerCase() === plan },
                ])
              );

              if (!isMounted) return;
              setPACKAGES(updatedObj);
              entries = Object.entries(updatedObj);

              const found = entries.find(([, v]) => v.current);
              setCurrentSubscription(
                found ? { key: found[0], data: found[1] } : null
              );
            } else {
              // Not subscribed
              const updatedObj = Object.fromEntries(
                entries.map(([key, value]) => [key, { ...value, current: false }])
              );
              if (!isMounted) return;
              setPACKAGES(updatedObj);
              entries = Object.entries(updatedObj);
              setCurrentSubscription(null);
            }
          } catch (err) {
            console.error('Subscription API error:', err);
            const updatedObj = Object.fromEntries(
              entries.map(([key, value]) => [key, { ...value, current: false }])
            );
            if (!isMounted) return;
            setPACKAGES(updatedObj);
            entries = Object.entries(updatedObj);
            setCurrentSubscription(null);
          }
        } else {
          // No user, show packages without current
          const updatedObj = Object.fromEntries(
            entries.map(([key, value]) => [key, { ...value, current: false }])
          );
          if (!isMounted) return;
          setPACKAGES(updatedObj);
          entries = Object.entries(updatedObj);
          setCurrentSubscription(null);
        }

        // 3) Set the entry array used by the UI
        if (!isMounted) return;
        // Sort packages by PLAN_ORDER
        const sorted = entries.sort(
          (a, b) => PLAN_ORDER.indexOf(a[0]) - PLAN_ORDER.indexOf(b[0])
        );
        setSubscriptionPackages(sorted);
      } catch (error) {
        console.error('Load packages error:', error);
        if (isMounted) {
          Alert.alert('Error', 'Failed to load subscription data');
          setSubscriptionPackages([]);
          setCurrentSubscription(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadAll();
    return () => {
      isMounted = false;
    };
  }, [subscribed, tier, user]);

  const handleSubscribe = (packageKey) => {
    const selected = subscriptionPackages.find(([key]) => key === packageKey);
    if (!selected) return;

    navigation.navigate('user-payment', {
      selectedPackage: selected[1],
      packageName: selected[0],
    });
  };

  const getButtonState = (planKey, currentPlanKey) => {
    const currentIndex = PLAN_ORDER.indexOf(currentPlanKey || 'Free');
    const planIndex = PLAN_ORDER.indexOf(planKey);
    
    if (planKey === currentPlanKey) {
      return { label: 'Current Plan', disabled: true, type: 'current' };
    } else if (planIndex > currentIndex) {
      return { label: 'Upgrade', disabled: false, type: 'upgrade' };
    } else {
      return { label: 'Downgrade', disabled: true, type: 'downgrade' };
    }
  };

  const renderFeature = (feature, index) => (
    <View key={index} style={styles.featureItem}>
      <Icon name="checkmark-circle" size={16} color="#4CAF50" />
      <Text style={styles.featureText}>{feature}</Text>
    </View>
  );

  const renderSubscriptionCard = (pkg) => {
    const planKey = pkg[0];
    const plan = pkg[1] || {};
    const isCurrent = !!plan.current;
    const currentPlanKey = currentSubscription?.key;
    const buttonState = getButtonState(planKey, currentPlanKey);

    return (
      <View
        key={planKey}
        style={[
          styles.packageCard,
          isCurrent && styles.currentPackageCard,
          planKey === 'Premium' && styles.premiumPackageCard,
        ]}
      >
        {planKey === 'Premium' && !isCurrent && (
          <LinearGradient
            colors={['#FF6B35', '#FF4500']}
            style={styles.popularBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="star" size={14} color="#FFF" style={styles.badgeIcon} />
            <Text style={styles.popularBadgeText}>PREMIUM</Text>
          </LinearGradient>
        )}

        {isCurrent && (
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            style={styles.currentBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="checkmark-circle" size={14} color="#FFF" style={styles.badgeIcon} />
            <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
          </LinearGradient>
        )}

        <Text style={styles.packageName}>{planKey}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{plan.discount_price || plan.price}</Text>
          {plan.price && plan.discount_price && plan.price !== plan.discount_price && (
            <Text style={styles.originalPrice}>{plan.price}</Text>
          )}
          {plan.period && <Text style={styles.period}>/{plan.period}</Text>}
        </View>

        <View style={styles.featuresContainer}>
          {(plan.features || []).map(renderFeature)}
        </View>

        <TouchableOpacity
          style={[
            styles.subscribeButton,
            buttonState.type === 'current' && styles.currentButton,
            buttonState.type === 'upgrade' && styles.upgradeButton,
            buttonState.type === 'downgrade' && styles.downgradeButton,
          ]}
          onPress={() => handleSubscribe(planKey)}
          disabled={buttonState.disabled}
        >
          <Text style={styles.subscribeButtonText}>
            {buttonState.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF4500" />
          <Text style={styles.loadingText}>Loading subscriptions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*<View style={styles.header}>
          <Text style={styles.headerTitle}>Subscription Plans</Text>
          <Text style={styles.headerSubtitle}>
            Choose the perfect plan for your business needs
          </Text>
        </View>*/}
        
        {/* Current Subscription Info */}
        {currentSubscription && (
          <View style={styles.currentSubscriptionContainer}>
            <Text style={styles.currentSubscriptionTitle}>Your Current Plan</Text>
            <LinearGradient
              colors={['#FF6B35', '#FF4500']}
              style={styles.currentSubscriptionCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.currentPlanHeader}>
                <Text style={styles.currentPlanName}>{currentSubscription.key}</Text>
                <Icon name="checkmark-circle" size={24} color="#FFF" />
              </View>
              <Text style={styles.currentPlanPrice}>
                {currentSubscription.data?.discount_price || currentSubscription.data?.price}
              </Text>
              <Text style={styles.currentPlanDescription}>
                Active until: {tier?.end_date ? new Date(tier.end_date).toLocaleDateString() : 'Never expires'}
              </Text>
            </LinearGradient>
          </View>
        )}

        {/* Subscription Packages */}
        <View style={styles.packagesContainer}>
          <Text style={styles.sectionTitle}>Available Plans</Text>
          
          <View style={styles.packagesGrid}>
            {subscriptionPackages.map(renderSubscriptionCard)}
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Why Upgrade?</Text>
          <View style={styles.infoItem}>
            <View style={[styles.infoIcon, { backgroundColor: '#FFF6F2' }]}>
              <Icon name="rocket" size={20} color="#FF4500" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTextTitle}>Increased Visibility</Text>
              <Text style={styles.infoText}>Get your ads seen by more potential customers</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={[styles.infoIcon, { backgroundColor: '#F0FDF4' }]}>
              <Icon name="stats-chart" size={20} color="#4CAF50" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTextTitle}>Advanced Analytics</Text>
              <Text style={styles.infoText}>Track performance with detailed insights</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={[styles.infoIcon, { backgroundColor: '#F0F9FF' }]}>
              <Icon name="headset" size={20} color="#0EA5E9" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTextTitle}>Priority Support</Text>
              <Text style={styles.infoText}>Get help faster with dedicated support</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 40,
    paddingHorizontal: 0
  },
  currentSubscriptionContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  currentSubscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  currentSubscriptionCard: {
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  currentPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPlanName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  currentPlanPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  currentPlanDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  packagesContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  packagesGrid: {
    gap: 20,
  },
  packageCard: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentPackageCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    backgroundColor: '#F0FDF4',
  },
  premiumPackageCard: {
    borderColor: '#FF4500',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  currentBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeIcon: {
    marginRight: 4,
  },
  popularBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  currentBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  packageName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 6,
  },
  price: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF4500',
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  period: {
    fontSize: 16,
    color: '#666',
  },
  featuresContainer: {
    marginBottom: 20,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  subscribeButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  currentButton: {
    backgroundColor: '#4CAF50',
  },
  upgradeButton: {
    backgroundColor: '#FF4500',
  },
  downgradeButton: {
    backgroundColor: '#BDBDBD',
  },
  subscribeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 8,
    marginHorizontal: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTextTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default SubscriptionScreen;