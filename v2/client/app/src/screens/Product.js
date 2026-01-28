import {
  useNavigation,
  useRoute
} from '@react-navigation/native';
import React, {
  useEffect,
  useState,
  useRef
} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  Linking,
  Platform,
  Share
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Top from '../components/Product/Top.js';
import Mid from '../components/Product/Mid.js';
import Btm from '../components/Product/Btm.js';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { set_user } from '../../redux/info/user.js';
import Tools from '../utils/generalHandler.js';
import { Favourite } from '../api/wishlist.js';
import useLogInAlert from '../utils/useLoginAlert.js';
import useInsufficientConnectAlert from '../utils/useZeroConnectAlert.js';
import { getSocket } from '../services/socket.js';

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

const API_BASE_URL = 'https://cs-node.vercel.app';
const PRODUCT_BASE_URL = 'https://www.campussphere.net/store/product';

const THEME = {
  primary: '#FFA500',
  white: '#FFF',
  black: '#000',
  gray: '#666',
  lightGray: '#EEE',
  lightBackground: '#FFF8F6',
  lightBorder: '#FFE5DE',
  darkText: '#2D3436',
  whatsapp: '#25D366',
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
};

const DIMENSIONS = {
  imageHeight: 350,
  headerTopIOS: 55,
  headerTopAndroid: 35,
  headerLeft: 20,
  carouselBottom: 15,
  carouselRight: 15,
  actionButtonTop: 32,
  actionButtonRight: 15,
  actionButtonSize: 40,
  iconSizes: {
    back: 24,
    heart: 24,
    heartSmall: 20,
    star: 20,
    starSmall: 18,
    shield: 20,
    location: 16,
    search: 16,
    card: 16,
    chat: 18,
    rocket: 12,
  },
};

const TIMING = {
  viewDelay: 3000,
  scrollThrottle: 16,
};

const NAVIGATION_SCREENS = {
  productImages: 'product-images',
  // reviewSubmission: 'review-submission',
  watchline: 'watchline',
};

