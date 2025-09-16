import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import jsAgo from 'js-ago';
import { useSelector, useDispatch } from 'react-redux';

import { get_saved_list, save_prod, unsave_prod } from '../../utils/Saver';
import { set_mode } from '../../../redux/info/mode';
import { Favourite } from '../../api';

const AccomodationOffer = ({ data = [] }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state?.user);

  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState({});
  const [wishlisted, setWishlisted] = useState({});
  const [favList, setFavList] = useState([]);

  /** Fetch user's favourites */
  const fetchFavourites = useCallback(async () => {
    if (!user?.user_id) return;

    try {
      const result = await Favourite.getFavourites(user.user_id);
      if (result?.success) {
        const favs = result.data || [];
        setFavList(favs);

        // Create a lookup map for quick access
        const favMap = favs.reduce((acc, item) => {
          if (item?.order?.product_id) acc[item.order.product_id] = true;
          return acc;
        }, {});
        setWishlisted(favMap);
      } else {
        setFavList([]);
        setWishlisted({});
      }
    } catch (error) {
      console.error('Fetch favourites error:', error);
      setFavList([]);
      setWishlisted({});
    } finally {
      setLoading(false);
    }
  }, [user?.user_id]);

  useEffect(() => {
    if (user) fetchFavourites();
    else setLoading(false);
  }, [user, fetchFavourites]);

  /** Handle save/unsave */
  const handleSave = async productId => {
    setFavLoading(prev => ({ ...prev, [productId]: true }));

    try {
      if (!user) {
        Alert.alert(
          'Login Required',
          'You need to login first to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Login', onPress: () => dispatch(set_mode('auth')) },
          ],
          { cancelable: false }
        );
        return;
      }

      if (!wishlisted[productId]) {
        const result = await Favourite.createFavourite({ user_id: user.user_id, product_id: productId });
        if (result?.success) {
          setWishlisted(prev => ({ ...prev, [productId]: true }));
        }
      } else {
        const result = await Favourite.deleteFavourite({ user_id: user.user_id, product_id: productId });
        if (result?.success) {
          setWishlisted(prev => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
          });
        }
      }
    } catch (error) {
      console.error('Save/unsave error:', error);
    } finally {
      setFavLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  /** Render each lodge item */
  const renderLodgeItem = useCallback(
    ({ item }) => {
      const isWishlisted = wishlisted[item?.product_id];
      const isLoading = favLoading[item?.product_id];
      const isPromoted = item?.promotion === 'true' || item?.promotion === true;

      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('user-lodge-room', { data: item })}
          activeOpacity={0.9}
        >
          {/* Video Thumbnail */}
          <View style={styles.thumbnailWrapper}>
            <Video
              source={{ uri: item?.thumbnail_id }}
              style={styles.video}
              resizeMode="cover"
              muted
            />

            {/* Top Badges */}
            {item?.others?.cType && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {item.others.cType} - {item?.others?.gender} Preferred
                </Text>
              </View>
            )}

            {/* Wishlist Button */}
            <TouchableOpacity
              style={[styles.wishlistBtn, isWishlisted && styles.wishlistBtnActive]}
              onPress={() => handleSave(item?.product_id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={isWishlisted ? '#FFF' : '#FF4500'} />
              ) : (
                <Icon
                  name={isWishlisted ? 'heart' : 'heart-outline'}
                  size={18}
                  color={isWishlisted ? '#FFF' : '#000'}
                />
              )}
            </TouchableOpacity>

            {/* Promotion Badge */}
            {isPromoted && (
              <View style={styles.boostBadge}>
                <Icon name="rocket" size={12} color="#FFF" />
                <Text style={styles.boostText}>Boosted</Text>
              </View>
            )}
          </View>

          {/* Lodge Info */}
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {item?.title}
            </Text>

            <Text style={styles.price}>
              ₦{new Intl.NumberFormat('en-US').format(item.price)} • Pay ₦
              {new Intl.NumberFormat('en-US').format(item?.others?.lodge_data?.upfront_pay)}
            </Text>

            <View style={styles.locationRow}>
              <Icon name="location" size={16} color="#FF4500" />
              <Text style={styles.location} numberOfLines={1}>
                {item?.campus} - {item?.others?.lodge_data?.address1}, {item?.others?.lodge_data?.address2}
              </Text>
            </View>

            <Text style={styles.stats}>
              {item?.views} {parseInt(item?.views) > 1 ? 'views' : 'view'} • {jsAgo(new Date(item?.date))}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [wishlisted, favLoading, handleSave]
  );

  /** Loading State */
  if (loading) {
    return (
      <View style={styles.empty}>
        <Icon name="search-outline" size={48} color="#DFE3E8" />
        <Text style={styles.emptyTitle}>Loading Accommodation</Text>
        <Text style={styles.emptySubtitle}>Try adjusting your filter or location</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderLodgeItem}
        keyExtractor={item => item?.id || item?.product_id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="search-outline" size={48} color="#DFE3E8" />
            <Text style={styles.emptyTitle}>No Accommodation Found</Text>
            <Text style={styles.emptySubtitle}>Try refreshing or adjusting your filters</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 4 },
  list: { padding: 8 },
  card: { marginBottom: 16 },
  thumbnailWrapper: { position: 'relative', height: 200, marginBottom: 8, borderRadius: 6, overflow: 'hidden' },
  video: { height: '100%', width: '100%' },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
  },
  badgeText: { fontSize: 10, color: '#FFF', fontWeight: '700', textTransform: 'uppercase' },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  wishlistBtnActive: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  boostBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 8,
  },
  boostText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  info: { paddingHorizontal: 4 },
  title: { fontSize: 14, fontWeight: '500', marginBottom: 4, color: '#0f0f0f' },
  price: { fontSize: 14, fontWeight: '700', marginBottom: 6, color: '#212B36' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  location: { fontSize: 13, color: '#666', marginLeft: 4, flexShrink: 1 },
  stats: { fontSize: 12, color: '#606060' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60, paddingHorizontal: 20 },
  emptyTitle: { marginTop: 16, fontSize: 16, fontWeight: '600', color: '#212B36', textAlign: 'center' },
  emptySubtitle: { marginTop: 8, fontSize: 14, color: '#637381', textAlign: 'center' },
});

export default AccomodationOffer;
