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
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { get_saved_list } from '../utils/Saver';
import { useSelector } from 'react-redux';

export default function Favourite() {
  const { user } = useSelector(s => s?.user);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = useCallback(async () => {
    try {
      setRefreshing(true);
      const result = await get_saved_list({
        user_id: user?.user_id
      });
      if (result?.success) {
        setData(result?.data);
      } else {
        setData([]);
        Alert.alert('Error', 'Failed to load favorites');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while loading favorites');
    } finally {
      setRefreshing(false);
    }
  }, [user?.user_id]);

  // Initial load
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  const onRefresh = useCallback(() => {
    fetchFavorites();
  }, [fetchFavorites]);

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
            <Text style={styles.emptyText}>No favorites yet</Text>
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
      onPress={() => {
        navigation.navigate('user-product', { product_id: data?.product?.product_id })

        
      }} 
    >
      <Image 
        source={{ uri: data?.product?.thumbnail_id }} 
        style={styles.image} 
        resizeMode="cover"  
      />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>{data?.product?.title}</Text>
        <Text style={styles.stock}>Stock: {data?.product?.stock}</Text>
        <Text style={styles.price}>₦{new Intl.NumberFormat('en-US').format(data?.product?.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 6,
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
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});