const SAFETY_TIPS = [
  { icon: 'location', text: 'Meet seller in public places' },
  { icon: 'search', text: 'Check the item before you buy' },
  { icon: 'card', text: 'Pay only after collecting the item' },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Formats phone number for WhatsApp/call
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number with country code
 */
const formatPhoneNumber = (phone) => {
  if (!phone) return null;
  
  let cleaned = phone.replace(/\s+/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  return `234${cleaned}`;
};

/**
 * Creates WhatsApp message with product link
 * @param {string} productId - Product ID
 * @returns {string} Formatted message
 */
const createWhatsAppMessage = (productId) => {
  const productLink = `${PRODUCT_BASE_URL}/${productId}`;
  return `Hello, I am interested in your product on Campus Sphere. ${productLink}`;
};

/**
 * Creates share message with product link
 * @param {string} productId - Product ID
 * @returns {string} Formatted share message
 */
const createShareMessage = (productId) => {
  return `Check out this product on Campus Sphere! ${PRODUCT_BASE_URL}/${productId}`;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Product Detail Screen
 * 
 * Displays comprehensive product information including:
 * - Image gallery with carousel
 * - Product details (title, price, description)
 * - Seller information
 * - Safety tips
 * - Actions: Save, Review, Share, Chat
 * 
 * @component
 */
export default function Product() {
  // ========================================================================
  // HOOKS & STATE
  // ========================================================================
  
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  const { data } = route.params || {};
  const { user } = useSelector(state => state?.user);
  const { is_connected } = useSelector(state => state?.is_connected);
  
  const screenWidth = Dimensions.get('window').width;
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  
  const [socketConnection, setSocketConnection] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isFavouriteLoading, setIsFavouriteLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productReviews, setProductReviews] = useState(null);
  const [shopInfo, setShopInfo] = useState(null);
  
  const showLoginAlert = useLogInAlert();
  const showConnectAlert = useInsufficientConnectAlert();

  // ========================================================================
  // API FUNCTIONS
  // ========================================================================

  /**
   * Records contact click analytics
   */
  const recordContactClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/contact-click`, {
        product_id: data?.product_id,
        user_id: user?.user_id
      });
      return response?.data;
    } catch (error) {
      console.error('Contact click error:', error);
      Alert.alert('Error', 'Please ensure you have stable network.');
      return null;
    }
  };

  /**
   * Deducts a connection from user's account
   */
  const deductUserConnection = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/minus-connect`, {
        user_id: user?.user_id
      });
      
      if (response?.data?.success) {
        dispatch(set_user(response.data.data));
        return response.data.success;
      }
      return false;
    } catch (error) {
      console.error('Connection update error:', error);
      Alert.alert('Error', 'Please ensure you have stable network.');
      return false;
    }
  };

  /**
   * Records product share analytics
   */
  const recordProductShare = async () => {
    const deviceId = await Tools.getDeviceId();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/share`, {
        product_id: data?.product_id,
        user_id: user ? user.user_id : deviceId
      });
      return response?.data;
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Please ensure you have stable network.');
      return null;
    }
  };

  // ========================================================================
  // DATA FETCHING
  // ========================================================================

  /**
   * Fetches product images from server
   */
  useEffect(() => {
    if (!data?.product_id) return;
    
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/image-folder?folderName=${data.product_id}`,
          {
            headers: { 'Content-Type': 'Application/json' }
          }
        );
        const imageData = await response.json();
        setProductImages(imageData);
      } catch (error) {
        console.error('Image fetch error:', error);
        Alert.alert('Network error', 'Please try again.');
      }
    };
    
    fetchImages();
  }, [data?.product_id]);

  /**
   * Checks if product is in user's favourites
   */
  useEffect(() => {
    if (!data?.product_id || !user?.user_id) return;
    
    setIsFavouriteLoading(true);
    
    const checkFavouriteStatus = async () => {
      try {
        const result = await Favourite.getFavourite(user.user_id, data.product_id);
        
        if (result?.success) {
          setIsFavourite(result.data.length > 0);
        } else {
          setIsFavourite(false);
        }
      } catch (error) {
        console.error('Favourite check error:', error);
        setIsFavourite(false);
      } finally {
        setIsFavouriteLoading(false);
      }
    };
    
    checkFavouriteStatus();
  }, [data?.product_id, user?.user_id]);

  /**
   * Records product view after delay
   */
  useEffect(() => {
    if (!data?.product_id || !user?.user_id) return;
    
    const viewTimer = setTimeout(async () => {
      try {
        Tools.createView({
          user_id: user.user_id,
          data: data
        });
      } catch (error) {
        console.error('Product view error:', error);
      }
    }, TIMING.viewDelay);
    
    return () => clearTimeout(viewTimer);
  }, [data, user?.user_id]);

  /**
   * Initializes socket connection
   */
  useEffect(() => {
    if (user) {
      const socket = getSocket();
      setSocketConnection(socket);
    }
  }, [user]);

  /**
   * Re-establishes socket if disconnected
   */
  useEffect(() => {
    if (!socketConnection && is_connected) {
      const socket = getSocket();
      setSocketConnection(socket);
    }
  }, [socketConnection, is_connected]);

  /**
   * Sets loading state based on user availability
   */
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  /**
   * Handles image carousel scroll
   */
  const handleImageScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentImageIndex(index);
  };

  /**
   * Handles favourite/save toggle
   */
  const toggleFavourite = async () => {
    if (!user) {
      showLoginAlert();
      return;
    }

    setIsFavouriteLoading(true);
    
    try {
      if (!isFavourite) {
        // Add to favourites
        const result = await Favourite.createFavourite({
          user_id: user.user_id,
          product_id: data?.product_id
        });
        
        if (result?.success && result?.data?.length > 0) {
          setIsFavourite(true);
        }
      } else {
        // Remove from favourites
        const result = await Favourite.deleteFavourite({
          user_id: user.user_id,
          product_id: data?.product_id
        });
        
        if (result?.success && result?.data?.length > 0) {
          setIsFavourite(false);
        }
      }
    } catch (error) {
      console.error('Favourite toggle error:', error);
    } finally {
      setIsFavouriteLoading(false);
    }
  };

  /**
   * Handles WhatsApp chat initiation
   */
  const initiateWhatsAppChat = async () => {
    if (!user) {
      showLoginAlert();
      return;
    }

    if (user.connects <= 0) {
      showConnectAlert();
      return;
    }

    const analyticsResult = await recordContactClick();
    if (!analyticsResult) {
      setIsLoading(false);
      Alert.alert('Error', 'Please ensure you have stable network and try again.');
      return;
    }

    const connectionResult = await deductUserConnection();
    if (!connectionResult) {
      setIsLoading(false);
      Alert.alert('Error', 'Please ensure you have stable network and try again.');
      return;
    }

    setIsLoading(false);

    if (!sellerInfo?.phone) {
      Alert.alert('Error', 'Seller phone number is missing.');
      return;
    }

    const formattedPhone = formatPhoneNumber(sellerInfo.phone);
    const message = createWhatsAppMessage(data?.product_id);
    
    const whatsappURL = `whatsapp://send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
    const fallbackURL = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappURL);
      if (canOpen) {
        await Linking.openURL(whatsappURL);
      } else {
        await Linking.openURL(fallbackURL);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open WhatsApp.');
    }
  };

  /**
   * Handles phone call initiation
   */
  const initiatePhoneCall = async () => {
    if (!user) {
      showLoginAlert();
      return;
    }

    if (user.connects <= 0) {
      showConnectAlert();
      return;
    }

    const analyticsResult = await recordContactClick();
    if (!analyticsResult) {
      setIsLoading(false);
      Alert.alert('Error', 'Please ensure you have stable network and try again.');
      return;
    }

    const connectionResult = await deductUserConnection();
    if (!connectionResult) {
      setIsLoading(false);
      Alert.alert('Error', 'Please ensure you have stable network and try again.');
      return;
    }

    setIsLoading(false);

    if (!sellerInfo?.phone) {
      Alert.alert('Error', 'Seller phone number is missing.');
      return;
    }

    const callURL = `tel:+234${sellerInfo.phone}`;
    try {
      await Linking.openURL(callURL);
    } catch (error) {
      Alert.alert('Error', 'Unable to make phone call.');
    }
  };

  /**
   * Handles review submission navigation
   */
  const navigateToReview = () => {
    if (!user) {
      showLoginAlert();
      return;
    }

    if (!productReviews) {
      Alert.alert('Loading reviews...');
      return;
    }

    const userHasReviewed = productReviews.some(
      review => review?.buyer_id === user.user_id && review?.product_id === data?.product_id
    );

    if (userHasReviewed) {
      Alert.alert('You already published a review for this product');
      return;
    }

    navigation.navigate(NAVIGATION_SCREENS.reviewSubmission, {
      product: data,
      seller: sellerInfo,
      shop: shopInfo
    });
  };

  /**
   * Handles product sharing
   */
  const shareProduct = async () => {
    const shareResult = await recordProductShare();
    
    if (!shareResult) {
      setIsLoading(false);
      Alert.alert('Error', 'Please ensure you have stable network and try again.');
      return;
    }

    setIsLoading(false);

    try {
      await Share.share({
        message: createShareMessage(data?.product_id),
        title: data?.title,
      });
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Please ensure you have stable network and try again.');
    }
  };

  /**
   * Handles navigation to image gallery
   */
  const openImageGallery = () => {
    navigation.navigate(NAVIGATION_SCREENS.productImages, {
      files: displayImages,
      index: currentImageIndex,
    });
  };

  /**
   * Handles navigation to vendor chat
   */
  const navigateToVendorChat = () => {
    navigation.navigate(NAVIGATION_SCREENS.watchline, {
      data: data
    });
  };

  // ========================================================================
  // CALLBACK FUNCTIONS FOR CHILD COMPONENTS
  // ========================================================================

  const handleSellerUpdate = (sellerData) => {
    setSellerInfo(sellerData);
  };

  const handleReviewUpdate = (reviewData) => {
    setProductReviews(reviewData);
  };

  const handleShopUpdate = (shopData) => {
    setShopInfo(shopData);
  };

  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  const displayImages = productImages.length > 0 
    ? productImages 
    : [data?.thumbnail_id].filter(Boolean);

  const isProductPromoted = Boolean(data?.promotion);

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={THEME.primary} />
        </View>
      )}

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Ionicons 
            name="arrow-back" 
            size={DIMENSIONS.iconSizes.back} 
            color={THEME.white} 
          />
        </TouchableOpacity>
      </View>

      {/* Main Content Scroll */}
      <Animated.ScrollView
        style={{ opacity: fadeAnimation }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Gallery Section */}
        <View style={styles.imageGalleryContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width: screenWidth }}
            onScroll={handleImageScroll}
            scrollEventThrottle={TIMING.scrollThrottle}
          >
            {displayImages.map((image, index) => (
              <TouchableOpacity 
                key={`image-${index}`}
                onPress={openImageGallery}
                style={[styles.imageWrapper, { width: screenWidth }]}
              >
                <Image
                  source={{ uri: image?.secure_url || image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Image Counter Indicator */}
          <View style={styles.imageCounter}>
            <View style={styles.counterPill}>
              <Text style={styles.counterText}>
                {currentImageIndex + 1}/{displayImages.length}
              </Text>
            </View>
          </View>

          {/* Favourite Button */}
          <View style={styles.favouriteButtonContainer}>
            <TouchableOpacity 
              style={styles.favouriteButton}
              onPress={toggleFavourite}
              disabled={isFavouriteLoading}
            >
              {isFavouriteLoading ? (
                <ActivityIndicator size="small" color={THEME.primary} />
              ) : (
                <Ionicons 
                  name={isFavourite ? "heart" : "heart-outline"} 
                  size={DIMENSIONS.iconSizes.heart} 
                  color={isFavourite ? THEME.primary : THEME.white} 
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.productDetailsContainer}>
          <Top data={data} />
          
          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity 
                style={styles.chatButton} 
                onPress={navigateToVendorChat}
              >
                <Ionicons 
                  name="chatbubble" 
                  size={DIMENSIONS.iconSizes.chat} 
                  color={THEME.white} 
                />
                <Text style={styles.chatButtonText}>Chat Vendor</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Description */}
          {data?.description && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Mid description={data.description} />
            </View>
          )}

          {/* Seller Information */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Seller Information</Text>
            <Btm 
              user_id={data?.user_id} 
              updateUser={handleSellerUpdate} 
              updateShop={handleShopUpdate} 
              updateReview={handleReviewUpdate} 
              product_id={data?.product_id} 
              navigation={navigation} 
            />
          </View>

          {/* Safety Tips Section */}
          {/* <View style={styles.safetyTipsContainer}>
            <View style={styles.safetyTipsHeader}>
              <Ionicons 
                name="shield-checkmark" 
                size={DIMENSIONS.iconSizes.shield} 
                color={THEME.primary} 
              />
              <Text style={styles.safetyTipsTitle}>Safety Tips</Text>
            </View>
            <View style={styles.safetyTipsList}>
              {SAFETY_TIPS.map((tip, index) => (
                <View key={`tip-${index}`} style={styles.safetyTipItem}>
                  <Ionicons 
                    name={tip.icon} 
                    size={DIMENSIONS.iconSizes[tip.icon] || 16} 
                    color={THEME.gray} 
                  />
                  <Text style={styles.safetyTipText}>{tip.text}</Text>
                </View>
              ))}
            </View>
          </View> */}

          {/* Write Review Button */}
          {/* <TouchableOpacity 
            style={styles.writeReviewButton}
            onPress={navigateToReview}
          >
            <Ionicons 
              name="star" 
              size={DIMENSIONS.iconSizes.star} 
              color={THEME.white} 
            />
            <Text style={styles.writeReviewText}>Write a Review</Text>
          </TouchableOpacity> */}

        </View>
      </Animated.ScrollView>

      {/* Fixed Bottom Action Bar */}
      <LinearGradient
        colors={[THEME.white, THEME.white]}
        style={styles.bottomActionBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TouchableOpacity 
          style={[
            styles.bottomSaveButton, 
            isFavourite && styles.bottomSaveButtonActive
          ]}
          onPress={toggleFavourite}
          disabled={isFavouriteLoading}
        >
          {isFavouriteLoading ? (
            <ActivityIndicator size="small" color={THEME.primary} />
          ) : (
            <>
              <Ionicons 
                name={isFavourite ? "heart" : "heart-outline"} 
                size={DIMENSIONS.iconSizes.heartSmall} 
                color={isFavourite ? THEME.primary : THEME.gray} 
              />
              <Text style={[
                styles.bottomButtonText, 
                isFavourite && styles.bottomButtonTextActive
              ]}>
                {isFavourite ? 'Saved' : 'Save'}
              </Text>
            </>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.bottomReviewButton}
          onPress={navigateToReview}
        >
          <Ionicons 
            name="star" 
            size={DIMENSIONS.iconSizes.starSmall} 
            color={THEME.white} 
          />
          <Text style={styles.bottomReviewButtonText}>Review</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.bottomShareButton}
          onPress={shareProduct}
        >
          <Ionicons 
            name="share-outline" 
            size={DIMENSIONS.iconSizes.starSmall} 
            color={THEME.white} 
          />
          <Text style={styles.bottomShareButtonText}>Share</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  loadingOverlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 1,
    left: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.lightBackground,
    opacity: 0.5,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? DIMENSIONS.headerTopIOS : DIMENSIONS.headerTopAndroid,
    left: DIMENSIONS.headerLeft,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: THEME.overlay,
    borderRadius: 20,
    padding: 4,
    shadowColor: THEME.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageGalleryContainer: {
    width: '100%',
    height: DIMENSIONS.imageHeight,
    position: 'relative',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.black,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageCounter: {
    position: 'absolute',
    bottom: DIMENSIONS.carouselBottom,
    right: DIMENSIONS.carouselRight,
    zIndex: 2,
  },
  counterPill: {
    backgroundColor: THEME.overlayDark,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  counterText: {
    color: THEME.white,
    fontSize: 12,
    fontWeight: '600',
  },
  favouriteButtonContainer: {
    position: 'absolute',
    top: DIMENSIONS.actionButtonTop,
    right: DIMENSIONS.actionButtonRight,
    zIndex: 2,
  },
  favouriteButton: {
    backgroundColor: THEME.overlay,
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: DIMENSIONS.actionButtonSize,
    height: DIMENSIONS.actionButtonSize,
  },
  productDetailsContainer: {
    padding: 12,
  },
  actionButtonsContainer: {
    marginVertical: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.lightGray,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: THEME.primary,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    shadowColor: THEME.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  chatButtonText: {
    color: THEME.white,
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: THEME.darkText,
  },
  safetyTipsContainer: {
    backgroundColor: THEME.lightBackground,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.lightBorder,
    marginTop: 16,
  },
  safetyTipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  safetyTipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.primary,
    marginLeft: 8,
  },
  safetyTipsList: {
    gap: 12,
  },
  safetyTipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safetyTipText: {
    fontSize: 14,
    color: THEME.gray,
    marginLeft: 8,
  },
  writeReviewButton: {
    backgroundColor: THEME.primary,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: THEME.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  writeReviewText: {
    color: THEME.white,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.lightGray,
    shadowColor: THEME.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    gap: 8,
  },
  bottomSaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    flex: 1,
    backgroundColor: THEME.white,
  },
  bottomSaveButtonActive: {
    borderColor: THEME.primary,
    backgroundColor: THEME.lightBackground,
  },
  bottomButtonText: {
    marginLeft: 6,
    fontWeight: '600',
    color: THEME.gray,
    fontSize: 12,
  },
  bottomButtonTextActive: {
    color: THEME.primary,
  },
  bottomReviewButton: {
    flex: 1,
    backgroundColor: THEME.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: THEME.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomReviewButtonText: {
    color: THEME.white,
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 12,
  },
  bottomShareButton: {
    flex: 1,
    backgroundColor: THEME.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: THEME.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomShareButtonText: {
    color: THEME.white,
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 12,
  },
});
