import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

// Constants for better maintainability
const STAT_CARDS = [
  { id: 'earnings', name: 'Earning This Month', value: 0, isCurrency: true },
  { id: 'cleared', name: 'Cleared Orders', value: 0 },
  { id: 'active', name: 'Active Orders', value: 0 },
  { id: 'cancelled', name: 'Cancelled Orders', value: 0 },
  { id: 'reports', name: 'Total Reports', value: 0 },
  { id: 'reviews', name: 'Total Reviews', value: 0 }
];

const API_URL = 'http://192.168.209.146:9090/vendor/report';

export default function Performance({ user_id }) {
  const { colors } = useTheme();
  const [stats, setStats] = useState(STAT_CARDS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user_id) return;

    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}?user_id=${user_id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data) {
          processApiData(data);
        }
      } catch (error) {
        console.error('Failed to fetch performance data:', error);
        setError('Failed to load performance data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const processApiData = (data) => {
      const { orders = [], reviews = [], reports = [], earnings = [] } = data;
      
      // Process orders data
      const orderStats = orders.reduce((acc, item) => {
        if (item?.status?.state === 'completed') acc.cleared++;
        else if (item?.status?.state === 'pending' && item?.havepaid) acc.active++;
        else if (item?.status?.state === 'cancelled') acc.cancelled++;
        return acc;
      }, { cleared: 0, active: 0, cancelled: 0 });

      // Update stats
      setStats(prevStats => prevStats.map(item => {
        switch (item.id) {
          case 'earnings':
            return { ...item, value: earnings[0]?.wallet_balance || 0 };
          case 'cleared':
            return { ...item, value: orderStats.cleared };
          case 'active':
            return { ...item, value: orderStats.active };
          case 'cancelled':
            return { ...item, value: orderStats.cancelled };
          case 'reviews':
            return { ...item, value: reviews.length || 0 };
          case 'reports':
            return { ...item, value: reports.length || 0 };
          default:
            return item;
        }
      }));
    };

    fetchPerformanceData();
  }, [user_id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: colors.notification }]}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Performance Metrics
        </Text>
        
        <View style={styles.statsGrid}>
          {stats.map((item) => (
            <StatCard 
              key={item.id}
              title={item.name}
              value={item.value}
              isCurrency={item.isCurrency}
              isHighlighted={item.id === 'earnings'}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const StatCard = ({ title, value, isCurrency = false, isHighlighted = false }) => {
  const formattedValue = isCurrency 
    ? `₦${new Intl.NumberFormat('en-US').format(value)}` 
    : value;

  return (
    <View style={[styles.statCard, isHighlighted && styles.highlightedCard]}>
      <Text 
        style={[styles.statValue, isHighlighted && styles.highlightedText]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {formattedValue}
      </Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 100,
  },
  highlightedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3fcd32',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  highlightedText: {
    color: '#3fcd32',
  },
  statTitle: {
    fontSize: 13,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});