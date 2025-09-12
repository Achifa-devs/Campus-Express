import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { set_sub_modal } from '../../../../../../redux/sub';
const filters = [
  { key: "views", label: "Views", icon: "eye-outline" },
  { key: "impression", label: "Impressions", icon: "analytics-outline" },
  { key: "shares", label: "Shares", icon: "share-social-outline" },
  { key: "contact_click", label: "Contacts", icon: "chatbubble-ellipses-outline" },
  { key: "search_appearances", label: "Search appearances", icon: "search-outline" },
];
const AnalyticsScreen = () => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d'); // 7d, 30d, 90d
  const { shop } = useSelector(s => s.shop);
  const { products } = useSelector(s => s.products);
  const [activeFilter, setActiveFilter] = useState("views");

  let conversion = ((products.reduce((sum, item) => sum + parseInt(item.contact_click), 0))/(products.reduce((sum, item) => sum + parseInt(item.views), 0)))*100;
  
  // Mock data - replace with actual API calls
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      shopViews: shop?.views,
      postImpressions: products.reduce((sum, item) => sum + parseInt(item.impression), 0),
      searchAppearances: products.reduce((sum, item) => sum + parseInt(item.search_appearances), 0),
      productViews: products.reduce((sum, item) => sum + parseInt(item.views), 0),
      conversionRate: conversion,
      Shares: products.reduce((sum, item) => sum + parseInt(item.shares), 0),
      // totalRevenue: 12560, 
    //   orders: 128,
    //   averageOrderValue: 98.13,
    },
    trafficSources: [
      { name: 'Views', value: products.reduce((sum, item) => sum + parseInt(item.views), 0) },
      { name: 'Search', value: products.reduce((sum, item) => sum + parseInt(item.search_appearances), 0)},
      { name: 'Shares', value: products.reduce((sum, item) => sum + parseInt(item.shares), 0) },
      { name: 'Contact', value: products.reduce((sum, item) => sum + parseInt(item.contact_click), 0) },
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

   
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.loadingText}>Loading analytics data...</Text>
      </View>
    );
  }

 

  
  const getIconForFilter = (filterKey) => {
    const filter = filters.find(f => f.key === filterKey);
    return filter ? filter.icon : "help-outline";
  };

  let plan = shop.subscription.plan;


  const renderItem = ({ item, index }) => {
    const value = item[activeFilter];
    let progressPercentage = 0;
    
    // Calculate progress percentage based on the highest value in the dataset
    if (products.length > 0) {
      const maxValue = Math.max(...products.map(i => i[activeFilter]));
      progressPercentage = (value / maxValue) * 100;
    }
    
    return (
      <View style={[
        secondStyle.card,
        index === 0 && secondStyle.firstCard,
        index === products.length - 1 && secondStyle.lastCard,
        plan !== 'standard' && plan !== 'premium' && styles.blur 
      ]}>
        <View style={secondStyle.cardHeader}>
          <Text style={[secondStyle.productName, plan !== 'standard' && plan !== 'premium' &&styles.blur ]}>{item.title} ({item.purpose.charAt(0).toUpperCase() + item.purpose.slice(1)})</Text>
          <View style={secondStyle.valueContainer}>
            <Ionicons name={getIconForFilter(activeFilter)} size={16} color="#FF4500" />
            <Text style={[secondStyle.valueText, plan !== 'standard' && plan !== 'premium' &&styles.blur ]}>{value}</Text>
          </View>
        </View>
         
        <View style={secondStyle.progressBar}>
          <View 
            style={[
              secondStyle.progressFill,
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        
        <View style={secondStyle.metricsRow}>
          <View style={secondStyle.metricItem}>
            <Ionicons name="eye-outline" size={14} color="#64748B" />
            <Text style={[secondStyle.metricText, plan !== 'standard' && plan !== 'premium' &&styles.blur ]}>{item.views}</Text>
          </View>
          <View style={secondStyle.metricItem}>
            <Ionicons name="analytics-outline" size={14} color="#64748B" />
            <Text style={[secondStyle.metricText, plan !== 'standard' && plan !== 'premium' &&styles.blur ]}>{item.impression}</Text>
          </View>
          <View style={secondStyle.metricItem}>
            <Ionicons name="share-social-outline" size={14} color="#64748B" />
            <Text style={[secondStyle.metricText, plan !== 'standard' && plan !== 'premium' &&styles.blur ]}>{item.shares}</Text>
          </View>
          <View style={secondStyle.metricItem}>
            <Ionicons name="chatbubble-ellipses-outline" size={14} color="#64748B" />
            <Text style={[secondStyle.metricText, plan !== 'standard' && plan !== 'premium' &&styles.blur ]}>{item.contact_click}</Text>
          </View>
          <View style={secondStyle.metricItem}>
            <Ionicons name="search-outline" size={14} color="#64748B" />
            <Text style={[secondStyle.metricText, plan !== 'standard' && plan !== 'premium' &&styles.blur ]}>{item.search_appearances}</Text>
          </View>
        </View>
      </View>
    );
  };

   if(products.length === 0){
    return(
      <>
        <View style={styles.emptyState}>
          <Ionicons name="images" size={50} color="#CCC" />
          <Text style={styles.emptyStateText}>No ads published yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Start by publishing your first ad to get analytics data!
          </Text>
        </View>
      </>
    )
  }
  
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
     

      {/* Overview Metrics */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={secondStyle.filterRow}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              secondStyle.filterButton,
              activeFilter === filter.key && secondStyle.activeFilter,
            ]}
            onPress={() => setActiveFilter(filter.key)}
          >
            <Ionicons 
              name={filter.icon} 
              size={16} 
              color={activeFilter === filter.key ? "#fff" : "#FF4500"} 
            />
            <Text
              style={[
                secondStyle.filterText,
                activeFilter === filter.key && secondStyle.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Summary Card */}
      <View style={secondStyle.summaryCard}>
        <View style={secondStyle.summaryHeader}>
          <Text style={secondStyle.summaryTitle}>Performance Summary</Text>
          <Text style={secondStyle.summarySubtitle}>Sorted by {filters.find(f => f.key === activeFilter)?.label}</Text>
        </View>
        <View style={secondStyle.summaryStats}>
          <View style={secondStyle.statItem}>
            <Text style={secondStyle.statValue}>
              {
                products.reduce((sum, item) => {
                  const value = Number(item[activeFilter]) || 0; // safely handle null/undefined
                  console.log(sum, '+', value);
                  return sum + value;
                }, 0)
              }
              {/* {products.map((sum, item) =>  console.log(sum, '+', item[activeFilter]), 0)} */}
            </Text>
            <Text style={secondStyle.statLabel}>Total</Text>
          </View>
          <View style={secondStyle.statItem}>
            <Text style={secondStyle.statValue}>
              {Math.max(...products.map(item => item[activeFilter]))}
            </Text>
            <Text style={secondStyle.statLabel}>Highest</Text>
          </View>
          <View style={secondStyle.statItem}>
            <Text style={secondStyle.statValue}>
              {
                products.reduce((sum, item) => {
                  const value = Number(item[activeFilter]) || 0; // safely handle null/undefined
                  console.log(sum, '+', value);
                  return ((sum + value)/products.length).toFixed(7);
                }, 0)
              }
            </Text>
            <Text style={secondStyle.statLabel}>Average</Text>
          </View>
        </View>
      </View>

      {/* List Header */}
      <View style={secondStyle.listHeader}>
        <Text style={secondStyle.listTitle}>Product Performance</Text>
        <Text style={secondStyle.listCount}>{products.length} products</Text>
      </View>

      {/* List */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={secondStyle.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Shop Views Chart */}
      {/* <View style={style.section}>
        <Text style={style.sectionTitle}>Shop Views Trend</Text>
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
      </View> */}

      {/* Revenue Chart */}
      {/* <View style={styles.section}>
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
      </View> */}

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
          hasLegend={plan !== 'premium' ? false : true}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
        {plan !== 'premium' && 

          <TouchableOpacity style={styles.sectionHeader} onPress={() => {
            dispatch(set_sub_modal(1))
          }}>
            <View style={styles.premiumSectionHeader}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={[styles.listTitle, {textAlign: 'center', fontWeight: 'bold'}]}>Upgrade To Premium Access Pie Chart Data</Text>

                <View style={styles.premiumBadge}>
                  <Ionicons name="medal" size={14} color="#FFD700" />
                  <Text style={styles.premiumText}>PREMIUM</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        }

      </View>

      {/* Top Performing Products */}
      <View style={styles.section}>
        {/* <Text style={styles.sectionTitle}>Top Performing Products</Text> */}
        <Text style={styles.sectionTitle}>Product Performance Metrics</Text>
        {products.map((product, index) => (
          <View key={index} style={styles.productItem}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.title}</Text>
              <Text style={styles.productStats}>
                {product.views} views • <Text style={[plan !== 'premium' && styles.blur]}>{(product?.contact_click/product?.views)*100} conversions</Text>
              </Text>
            </View>
            <View style={styles.conversionRate}>
              <Text style={[styles.conversionText, plan !== 'premium' && styles.blur]}>
                {(((product?.contact_click/product?.views)*100 / (product.views * 100))).toFixed(1)}%
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
  emptyState: {
    height: '100%',
    backgroundColor: '#FFF',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  premiumSectionHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 8,
    marginTop: 7,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D4AF37',
    marginLeft: 4,
    textTransform: 'uppercase',
    },
  premiumIndicator: {
    position: 'relative',
    padding: 4,
  },
  premiumTooltip: {
    position: 'absolute',
    top: -30,
    left: -40,
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    width: 100,
  },
  tooltipText: {
    color: '#FFF',
    fontSize: 10,
    textAlign: 'center',
  },
  premiumGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  blur:{
    color: "transparent", 
    textShadowColor: "rgba(0, 0, 0, 0.5)", 
    textShadowOffset: { width: 0, height: 0 }, 
    textShadowRadius: 15 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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


const secondStyle = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  filterIcon: {
    padding: 4,
  },
  filterRow: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    height: 75,
    marginBottom: 5
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: '#fff',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeFilter: {
    backgroundColor: "#FF4500",
    borderColor: "#FF4500",
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: "#64748B",
    marginLeft: 6,
  },
  activeFilterText: {
    color: "#fff",
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    marginHorizontal: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  listCount: {
    fontSize: 14,
    color: '#64748B',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 4,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  firstCard: {
    marginTop: 0,
  },
  lastCard: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: '#1E293B',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FF4500",
    marginLeft: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4500',
    borderRadius: 3,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
});


export default AnalyticsScreen;