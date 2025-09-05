import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  RefreshControl,
  Alert,
  Animated
} from 'react-native';
import categoriesData from '../../../../../../services.json'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { get_saved_list } from '../utils/Saver';
import { useSelector } from 'react-redux';
import Video from 'react-native-video';

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
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss after 5 seconds if onDismiss is provided
    
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss && onDismiss();
    });
  };

  const handleUndo = () => {
    onUndo && onUndo();
    handleDismiss();
  };

  const slideInterpolation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideInterpolation }],
  };

  const getCategoryImage = (categoryName) => {
    console.log(categoriesData)
    for (let cat of categoriesData.items.category) {
      const keys = Object.keys(cat).filter(k => k !== "img"); // exclude "img"
      for (let key of keys) {
        if (key === categoryName) {
          return cat.img; // return the image if category matches
        }
      }
    }
    return null; // fallback if not found
  };
  return (
    <>
    {
      data?.product?.product_id?
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('user-product', { product_id: data?.product_id })} 
      >
         {data?.product?.purpose !== 'accomodation' ? (
          <Image 
            style={styles.adImage}
            source={{ uri: getCategoryImage(data?.product?.category) || data?.product?.thumbnail_id }} 
          />
        ) : (
          <View style={{
            height: 100,          // ✅ explicit height (same as Image for consistency)
            width: 100,
            backgroundColor: '#000',
            // borderRadius: 5,
            overflow: 'hidden', 
          
          }}>
            <Video
              source={{ uri: data?.product?.thumbnail_id }}
              style={styles.adImage}
              resizeMode="cover"
              muted={true}
              paused
            />
          </View>
        )}
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>{data?.product?.title}</Text>
          { <Text style={styles.stock}>{data?.product?.others?.cType}</Text> }
          <Text style={styles.price}>
            {
              data?.product?.purpose === 'product'
              ?
              '₦' + new Intl.NumberFormat('en-us').format(data?.product?.price)
              :
              data?.product?.purpose === 'accomodation'
              ?
              '₦' + new Intl.NumberFormat('en-us').format(data?.product?.price) + ' to pay ₦' + new Intl.NumberFormat('en-us').format(data?.product?.others?.lodge_data?.upfront_pay) 
              : 
              '' 
            }
          </Text>
        </View>
      </TouchableOpacity>:
      <Animated.View style={[DeleteStyles.card, animatedStyle]}>
        <View style={DeleteStyles.content}>
          <View style={DeleteStyles.iconContainer}>
            <Text style={DeleteStyles.icon}>🗑️</Text>
          </View>
          
          <View style={DeleteStyles.textContainer}>
            <Text style={DeleteStyles.title}>Product Deleted</Text>
            <Text style={DeleteStyles.productName}>Null</Text>
            
          </View>

          {/* <View style={DeleteStyles.actions}>
            
            <TouchableOpacity  style={DeleteStyles.dismissButton}>
              <Text style={DeleteStyles.dismissText}>×</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </Animated.View>
    }
    </>
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
  adImage: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
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



const DeleteStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 4,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#ff3b30',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
    backgroundColor: '#ffebee',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  productName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  undoButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  undoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  dismissButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  }
})