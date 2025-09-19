import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Video from 'react-native-video';
import { set_boost_modal } from '../../redux/modal/boost_modal';

const { width, height } = Dimensions.get('window');

const PromotedAdDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [adData, setAdData] = useState({});

  useEffect(() => {
    async function getMetrics() {
      try {
        const response = await axios.get('https://cs-node.vercel.app/promo', {
          params: { product_id: data?.product_id }
        });
        const result = response.data;
        console.log("result: ", result);
        setAdData(result);
        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
        setLoading(false);
      }
    }
    getMetrics();
  }, []);

  useEffect(() => {
    if (adData?.end_date) {
      const interval = setInterval(() => {
        calculateTimeRemaining();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [adData]);

  const calculateTimeRemaining = () => {
    if (!adData?.end_date) return;

    const now = new Date().getTime();
    const endDate = new Date(adData.end_date).getTime();
    const distance = endDate - now;

    if (distance < 0) {
      setTimeRemaining({ expired: true });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeRemaining({ days, hours, minutes, seconds, expired: false });
  };

  const formatCurrency = (amount) => {
    return `₦${amount?.toLocaleString('en-US') || '0'}`;
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
    
  const dispatch = useDispatch()

  const handleExtendPromotion = () => {
    dispatch(set_boost_modal({data: data, visible: 1}))
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6A00" />
        <Text style={styles.loadingText}>Loading promotion details...</Text>
      </View>
    );
  }

  if (!adData) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#FF6A00" />
        <Text style={styles.errorText}>Promotion details not found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     

      {/* Main Content with Scroll */}
      <View style={styles.contentContainer}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Ad Card */}
          <View style={styles.adCard}>
            {
                data.purpose === 'product'
                ?
                <Image source={{ uri: data.thumbnail_id }} style={styles.adImage} />
                : 
                <Video source={{ uri: data.thumbnail_id }} style={styles.adImage} />
            }
            <View style={styles.adContent}>
              <Text style={styles.adTitle} numberOfLines={2}>{data.title}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>{formatCurrency(data.price)}</Text>
                {data.originalPrice && (
                  <Text style={styles.originalPrice}>{formatCurrency(data.originalPrice)}</Text>
                )}
              </View>
              <View style={styles.adStats}>
                <View style={styles.statItem}>
                  <Ionicons name="eye-outline" size={16} color="#666" />
                  <Text style={styles.statText}>{data.views?.toLocaleString() || 0} views</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Promotion Status Card */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <Text style={styles.statusTitle}>Promotion Status</Text>
              <View style={[styles.statusBadge, 
                adData.is_active ? styles.statusActive : styles.statusInactive]}>
                <Text style={styles.statusBadgeText}>
                  {adData.is_active ? 'ACTIVE' : 'SUSPENDED'}
                </Text>
              </View>
            </View>
            
            {!timeRemaining.expired ? (
              <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Time Remaining:</Text>
                <View style={styles.timer}>
                  <View style={styles.timeUnit}>
                    <Text style={styles.timeValue}>{timeRemaining.days || 0}</Text>
                    <Text style={styles.timeLabel}>Days</Text>
                  </View>
                  <Text style={styles.timeSeparator}>:</Text>
                  <View style={styles.timeUnit}>
                    <Text style={styles.timeValue}>{timeRemaining.hours || 0}</Text>
                    <Text style={styles.timeLabel}>Hours</Text>
                  </View>
                  <Text style={styles.timeSeparator}>:</Text>
                  <View style={styles.timeUnit}>
                    <Text style={styles.timeValue}>{timeRemaining.minutes || 0}</Text>
                    <Text style={styles.timeLabel}>Mins</Text>
                  </View>
                  <Text style={styles.timeSeparator}>:</Text>
                  <View style={styles.timeUnit}>
                    <Text style={styles.timeValue}>{timeRemaining.seconds || 0}</Text>
                    <Text style={styles.timeLabel}>Secs</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.expiredContainer}>
                <Ionicons name="time-outline" size={32} color="#FF6A00" />
                <Text style={styles.expiredText}>Promotion has ended</Text>
              </View>
            )}
          </View>

          {/* Promotion Details Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Promotion Details</Text>
            
            <View style={styles.detailRow}>
              <Ionicons name="cube-outline" size={20} color="#666" />
              <Text style={styles.detailLabel}>Package:</Text>
              <Text style={styles.detailValue}>{adData.plan || 'N/A'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="cash-outline" size={20} color="#666" />
              <Text style={styles.detailLabel}>Price Paid:</Text>
              <Text style={[styles.detailValue, styles.priceValue]}>
                {formatCurrency(adData.amount_paid)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.detailLabel}>Start Date:</Text>
              <Text style={styles.detailValue}>{formatDate(adData.start_date)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="flag-outline" size={20} color="#666" />
              <Text style={styles.detailLabel}>End Date:</Text>
              <Text style={styles.detailValue}>{formatDate(adData.end_date)}</Text>
            </View>
          </View>

          {/* Features Card */}
          <View style={styles.featuresCard}>
            <Text style={styles.cardTitle}>Included Features</Text>
            {[
              'Priority listing in search results',
              'Highlighted placement on homepage',
              'Increased visibility across categories',
              'Premium ad badge'
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Performance Card */}
          <View style={styles.performanceCard}>
            <Text style={styles.cardTitle}>Performance Metrics</Text>
            
            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{data.impression || 0}</Text>
                <Text style={styles.metricLabel}>Impressions</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{data.views || 0}</Text>
                <Text style={styles.metricLabel}>Views</Text>
              </View>
              
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>
                  {data.views ? ((data.contact_click / data.views) * 100).toFixed(1) + '%' : '0%'}
                </Text>
                <Text style={styles.metricLabel}>Conversion</Text>
              </View>
            </View>
          </View>

          {/* Spacer for fixed buttons */}
          <View style={styles.spacer} />
        </ScrollView>
      </View>

      {/* Fixed Bottom Buttons */}
      <View style={styles.fixedButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.extendButton]}
          onPress={handleExtendPromotion}
        >
          {/* <Ionicons name="refresh-outline" size={20} color="#FFF" /> */}
          <Text style={styles.extendButtonText}>Extend Promotion</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.viewAdButton]}
          onPress={() => navigation.navigate('product', { data: data })}
        >
          <Ionicons name="eye-outline" size={20} color="#FF6A00" />
          <Text style={styles.viewAdButtonText}>View Ad</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 8,
    paddingBottom: 60, // Extra padding for fixed buttons
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#FF6A00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Ad Card Styles
  adCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  adContent: {
    padding: 16,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6A00',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  adStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  },
  // Status Card Styles
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#FF6A00',
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeUnit: {
    alignItems: 'center',
    marginHorizontal: 8,
    minWidth: 50,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6A00',
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  timeSeparator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6A00',
    marginHorizontal: 2,
  },
  expiredContainer: {
    alignItems: 'center',
    padding: 16,
  },
  expiredText: {
    fontSize: 16,
    color: '#FF6A00',
    fontWeight: 'bold',
    marginTop: 8,
  },
  // Details Card Styles
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginRight: 12,
    width: 80,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#2d3436',
    flex: 1,
    fontWeight: '600',
  },
  priceValue: {
    fontWeight: 'bold',
    color: '#FF6A00',
  },
  // Features Card Styles
  featuresCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#2d3436',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  // Performance Card Styles
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6A00',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  spacer: {
    height: 20,
  },
  // Fixed Bottom Buttons
  fixedButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  extendButton: {
    backgroundColor: '#FF4500',
  },
  viewAdButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  extendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  viewAdButtonText: {
    color: '#FF4500',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PromotedAdDetails;