import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import jsAgo from 'js-ago';
import categoriesData from '../../json/services.json';
import Tools from '../../utils/generalHandler';
import { useSelector } from 'react-redux';
import { Product } from '../../api';

const { width } = Dimensions.get('window');

const ServicesOffer = ({ data = [], loading }) => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [deviceId, setDeviceId] = useState('');
  const { user } = useSelector((state) => state?.user);

  // Show loading until data arrives
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // skip the first run
    }
    setLoading(false);
  }, [data]);


  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  // stable onViewableItemsChanged
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

  // Assign guest device ID if no user
  useEffect(() => {
    if (!user?.user_id) {
      Tools.getDeviceId()
        .then((res) => setDeviceId(res))
        .catch((err) => console.log('Device ID error:', err));
    }
  }, [user?.user_id]);

  /** Get category image from service JSON */
  const getCategoryImage = useCallback((categoryName) => {
    for (let cat of categoriesData.items.category) {
      if (Object.keys(cat).some((key) => key !== 'img' && key === categoryName)) {
        return cat.img;
      }
    }
    return null;
  }, []);

  /** Render a single category item */
  const renderCategoryItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          activeCategory === item.name && styles.activeCategory,
        ]}
        onPress={() => setActiveCategory(item.name)}
      >
        <Icon
          name={item.icon}
          size={24}
          color={activeCategory === item.name ? '#FF4500' : '#666'}
        />
        <Text
          style={[
            styles.categoryText,
            activeCategory === item.name && styles.activeCategoryText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [activeCategory]
  );

  /** Render a single service card */
  const renderServiceItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() => navigation.navigate('service-room', { data: item })}
      >
        <Image
          source={{ uri: getCategoryImage(item.category) || item.image }}
          style={styles.serviceImage}
        />

        {item.promotion && (
          <View style={styles.boostBadge}>
            <Icon name="rocket" size={12} color="#FFF" />
            <Text style={styles.boostBadgeText}>Boosted</Text>
          </View>
        )}

        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={styles.serviceCategory}>
            {item.category} -{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {item?.others?.gender || 'Any'}
            </Text>
          </Text>

          <Text style={styles.serviceStats}>
            {item?.views || 0}{' '}
            {parseInt(item?.views) > 1 ? 'views' : 'view'} •{' '}
            {jsAgo(new Date(item?.date))}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [getCategoryImage, navigation]
  );

  /** Loading State */
  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.emptyTitle}>Loading Services...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Services List */}
        <FlatList
          data={data}
          renderItem={renderServiceItem}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          scrollEnabled={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentContainerStyle={styles.servicesList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="search-outline" size={48} color="#DFE3E8" />
              <Text style={styles.emptyTitle}>No Service Found</Text>
              <Text style={styles.emptySubtitle}>
                Try refreshing or adjusting your filter/location
              </Text>
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};




/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  servicesList: { paddingHorizontal: 16, paddingBottom: 24 },
  serviceCard: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceImage: { width: 100, height: '100%' },
  serviceInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
  serviceName: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 6 },
  serviceCategory: { fontSize: 14, color: '#000', marginBottom: 4 },
  serviceStats: { fontSize: 12, color: '#606060' },
  boostBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  boostBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60, paddingHorizontal: 20 },
  emptyTitle: { marginTop: 16, fontSize: 16, fontWeight: '600', color: '#212B36', textAlign: 'center' },
  emptySubtitle: { marginTop: 8, fontSize: 14, color: '#637381', textAlign: 'center' },
  categoryItem: {
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#f8f8f8',
    minWidth: 80,
  },
  activeCategory: { backgroundColor: '#FFF0E8' },
  categoryText: { marginTop: 4, fontSize: 12, color: '#666', fontWeight: '500' },
  activeCategoryText: { color: '#FF4500', fontWeight: '600' },
});

export default ServicesOffer;
