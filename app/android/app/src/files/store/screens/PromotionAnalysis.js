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

const { width } = Dimensions.get('window');

const PromotedAdDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [adData, setAdData] = useState(null);

  useEffect(() => {
    async function getMetrics(params) {
    try {
        const response = await axios.get('https://cs-server-olive.vercel.app/promotion', {params: {product_id: data?.product_id}});
        const result = response.data.data;
        console.log("result: ", result);
        setAdData(result);
    } catch (error) {
        console.log("error: ", error);
    }
    }
    getMetrics();
}, []);

  // Sample data - in real app, this would come from route params or API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAdData({
        id: 'promo-123',
        title: 'Premium Smartphone X Pro',
        price: 89999,
        originalPrice: 99999,
        category: 'Electronics',
        image: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Promoted+Ad',
        views: 1250,
        clicks: 89,
        promotion: {
          package: 'Weekly Exposure',
          pricePaid: 3500,
          startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
          status: 'active',
          features: [
            'Priority listing in search results',
            'Highlighted placement on homepage',
            'Increased visibility across categories',
            'Premium ad badge'
          ]
        },
        performance: {
          impressions: 12500,
          clickThroughRate: '7.12%',
          conversionRate: '2.3%'
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (adData?.promotion?.endDate) {
      const interval = setInterval(() => {
        calculateTimeRemaining();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [adData]);

  const calculateTimeRemaining = () => {
    if (!adData?.promotion?.endDate) return;

    const now = new Date().getTime();
    const endDate = new Date(adData.promotion.endDate).getTime();
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
    return `₦${amount.toLocaleString('en-US')}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExtendPromotion = () => {
    Alert.alert(
      'Extend Promotion',
      'Would you like to extend this promotion?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Extend',
          onPress: () => navigation.navigate('PromotionPackages', { adId: adData.id })
        }
      ]
    );
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
     
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Ad Card */}
        <View style={styles.adCard}>
          <Image source={{ uri: data.thumbnail }} style={styles.adImage} />
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
                <Text style={styles.statText}>{data.views.toLocaleString()} views</Text>
              </View>
              {/* <View style={styles.statItem}>
                <Ionicons name="click-outline" size={16} color="#666" />
                <Text style={styles.statText}>{data.clicks} clicks</Text>
              </View> */}
            </View>
          </View>
        </View>

        {/* Promotion Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Promotion Status</Text>
            <View style={[styles.statusBadge, 
              adData.promotion.status === 'active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusBadgeText}>
                {adData.promotion.status.toUpperCase()}
              </Text>
            </View>
          </View>
          
          {!timeRemaining.expired ? (
            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>Time Remaining:</Text>
              <View style={styles.timer}>
                <View style={styles.timeUnit}>
                  <Text style={styles.timeValue}>{timeRemaining.days}</Text>
                  <Text style={styles.timeLabel}>Days</Text>
                </View>
                <Text style={styles.timeSeparator}>:</Text>
                <View style={styles.timeUnit}>
                  <Text style={styles.timeValue}>{timeRemaining.hours}</Text>
                  <Text style={styles.timeLabel}>Hours</Text>
                </View>
                <Text style={styles.timeSeparator}>:</Text>
                <View style={styles.timeUnit}>
                  <Text style={styles.timeValue}>{timeRemaining.minutes}</Text>
                  <Text style={styles.timeLabel}>Mins</Text>
                </View>
                <Text style={styles.timeSeparator}>:</Text>
                <View style={styles.timeUnit}>
                  <Text style={styles.timeValue}>{timeRemaining.seconds}</Text>
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
            <Text style={styles.detailValue}>{adData.promotion.package}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="cash-outline" size={20} color="#666" />
            <Text style={styles.detailLabel}>Price Paid:</Text>
            <Text style={[styles.detailValue, styles.priceValue]}>
              {formatCurrency(adData.promotion.pricePaid)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.detailLabel}>Start Date:</Text>
            <Text style={styles.detailValue}>{formatDate(adData.promotion.startDate)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="flag-outline" size={20} color="#666" />
            <Text style={styles.detailLabel}>End Date:</Text>
            <Text style={styles.detailValue}>{formatDate(adData.promotion.endDate)}</Text>
          </View>
        </View>

        {/* Features Card */}
        <View style={styles.featuresCard}>
          <Text style={styles.cardTitle}>Included Features</Text>
          {adData.promotion.features.map((feature, index) => (
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
              <Text style={styles.metricValue}>{adData.performance.impressions.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Impressions</Text>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{adData.performance.clickThroughRate}</Text>
              <Text style={styles.metricLabel}>Click Rate</Text>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{adData.performance.conversionRate}</Text>
              <Text style={styles.metricLabel}>Conversion</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.extendButton]}
            onPress={handleExtendPromotion}
          >
            <Ionicons name="refresh-outline" size={20} color="#FFF" />
            <Text style={styles.extendButtonText}>Extend Promotion</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.viewAdButton]}
            onPress={() => navigation.navigate('AdDetails', { adId: adData.id })}
          >
            <Ionicons name="eye-outline" size={20} color="#FF6A00" />
            <Text style={styles.viewAdButtonText}>View Ad</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
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
  scrollContent: {
    padding: 8,
    paddingBottom: 30,
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
    padding: 16,
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
    marginBottom: 12,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeUnit: {
    alignItems: 'center',
    marginHorizontal: 6,
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
    padding: 16,
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
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginRight: 8,
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#2d3436',
    flex: 1,
  },
  priceValue: {
    fontWeight: 'bold',
    color: '#FF6A00',
  },
  // Features Card Styles
  featuresCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
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
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  // Performance Card Styles
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
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
  },
  // Action Buttons Styles
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  extendButton: {
    backgroundColor: '#FF6A00',
  },
  viewAdButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF6A00',
  },
  extendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewAdButtonText: {
    color: '#FF6A00',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PromotedAdDetailsScreen;