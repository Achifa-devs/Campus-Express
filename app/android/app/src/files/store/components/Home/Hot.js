import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 25) / 2; // 16px padding on each side + 16px gap between cards

const ItemCard = React.memo(({ item, onPress }) => {
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);

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
            <ActivityIndicator size="small" color="#5C6AC4" />
          </View>
        )}
        
        {/* Wishlist Button */}
        <TouchableOpacity 
          style={styles.wishlistButton}
          onPress={() => setWishlisted(!wishlisted)}
        >
          <Icon 
            name={wishlisted ? 'heart' : 'heart-outline'} 
            size={20} 
            color={wishlisted ? '#FF5A5F' : '#FFF'} 
          />
        </TouchableOpacity>
        
        {/* Condition Badge */}
        {item?.others?.condition && (
          <View style={styles.conditionBadge}>
            <Text style={styles.conditionText}>{item.others.condition}</Text>
          </View>
        )}
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₦{new Intl.NumberFormat('en-US').format(item?.price)}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>₦{new Intl.NumberFormat('en-US').format(item.originalPrice)}</Text>
          )}
        </View>
        
        <View style={styles.metaContainer}>
          {/* <View style={styles.ratingContainer}>
            <Icon name="star" size={12} color="#FFC107" />
            <Text style={styles.ratingText}>4.8</Text>
          </View> */}
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={12} color="#919EAB" />
            <Text style={styles.locationText}>{item?.campus}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function Hot({ data }) {
  const navigation = useNavigation();

  const handleNavigation = useCallback(
    debounce((productId) => {
      navigation.navigate('user-product', { product_id: productId });
    }, 300, { leading: true, trailing: false }),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => <ItemCard item={item} onPress={handleNavigation} />,
    [handleNavigation]
  );

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Products</Text>
        {/* <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity> */}
      </View>

      {/* Product Grid */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.product_id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={11}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: -4,
    paddingHorizontal: 6,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    // backgroundColor: '#FFF',
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212B36',
    fontFamily: 'System', // Use your custom font if available
  },
  seeAll: {
    fontSize: 14,
    color: '#FF4500',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#919EAB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F4F6F8',
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.25, // 5:4 aspect ratio
    backgroundColor: '#F4F6F8',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 246, 248, 0.8)',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conditionBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  conditionText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  detailsContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212B36',
    lineHeight: 20,
    height: 40, // Fixed height for 2 lines
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212B36',
  },
  originalPrice: {
    fontSize: 12,
    color: '#919EAB',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#212B36',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#919EAB',
    marginLeft: 4,
  },
});