
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Vibration,
} from 'react-native';
import { debounce } from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import UploadBtn from '../../components/Sell/UploadBtn';
import CustomModal from '../../utils/CustomModal';
import Video from 'react-native-video';
import categoriesData from '../../../../../../../services.json'
import { launchImageLibrary } from 'react-native-image-picker';
import LoginButton from '../../utils/LogAlert';
import { set_products } from '../../../../../../../redux/products';
import axios from 'axios';
import { set_boost_modal } from '../../../../../../../redux/boost_modal';
import { set_sub_modal } from '../../../../../../../redux/sub';
const { width } = Dimensions.get('window');

const ShopScreen = () => {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const { user } = useSelector(s => s?.user);
  const { shop } = useSelector(s => s.shop);
  const { products } = useSelector(s => s.products);
  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch()
  const [shopExists, setShopExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shopLogo, setShopLogo] = useState(null);
  const [uploadingLogo, setIsLoadingLogo] = useState(false);
  const [shopForm, setShopForm] = useState({
    logo: '',
    shopName: '',
    description: '',
    address1: '',
    address2: '',
    address3: '',
    user_id: ''
  });

  let [review, set_review] = useState([])

  useEffect(() => {
    axios.get(`https://cs-server-olive.vercel.app/vendor/shop-reviews?shop_id=${shop?.shop_id}`)
    .then((res) => {
      set_review(res?.data?.data)
    }).catch(err=>console.log(err))
  }, [])

  const get_list_data = useCallback((id) => {
    setRefreshing(true)
    fetch(`https://cs-server-olive.vercel.app/vendor/products?user_id=${user?.user_id}`, {
      headers: {
        "Content-Type": "Application/json"
      }
    })   
    .then(async(result) => {
      let response = await result.json()
      setUserAds(response?.data)
      dispatch(set_products(response?.data))
      setLoading(false)
      setRefreshing(false)
    })       
    .catch((err) => {
      set_server_err(!true)
      Alert.alert('Network error, please try again.')
      console.log(err)
      setLoading(false)
      setRefreshing(false)
    })
  }, [])

  // Initial load
  useEffect(() => {
    get_list_data()
  }, [get_list_data, user]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      get_list_data()
    }, [get_list_data, user])
  )
  
  const onRefresh = () => {
    setRefreshing(true);
  };
  
  // Simulate checking if shop exists in DB
  useEffect(() => {
    (async function getUser(params) {
      let res = await fetch(`https://cs-server-olive.vercel.app/vendor/shop?user_id=${user?.user_id}`)
      handleInputChange('user_id', user?.user_id)
      let response = await res.json()
      if (response?.success) {
        setIsLoading(false);
        if (!response.data.length > 0) {
          setShopExists(false)
          
        } else {
          setShopExists(true)
        }
      }
    })()
  }, []);

  const handleInputChange = (field, value) => {
    setShopForm(prev => ({ ...prev, [field]: value }));
  };

  const selectShopLogo = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];
        await uploadToServer(image);
      }
    });
  };

  const uploadToServer = async (image) => {
    try {
      setIsLoadingLogo(true); // Correct loading state
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        name: image.fileName || `photo_${Date.now()}.jpg`,
        type: image.type || 'image/jpeg',
      });

      const response = await axios.post('https://cs-server-olive.vercel.app/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const result = response.data;
      console.log(result.data.url);

      if (result.success && result.data.url) {
        handleInputChange('logo', result.data.url);
        setShopLogo(result.data.url); // Updated for proper Image rendering
      }
    } catch (err) {
      console.error('Upload failed:', err.message);
    } finally {
      setIsLoadingLogo(false); // Correct loading state
    }
  };

  const deleteFromServer = async (url) => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://cs-server-olive.vercel.app/delete', {
        url
      });

      if (response.data && response.data.data.result === "ok") {
        setShopLogo(null)
        handleInputChange('logo', '');
        selectShopLogo()
      }
    } catch (err) {
      console.error('Upload failed:', err.message);

    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!shopForm.shopName || shopForm.shopName.trim().length < 3) {
      Vibration.vibrate(200)
      setFormError('Shop name must be at least 3 characters long.');
      return false;
    }
    if (!shopForm.logo) {
      Vibration.vibrate(200)
      setFormError('Shop logo is needed.');
      return false;
    }
    if (!shopForm.address1 || !shopForm.address2 || !shopForm.address3) {
      Vibration.vibrate(200)
      setFormError('All address fields are required.');
      return false;
    }
    setFormError(''); // Clear any previous errors
    return true;
  };
  
  const handleSubmit = () => {
    console.log(shopForm)

    if (!validateForm()) return;

    setIsLoading(true)
    fetch(`http://192.168.0.4:9090/vendor/create-shop`, {
      method: 'post',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(shopForm)
    })
    .then(async (result) => {
      setIsLoading(!true)
      
      let response = await result.json(); 
      console.log(response)
      if (response?.success) {
        setShopExists(true);
        
      }
    })
    .catch((error) => {
      setIsLoading(!true)
      
      console.log(error)
    })
    // After successful submission:
    // setShopExists(true);
  };

  const removePhoto = async () => {
    await deleteFromServer(shopLogo)
  };

  const [customModalVisible, setcustomModalVisible] = useState(false);
  const toggleCustomModal = () => {
    setcustomModalVisible(!customModalVisible);
    
  }

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    let p = (shop.subscription.plan)
    let publishable = p === 'free' ? 2 : p === 'basic' ? 7 : p === 'standard' ? 20 : 10000000000
    
    if (userAds.length < publishable) {
      setModalVisible(!modalVisible);
    } else {
      Alert.alert(
        "Upgrade Needed", "Upgrade your plan to keep reaching more customers.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => console.log("User canceled"),
          },
          {
            text: "Upgrade now",
            onPress: () => {
              console.log("Redirecting to login...");
              dispatch(set_sub_modal(1));
              // navigation.navigate("Login"); // if using react-navigation
            },
          },
        ],
        { cancelable: false }
      );
    }
  };


  const getCategoryImage = (categoryName) => {
    console.log(categoriesData)
    for (let cat of categoriesData.items.category) {
      const keys = Object.keys(cat).filter(k => k !== "img"); // exclude "img"
      for (let key of keys) {
        if (key === categoryName) {
          return cat.img; // return the image if category matches
        }
      }
    }
    return null; // fallback if not found
  };

  const renderPerformanceMetric = (icon, value, label) => (
    <View style={styles.metricCard}>
      <View style={styles.metricIconContainer}>
        <Icon name={icon} size={24} color="#FF4500" />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
  
  const handlePromotePress = (data) => {
    navigation.navigate('user-metrics', {
      data: data
    })
  };



  const renderAdItem = ({ item }) => (
    
    <TouchableOpacity 
      style={styles.adCard}
      onPress={() => navigation.navigate('user-metrics', {data: item})}
    >
      {item?.purpose !== 'accomodation' ? (
        <TouchableOpacity onPress={e=>handlePromotePress(item)}>
          <Image
            style={styles.adImage}
            source={{ uri: getCategoryImage(item?.category) || item?.thumbnail_id }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={e=>handlePromotePress(item)} style={{
          height: 100,          // ✅ explicit height (same as Image for consistency)
          width: 100,
          backgroundColor: '#000',
          // borderRadius: 5,
          overflow: 'hidden', 
        
        }}>
          <Video
            source={{ uri: item?.thumbnail_id }}
            style={styles.adImage}
            resizeMode="cover"
            muted={true}
            paused
          />
        </TouchableOpacity>
      )}

      {/* Boost Badge/Promote Button - Overlay on image */}
      {eval(item.promotion) ? (
        <View style={styles.boostBadge}>
          <Icon name="rocket" size={12} color="#FFF" />
          <Text style={styles.boostBadgeText}>Promoted</Text>
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.promoteButton} 
          onPress={e=>handlePromotePress(item)}
          activeOpacity={0.7}
        >
          <Icon name="rocket-outline" size={12} color="#FFF" />
          <Text style={styles.promoteButtonText}>Promote now</Text>
        </TouchableOpacity>
      )}
      <View style={styles.adContent}>
        <Text style={styles.adTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.adPrice}>
          {
            item?.purpose === 'product'
            ?
            '₦' + new Intl.NumberFormat('en-us').format(item?.price)
            :
            item?.purpose === 'accomodation'
            ?
            '₦' + new Intl.NumberFormat('en-us').format(item?.price) + ' to pay ₦' + new Intl.NumberFormat('en-us').format(item?.others?.lodge_data?.upfront_pay) 
            : 
            '' 
          }
        </Text>
        <View style={styles.adStats}>
          <View style={styles.statItem}>
            <Icon name="eye" size={14} color="#666" />
            <Text style={styles.statText}>{item.views} views</Text>
          </View>
          <View style={[styles.statusBadge, item.status === 'sold' && styles.soldBadge]}>
            <Text style={styles.statusText}>
              {item?.state?.state === 'active' ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.loadingText}>Loading your shop...</Text>
      </View>
    );
  }

  if(!user){
    return(
      <>
      { !user && 
        <LoginButton text="Sign in to access your personalized dashboard" style={{ backgroundColor: '#2196F3' }} />
      }
      </>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }
  
  if (!shopExists) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {formError ? (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>{formError}</Text>
        ) : null}

        {uploadingLogo && 
          <View style={{height: screenHeight, width: screenWidth, position: 'absolute', top: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,.3  )', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="small" color="#FF4500" />
          </View>
        }
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formTitle}>Register Your Shop</Text>
          
          {/* Shop Logo Upload */}
          <View style={styles.logoUploadContainer}>
            <TouchableOpacity 
              style={styles.logoUploadButton}
              onPress={selectShopLogo}
              disabled={uploadingLogo}
            >
              {shopLogo ? (
                <>
                  <Image source={{ uri: shopLogo }} style={styles.logoPreview} />
                  {/* <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removePhoto()}
                  >
                    <Ionicons name="close" size={20} color="#fff" />
                  </TouchableOpacity> */}
                  {uploadingLogo && (
                    <>
                      <View style={styles.uploadOverlay}>
                        <ActivityIndicator color="#FFF" />
                      </View>
                      
                    </>
                  )}
                </>
              ) : (
                <View style={styles.logoPlaceholder}>
                  <Ionicons name="camera" size={32} color="#FF4500" />
                  <Text style={styles.logoPlaceholderText}>Add Shop Logo</Text>
                </View>
              )}
            </TouchableOpacity>
            {shopLogo && (
              <TouchableOpacity 
                style={styles.changeLogoButton}
                onPress={removePhoto}
              >
                <Text style={styles.changeLogoText}>Change Logo</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Shop Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter shop name"
              value={shopForm.shopName}
              onChangeText={(text) => handleInputChange('shopName', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description (optional)</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Describe your shop"
              value={shopForm.description}
              onChangeText={(text) => handleInputChange('description', text)}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address 1 (Town)</Text>
            <TextInput
              style={styles.input}
              placeholder="Address 1 (Town)"
              value={shopForm.address1}
              onChangeText={(text) => handleInputChange('address1', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address 2 (Juction / Str name)</Text>
            <TextInput
              style={styles.input}
              placeholder="Address 2 (Juction / Str name)"
              value={shopForm.address2}
              onChangeText={(text) => handleInputChange('address2', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address 3 (Lodge or Building name)</Text>
            <TextInput
              style={styles.input}
              placeholder="Address 3 (Lodge or Building name)"
              value={shopForm.address3}
              onChangeText={(text) => handleInputChange('address3', text)}
            />
          </View>

          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit}
            disabled={uploadingLogo}
          >
            {uploadingLogo ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.submitButtonText}>Register Shop</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  

  return (
    <View style={styles.container}>

      <CustomModal 
        visible={modalVisible} 
        onClose={toggleModal}
        position="bottom"
      >
        <View style={{ width: '100%' }}>
          <View style={{ padding: 5, width: '100%' }}>
            {[
              {
                title: 'Sell My Products',
                description: 'List your goods and items for buyers.',
                purpose: 'product',
              },
              {
                title: 'Advertise Accommodation',
                description: 'Promote your lodge or rental space.',
                purpose: 'accomodation',
              },
              {
                title: 'Advertise My Service',
                description: 'Showcase your skills and services.',
                purpose: 'service',
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  toggleModal();
                  navigation.navigate('user-new-listing', { update: false, purpose: item.purpose });
                }}
                style={styles.modalOption}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.modalOptionText}>{item.title}</Text>
                  <Text style={styles.modalOptionDescription}>{item.description}</Text>
                </View>
                <Icon name="chevron-forward" size={25} />
              </TouchableOpacity>
            ))}

          </View>

        </View> 
      </CustomModal>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
        }
      >
        
        {/* Publish Ad Button */}
        <UploadBtn navigation={navigation} toggleModal={toggleModal}/>

        {/* Performance Metrics */}
        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <TouchableOpacity style={styles.metricsGrid} activeOpacity={.8} onPress={e => {
            navigation.navigate('user-shop')
          }}>
            {renderPerformanceMetric('eye', userAds.reduce((sum, item) => sum + parseInt(item.views), 0), 'Total Views')}
            {renderPerformanceMetric('stats-chart', userAds.reduce((sum, item) => sum + parseInt(item.impression), 0), 'Total Impression')}
            {renderPerformanceMetric('star-half', review.length, 'Total Reviews')}
            {renderPerformanceMetric('cube', userAds.length, 'Total Ads')}
          </TouchableOpacity>
        </View>
 
        {/* Your Ads Section */}
        <View style={styles.adsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Ads ({userAds?.length})</Text>
            <TouchableOpacity onPress={e => navigation.navigate('user-inventory', {data: userAds})}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View> 

          {userAds?.length > 0 ? (
            <FlatList
              data={[...userAds].splice(0,4)}
              renderItem={renderAdItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.adsList}
            />
          ) : (
            <View style={styles.emptyState}>
              <Icon name="images" size={50} color="#CCC" />
              <Text style={styles.emptyStateText}>No ads published yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Start by publishing your first ad to get noticed!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Boost/Promote elements
  boostBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 100,
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
  promoteButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 25,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 0,
    gap: 4,
    zIndex: 10,
  },
  promoteButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  serviceInfo: {
    padding: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  serviceMeta: {
    // Your existing styles
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  serviceStats: {
    fontSize: 12,
    color: '#999',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  modalOptionDescription: {
    fontSize: 13,
    color: '#555',
    marginTop: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  publishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4500',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  publishButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  performanceSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF6F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  adsSection: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '500',
  },
  adsList: {
    gap: 6,
  },
  adCard: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  adImage: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
  },
  adContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  adTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  adPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 8,
  },
  adStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  soldBadge: {
    backgroundColor: '#666',
  },
  statusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#FFF',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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
  removeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    height: 30,
    width: 30,
    backgroundColor: 'red',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoUploadContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoUploadButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF4500',
    overflow: 'hidden',
  },
  logoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholderText: {
    color: '#FF4500',
    marginTop: 8,
    fontSize: 12,
  },
  logoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeLogoButton: {
    marginTop: 10,
  },
  changeLogoText: {
    color: '#FF4500',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeCnt: {
    height: 'auto',
    position: 'relative',
    width: '100%',
    padding: 0,
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    height: 'auto',
    marginTop: 10,
  },
});

export default ShopScreen;