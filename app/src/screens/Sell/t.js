import React, { useState, useEffect } from 'react';
import { 
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
  Vibration
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { set_drawer } from '../../../../redux/vendor/drawer';
// import Subscription from '../../components/Sell/Subscription';
import UploadBtn from '../../components/Sell/UploadBtn';
import Performance from '../../components/Sell/Performance';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { getData } from '../../../utils/AsyncStore.js';
import SubscriptionModal from './SubModal.js';
import Subscription from './Sub.js';
import { setUserAuthTo } from '../../../../redux/reducer/auth.js';
import CustomModal from '../../utils/CustomModal.js';
// import  { Paystack }  from 'react-native-paystack-webview';
export default function Sell() {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const navigation = useNavigation();
  const {user} = useSelector(s => s.user)
  const [formError, setFormError] = useState('');

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

  // Simulate checking if shop exists in DB
  useEffect(() => {
    
    (async function getUser(params) {
      let user = await getData('user');
      const id = JSON.parse(user).user_id
      let res = await fetch(`https://cs-server-olive.vercel.app/vendor/shop?user_id=${id}`)
      handleInputChange('user_id', id)
      let response = await res.json()
      console.log("response: ", response)
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
    fetch(`https://cs-server-olive.vercel.app/vendor/create-shop`, {
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
  const dispatch = useDispatch()

  if(!user){
    return(
      <>
      { !user && 
        <View style={{
          height: '100%',
          width: '100%',
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center' 
        }}>
          <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', marginRight: 15, borderRadius: 50, paddingVertical: 7, paddingHorizontal: 15}} onPress={e => {
              dispatch(setUserAuthTo(true))
          }}>
            <Text style={{
              color: '#FF4500',
              paddingRight: 8
            }}>Login</Text>
            <Ionicons name={"enter-outline"} size={18} color={"#FF4500"} />
          </TouchableOpacity>
        </View>
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
    <>
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
                <Ionicons name="chevron-forward" size={25} />
              </TouchableOpacity>
            ))}

          </View>

        </View> 
      </CustomModal>

      <ScrollView style={[styles.homeCnt, { height: screenHeight - 55 }]}>
        <UploadBtn navigation={navigation} toggleModal={toggleModal}/>
        <View style={styles.contentContainer}> 
          <Performance user_id={shopForm.user_id} />
          {/* <Subscription onPress={() => setIsSubscriptionModalVisible(true)} />  */}
        </View>
      </ScrollView>
      {/* <Subscription  />  */}
      {/* <SubscriptionModal
        visible={isSubscriptionModalVisible}
        onClose={() => setIsSubscriptionModalVisible(false)}
        onSelect={(tier) => {
          setIsSubscriptionModalVisible(false);
          setIsPaying(true)
          setPaymentData(tier)
          navigation.navigate('PaystackPayment', {
            amount: parseFloat(tier.price.replace('₦', '')),
            subscriptionPlan: tier.name
          });
        }}
      /> */}

      {/*
        isPaying && (
        <View style={{ flex: 1 }}>
          <Paystack  
            paystackKey="pk_live_13343a7bd4deeebc644070871efcdf8fdcf280f7"
            amount={PaymentData?.price}
            billingEmail={user?.email}
            activityIndicatorColor="green"
            onCancel={(e) => {
              // handle response here
            }}
            onSuccess={(res) => {
              // handle response here
            }}
            autoStart={true}
          />
        </View>
        )
      */}
    </> 
  );
}

const styles = StyleSheet.create({
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

});
// screens/ShopScreen.js