import { useNavigation } from '@react-navigation/native';
import js_ago from 'js-ago';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { get_saved_list, save_prod, unsave_prod } from '../../utils/Saver';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width;

const Lodges = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState({});
  const [wishlistedItems, setWishlistedItems] = useState({});
  const { user } = useSelector(s => s?.user);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    console.log(data.length)
    setLoading(false)
  }, [data])

  const fetchFavourites = async () => {
    try {
      const result = await get_saved_list({
        user_id: user?.user_id
      });
      if (result?.success) {
        setFavList(result?.data || []);
        // Create a map of wishlisted product IDs for quick lookup
        const wishlistMap = {};
        result?.data?.forEach(item => {
          if (item?.order?.product_id) {
            wishlistMap[item.order.product_id] = true;
          }
        });
        setWishlistedItems(wishlistMap);
      } else {
        setFavList([]);
        setWishlistedItems({});
      }
    } catch (error) {
      console.log('Fetch favorites error:', error);
      setFavList([]);
      setWishlistedItems({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavourites();
    }
  }, [user]);

  const handleSave = async (productId) => {
    setFavLoading(prev => ({ ...prev, [productId]: true }));
    
    try {
      if (user) {
        if (!wishlistedItems[productId]) {
          const result = await save_prod({
            user_id: user?.user_id,
            product_id: productId
          });
          if (result?.success) {
            setWishlistedItems(prev => ({ ...prev, [productId]: true }));
          }
        } else {
          const result = await unsave_prod({
            user_id: user?.user_id,
            product_id: productId
          });
          if (result?.success) {
            setWishlistedItems(prev => {
              const newState = { ...prev };
              delete newState[productId];
              return newState;
            });
          }
        }
      } else {
        Alert.alert(
          "Login Required",
          "You need to login first to continue.",
          [
            {
              text: "Cancel",
              style: "cancel", // makes it look like cancel
              onPress: () => console.log("User canceled"),
            },
            {
              text: "Login",
              onPress: () => {
                // navigate to login screen
                console.log("Redirecting to login...");
                dispatch(setUserAuthTo(true))
                // e.g. navigation.navigate("Login");
              },
            },
          ],
          { cancelable: false } // user must choose one option
        );
      }
    } catch (error) {
      console.log('Save/unsave error:', error);
    } finally {
      setFavLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const navigation = useNavigation();

  const renderVideoItem = ({ item }) => {
    const isWishlisted = wishlistedItems[item?.product_id];
    const isLoading = favLoading[item?.product_id];
    const isPromoted = eval(item.promotion) ;

    return (
      <TouchableOpacity 
        style={styles.videoCard}
        onPress={() => navigation.navigate('user-lodge-room', { data: item })}
      >
        <View style={styles.thumbnailContainer}>
          <View style={styles.video_container}> 
            <Video
              source={{ uri: item?.thumbnail_id }}
              style={styles.video}
              resizeMode="cover"
              muted={true}
              // paused
            />
          </View>
          
          {/* Top badges container */}
          <View style={styles.topBadgesContainer}>
            {/* Condition Badge */}
            {item?.others?.cType && (
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{item.others.cType} - {item?.others?.gender} Preferred</Text>
              </View>
            )}
          </View>

          {/* Wishlist Button */}
          <TouchableOpacity 
            style={[styles.wishlistButton, isWishlisted && styles.wishlistButtonActive]}
            onPress={() => handleSave(item?.product_id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={isWishlisted ? "#FFF" : "#FF4500"} />
            ) : (
              <Icon 
                name={isWishlisted ? 'heart' : 'heart-outline'} 
                size={18} 
                color={isWishlisted ? '#FFF' : '#000'} 
              />
            )}
          </TouchableOpacity>
          {isPromoted && (
            <View style={styles.boostBadge}>
              <Icon name="rocket" size={12} color="#FFF" />
              <Text style={styles.boostBadgeText}>  Boosted</Text>
            </View>
          )} 
        </View>
        
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>{item?.title}</Text>
          
          {/* Price added here */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₦{new Intl.NumberFormat('en-US').format(item.price)} to pay ₦{new Intl.NumberFormat('en-US').format(item?.others?.lodge_data?.upfront_pay)}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Icon name="location" size={16} color="#FF4500" />
            <Text style={styles.location}>{item.campus} - {item?.others?.lodge_data?.address1}, {item?.others?.lodge_data?.address2}</Text>
          </View>

          <Text style={styles.videoStats}>{item?.views} {parseInt(item?.views) > 1 ? 'views' : 'view'} • {js_ago(new Date(item?.date))}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="search-outline" size={48} color="#DFE3E8" />
        <Text style={styles.emptyTitle}>Loading Accomodation</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting your filter or location
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id || item.product_id || Math.random().toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="search-outline" size={48} color="#DFE3E8" />
            <Text style={styles.emptyTitle}>No Accomodation found</Text>
            <Text style={styles.emptySubtitle}>
              Try refreshing and also adjust your filter or location
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 3,
    borderRadius: 0,
    gap: 4,
  },
  boostBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  topBadgesContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 4,
  },
  tagBadge: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tagText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  video_container: {
    height: 200,
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  video: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 8,
  },
  videoCard: {
    width: '100%',
    marginBottom: 16,
    position: 'relative',

  },
  thumbnailContainer: {
    position: 'relative',
    marginBottom: 8,
    height: 200,
  },
  videoInfo: {
    paddingHorizontal: 4,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#0f0f0f',
  },
  priceContainer: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#212B36',
  },
  videoStats: {
    fontSize: 12,
    color: '#606060',
  },
});

export default Lodges;