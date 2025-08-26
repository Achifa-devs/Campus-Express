import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';
import { get_saved_list, save_prod, unsave_prod } from '../../utils/Saver';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 2; // Better spacing between cards

const ItemCard = React.memo(({ item, onPress }) => {
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const { user } = useSelector(s => s?.user)
  const [Fav, setFav] = useState([])

  const fetchFavourites = async() => {
    try {
      const result = await get_saved_list({
        user_id: user?.user_id
      })
      if (result?.success) {
        setFav(result?.data)
      } else {
        setFav([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  useEffect(() => {
    setFavLoading(true);
    if (Fav.length > 0) {  
      let isSaved = Fav.filter(data => data?.order?.product_id === item?.product_id);
      if (isSaved.length > 0) {  
        setWishlisted(true) 
        setFavLoading(false);
      } else { 
        setWishlisted(false)
        setFavLoading(false);
      }
    }
  }, [Fav])

  const handleSave = async() => {
    setFavLoading(true);
    if (!wishlisted) {
      const result = await save_prod({
        user_id: user?.user_id,
        product_id: item?.product_id
      })
      if (result?.success) {
        setWishlisted(true)
        setFavLoading(false);
      } else {
        setFavLoading(false);
      }
    } else {
      const result = await unsave_prod({
        user_id: user?.user_id,
        product_id: item?.product_id
      })
      if (result?.success) {
        setWishlisted(false)
        setFavLoading(false);
      } else {
        setFavLoading(false);
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(item.product_id)}
      style={styles.cardContainer}
    >
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <FastImage
          source={{ uri: item.thumbnail_id }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#FF4500" />
          </View>
        )}
        
        {/* Top badges container */}
        <View style={styles.topBadgesContainer}>
          {/* Condition Badge */}
          {item?.others?.condition && (
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>{item.others.condition}</Text>
            </View>
          )}
        </View>
        
        {/* Wishlist Button */}
        <TouchableOpacity 
          style={[styles.wishlistButton, wishlisted && styles.wishlistButtonActive]}
          onPress={handleSave}
        >
          {favLoading ? (
            <ActivityIndicator size="small" color={wishlisted ? "#FFF" : "#FF4500"} />
          ) : (
            <Icon 
              name={wishlisted ? 'heart' : 'heart-outline'} 
              size={18} 
              color={wishlisted ? '#FFF' : '#000'} 
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₦{new Intl.NumberFormat('en-US').format(item?.price)}</Text>
          {item.originalPrice && item.originalPrice > item.price && (
            <Text style={styles.originalPrice}>₦{new Intl.NumberFormat('en-US').format(item.originalPrice)}</Text>
          )}
        </View>
        
        <View style={styles.metaContainer}>
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={12} color="#FF4500" />
            <Text style={styles.locationText} numberOfLines={1}>{item?.campus}</Text>
          </View>

          <View style={styles.viewsContainer}>
            <Icon name="eye-outline" size={12} color="#637381" />
            <Text style={styles.viewsText}>{item?.views || 0}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function Hot({ data, Fav }) {
  const navigation = useNavigation();

  const handleNavigation = useCallback(
    debounce((productId) => {
      navigation.navigate('user-product', { product_id: productId });
    }, 300, { leading: true, trailing: false }),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => <ItemCard item={item} Fav={Fav} onPress={handleNavigation} />,
    [handleNavigation]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.product_id}-${index}`}
        numColumns={2}
        contentContainerStyle={[
          styles.listContent,
          data?.length === 0 && { flex: 1, justifyContent: 'center' }
        ]}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={11}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="search-outline" size={48} color="#DFE3E8" />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your filter or location
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  listContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F4F6F8',
    transform: [{ scale: 1 }],
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.2, // Better aspect ratio
    backgroundColor: '#F8F9FA',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
  },
  topBadgesContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 4,
  },
  conditionBadge: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  conditionText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  wishlistButtonActive: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  detailsContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212B36',
    lineHeight: 20,
    marginBottom: 8,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212B36',
  },
  originalPrice: {
    fontSize: 12,
    color: '#919EAB',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  locationText: {
    fontSize: 11,
    color: '#637381',
    marginLeft: 4,
    flexShrink: 1,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 11,
    color: '#637381',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#212B36',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#637381',
    textAlign: 'center',
  },
});