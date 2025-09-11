import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import js_ago from 'js-ago';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('today');

  const {
    data
  } = useRoute()?.params

  const [metrics, setMetrics] = useState([])

  // Sample analytics data
  const analyticsData = [
    {
      title: 'Today',
      data: [
        {
          id: '1',
          location: 'New York, NY',
          time: '10:30 AM',
          action: 'Product View',
          duration: '2 minutes',
          value: '$149.99',
        },
        {
          id: '2',
          location: 'Los Angeles, CA',
          time: '11:45 AM',
          action: 'Add to Cart',
          duration: '1 minute',
          value: '$79.99',
        },
        {
          id: '3',
          location: 'Chicago, IL',
          time: '1:15 PM',
          action: 'Purchase',
          duration: '5 minutes',
          value: '$249.99',
        },
        {
          id: '4',
          location: 'Miami, FL',
          time: '3:20 PM',
          action: 'Product View',
          duration: '3 minutes',
          value: '$99.99',
        },
        {
          id: '5',
          location: 'Seattle, WA',
          time: '4:45 PM',
          action: 'Add to Cart',
          duration: '2 minutes',
          value: '$199.99',
        },
      ],
    },
    {
      title: 'Yesterday',
      data: [
        {
          id: '6',
          location: 'Boston, MA',
          time: '9:15 AM',
          action: 'Product View',
          duration: '4 minutes',
          value: '$129.99',
        },
        {
          id: '7',
          location: 'Austin, TX',
          time: '11:30 AM',
          action: 'Purchase',
          duration: '3 minutes',
          value: '$89.99',
        },
        {
          id: '8',
          location: 'Denver, CO',
          time: '2:45 PM',
          action: 'Add to Cart',
          duration: '2 minutes',
          value: '$179.99',
        },
      ],
    },
    {
      title: 'This Week',
      data: [
        {
          id: '9',
          location: 'San Francisco, CA',
          time: 'Monday, 10:15 AM',
          action: 'Purchase',
          duration: '6 minutes',
          value: '$299.99',
        },
        {
          id: '10',
          location: 'Portland, OR',
          time: 'Tuesday, 1:30 PM',
          action: 'Product View',
          duration: '3 minutes',
          value: '$69.99',
        },
        {
          id: '11',
          location: 'Phoenix, AZ',
          time: 'Wednesday, 3:45 PM',
          action: 'Add to Cart',
          duration: '2 minutes',
          value: '$159.99',
        },
      ],
    },
  ];

  // Summary statistics
  const summaryData = {
    today: {
      totalViews: 42,
      totalSales: 8,
      conversionRate: '19%',
      totalRevenue: '$1,249.99',
    },
    yesterday: {
      totalViews: 38,
      totalSales: 6,
      conversionRate: '16%',
      totalRevenue: '$899.99',
    },
    week: {
      totalViews: 215,
      totalSales: 32,
      conversionRate: '15%',
      totalRevenue: '$4,599.99',
    },
  };

  const getSummaryData = () => {
    return summaryData[selectedFilter] || summaryData.today;
  };

  const renderFilterButton = (title, value) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === value && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === value && styles.filterButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{item.campus}</Text>
        </View>
        <Text style={styles.timeText}>{js_ago(new Date(item.created_at))}</Text>
      </View>
      
      <View style={styles.itemBody}>
        <View style={styles.actionBadge}>
          <Text style={styles.actionText}>{item.source === 'views' ? "Viewed" : item.source === 'search_appearances' ? "Product searched" : item.source === 'impression' ? "Impressions" : item.source === 'shares' ? "Shared" : "Contact clicked"} by {item.fname}</Text>
        </View>
        
        {/* <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="pricetag-outline" size={14} color="#666" />
            <Text style={styles.detailText}>{item.value}</Text>
          </View>
        </View> */}
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  useEffect(() => {

    async function getMetrics(params) {
      try {
        const response = await axios.get('https://cs-server-olive.vercel.app/boosted-metrics', {params: {product_id: data?.product_id}});

        const result = response.data.data;
        console.log("result: ", result)

        setMetrics(result)
        // result.map(item => {
        //   if(item.source === 'views'){

        //   }else if(item.source === 'impressions'){

        //   }else if(item.source === 'contact_clicks'){

        //   }else if(item.source === 'search_appearances'){

        //   }else if(item.source === 'shares'){

        //   }
        // })

      } catch (error) {
          console.log("error: ", error)
        
      }
    }

    getMetrics()

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView}>
        {/* Summary Cards - Made more compact */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryContainer}
        >
          <View style={[styles.summaryCard, { backgroundColor: '#6366F1' }]}>
            <Ionicons name="eye-outline" size={20} color="white" />
            <Text style={styles.summaryNumber}>{metrics.filter(item=> item.source === 'views').length}</Text>
            <Text style={styles.summaryLabel}>Views</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#10B981' }]}>
            <Ionicons name="analytics-outline" size={20} color="white" />
            <Text style={styles.summaryNumber}>{metrics.filter(item=> item.source === 'impressions').length}</Text>
            <Text style={styles.summaryLabel}>Impression</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#F59E0B' }]}>
            <Ionicons name="call-outline" size={20} color="white" />
            <Text style={styles.summaryNumber}>{metrics.filter(item=> item.source === 'contact_click').length}</Text>
            <Text style={styles.summaryLabel}>Contacts</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#EF4444' }]}>
            <Ionicons name="search-outline" size={20} color="white" />
            <Text style={styles.summaryNumber}>{metrics.filter(item=> item.source === 'search_appearances').length}</Text>
            <Text style={styles.summaryLabel}>Search appearances</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#EF4444' }]}>
            <Ionicons name="share-outline" size={20} color="white" />
            <Text style={styles.summaryNumber}>{metrics.filter(item=> item.source === 'shares').length}</Text>
            <Text style={styles.summaryLabel}>Shares</Text>
          </View>
        </ScrollView>
        
        {/* Filter Options */}
        {/* <View style={styles.filterContainer}>
          {renderFilterButton('Today', 'today')}
          {renderFilterButton('Yesterday', 'yesterday')}
          {renderFilterButton('This Week', 'week')}
        </View> */}
        
        {/* Analytics List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Activity Log</Text>
          <FlatList
            data={metrics}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            // renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false} // Disable internal scrolling
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  summaryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16, // Reduced padding
  },
  summaryCard: {
    width: width * 0.35, // Made cards narrower
    borderRadius: 4,
    padding: 12, // Reduced padding
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryNumber: {
    fontSize: 20, // Slightly smaller font
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 6, // Reduced margin
  },
  summaryLabel: {
    fontSize: 12, // Smaller font
    color: 'white',
    opacity: 0.9,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F1F5F9',
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
  },
  filterButtonText: {
    color: '#64748B',
    fontWeight: '500',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: 'white',
  },
  listContainer: {
    padding: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginLeft: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#64748B',
  },
  itemBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3B82F6',
  },
  detailsContainer: {
    alignItems: 'flex-end',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
});

export default AnalyticsScreen;