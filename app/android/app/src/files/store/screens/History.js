import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  RefreshControl,
  Alert
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getData } from '../../utils/AsyncStore.js';

export default function History() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchHistory = useCallback(async () => {
    try {
      setRefreshing(true);
      const result = await getData('history');
      console.log(result)
      if (result) {
        setData(JSON.parse(result));
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load history');
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [fetchHistory])
  );

  const onRefresh = useCallback(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <View style={{ padding: 6, flex: 1 }}>
      <FlatList 
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card data={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No history yet</Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => navigation.navigate('user-home')} // Adjust navigation target as needed
            >
              <Text style={styles.browseButtonText}>Browse Products</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const Card = ({ data }) => {
  let navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('user-product', { product_id: data?.product_id })} 
    >
      <Image 
        source={{ uri: data?.thumbnail_id }} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <View style={styles.details}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.stock}>Stock: {data?.stock}</Text>
        <Text style={styles.price}>₦{data?.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
  },
  details: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#FF4500',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});