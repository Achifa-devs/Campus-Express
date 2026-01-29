import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

// import { set_mode } from '../../../redux/info/mode';
// import { Favourite, Product } from '../../api';
import tools from '../../utils/tools';

const VIEWABILITY_THRESHOLD = 50;

/**
 * Lodge / accommodation listing component.
 * Renders a list of lodge cards with video thumbnails, wishlist, and impression tracking.
 */
const AccomodationOffer = ({ data = [], loading }) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.user);

  const [saveStateByProductId, setSaveStateByProductId] = useState({});
  const [savedProductIds, setSavedProductIds] = useState({});
  const [guestDeviceId, setGuestDeviceId] = useState('');

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: VIEWABILITY_THRESHOLD,
  }).current;

  const effectiveUserId = currentUser?.user_id || guestDeviceId;

  useEffect(() => {
    if (currentUser?.user_id) return;
    tools.getDeviceId()
      .then((id) => setGuestDeviceId(id))
      .catch((err) => console.warn('Device ID error:', err));
  }, [currentUser?.user_id]);

  const loadSavedIds = useCallback(async () => {
    if (!currentUser?.user_id) {
      setSaveStateByProductId({});
      return;
    }
    // try {
    //   const res = await Favourite.getFavourites(currentUser.user_id);
    //   const list = res?.success ? res?.data || [] : [];
    //   const map = list.reduce((acc, entry) => {
    //     const pid = entry?.order?.product_id;
    //     if (pid) acc[pid] = true;
    //     return acc;
    //   }, {});
    //   setSavedProductIds(map);
    // } catch (e) {
    //   console.error('Favourites load error:', e);
    //   setSavedProductIds({});
    // }
  }, [currentUser?.user_id]);

  useEffect(() => {
    loadSavedIds();
  }, [loadSavedIds]);

  const handleViewableChange = useCallback(
    ({ viewableItems }) => {
      viewableItems.forEach(({ item }) => {
        const pid = item?.product_id;
        if (pid) {
        //   Product.createImpression({
        //     product_id: pid,
        //     user_id: effectiveUserId,
        //   });
        }
      });
    },
    [effectiveUserId]
  );

  const toggleSave = useCallback(
    async (productId) => {
      setSaveStateByProductId((prev) => ({ ...prev, [productId]: true }));

      try {
        if (!currentUser) {
        //   Alert.alert(
        //     'Login Required',
        //     'You need to login first to continue.',
        //     [
        //       { text: 'Cancel', style: 'cancel' },
        //       { text: 'Login', onPress: () => dispatch(set_mode('auth')) },
        //     ],
        //     { cancelable: false }
        //   );
        //   return;
        }

        const isSaved = !!savedProductIds[productId];

        // if (!isSaved) {
        //   const res = await Favourite.createFavourite({
        //     user_id: currentUser.user_id,
        //     product_id: productId,
        //   });
        //   if (res?.success) {
        //     setSavedProductIds((prev) => ({ ...prev, [productId]: true }));
        //   }
        // } else {
        //   const res = await Favourite.deleteFavourite({
        //     user_id: currentUser.user_id,
        //     product_id: productId,
        //   });
        //   if (res?.success) {
        //     setSavedProductIds((prev) => {
        //       const next = { ...prev };
        //       delete next[productId];
        //       return next;
        //     });
        //   }
        // }
      } catch (e) {
        console.error('Save/unsave error:', e);
      } finally {
        setSaveStateByProductId((prev) => ({ ...prev, [productId]: false }));
      }
    },
    [currentUser, savedProductIds, dispatch]
  );

  const getItemKey = useCallback((item) => {
    return String(item?.product_id ?? item?.id ?? Math.random());
  }, []);

  const renderRow = useCallback(
    ({ item }) => {
      const pid = item?.product_id ?? item?.id;
      const isSaved = !!savedProductIds[pid];
      const saveBusy = !!saveStateByProductId[pid];
      const cType = item?.others?.cType;
      const genderPref = item?.others?.gender;
      const lodgeData = item?.others?.lodge_data || {};
      const address1 = lodgeData.address1 || '';
      const address2 = lodgeData.address2 || '';
      const upfrontPay = lodgeData.upfront_pay;

      return (
        <TouchableOpacity
          style={s.card}
          onPress={() => nav.navigate('lodge-room', { data: item })}
          activeOpacity={0.9}
        >
          <View style={s.mediaWrap}>
            <Video
              source={{ uri: item?.thumbnail_id }}
              style={s.media}
              resizeMode="cover"
              muted
              paused={true}
              repeat={false}
              ignoreSilentSwitch="ignore"
            />

            {cType && (
              <View style={s.typePill}>
                <Text style={s.typePillText}>
                  {cType} - {genderPref} Preferred
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[s.saveBtn, isSaved && s.saveBtnOn]}
              onPress={() => toggleSave(pid)}
              disabled={saveBusy}
            >
              {saveBusy ? (
                <ActivityIndicator
                  size="small"
                  color={isSaved ? '#FFF' : '#FFA500'}
                />
              ) : (
                <MaterialIcons
                  name={isSaved ? 'favorite' : 'favorite-border'}
                  size={18}
                  color={isSaved ? '#FFF' : '#000'}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={s.meta}>
            <Text style={s.metaTitle} numberOfLines={2}>
              {item?.title}
            </Text>

            <Text style={s.metaPrice}>
              ₦{new Intl.NumberFormat('en-US').format(item.price)} • Pay ₦
              {new Intl.NumberFormat('en-US').format(upfrontPay)}
            </Text>

            <View style={s.metaLocation}>
              <MaterialIcons name="location-on" size={16} color="#FFA500" />
              <Text style={s.metaLocationText} numberOfLines={1}>
                {item?.campus} - {address1}, {address2}
              </Text>
            </View>

            <Text style={s.metaStats} />
          </View>
        </TouchableOpacity>
      );
    },
    [nav, savedProductIds, saveStateByProductId, toggleSave]
  );

  const EmptyBlock = () => (
    <View style={s.emptyBlock}>
      <MaterialIcons name="search" size={48} color="#DFE3E8" />
      <Text style={s.emptyTitle}>No Accommodation Found</Text>
      <Text style={s.emptySubtitle}>
        Try refreshing or adjusting your filters
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={s.loadingBlock}>
        <ActivityIndicator size="large" color="#FFA500" />
        <Text style={s.loadingTitle}>Loading Offers...</Text>
        <Text style={s.loadingSubtitle}>
          Please wait while we fetch products
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={s.root}>
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={getItemKey}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.list}
        onViewableItemsChanged={handleViewableChange}
        viewabilityConfig={viewabilityConfig}
        ListEmptyComponent={EmptyBlock}
      />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  list: {
    padding: 8,
  },
  card: {
    marginBottom: 16,
  },
  mediaWrap: {
    position: 'relative',
    height: 200,
    marginBottom: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  media: {
    height: '100%',
    width: '100%',
  },
  typePill: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFA500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
  },
  typePillText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  saveBtn: {
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
  saveBtnOn: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  meta: {
    paddingHorizontal: 4,
  },
  metaTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#0f0f0f',
  },
  metaPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    color: '#212B36',
  },
  metaLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaLocationText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    flexShrink: 1,
  },
  metaStats: {
    fontSize: 12,
    color: '#606060',
  },
  emptyBlock: {
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
  loadingBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#212B36',
    textAlign: 'center',
  },
  loadingSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#637381',
    textAlign: 'center',
  },
});

export default AccomodationOffer;
