import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  SafeAreaView
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const data = [
  { id: "1", name: "Product A", views: 120, impressions: 300, shares: 45, contacts: 15, reviews: 8 },
  { id: "2", name: "Product B", views: 80, impressions: 200, shares: 30, contacts: 10, reviews: 5 },
  { id: "3", name: "Product C", views: 150, impressions: 400, shares: 60, contacts: 20, reviews: 12 },
  { id: "4", name: "Product D", views: 95, impressions: 250, shares: 35, contacts: 12, reviews: 7 },
  { id: "5", name: "Product E", views: 200, impressions: 500, shares: 75, contacts: 25, reviews: 15 },
];

const filters = [
  { key: "views", label: "Views", icon: "eye-outline" },
  { key: "impressions", label: "Impressions", icon: "analytics-outline" },
  { key: "shares", label: "Shares", icon: "share-social-outline" },
  { key: "contacts", label: "Contacts", icon: "chatbubble-ellipses-outline" },
  { key: "reviews", label: "Reviews", icon: "star-outline" },
];

const AnalyticsScreen = () => {
  const [activeFilter, setActiveFilter] = useState("views");

  const getIconForFilter = (filterKey) => {
    const filter = filters.find(f => f.key === filterKey);
    return filter ? filter.icon : "help-outline";
  };

  const renderItem = ({ item, index }) => {
    const value = item[activeFilter];
    let progressPercentage = 0;
    
    // Calculate progress percentage based on the highest value in the dataset
    if (data.length > 0) {
      const maxValue = Math.max(...data.map(i => i[activeFilter]));
      progressPercentage = (value / maxValue) * 100;
    }
    
    return (
      <View style={[
        styles.card,
        index === 0 && styles.firstCard,
        index === data.length - 1 && styles.lastCard
      ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.valueContainer}>
            <Ionicons name={getIconForFilter(activeFilter)} size={16} color="#FF4500" />
            <Text style={styles.valueText}>{value}</Text>
          </View>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Ionicons name="eye-outline" size={14} color="#64748B" />
            <Text style={styles.metricText}>{item.views}</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="analytics-outline" size={14} color="#64748B" />
            <Text style={styles.metricText}>{item.impressions}</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="share-social-outline" size={14} color="#64748B" />
            <Text style={styles.metricText}>{item.shares}</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="chatbubble-ellipses-outline" size={14} color="#64748B" />
            <Text style={styles.metricText}>{item.contacts}</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="star-outline" size={14} color="#64748B" />
            <Text style={styles.metricText}>{item.reviews}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Filter Buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              activeFilter === filter.key && styles.activeFilter,
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
                styles.filterText,
                activeFilter === filter.key && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Performance Summary</Text>
          <Text style={styles.summarySubtitle}>Sorted by {filters.find(f => f.key === activeFilter)?.label}</Text>
        </View>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {data.reduce((sum, item) => sum + item[activeFilter], 0)}
            </Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Math.max(...data.map(item => item[activeFilter]))}
            </Text>
            <Text style={styles.statLabel}>Highest</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Math.round(data.reduce((sum, item) => sum + item[activeFilter], 0) / data.length)}
            </Text>
            <Text style={styles.statLabel}>Average</Text>
          </View>
        </View>
      </View>

      {/* List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Product Performance</Text>
        <Text style={styles.listCount}>{data.length} products</Text>
      </View>

      {/* List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 80,
    marginBottom: 30
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
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
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
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
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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