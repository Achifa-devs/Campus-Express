import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropdownComp from '../../reusables/Dropdown';
import Tools from '../../utils/generalHandler';
import axios from 'axios';
import { getSocket } from '../../services/socket';
import { useDispatch, useSelector } from 'react-redux';
import { set_deals } from '../../../redux/info/deals';
import { useNavigation, useRoute } from '@react-navigation/native';
const socket = getSocket(); 

const ProofOfDeliveryUpload = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()    
    const {
      deals
    } = useSelector(s => s.deals)
    const {
      user
    } = useSelector(s => s.user)
    const { 
      deal
    } = useRoute()?.params;
    

    const handleLaunchGallery = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
        };

        launchImageLibrary(options, (response) => {
            handleImageResponse(response);
        });
    };

    const handleImageResponse = async(response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            Alert.alert('Error', 'Failed to pick image: ' + response.errorMessage);
        } else if (response.assets && response.assets[0]) {
            const image = response.assets[0];
            await uploadToServer(image);
        }
    };

    const handleOrderAction = (event, newStatus) => {
      if (uploadedImages.length === 0) {
        Alert.alert('Image required', 'Please upload at least one image as proof of delivery.');
        return;
      }
      
      if (!description.trim()) {
        Alert.alert('Description required', 'Please provide a description for this delivery evidence.');
        return;
      }
      if(!socket){
        Alert.alert('Failed to update!')
        return; 
      }; 
      setIsLoading(true)
      socket.emit(
        'deal_update',
        {
          room_id: Tools.generateConversationId(user.user_id, deal.partner.user_id),
          order: deal.order,
          userId: user.user_id,
          date: new Date(),
          new_stage: event.split('_')[1],
          nxt_stage: newStatus
        },
        callback => { 
          const { success, data } = callback;   
          if (success) {
            dispatch(set_deals(  
              deals.map(item =>
                item.order.order_id === data.order_id
                  ? { ...item, order: data }
                  : item
              )
            ));
            handleSubmit()
            // setOrderStatus(newStatus);
            // setLoading(false)  
          } else {
            // setLoading(false)              
            Alert.alert("Error", "Unable to update this deal. Please try again.");
          }
        }     
      );
    };

    const navigation = useNavigation()

    const handleSubmit = () => {
     
      try {
        if(!socket)return;
        socket.emit('deal_proof', {
            method,
            location,
            description,
            uploadedImages,
            deal: deal.order,
            date: new Date()
        }, cb => {
            const {
                data, success
            } = cb;


            if (success) {
                const {
                    proof,
                    updatedDeal,
                } = data;

                dispatch(set_deals(
                    deals.map(item =>
                        item.order.order_id === updatedDeal.order_id
                        ? { ...item, order: updatedDeal }
                        : item
                    )
                )) 
                navigation.navigate('deal_vendor', {deal: {...deal, order: updatedDeal}})
            }else{
                throw new Error("Internal server error", "Please try again!");
                
            }
        })
      } catch (error) {
        console.log(error);
        Alert.alert("Internal server error", "Please try again!")
      }
        
    };

    const uploadToServer = async (image) => {
        try {
            setIsLoading(true); // Correct loading state
            const formData = new FormData();
            formData.append('file', {
                uri: image.uri,
                name: image.fileName || `photo_${Date.now()}.jpg`,
                type: image.type || 'image/jpeg',
            });

            const response = await axios.post('https://cs-node.vercel.app/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const result = response.data;
            console.log(result.data.url);

            if (result.success && result.data.url) {
                // handleInputChange('logo', result.data.url);
                setUploadedImages(prev => [...prev, result.data.url]);
            }
        } catch (err) {
            console.error('Upload failed:', err.message);
        } finally {
            setIsLoading(false); // Correct loading state
        }
    };

    const deleteFromServer = async (url) => {
        try {
            setIsLoading(true);
            const response = await axios.post('https://cs-node.vercel.app/delete', {
                url
            });

            if (response.data && response.data.data.result === "ok") {
                
                if (uploadedImages.length > 1) {
                    let old_img = uploadedImages.filter(item => (item !== url))
                    setUploadedImages(old_img);
                }else{
                    setUploadedImages([])
                }
            }
        } catch (err) {
            console.error('Upload failed:', err.message);

        } finally {
            setIsLoading(false);
        }
    };

    const [method, set_method] = useState(null);
    const [location, set_location] = useState(null);
    const [location_list, set_location_list] = useState([])

    const updateData = (data, input_name) => {
        if (input_name === 'location') {
            set_method(data)
        }else{
            set_location(data)
        }
    }

    useEffect(() => {
        if (!method) return;

        const matchedCategory = deliveryCategories.find(item => item.label === method);
        
        if (matchedCategory) {
            set_location_list(
            matchedCategory.examples.map(example => ({ label: example }))
            );
        } else {
            set_location_list([]); // fallback if no match found
        }
    }, [method]);


    const deliveryCategories = [
        {
            label: "Lodge/Dorm Delivery",
            examples: [
                "Customer’s doorstep",
                "Customer’s residence",
                "Apartment reception",
            ],
            description: "Direct drop-off at or near the customer’s home."
        },
        {
            label: "Pickup Location",
            examples: [
                "Vendor’s shop",
            ],
            description: "Customer travels to pick up the item from the vendor or a designated collection point."
        },
        {
            label: "Public Meet Point",
            examples: [
                "Campus gate",
                "Bus terminal",
                "Market junction",
            ],
            description: "A neutral, safe public location where both vendor and customer meet for the exchange."
        }
    ];
 
  return (
    <>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {
                isLoading &&
                <View style={{  
                    height: '100%', 
                    width: '100%',
                    position: 'absolute',
                    top: 1,
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
            {/* Summary Section */}
            <View style={styles.summary}>
                <Text style={styles.summaryTitle}>What is Proof of Delivery Evidence?</Text>
                <Text style={styles.summaryText}>
                Proof of Delivery (POD) evidence includes photos or documents that verify 
                successful delivery of goods to the correct recipient. This serves as:
                </Text>
                <View style={styles.bulletContainer}>
                <Text style={styles.summaryBullet}>• Visual confirmation of delivery completion</Text>
                <Text style={styles.summaryBullet}>• Protection against false "not delivered" claims</Text>
                <Text style={styles.summaryBullet}>• Quality assurance for delivery standards</Text>
                <Text style={styles.summaryBullet}>• Legal evidence in case of disputes</Text>
                </View>
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Delivery Method *</Text>
                <DropdownComp 
                    dropdownData={
                        deliveryCategories
                    }
                    updateData={updateData}
                    fieldName={'label'} 
                    input_name={'location'}
                    placeholder={'Select delivery method'}
                />
                <Text style={styles.helperText}>
                    {deliveryCategories.filter(item => item.label === location)[0]?.description || ''}
                </Text>
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Delivery Location*</Text>
                <DropdownComp 
                    dropdownData={
                        location_list
                    }
                    fieldName={'label'} 
                    input_name={'location_list'}
                    updateData={updateData}
                    placeholder={'Select delivery location'}
                />
                <Text style={styles.helperText}>
                    {/* {deliveryCategories.filter(item => item.label === location)[0]?.description || ''} */}
                </Text>
            </View>

            {/* Description Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Delivery Description *</Text>
                <TextInput
                style={styles.textInput}
                placeholder="Describe the delivery location, condition, or any special notes..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
                />
                <Text style={styles.helperText}>
                    Example: "Package delivered at front door, recipient confirmed receipt"
                </Text>
            </View>

            {/* Upload Section */}
            <View style={styles.uploadSection}>
                <Text style={styles.label}>
                Upload Evidence Images ({uploadedImages.length}/2) *
                </Text>
                <Text style={styles.helperText}>
                Upload 1-2 clear photos showing the delivered items at the destination
                </Text>

                {/* Image Preview Grid */}
                <View style={styles.imageGrid}>
                {uploadedImages.map((image, index) => (
                    <View key={image.id} style={styles.imageContainer}>
                    <Image source={{ uri: image || '' }} style={styles.image} />
                    <TouchableOpacity 
                        style={styles.removeButton}
                        onPress={() => deleteFromServer(uploadedImages[index])}
                    >
                        <Text style={styles.removeText}>×</Text>
                    </TouchableOpacity>
                    </View>
                ))}
                
                {/* Upload Button - Show if less than 2 images */}
                {uploadedImages.length < 2 && (
                    <TouchableOpacity style={styles.uploadButton} onPress={handleLaunchGallery}>
                    <View style={styles.uploadIconContainer}>
                        <Text style={styles.uploadIcon}>+</Text>
                    </View>
                    <Text style={styles.uploadText}>Add Image</Text>
                    </TouchableOpacity>
                )}
                </View>

                {/* Validation Message */}
                {uploadedImages.length === 0 && (
                <Text style={styles.errorText}>At least one image is required</Text>
                )}
            </View>


           
        </ScrollView>
        {/* Submit Button */}
        <View style={styles.bottomBar}>
            <TouchableOpacity
                style={[
                styles.submitButton,
                styles.bottomBtn,
                (uploadedImages.length === 0 || !description.trim()) && styles.submitButtonDisabled
                ]}
                onPress={e => {
                  handleOrderAction("deal_delivered", "evidence")
                }}
                disabled={uploadedImages.length === 0 || !description.trim() || !method || !location}
            >
                <Text style={styles.submitButtonText}>
                Submit Proof of Delivery
                </Text>
            </TouchableOpacity>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
    bottomBtn: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: 6,
    },
   bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingBottom: 10,
    },
  container: {
    flex: 1,
    padding: 8,
    marginBottom: 90,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  uploadSection: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 12,
    marginBottom: 8,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  removeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#FF4500',
    borderStyle: 'dashed',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  uploadIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  uploadText: {
    fontSize: 12,
    color: '#FF4500',
    fontWeight: '500',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 12,
    color: '#ff4444',
    marginTop: 4,
    fontWeight: '500',
  },
  submitButton: {

    backgroundColor: '#FF4500',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#FF4500',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    ...Platform.select({
      ios: {
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  summary: {
    backgroundColor: '#fff4e0',
    padding: 16,
    borderRadius: 4,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4500',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4500',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  bulletContainer: {
    marginLeft: 8,
  },
  summaryBullet: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
});

export default ProofOfDeliveryUpload;