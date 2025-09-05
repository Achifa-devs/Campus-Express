// screens/ServiceDetailScreen.js
import React, { useState, useEffect } from 'react';
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
  Animated,
  Dimensions,
  Share,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Btm from '../components/Product/Btm';
import { useSelector } from 'react-redux';
import CallSvg from '../../media/assets/call-svgrepo-com.svg';
import WpSvg from '../../media/assets/whatsapp-svgrepo-com.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { getData, storeData } from '../../utils/AsyncStore.js';
import { get_saved, save_prod, unsave_prod } from '../utils/Saver';
import categoriesData from '../../../../../../services.json';
import useLogInAlert from '../utils/LogInAlert.js';

const ServiceDetailScreen = ({ route }) => {
    const { data } = route?.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    let showLogInAlert = useLogInAlert()

    const {user} = useSelector(s => s?.user)
    const [seller, setSeller] = useState('')
    const [saved, setSaved] = useState(false);
    const fadeAnim = new Animated.Value(1);
    const { width } = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favLoading, setFavLoading] = useState(true);

    // Fetch service details if not passed in params
    useEffect(() => {
        if (data) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [data]);

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
    
    useEffect(() => {
        if (data && data.product_id && user?.user_id) {
            setTimeout(async () => {
                try {
                    const res = await axios.post('https://cs-server-olive.vercel.app/product-view', {
                        user_id: user?.user_id,
                        product_id: data?.product_id
                    });
                
                    const response = res?.data;
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

    const getCategoryImage = (categoryName) => {
        for (let cat of categoriesData.items.category) {
            const keys = Object.keys(cat).filter(k => k !== "img");
            for (let key of keys) {
                if (key === categoryName) {
                    return cat.img;
                }
            }
        }
        return null; // fallback
    };

    function updateUser(data) {
        setSeller(data)
    }
    
    const handleSave = async () => {
        if (user) {
            setFavLoading(true);
            if (!saved) {
                const result = await save_prod({
                    user_id: user?.user_id,
                    product_id: data?.product_id
                });
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
                });
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
    
    const handleWhatsAppChat = () => {
        if (user) {
            if (!seller?.phone) {
                return Alert.alert('Error', 'Seller phone number is missing.');
            }
        
            let phoneNumber = seller.phone.replace(/\s+/g, '');
            if (phoneNumber.startsWith('0')) {
                phoneNumber = phoneNumber.substring(1);
            }
        
            const fullPhoneNumber = `234${phoneNumber}`;
            const productLink = `https://www.campussphere.net/store/product/${data?.product_id}`;
            const message = `Hello, I am interested in your service on Campus Sphere. ${productLink}`;
        
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
            showLogInAlert()
        }
    };
    
    const handlePhoneCall = () => {
        if (user) {
            if (!seller?.phone) return Alert.alert('Error', 'Seller phone number is missing.');
            const callURL = `tel:+234${seller.phone}`;
            Linking.openURL(callURL);
        } else {
           showLogInAlert() 
        }
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
              Alert.alert('You already published a review for this service');
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
    

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF4500" />
                <Text style={styles.loadingText}>Loading service details...</Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={50} color="#FF4500" />
                <Text style={styles.errorText}>Service not found</Text>
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
            
            <Animated.ScrollView
                style={{ opacity: fadeAnim }}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Image Gallery */}
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: getCategoryImage(data?.category) || data.image }} 
                        style={styles.productImage} 
                    />
                    
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

                {/* Service Content */}
                <View style={styles.contentContainer}>
                    {/* Title and Category */}
                    <Text style={styles.title}>{data?.title}</Text>
                    
                    {data?.category && (
                        <View style={styles.categoryContainer}>
                            <Ionicons name="pricetag" size={16} color="#666" />
                            <Text style={styles.category}>
                                {data?.category} - <Text style={styles.genderText}>{data?.others?.gender}</Text>
                            </Text>
                        </View>
                    )}

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

                    {/* Services Description */}
                    {data?.description && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Service Description</Text>
                            <Text style={styles.description}>{data.description}</Text>
                        </View>
                    )}

                    {/* Seller Info */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Service Provider Information</Text>
                        <Btm user_id={data?.user_id} updateUser={updateUser} updateShop={updateShop} updateReview={updateReview} navigation={navigation} />
                    </View>
            
                    {/* Safety Tips */} 
                    <View style={styles.safetyTips}>
                        <View style={styles.safetyHeader}>
                            <Ionicons name="shield-checkmark" size={20} color="#FF4500" />
                            <Text style={styles.safetyTitle}>Service Safety Tips</Text>
                        </View>
                        <View style={styles.safetyList}>
                            <View style={styles.safetyItem}>
                                <Ionicons name="document-text" size={16} color="#666" />
                                <Text style={styles.safetyText}>Verify the provider's credentials before booking</Text>
                            </View>
                            <View style={styles.safetyItem}>
                                <Ionicons name="location" size={16} color="#666" />
                                <Text style={styles.safetyText}>Meet in a safe and public location for the first appointment</Text>
                            </View>
                            <View style={styles.safetyItem}>
                                <Ionicons name="chatbubble" size={16} color="#666" />
                                <Text style={styles.safetyText}>Discuss and agree on service terms clearly before payment</Text>
                            </View>
                            <View style={styles.safetyItem}>
                                <Ionicons name="card" size={16} color="#666" />
                                <Text style={styles.safetyText}>Avoid making full payment upfront for long-term services</Text>
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
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#2D3436',
        marginTop: 16,
        textAlign: 'center',
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
        paddingBottom: 90,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
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
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2D3436',
        marginBottom: 12,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    category: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
    },
    genderText: {
        fontWeight: '600',
        color: '#FF4500',
    },
    priceContainer: {
        marginBottom: 24,
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
        color: '#2D3436',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
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
        flex: 1,
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

export default ServiceDetailScreen;