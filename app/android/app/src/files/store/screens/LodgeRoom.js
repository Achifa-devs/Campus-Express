import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  ActivityIndicator,
  Share,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CallSvg from '../../media/assets/call-svgrepo-com.svg';
import WpSvg from '../../media/assets/whatsapp-svgrepo-com.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Btm from '../components/Product/Btm';
import { useDispatch, useSelector } from 'react-redux';
import { get_saved, save_prod, unsave_prod } from '../utils/Saver';
import { getData, storeData } from '../../utils/AsyncStore.js';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import useLogInAlert from '../utils/LogInAlert.js';
import { getDeviceId } from '../utils/IdGen.js';
import { set_connect_modal } from '../../../../../../redux/connect.js';
import useInsufficientConnectAlert from '../utils/ConnectZero.js';

const AccommodationDetailScreen = ({ route, navigation }) => {
  const { data } = useRoute().params;
  const [files, setFiles] = useState([]);
  const {user} = useSelector(s => s?.user)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favLoading, setFavLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [seller, setSeller] = useState('')
  const { width } = Dimensions.get('window');
  const fadeAnim = new Animated.Value(1);
  const [loading, setLoading] = useState(false);

  let showLogInAlert = useLogInAlert()
  
  async function UpdateConnections() {
    setLoading(true)
    try {
      let request = await axios.post('https://cs-node.vercel.app/minus-connect', {user_id: user?.user_id})
      let res = request?.data;
      
      if(res.success){
        dispatch(set_user(res.data))
        return res.success;
      }
    } catch (error) {
      console.log('error: ', error)
      Alert.alert('Error', 'Please ensure you have stable network.');
    }
  }

  const handleSave = async () => {
    if (user) {
      setFavLoading(true);

      if (!saved) {
        const result = await save_prod({
          user_id: user?.user_id,
          product_id: data?.product_id
        })
        if (result?.success && result?.data?.length > 0) {
          setSaved(true);
          setFavLoading(false);
        } else {
          setFavLoading(false);
        }
      } else {
        const result = await unsave_prod({
          user_id: user?.user_id,
          product_id: data?.product_id
        })
        if (result?.success && result?.data?.length > 0) {
          setSaved(false);
          setFavLoading(false);
        } else {
          setFavLoading(false);
        }
      }
    } else {
      showLogInAlert()
    }
  };

  function updateUser(data) {
    setSeller(data)
  }

  useEffect(() => {
    try {
      fetch(`https://cs-node.vercel.app/image-folder?folderName=${data?.product_id}`, {
        headers: { 
          "Content-Type": "Application/json" 
        } 
      })   
      .then(async(result) => {     
        let response = await result.json();
        setFiles(response);
      })       
      .catch((err) => {
        Alert.alert('Network error, please try again.');
      });
    } catch (error) {
      console.error(error);
    }
  }, [data?.product_id]);

  useEffect(() => {
    setFavLoading(true);
    if (data && data.product_id) {
      (async function getFavourite() {
        try {
          const result = await get_saved({
            user_id: user?.user_id,
            product_id: data?.product_id
          });
          if (result?.success) {
            setFavLoading(false);
            setSaved(result.data.length > 0);
          } else {
            setFavLoading(false);
            setSaved(false);
          }
        } catch (error) {
          setFavLoading(false);
          setSaved(false);
        }
      })();
    }
  }, [data, user]);
    const dispatch = useDispatch()
    const showConnectAlert = useInsufficientConnectAlert();
  
  
  useEffect(() => {
    if (data && data.product_id && user?.user_id) {
      setTimeout(async () => {
        try {
          const res = await axios.post('https://cs-node.vercel.app/product-view', {
            user_id: user?.user_id,
            product_id: data?.product_id
          });
      
          const response = res.data;
          if (response?.success) {  
            const newHistory = { date: new Date(), data: data };
            const prevHistory = await getData('history');
            if (prevHistory) {
              const arr = JSON.parse(prevHistory);
              if (Array.isArray(arr) && arr.length > 0) {
                storeData('history', JSON.stringify([...arr, newHistory]));
              } else {
                storeData('history', JSON.stringify([newHistory]));
              }
            }
          }
        } catch (error) {
          console.error('Error in product view request:', error);
        }
      }, 3000);
    }
  }, [data, user]);

  const handleWhatsAppChat = async() => {
    if (user) {
      if (user?.connects > 0) {
        let Analytics = await AddContactClick();
        if(!Analytics){
          setLoading(false)
    
          return Alert.alert('Error', 'Please ensure you have stable network and try again.');
        }
        let Connects = await UpdateConnections();
        if(!Connects){
          setLoading(false)
    
          return Alert.alert('Error', 'Please ensure you have stable network and try again.');
        }
        setLoading(false)
        if (!seller?.phone) {
          return Alert.alert('Error', 'Seller phone number is missing.');
        }
      
        let phoneNumber = seller.phone.replace(/\s+/g, '');
        if (phoneNumber.startsWith('0')) {
          phoneNumber = phoneNumber.substring(1);
        }
      
        const fullPhoneNumber = `234${phoneNumber}`;
        const productLink = `https://www.campussphere.net/store/product/${data?.product_id}`;
        const message = `Hello, I am interested in your product on Campus Sphere. ${productLink}`;
      
        const whatsappURL = `whatsapp://send?phone=${fullPhoneNumber}&text=${encodeURIComponent(message)}`;
        const fallbackURL = `https://wa.me/${fullPhoneNumber}?text=${encodeURIComponent(message)}`;
      
        Linking.canOpenURL(whatsappURL)
        .then((supported) => {
          if (supported) {
            Linking.openURL(whatsappURL);
          } else {
            Linking.openURL(fallbackURL);
          }
        })
        .catch((err) => {
          Alert.alert('Error', 'Unable to open WhatsApp.');
        });
      } else {
        showConnectAlert()
      }
    } else {
      showLogInAlert()
    }
  };

  const handlePhoneCall = async() => {
    if (user) {
      if (user?.connects > 0) {
        let Analytics = await AddContactClick();
        if(!Analytics){
          setLoading(false)
    
          return Alert.alert('Error', 'Please ensure you have stable network and try again.');
        }
        let Connects = await UpdateConnections();
        if(!Connects){
          setLoading(false)
    
          return Alert.alert('Error', 'Please ensure you have stable network and try again.');
        }
  
        setLoading(false)
        if (!seller?.phone) return Alert.alert('Error', 'Seller phone number is missing.');
      
        const callURL = `tel:+234${seller.phone}`;
        Linking.openURL(callURL);
      } else {
        showConnectAlert()
      }
    }else {
      showLogInAlert()
    }
  };

  const amenities = data?.others?.lodge_data?.amenities 
    ? (Array.isArray(data.others.lodge_data.amenities) 
        ? data.others.lodge_data.amenities
        : [])
    : [];

  const images = files && files.length > 0 ? files : 
  (data.thumbnail_id ? [{ secure_url: data.thumbnail_id }] : []);

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  let [reviews, setReviews] = useState(null)
  let [shop, setShop] = useState(null)

  const { reviewed } = useRoute()?.params;
  
  
  function updateReview(data) {
    setReviews(data)
  }

  function updateShop(data) {
    setShop(data)
  }

  const handleWriteReview = () => {
    if (user) {
        
      if (reviews) {
        // Check if the user has reviewed anything at all
        const hasUserReview = reviews.some(item => item?.buyer_id === user?.user_id);

        // Check if the user has already reviewed this specific product
        const hasReviewedThisProduct = reviews.some(
          item => item?.buyer_id === user?.user_id && item?.product_id === data?.product_id
        );

        if (hasReviewedThisProduct) {
          Alert.alert('You already published a review for this accommodation');
        } else if (hasUserReview) {
          // User has a review for another product in the shop, but not this one
          navigation.navigate('user-review-submission', { 
            product: data,
            seller,
            shop
          });
        } else {
          // User has no reviews at all, allow review
          navigation.navigate('user-review-submission', { 
            product: data,
            seller,
            shop
          });
        }
      } else {
        Alert.alert('Loading reviews...');
      }

    } else {
      showLogInAlert()
    }
  };

  const isPromoted = eval(data.promotion) ;

  async function AddShare() {
    let id = await getDeviceId()
    setLoading(true)
    try {
      let request = await axios.post('https://cs-node.vercel.app/share', {product_id: data?.product_id, user_id: user ? user.user_id : id})
      let res = request?.data;
      
      return res;
    } catch (error) {
      console.log('error: ', error)
      Alert.alert('Error', 'Please ensure you have stable network.');
    }
  }


    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF4500" />
          <Text style={styles.loadingText}>Loading service details...</Text>
        </View>
      );
    }
      
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {user&&<TouchableOpacity style={styles.connectionCnt} onPress={e => {
        dispatch(set_connect_modal(1))
      }}>
        <View style={styles.connection}>
          <Ionicons name="people-outline" size={24} color="#FFF" />
          
          <Text style={{fontSize: 12, color: '#fff', marginHorizontal: 8}}>
            {user?.connects} vendor connections
          </Text>
        </View>
      </TouchableOpacity>}
      
      <Animated.ScrollView 
        style={{ opacity: fadeAnim }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal 
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width }}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {images.map((image, index) => (
              <TouchableOpacity 
                onPress={() => {
                  navigation.navigate('user-product-images', {
                    files: images,
                    index: currentIndex,
                  });
                }} 
                key={index} 
                style={[styles.imgContainer, { width }]}
              >
                <Video
                  source={{ uri: image?.secure_url || image }}
                  style={styles.productImage}
                  resizeMode="cover"
                  paused
                  controls
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.carouselIndicator}>
            <View style={styles.carouselPill}>
              <Text style={styles.carouselText}>
                {currentIndex + 1}/{images.length}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleSave}
            >
              {favLoading ? (
                <ActivityIndicator size="small" color="#FF4500" />
              ) : (
                <Ionicons 
                  name={saved ? "heart" : "heart-outline"} 
                  size={24} 
                  color={saved ? "#FF4500" : "#FFF"} 
                />
              )}
            </TouchableOpacity>
          </View>

          {isPromoted && (
            <View style={styles.boostBadge}>
              <Icon name="rocket" size={12} color="#FFF" />
              <Text style={styles.boostBadgeText}>  Boosted</Text>
            </View>
          )} 
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data.title}</Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.location}>
              {data.campus} - {data?.others?.lodge_data?.address1}, {data?.others?.lodge_data?.address2}
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ₦{new Intl.NumberFormat('en-US').format(data.price)} to pay ₦{new Intl.NumberFormat('en-US').format(data?.others?.lodge_data?.upfront_pay)}
            </Text>
            <Text style={styles.priceLabel}>/{data?.others?.lodge_data?.freq}</Text>
          </View>

          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>
              {data?.others?.cType} - {data?.others?.gender} Preferred
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.wpButton} onPress={handleWhatsAppChat}>
              <WpSvg height={20} width={20} fill="#FFF" />
              <Text style={styles.wpText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton} onPress={handlePhoneCall}>
              <CallSvg height={18} width={18} fill="#FFF" />
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          {data?.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{data?.description}</Text>
            </View>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesContainer}>
                {amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityItem}>
                    <Ionicons name="checkmark" size={16} color="#4CAF50" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Seller Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Btm user_id={data?.user_id} updateUser={updateUser} product_id={data?.product_id} updateShop={updateShop} updateReview={updateReview} navigation={navigation} />
          </View>

          {/* Safety Tips */} 
          <View style={styles.safetyTips}>
            <View style={styles.safetyHeader}>
              <Ionicons name="shield-checkmark" size={20} color="#FF4500" />
              <Text style={styles.safetyTitle}>Accommodation Safety Tips</Text>
            </View>
            <View style={styles.safetyList}>
              <View style={styles.safetyItem}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.safetyText}>Visit the property in person before committing</Text>
              </View>
              <View style={styles.safetyItem}>
                <Ionicons name="search" size={16} color="#666" />
                <Text style={styles.safetyText}>Inspect the room and facilities thoroughly</Text>
              </View>
              <View style={styles.safetyItem}>
                <Ionicons name="document-text" size={16} color="#666" />
                <Text style={styles.safetyText}>Request proper documentation and receipts</Text>
              </View>
              <View style={styles.safetyItem}>
                <Ionicons name="people" size={16} color="#666" />
                <Text style={styles.safetyText}>Verify the landlord/agent is genuine</Text>
              </View>
            </View>
          </View>
          {/* Write Review Button - Added inside scroll view for visibility */}
          <TouchableOpacity 
            style={styles.writeReviewButton}
            onPress={handleWriteReview}
          >
            <Ionicons name="star" size={20} color="#FFF" />
            <Text style={styles.writeReviewText}>Write a Review</Text>
          </TouchableOpacity>
        </View>

      </Animated.ScrollView>

      {/* Fixed Bottom Bar */}
      <LinearGradient
        colors={['#FFF', '#FFF']}
        style={styles.bottomBar}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      >
        <TouchableOpacity 
          style={[styles.saveButton, saved && styles.saveButtonActive]}
          onPress={handleSave}
          disabled={favLoading}
        >
          {favLoading ? (
            <ActivityIndicator size="small" color="#FF4500" />
          ) : (
            <>
              <Ionicons 
                name={saved ? "heart" : "heart-outline"} 
                size={20} 
                color={saved ? "#FF4500" : "#666"} 
              />
              <Text style={[styles.bottomButtonText, saved && styles.savedText]}>
                {saved ? 'Saved' : 'Save'}
              </Text>
            </>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={handleWriteReview}
        >
          <Ionicons name="star" size={18} color="#FFF" />
          <Text style={styles.reviewButtonText}>Review</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.shareButton}
          onPress={async() => {
            const isShareSaved = await AddShare()
            if(!isShareSaved){
            setLoading(false)
              return Alert.alert('Error', 'Please ensure you have stable network and try again.');
            }
            try {
              setLoading(false)
              await Share.share({
                message: `Check out this product on Campus Sphere! https://www.campussphere.net/store/product/${data?.product_id}`,
                title: data?.title,
              });
            } catch (error) {
              console.error(error);
              return Alert.alert('Error', 'Please ensure you have stable network and try again.');

            }
          }}
        >
          <Ionicons name={'share-outline'} size={18} color={'#FFF'} />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
   boostBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    // width: '100%',
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 55 : 35,
    left: 20,
    zIndex: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    paddingBottom: 90,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  connectionCnt: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : 10,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
   
  },
  connection: {
    backgroundColor: '#FF4500',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  carouselIndicator: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 2,
  },
  carouselPill: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  carouselText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    position: 'absolute',
    top: 32,
    right: 15,
    zIndex: 2,
  },
  actionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF8F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFE5DE',
    marginBottom: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  wpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#25D366',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  wpText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FF4500',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  callText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexBasis: '48%',
  },
  amenityText: {
    fontSize: 14,
    color: '#2D3436',
    marginLeft: 8,
  },
  safetyTips: {
    backgroundColor: '#FFF8F6',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE5DE',
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF4500',
    marginLeft: 8,
  },
  safetyList: {
    gap: 12,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safetyText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  writeReviewButton: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  writeReviewText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    gap: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    flex: 1,
    backgroundColor: '#FFF',
  },
  saveButtonActive: {
    borderColor: '#FF4500',
    backgroundColor: '#FFF8F6',
  },
  bottomButtonText: {
    marginLeft: 6,
    fontWeight: '600',
    color: '#666',
    fontSize: 12,
  },
  savedText: {
    color: '#FF4500',
  },
  reviewButton: {
    flex: 1,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewButtonText: {
    color: '#FFF',
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 12,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#FF4500',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  shareButtonText: {
    color: '#FFF',
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 12,
  },
});

export default AccommodationDetailScreen;