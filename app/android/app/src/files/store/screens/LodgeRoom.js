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
import CallSvg from '../../media/assets/call-svgrepo-com.svg';
import WpSvg from '../../media/assets/whatsapp-svgrepo-com.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import Btm from '../components/Product/Btm';
import { useSelector } from 'react-redux';
import { get_saved } from '../utils/Saver';
import { getData, storeData } from '../../utils/AsyncStore.js';
import axios from 'axios';

const AccommodationDetailScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const [files, setFiles] = useState([]);
  const {user} = useSelector(s => s?.user)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favLoading, setFavLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [seller, setSeller] = useState('')
  const { width } = Dimensions.get('window');
  const fadeAnim = new Animated.Value(1);

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

  function updateUser(data) {
    setSeller(data)
  }

  useEffect(() => {
    // console.log(data?.others?.lodge_data)
    try {
      fetch(`https://cs-server-olive.vercel.app/image-folder?folderName=${data?.product_id}`, {
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
            await storeData('history', JSON.stringify([newHistory]));
            // Handle unsuccessful case
          }
        } catch (error) {
          // console.error('Error in product view request:', error);
        }
      }, 3000);
    }
  }, [data])
  

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
      

  // Safely get amenities array or use empty array as fallback
  const amenities = data?.others?.lodge_data?.amenities 
    ? (Array.isArray(JSON.parse(data.others.lodge_data.amenities)) 
        ? JSON.parse(data.others.lodge_data.amenities)
        : [])
    : [];

  const images = files && files.length > 0 ? files : 
  (data.thumbnail_id ? [{ secure_url: data.thumbnail_id }] : []);

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Animated.ScrollView showsVerticalScrollIndicator={false} style={{ opacity: fadeAnim }}
          contentContainerStyle={styles.scrollContainer}>

        

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
                Alert.alert()
                navigation.navigate('user-product-images', {
                  files: images,
                  index: currentIndex,
                });

              }} key={index} style={[styles.imgContainer, { width }]}>
                <Video 
                  source={{ uri: image?.secure_url }}
                  style={styles.image}
                  controls
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.carousel} onPress={e => {
            navigation.navigate('user-product-images', {
              files: images,
              index: currentIndex,
              type: 'video'
            });

          }}>
            <Text>
              {currentIndex + 1}/{images.length}
            </Text>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleSave}
            >
              <Ionicons name={saved ? "heart": 'heart-outline'} size={20} color={"#FF4500"} />
              
            </TouchableOpacity>
            
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={16} color="#666" />
            <Text style={styles.location}>{data.campus} - {data?.others?.lodge_data?.address1}, {data?.others?.lodge_data?.address2}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₦{new Intl.NumberFormat('en-US').format(data.price)} to pay ₦{new Intl.NumberFormat('en-US').format(data?.others?.lodge_data?.upfront_pay)}</Text>
            <Text style={styles.priceLabel}>/{data?.others?.lodge_data?.freq}</Text>
          </View>

          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{data?.others?.cType} - {data?.others?.gender} Preferred</Text>
          </View>
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
          {data?.description ? (
            <>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{data?.description}</Text>
            </>
          ) : null}

          {amenities.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesContainer}>
                {amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityItem}>
                    <Icon name="check" size={16} color="#4CAF50" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Seller Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seller Information</Text>
            <Btm user_id={data?.user_id} updateUser={updateUser} />
          </View>

          {/* Safety Tips */} 
          <View style={styles.safetyTips}>
            <Text style={styles.safetyTitle}>Accommodation Safety Tips</Text>
            <Text style={styles.safetyText}>
              • Visit the lodge, apartment, or hostel in person{'\n'}
              • Inspect the room and facilities before making payment{'\n'}
              • Ensure the landlord/agent is genuine and verified{'\n'}
              • Always request a receipt or rental agreement
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
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 80,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  imageContainer: {
    width: '100%',
    // aspectRatio: 16/9, // or whatever ratio you prefer
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
  callText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
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
  safetyTips: {
    backgroundColor: '#FFF8F6',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE5DE',
    marginTop: 6,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    zIndex: 10,
  },
  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF6F2',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageGallery: {
    height: 300,
  },
  image: {
    width: 400,
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 8,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  hostJoined: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: '#FF4500',
    marginLeft: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
    backgroundColor: '#fff',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#FF4500',
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#FF4500',
    fontWeight: '600',
    marginLeft: 8,
  },
  bookButton: {
    flex: 2,
    backgroundColor: '#FF4500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AccommodationDetailScreen;