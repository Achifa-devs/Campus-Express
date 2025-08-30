import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const AnalyticsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d'); // 7d, 30d, 90d
  const { shop } = useSelector(s => s.shop);
  const { products } = useSelector(s => s.products);
  
  // Mock data - replace with actual API calls
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      shopViews: 1245,
      postImpressions: 5678,
      searchAppearances: 892,
      productViews: products.reduce((sum, item) => sum + parseInt(item.views), 0),
      conversionRate: 4.2,
      totalRevenue: 12560,
    //   orders: 128,
    //   averageOrderValue: 98.13,
    },
    trafficSources: [
      { name: 'Direct', value: 45 },
      { name: 'Social Media', value: 25 },
      { name: 'Search', value: 20 },
      { name: 'Referral', value: 10 },
    ],
    topProducts: [
      { name: 'Wireless Headphones', views: 1234, conversions: 52 },
      { name: 'Smart Watch', views: 987, conversions: 38 },
      { name: 'Phone Case', views: 765, conversions: 29 },
      { name: 'Charger', views: 654, conversions: 21 },
      { name: 'Bluetooth Speaker', views: 543, conversions: 18 },
    ],
    dailyViews: [45, 52, 48, 65, 76, 68, 72, 80, 75, 82, 88, 85, 90, 95, 92],
    revenueData: [1200, 1350, 980, 1560, 2100, 1890, 2340, 1980, 2560, 2780, 3120, 2980, 3250, 3450, 3600],
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedTimeframe]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 1500);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAnalyticsData();
  };

    

  const TimeframeButton = ({ label, value }) => (
    <TouchableOpacity
      style={[
        styles.timeframeButton,
        selectedTimeframe === value && styles.timeframeButtonActive
      ]}
      onPress={() => setSelectedTimeframe(value)}
    >
      <Text
        style={[
          styles.timeframeButtonText,
          selectedTimeframe === value && styles.timeframeButtonTextActive
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.loadingText}>Loading analytics data...</Text>
      </View>
    );
  }



  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop Analytics</Text>
        <View style={styles.timeframeContainer}>
          <TimeframeButton label="7D" value="7d" />
          <TimeframeButton label="30D" value="30d" />
          <TimeframeButton label="90D" value="90d" />
        </View>
      </View>

      {/* Overview Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Ionicons name="eye" size={24} color="#FF4500" />
            <Text style={styles.metricValue}>{analyticsData.overview.shopViews}</Text>
            <Text style={styles.metricLabel}>Shop Views</Text>
            <Text style={styles.metricChange}>+12%</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="trending-up" size={24} color="#FF4500" />
            <Text style={styles.metricValue}>{analyticsData.overview.postImpressions}</Text>
            <Text style={styles.metricLabel}>Post Impressions</Text>
            <Text style={styles.metricChange}>+8%</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="search" size={24} color="#FF4500" />
            <Text style={styles.metricValue}>{analyticsData.overview.searchAppearances}</Text>
            <Text style={styles.metricLabel}>Search Appearances</Text>
            <Text style={styles.metricChange}>+15%</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="cart" size={24} color="#FF4500" />
            <Text style={styles.metricValue}>{analyticsData.overview.productViews}</Text>
            <Text style={styles.metricLabel}>Product Views</Text>
            <Text style={styles.metricChange}>+10%</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="stats-chart" size={24} color="#FF4500" />
            <Text style={styles.metricValue}>{analyticsData.overview.conversionRate}%</Text>
            <Text style={styles.metricLabel}>Conversion Rate</Text>
            <Text style={styles.metricChange}>+2%</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="cash" size={24} color="#FF4500" />
            <Text style={styles.metricValue}>${analyticsData.overview.totalRevenue}</Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
            <Text style={styles.metricChange}>+18%</Text>
          </View>
        </View>
      </View>

      {/* Shop Views Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop Views Trend</Text>
        <LineChart
          data={{
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
            datasets: [
              {
                data: analyticsData.dailyViews,
              },
            ],
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#FF4500',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Revenue Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Trend</Text>
        <BarChart
          data={{
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
            datasets: [
              {
                data: analyticsData.revenueData,
              },
            ],
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      {/* Traffic Sources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Traffic Sources</Text>
        <PieChart
          data={analyticsData.trafficSources.map((source, index) => ({
            name: source.name,
            population: source.value,
            color: `rgba(255, 69, 0, ${0.2 + (index * 0.2)})`,
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          }))}
          width={Dimensions.get('window').width - 32}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
      </View>

      {/* Top Performing Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Products</Text>
        {analyticsData.topProducts.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productStats}>
                {product.views} views • {product.conversions} conversions
              </Text>
            </View>
            <View style={styles.conversionRate}>
              <Text style={styles.conversionText}>
                {((product.conversions / product.views) * 100).toFixed(1)}%
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Additional Metrics */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Metrics</Text>
        <View style={styles.additionalMetrics}>
          <View style={styles.additionalMetric}>
            <Text style={styles.additionalMetricValue}>{analyticsData.overview.orders}</Text>
            <Text style={styles.additionalMetricLabel}>Total Orders</Text>
          </View>
          <View style={styles.additionalMetric}>
            <Text style={styles.additionalMetricValue}>${analyticsData.overview.averageOrderValue}</Text>
            <Text style={styles.additionalMetricLabel}>Avg. Order Value</Text>
          </View>
          <View style={styles.additionalMetric}>
            <Text style={styles.additionalMetricValue}>2.3%</Text>
            <Text style={styles.additionalMetricLabel}>Bounce Rate</Text>
          </View>
        </View>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  timeframeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
  },
  timeframeButtonActive: {
    backgroundColor: '#FF4500',
  },
  timeframeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  timeframeButtonTextActive: {
    color: '#FFF',
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: Dimensions.get('window').width / 2 - 22,
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
  productStats: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  conversionRate: {
    backgroundColor: '#FFF8F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  conversionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4500',
  },
  additionalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additionalMetric: {
    alignItems: 'center',
    flex: 1,
  },
  additionalMetricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
  },
  additionalMetricLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default AnalyticsScreen;