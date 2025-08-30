import {
  useNavigation,
  useRoute
} from '@react-navigation/native';
import React, {
  useEffect,
  useState
} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
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
import Top from '../components/Product/Top';
import Mid from '../components/Product/Mid';
import Btm from '../components/Product/Btm';
import CallSvg from '../../media/assets/call-svgrepo-com.svg';
import WpSvg from '../../media/assets/whatsapp-svgrepo-com.svg';
import { getData, storeData } from '../../utils/AsyncStore.js';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { get_saved, save_prod, unsave_prod } from '../utils/Saver.js';
import axios from 'axios';
import Upload from 'react-native-background-upload';

export default function Product() {
  const route = useRoute();
  const { data } = route.params;
  const { user } = useSelector(s => s?.user);
  const [seller, setSeller] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigation = useNavigation();
  const { product_id } = useRoute()?.params;
  const fadeAnim = new Animated.Value(1);
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [files, set_files] = useState([]);
  const [favLoading, setFavLoading] = useState(true);

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };


  async function AddContactClick() {
    setLoading(true)
    try {
      let request = await axios.post('http://192.168.0.4:9090/contact-click', {product_id: data?.product_id, user_id: user?.user_id})
      let res = request?.data;
      
      return res;
    } catch (error) {
      console.log('error: ', error)
      Alert.alert('Error', 'Please ensure you have stable network.');
    }
  }

  useEffect(() => {
    try {
      fetch(`https://cs-server-olive.vercel.app/image-folder?folderName=${data?.product_id}`, {
        headers: { 
          "Content-Type": "Application/json" 
        } 
      })   
      .then(async(result) => {     
        let response = await result.json();
        set_files(response);
      })       
      .catch((err) => {
        Alert.alert('Network error, please try again.');
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

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
          console.error(error);
        }
      })();
    }
  }, [data, user]);

  useEffect(() => {
    if (data && data.product_id && user?.user_id) {
      setTimeout(async () => {
        try {
          const res = await axios.post('https://cs-server-olive.vercel.app/product-view', {
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

  function updateUser(data) {
    setSeller(data);
  }

  const handleSave = async () => {
    setFavLoading(true);
    if (!saved) {
      const result = await save_prod({
        user_id: user?.user_id,
        product_id: data?.product_id
      });
      if (result?.success && result?.data?.length > 0) {
        setSaved(true);
      }
    } else {
      const result = await unsave_prod({
        user_id: user?.user_id,
        product_id: data?.product_id
      });
      if (result?.success && result?.data?.length > 0) {
        setSaved(false);
      }
    }
    setFavLoading(false);
  };

  const handleWhatsAppChat = async() => {
    let Analytics = await AddContactClick();
    if(!Analytics){
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
  };

  const handlePhoneCall = async() => {
    let Analytics = await AddContactClick();
    if(!Analytics){
      setLoading(false)

      return Alert.alert('Error', 'Please ensure you have stable network and try again.');
    }
    setLoading(false)
    if (!seller?.phone) return Alert.alert('Error', 'Seller phone number is missing.');
  
    const callURL = `tel:+234${seller.phone}`;
    Linking.openURL(callURL);
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
          Alert.alert('You already published a review for this product');
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
      Alert.alert('Please Login to continue')
    }
  };

  const images = files && files.length > 0 ? files : [data?.thumbnail_id];

  return (
    <>
      
      <SafeAreaView style={styles.safeArea}> 
        {loading&&
          <View style={{
            height: '100%', 
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF8F6',
            opacity: .5
          }}>
            <ActivityIndicator size={'large'} color={'#FF4500'}></ActivityIndicator>
          </View>
        }
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        
        <Animated.ScrollView
          style={{ opacity: fadeAnim }}
          contentContainerStyle={styles.scrollContainer}
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
                  <Image
                    source={{ uri: image?.secure_url || image }}
                    style={styles.productImage}
                    resizeMode="cover"
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
          </View>

          {/* Product Info */}
          <View style={styles.contentContainer}>
            <Top data={data} />
            
            {/* Price and Actions */}
            <View style={styles.priceContainer}>
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
            </View>

            {/* Description */}
            {data.description && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Mid description={data?.description} />
              </View>
            )}

            {/* Seller Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Seller Information</Text>
              <Btm user_id={data?.user_id} updateUser={updateUser} updateShop={updateShop} updateReview={updateReview} navigation={navigation} />
            </View>

            {/* Safety Tips */} 
            <View style={styles.safetyTips}>
              <View style={styles.safetyHeader}>
                <Ionicons name="shield-checkmark" size={20} color="#FF4500" />
                <Text style={styles.safetyTitle}>Safety Tips</Text>
              </View>
              <View style={styles.safetyList}>
                <View style={styles.safetyItem}>
                  <Ionicons name="location" size={16} color="#666" />
                  <Text style={styles.safetyText}>Meet seller in public places</Text>
                </View>
                <View style={styles.safetyItem}>
                  <Ionicons name="search" size={16} color="#666" />
                  <Text style={styles.safetyText}>Check the item before you buy</Text>
                </View>
                <View style={styles.safetyItem}>
                  <Ionicons name="card" size={16} color="#666" />
                  <Text style={styles.safetyText}>Pay only after collecting the item</Text>
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
              try {
                await Share.share({
                  message: `Check out this product on Campus Sphere! https://www.campussphere.net/store/product/${data?.product_id}`,
                  title: data?.title,
                });
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Ionicons name={'share-outline'} size={18} color={'#FFF'} />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    zIndex: 10,
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
    paddingBottom: 100,
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
    top: 15,
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
  priceContainer: {
    marginVertical: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
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
    marginBottom: 16,
    color: '#2D3436',
  },
  safetyTips: {
    backgroundColor: '#FFF8F6',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE5DE',
    marginTop: 16,
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