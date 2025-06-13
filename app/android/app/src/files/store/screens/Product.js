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
    StatusBar,
    Image,
    ScrollView,
    SafeAreaView,
    Animated,
    Easing,
    ActivityIndicator
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
  import { useDispatch } from 'react-redux';
  import { setToggleMessage } from '../../../../../../redux/toggleMssg.js';
  import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import Top from '../components/Product/Top';
  
  export default function Product() {
    const dispatch = useDispatch();
    const [imageIndex, setImageIndex] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const navigation = useNavigation();
    const { product_id } = useRoute()?.params;
    const fadeAnim = new Animated.Value(1);
  
    const handleImageTouch = (e) => {
      const { locationX } = e.nativeEvent;
      const isLeft = locationX < Dimensions.get('window').width / 2;
  
      let samples = data?.sample_images?.length ? data.sample_images : [data?.thumbnail_id];
      if (!samples || samples.length === 0) return;
  
      let newIndex = imageIndex + (isLeft ? -1 : 1);
      if (newIndex < 0) newIndex = samples.length - 1;
      if (newIndex >= samples.length) newIndex = 0;
  
      setImageIndex(newIndex);
    };
  
    useEffect(() => {
      fetchProductData();
    }, []);
  
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    async function saveHistory() {
      if (!data) return;
      
      try {
        const prevData = await getData('history');
        let newData = [];
  
        if (prevData) {
          const parsedData = JSON.parse(prevData);
          if (Array.isArray(parsedData)) {
            newData = parsedData;
          }
        }
  
        newData.push(data);
        const refinedArray = [...new Set(newData)];
        await storeData('history', JSON.stringify(refinedArray));
      } catch (err) {
        console.log('Error saving data:', err);
      }
    }
  
    const handleSave = () => {
      setSaved(!saved);
      dispatch(setToggleMessage(saved ? 'Removed from saved' : 'Product saved!'));
    };
  
    const handleShare = () => {
      // Implement share functionality
      dispatch(setToggleMessage('Share link copied to clipboard'));
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
  
    return (
      <SafeAreaView style={styles.safeArea}>
        {/* <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> */}
        
        <Animated.ScrollView
          style={{ opacity: fadeAnim }}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Image Gallery */}
          <View style={styles.imageContainer}>
            <TouchableWithoutFeedback onPress={handleImageTouch}>
              <View style={styles.imageWrapper}>
                <Thumbnail 
                  thumbnail_id={
                    data?.sample_images?.length
                      ? data.sample_images[imageIndex]
                      : data?.thumbnail_id
                  } 
                  style={styles.productImage}
                />
                {data?.sample_images?.length > 1 && (
                  <View style={styles.imagePagination}>
                    {data.sample_images.map((_, index) => (
                      <View 
                        key={index} 
                        style={[
                          styles.paginationDot,
                          index === imageIndex && styles.activeDot
                        ]} 
                      />
                    ))}
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
            
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
                <TouchableOpacity style={styles.wpButton}>
                  <WpSvg height={20} width={20} />
                  <Text style={styles.wpText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton}>
                  <CallSvg height={18} width={18} />
                  <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
  
            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Mid description={data?.description} />
            </View>
  
            {/* Seller Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Seller Information</Text>
              <Btm user_id={data?.user_id} />
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
            <Ionicons name={"heart"} size={20} color={"#FF4500"} />
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
            onPress={() => navigation.navigate('user-new-order', { data })}
          >
            <Text style={styles.orderButtonText}>Order Now</Text>
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
      position: 'relative',
    },
    imageWrapper: {
      width: '100%',
      height: 350,
      backgroundColor: '#f8f8f8',
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    orderButtonText: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 16,
    },
  });