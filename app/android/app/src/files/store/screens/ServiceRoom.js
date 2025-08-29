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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Btm from '../components/Product/Btm';
import { useSelector } from 'react-redux';
import CallSvg from '../../media/assets/call-svgrepo-com.svg';
import WpSvg from '../../media/assets/whatsapp-svgrepo-com.svg';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import axios from 'axios';
import { getData, storeData } from '../../utils/AsyncStore.js';
import { get_saved } from '../utils/Saver';
import categoriesData from '../../../../../../services.json'
const ServiceDetailScreen = ({ route }) => {
    const { data } = route?.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const {user} = useSelector(s => s?.user)
    const [seller, setSeller] = useState('')
    const [saved, setSaved] = useState(false);
    const fadeAnim = new Animated.Value(1);
    const { width } = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);
    // Fetch service details if not passed in params
    useEffect(() => {
        console.log(data)
        if (data) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [data]);

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
        
            const response = res?.data;
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
    
    const [favLoading, setFavLoading] = useState(true);


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
            <Text style={styles.loadingText}>Loading service details...</Text>
        </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.errorContainer}>
                <Icon name="error-outline" size={50} color="#FF4500" />
                <Text style={styles.errorText}>Service not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <Animated.ScrollView
                style={{ opacity: fadeAnim }}
                contentContainerStyle={styles.scrollContainer}
            >
               
                {/* Image Gallery */}
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: getCategoryImage(data?.category) || item.image }} 
                        style={styles.productImage} 
                    />
                    
                    <View style={styles.actionButtons}>
                        <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={handleSave}
                        >
                            <Ionicons name={saved ? "heart": 'heart-outline'} size={20} color={"#FF4500"} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
                

                {/* Service Content */}
                <View style={styles.content}>
                    {/* Title and Category */}
                    <Text style={styles.title}>{data?.title}</Text>
                    {data?.category && (
                        <View style={styles.categoryContainer}>
                            <Icon name="category" size={16} color="#666" />
                            <Text style={styles.category}>{data?.category} - <Text style={{fontWeight: 'bold'}}>{data?.others?.gender}</Text></Text>
                        </View>
                    )}

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

                    {/* Services Description */}
                    {data?.description && (
                        <>
                        <Text style={styles.sectionTitle}>Service Description</Text>
                        <Text style={styles.description}>{service.description}</Text>
                        </>
                    )}

                    {/* Seller Info */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Seller Information</Text>
                        <Btm user_id={data?.user_id} updateUser={updateUser} />
                    </View>
            
                    {/* Safety Tips */} 
                    <View style={styles.safetyTips}>
                        <Text style={styles.safetyTitle}>Service Safety Tips</Text>
                        <Text style={styles.safetyText}>
                            • Verify the provider’s credentials before booking{'\n'}
                            • Meet in a safe and public location for the first appointment{'\n'}
                            • Discuss and agree on service terms clearly before payment{'\n'}
                            • Avoid making full payment upfront for long-term services
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
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
      paddingBottom: 80,
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
        backgroundColor: '#fff',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#333',
        marginTop: 16,
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: '#FF4500',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    header: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        left: 20,
        zIndex: 10,
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
    imageContainer: {
      width: '100%',
      height: 250
    //   aspectRatio: 16/9, // or whatever ratio you prefer
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
    actionButtons: {
      position: 'absolute',
      top: 15,
      right: 15,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 20,
      padding: 8,
      flexDirection: 'row',
    },
    activeDot: {
      backgroundColor: '#FF4500',
      width: 12,
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
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    category: {
        fontSize: 16,
        color: '#666',
        marginLeft: 6,
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
    duration: {
        fontSize: 16,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
        marginTop: 24,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        marginBottom: 8,
    },
    featuresContainer: {
        marginBottom: 8,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333',
    },
    requirementsContainer: {
        marginBottom: 8,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    requirementText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#555',
        flex: 1,
    },
    providerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    providerImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        overflow: 'hidden',
    },
    providerImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    providerInfo: {
        flex: 1,
    },
    providerName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    rating: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
        marginRight: 4,
        color: '#333',
    },
    reviews: {
        fontSize: 14,
        color: '#666',
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifiedText: {
        fontSize: 12,
        color: '#4CAF50',
        marginLeft: 4,
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    availabilityText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    locationText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333',
        flex: 1,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        padding: 16,
        backgroundColor: '#fff',
    },
    footerActions: {
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

export default ServiceDetailScreen;