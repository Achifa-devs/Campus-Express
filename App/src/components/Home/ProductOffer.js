import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import Tools from '../../utils/generalHandler';
import { set_mode } from '../../../redux/info/mode';
import { Favourite, Product } from '../../api';

// Constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 2; // maintain spacing between cards

// -----------------------------------------------------------------------------
// ItemCard Component
// -----------------------------------------------------------------------------
const ItemCard = React.memo(({ item, onPress }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s?.user);

  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Fetch user's saved list
  const fetchFavorites = async () => {
    try {
      const result = await Favourite.getFavourites(user?.user_id );
      setFavorites(result?.success ? result.data : []);
    } catch (error) {
      console.log('Error fetching favorites:', error);
      setFavorites([]);
    }
  };

  useEffect(() => {
    if (user?.user_id) fetchFavorites();
  }, [user?.user_id]);

  useFocusEffect(
    useCallback(() => {
      if (user?.user_id) fetchFavorites();
    }, [user?.user_id])
  );

  // Update wishlist state based on fetched favorites
  useEffect(() => {
    
    if (!favorites?.length) {
      setWishlisted(false);
      setWishlistLoading(false);
      
      return;
    }
    const isSaved = favorites.some((f) => f?.order?.product_id === item?.product_id);
    setWishlistLoading(false);
    setWishlisted(isSaved);
  }, [favorites, item?.product_id]);

  // Save or unsave product
  const handleSave = async () => {
    if (!user) {
      return Alert.alert(
        'Login Required',
        'You need to login first to continue.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Login',
            onPress: () => dispatch(set_mode('auth')),
          },
        ],
        { cancelable: false }
      );
    }

    setWishlistLoading(true);

    try {
      const result = wishlisted
        ? await Favourite.deleteFavourite({ user_id: user.user_id, product_id: item?.product_id })
        : await Favourite.createFavourite({ user_id: user.user_id, product_id: item?.product_id });

      if (result?.success) setWishlisted(!wishlisted);
    } catch (error) {
      console.log('Wishlist error:', error);
    } finally {
      setWishlistLoading(false);
    }

  };

  const isPromoted = !!eval(item?.promotion); // ⚠️ Consider replacing eval for security

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

        {/* stage 2 or 3 */}
        {/* {isPromoted && (
          <View style={styles.boostBadge}>
            <Icon name="rocket" size={12} color="#FFF" />
            <Text style={styles.boostBadgeText}> Boosted</Text>
          </View>
        )} */}

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#FF4500" />
          </View>
        )}

        {/* Condition Badge */}
        {item?.others?.condition && (
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{item.others.condition}</Text>
          </View>
        )}
 
        {/* Wishlist Button */}
        <TouchableOpacity
          style={[styles.wishlistButton, wishlisted && styles.wishlistButtonActive]}
          onPress={handleSave}
        >
          {wishlistLoading ? (
            <ActivityIndicator size="small" color={wishlisted ? '#FFF' : '#FF4500'} />
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
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₦{new Intl.NumberFormat('en-US').format(item?.price)}</Text>
          {item.originalPrice && item.originalPrice > item.price && (
            <Text style={styles.originalPrice}>
              ₦{new Intl.NumberFormat('en-US').format(item.originalPrice)}
            </Text>
          )}
        </View>

        <View style={styles.metaContainer}>
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={12} color="#FF4500" />
            <Text style={styles.locationText} numberOfLines={1}>
              {item?.campus}
            </Text>
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

// -----------------------------------------------------------------------------
// Hot Component
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Hot Component
// -----------------------------------------------------------------------------
export default function ProductOffer({ data, loading }) {
  const navigation = useNavigation();
  const { user } = useSelector((s) => s?.user);
  const [deviceId, setDeviceId] = useState('');

 
  // Assign guest device ID if no user
  useEffect(() => {
    if (!user?.user_id) {
      Tools.getDeviceId()
        .then((res) => setDeviceId(res))
        .catch((err) => console.log('Device ID error:', err));
    }
  }, [user?.user_id]);

  // Navigation with debounce
  const handleNavigation = useCallback(
    debounce(
      (item) => navigation.navigate('product', { data: item }),
      300,
      { leading: true, trailing: false }
    ),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => <ItemCard item={item} onPress={(id) => handleNavigation(item)} />,
    [handleNavigation]
  );

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      viewableItems.forEach((v) => {
        Product.createImpression({
          product_id: v.item?.product_id,
          user_id: user?.user_id || deviceId,
        });
      });
    },
    [user?.user_id, deviceId]
  );

  /** Loading State */
  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.emptyTitle}>Loading Offers...</Text>
        <Text style={styles.emptySubtitle}>Please wait while we fetch products</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.product_id}-${index}`}
        numColumns={2}
        contentContainerStyle={[
          styles.listContent,
          data?.length === 0 && { flex: 1, justifyContent: 'center' },
        ]}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        windowSize={11}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="search-outline" size={48} color="#DFE3E8" />
            <Text style={styles.emptyTitle}>No Products Found</Text>
            <Text style={styles.emptySubtitle}>
              Try refreshing or adjust your filter/location
            </Text>
          </View>
        )}
      />
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  boostBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  boostBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  promoteButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 30,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 0,
    gap: 4,
  },
  promoteButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
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