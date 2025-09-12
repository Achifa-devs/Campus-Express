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
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { set_boost_modal } from '../../../../../../redux/boost_modal';
import { useDispatch, useSelector } from 'react-redux';
import { BlurView } from '@candlefinance/blur-view';

const { width } = Dimensions.get('window');

const AnalyticsScreen = () => {
  const { data } = useRoute()?.params;
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const { shop } = useSelector(s => s.shop);

  let plan = shop.subscription.plan;

  useEffect(() => {
    if(metrics){
      setLoading(false)
    }else{
      setLoading(true)
    }
  }, [metrics])

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={[styles.locationText,  plan !== 'standard' && plan !== 'premium' && styles.blur ]}>{item.campus}</Text>
        </View>
        <Text style={styles.timeText}>{js_ago(new Date(item.created_at))}</Text>
      </View>
      
      <View style={styles.itemBody}>
        <View style={styles.actionBadge}>
          <Text style={[styles.actionText,  plan !== 'premium' &&  plan !== 'standard' && styles.blur ]}>{item.source === 'views' ? "Viewed" : item.source === 'search_appearances' ? "Product searched" : item.source === 'impression' ? "Impression created" : item.source === 'shares' ? "Shared" : "Contact clicked"} by {item.fname} {item.lname}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="mail-outline" size={14} color="#666" />
            <Text style={[styles.detailText,  plan !== 'premium' && styles.blur]}>{item.email}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="call-outline" size={14} color="#666" />
            <Text style={[styles.detailText,  plan !== 'premium' && styles.blur]}>{item.phone}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    async function getMetrics(params) {
      try {
        const response = await axios.get('https://cs-server-olive.vercel.app/boosted-metrics', {params: {product_id: data?.product_id}});
        const result = response.data.data;
        console.log("result: ", result);
        setMetrics(result);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    getMetrics();
  }, []);
  const dispatch = useDispatch()
  

  const handlePromotePress = (data) => {
    console.log(data.promotion)
    if((!data.promotion)){
      dispatch(set_boost_modal({data: data, visible: 1}))
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.loadingText}>Loading your shop...</Text>
      </View>
    );
  }
  

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
          <View style={[styles.summaryCard, { backgroundColor: '#FF4500' }]}>
            <Ionicons name="eye-outline" size={20} color="white" />
            <Text style={styles.summaryNumber}>{metrics.filter(item=> item.source === 'views').length}</Text>
            <Text style={styles.summaryLabel}>Views</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#10B981' }]}>
            <Ionicons name="analytics-outline" size={20} color="white" />
            <Text style={styles.summaryNumber}>{metrics.filter(item=> item.source === 'impression').length}</Text>
            <Text style={styles.summaryLabel}>Impression</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: '#6366F1' }]}>
            <Ionicons name="share-outline" size={20} color="white" />
            <Text style={[styles.summaryNumber, 
              plan === 'free' && styles.blur 
            ]}>{metrics.filter(item=> item.source === 'shares').length}</Text>
            <Text style={styles.summaryLabel}>Shares</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: '#EF4444' }]}>
            <Ionicons name="search-outline" size={20} color="white" />
            <Text style={[styles.summaryNumber,  
              plan === 'free' && styles.blur 
            ]}>{metrics.filter(item=> item.source === 'search_appearances').length}</Text>
            <Text style={styles.summaryLabel}>Search appearances</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#F59E0B' }]}>
            <Ionicons name="call-outline" size={20} color="white" />
            <Text style={[styles.summaryNumber, 
              plan === 'free' && styles.blur 
            ]}>{metrics.filter(item=> item.source === 'contact_clicks').length}</Text>
            <Text style={styles.summaryLabel}>Contacts</Text>
          </View>
          
          
          
          
        </ScrollView>
        
        {/* Analytics List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Activity Log</Text>
          <FlatList
            data={metrics}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity activeOpacity={data.promotion ? .9 : .5}
          style={[styles.promoteButton, data.promotion && styles.promotedButton]}
          onPress={e=>handlePromotePress(data)}
        >
          <Ionicons 
            name={data.promotion ? "rocket" : "rocket-outline"} 
            size={20} 
            color="white" 
            style={styles.buttonIcon}
          />
          <Text style={styles.promoteButtonText}>
            {data.promotion ? 'Promoted' : 'Promote now'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blur:{
    color: "transparent", 
    textShadowColor: "rgba(0, 0, 0, 0.5)", 
    textShadowOffset: { width: 0, height: 0 }, 
    textShadowRadius: 15 
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
    paddingVertical: 16,
  },
  summaryCard: {
    width: width * 0.35,
    borderRadius: 4,
    padding: 12,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 6,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  listContainer: {
    padding: 8,
    marginBottom: 80, // Added margin to prevent content from being hidden behind fixed button
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
  // Fixed Button Styles
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  promoteButton: {
    backgroundColor: '#FF4500',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotedButton: {
    backgroundColor: '#10B981',
  },
  promoteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default AnalyticsScreen;