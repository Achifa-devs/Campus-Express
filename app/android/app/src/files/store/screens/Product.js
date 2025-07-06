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
  TouchableWithoutFeedback,
  
  Image,
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  ActivityIndicator,
  Share,
  Linking
} from 'react-native';

// import Top from '../components/Product/Top';
import Mid from '../components/Product/Mid';
import Btm from '../components/Product/Btm';
import Thumbnail from '../utils/Thumbnail';
import CallSvg from '../../media/assets/call-svgrepo-com.svg';
import WpSvg from '../../media/assets/whatsapp-svgrepo-com.svg';
import ReportSvg from '../../media/assets/report-svgrepo-com.svg';
//   import HeartSvg from '../../media/assets/heart-svgrepo-com.svg';
//   import ShareSvg from '../../media/assets/share-svgrepo-com.svg';

import { getData, storeData } from '../../utils/AsyncStore.js';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleMessage } from '../../../../../../redux/toggleMssg.js';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import Top from '../components/Product/Top';
import { get_saved, save_prod, unsave_prod } from '../utils/Saver.js';
import axios from 'axios';

  export default function Product() {
    const dispatch = useDispatch();
    const [imageIndex, setImageIndex] = useState(0);
    const {user} = useSelector(s => s?.user)
    const [data, setData] = useState(null); 
    const [seller, setSeller] = useState('')
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const navigation = useNavigation();
    const { product_id } = useRoute()?.params;
    const fadeAnim = new Animated.Value(1);
    const { width } = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);

    const onScroll = (event) => {
      const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      setCurrentIndex(slideIndex);
    };
  
    
    const [files, set_files] = useState([])

    useEffect(() => {
      try {
        fetch(`https://cs-server-olive.vercel.app/image-folder?folderName=${product_id}`, {
          headers: { 
            "Content-Type": "Application/json" 
          } 
        })   
        .then(async(result) => {     
          let response = await result.json()
          set_files(response)
          // console.log('images response: ', response[0])
        })       
        .catch((err) => {
          // set_server_err(!true)
          Alert.alert('Network error, please try again.')
          // console.log(err)
        })
      } catch (error) {
        // console.log(error)
      }
    }, [])

  
    useEffect(() => {
      fetchProductData();
    }, []);

    useEffect(() => {
      setFavLoading(true);
      if (data !== '' && data !== undefined && data !== null && data !== 'undefined' && data !== 'null') {
        try {
          (async function getFavourite() {
            const result = await get_saved({
              user_id: user?.user_id,
              product_id: data?.product_id
            })
            // console.log("result: ", result)

            if (result?.success) {
              setFavLoading(false);
              if (result.data.length > 0) {
                setSaved(true)
              } else {
                setSaved(false)
              }
            } else {
              setFavLoading(false);
              setSaved(false)
            }
          })()
        } catch (error) {
          setFavLoading(false);
          // console.log(error)
        }
      }
    }, [data])

    useEffect(() => {
      if (data !== '' && data !== undefined && data !== null && data !== 'undefined' && data !== 'null') {
        setTimeout(async () => {
          try {
            const res = await axios.post('https://cs-server-olive.vercel.app/product-view', {
              user_id: user?.user_id,
              product_id: data?.product_id
            });
        
            const response = res.data;
            // console.log('response:', response);
        
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
            } else {
              // Handle unsuccessful case
            }
          } catch (error) {
            // console.error('Error in product view request:', error);
          }
        }, 3000);
      }
    }, [data])

    const [favLoading, setFavLoading] = useState(true);
    
  
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://cs-server-olive.vercel.app/product?product_id=${product_id}`, {
          headers: { "Content-Type": "Application/json" }
        });
        const result = await response.json();
        setData(result.data[0]);
        
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }).start();
        
      } catch (err) {
        Alert.alert('Error', 'Failed to load product details. Please try again.');
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };

    function updateUser(data) {
      setSeller(data)
    }
  
    const handleSave = async () => {
      setFavLoading(true);
      // setSaved(!saved);
      // dispatch(setToggleMessage(saved ? 'Removed from saved' : 'Product saved!'));
      if (!saved) {
        const result = await save_prod({
          user_id: user?.user_id,
          product_id: data?.product_id
        })
        if (result?.success && result?.data?.length > 0) {
          setSaved(true);
          setFavLoading(false);
        } else {
          // 
          setFavLoading(false);
        }
      }
       else {
        const result = await unsave_prod({
          user_id: user?.user_id,
          product_id: data?.product_id
        })
        if (result?.success && result?.data?.length > 0) {
          setSaved(false);
          setFavLoading(false);
        } else {
          // 
          setFavLoading(false);
        }
      
      }
    };
  
    const handleShare = () => {
      // Implement share functionality
      dispatch(setToggleMessage('Share link copied to clipboard'));
    };

    const handleWhatsAppChat = () => {
      if (!seller?.phone) {
        return Alert.alert('Error', 'Seller phone number is missing.');
      }
    
      // Ensure Nigerian number format, remove leading 0 if present
      let phoneNumber = seller.phone.replace(/\s+/g, ''); // remove spaces
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
          // console.error("WhatsApp linking error:", err);
          Alert.alert('Error', 'Unable to open WhatsApp.');
        });
    };
    

    const handlePhoneCall = () => {
      if (!seller?.phone) return Alert.alert('Error', 'Seller phone number is missing.');
    
      const callURL = `tel:+234${seller.phone}`;
    
      Linking.openURL(callURL);
    };
    
  
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF4500" />
        </View>
      );
    }
  
    if (!data) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchProductData}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const images = files && files.length > 0 ? files : [data.thumbnail_id];
    

  
    return (
      <SafeAreaView style={styles.safeArea}> 
       
        
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
                <TouchableOpacity onPress={e => {
                  navigation.navigate('user-product-images', {
                    files: images,
                    index: currentIndex,
                  });

                }} key={index} style={[styles.imgContainer, { width }]}>
                  <Image
                    source={{ uri: image?.secure_url }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.carousel}>
              <Text>
                {currentIndex + 1}/{images.length}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleSave}
              >
                <Ionicons name={"heart"} size={20} color={"#FF4500"} />
                {/* <HeartSvg 
                  height={24} 
                  width={24} 
                  fill={saved ? '#FF4500' : 'none'} 
                  stroke={saved ? '#FF4500' : '#000'} 
                /> */}
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleShare}
              >
                {/* <ShareSvg height={24} width={24} /> */}
              </TouchableOpacity>
            </View>
          </View>
  
          {/* Product Info */}
          <View style={styles.contentContainer}>
            <Top data={data} />
            
            {/* Price and Actions */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}></Text>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.wpButton} onPress={handleWhatsAppChat}>
                  <WpSvg height={20} width={20} />
                  <Text style={styles.wpText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={handlePhoneCall}>
                  <CallSvg height={18} width={18} />
                  <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
  
            {/* Description */}
            {data.description === '' ? '' :<View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Mid description={data?.description} />
            </View>}
  
            {/* Seller Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Seller Information</Text>
              <Btm user_id={data?.user_id} updateUser={updateUser} />
            </View>
  
            {/* Safety Tips */} 
            <View style={styles.safetyTips}>
              <Text style={styles.safetyTitle}>Safety Tips</Text>
              <Text style={styles.safetyText}>
                • Meet seller in public places{'\n'}
                • Check the item before you buy{'\n'}
                • Pay only after collecting the item
              </Text>
            </View>
          </View>
        </Animated.ScrollView>
  
        {/* Fixed Bottom Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            {favLoading && (
              <View style={[styles.loadingOverlay, {backgroundColor: 'rgba(0, 0, 0, 0.3)'}]}>
                <ActivityIndicator size="small" color="#FF4500" />
              </View>
            )}
            {!favLoading &&(<Ionicons name={saved ? "heart" : "heart-outline"} size={20} color={"#FF4500"} />)}
            {/* <HeartSvg 
              height={20} 
              width={20} 
              fill={saved ? '#FF4500' : 'none'} 
              stroke={saved ? '#FF4500' : '#000'} 
            /> */}
            <Text style={[styles.bottomButtonText, saved && styles.savedText]}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.orderButton}
            // onPress={() => navigation.navigate('user-new-order', { data })}
            onPress={async(e) => {
              try {
                const result = await Share.share({
                  message: `Check out this product on Campus Sphere! https://www.campussphere.net/store/product/${data?.product_id}`,
                  url: `https://www.campussphere.net/store/product/${data?.product_id}`, // works mostly on iOS
                  title: data?.title,
                    
                });
  
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                      // console.log('Shared with activity type:', result.activityType);
                  } else {
                      // console.log('Shared successfully');
                  }
                } else if (result.action === Share.dismissedAction) {
                  // console.log('Share dismissed');
                }
              } catch (error) {
                console.log(error)
              }
          }}
          >
            <Ionicons  name={'share-outline'} size={15} color={'#fff'} />
            <Text style={styles.orderButtonText}>Share Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    scrollContainer: {
      paddingBottom: 80,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      color: '#333',
      marginBottom: 20,
    },
    retryButton: {
      backgroundColor: '#FF4500',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    retryText: {
      color: '#FFF',
      fontSize: 16,
    },
    imageContainer: {
      width: '100%',
      aspectRatio: 16/9, // or whatever ratio you prefer
    },
    imageWrapper: {
      width: '100%',
      height: 350,
      backgroundColor: '#f8f8f8',
    },
    imgContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000', // in case images have transparency
    },
    productImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    imagePagination: {
      position: 'absolute',
      bottom: 15,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(244, 246, 248, 0.8)',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.5)',
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: '#FF4500',
      width: 12,
    },
    actionButtons: {
      position: 'absolute',
      top: 15,
      right: 15,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 20,
      padding: 8,
      flexDirection: 'row',
    },
    carousel: {
      position: 'absolute',
      bottom: 15,
      right: 15,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 20,
      padding: 8,
      flexDirection: 'row',
    }, 
    actionButton: {
      marginHorizontal: 5,
    },
    contentContainer: {
      padding: 16,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    priceText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FF4500',
    },
    actionRow: {
      flexDirection: 'row',
      gap: 10,
    },
    wpButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: '#25D366',
      borderRadius: 6,
    },
    wpText: {
      color: '#FFF',
      fontWeight: '600',
      marginLeft: 8,
    },
    callButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: '#FF4500',
      borderRadius: 6,
    },
    callText: {
      color: '#FFF',
      fontWeight: '600',
      marginLeft: 8,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      color: '#333',
    },
    safetyTips: {
      backgroundColor: '#FFF8F6',
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#FFE5DE',
      marginTop: 16,
    },
    safetyTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FF4500',
      marginBottom: 8,
    },
    safetyText: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      backgroundColor: '#FFF',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
      marginRight: 12,
      flex: 1,
    },
    bottomButtonText: {
      marginLeft: 8,
      fontWeight: '600',
    },
    savedText: {
      color: '#FF4500',
    },
    orderButton: {
      flex: 3,
      backgroundColor: '#FF4500',
      borderRadius: 6,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    orderButtonText: {
      color: '#FFF',
      paddingHorizontal: 10,
      fontWeight: '600',
      fontSize: 16,
    },
  });