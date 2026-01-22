import React, { 
  useEffect, 
  useState 
} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from 'react-native';
import DropdownComp from "../reusables/Dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tools from '../utils/generalHandler';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { set_deals } from '../../redux/info/deals';
import { getSocket } from '../services/socket';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const DisputeForBuyer = () => {

    const {
      user
    } = useSelector(s => s.user)
    const {
      deals
    } = useSelector(s => s.deals)
    let { 
      deal
    } = useRoute()?.params
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [formData, setFormData] = useState({
      disputeType: '',
      disputeTypeOthers: null,
      disputeDescription: '',
      preferredResolution: '',
      disputeProof: [],     
    });

    const [errors, setErrors] = useState({});

    const [socket, setSocket] = useState(null);
    const disputes_with_proof = ['wrong_item', 'damaged_item'];

    useEffect(() => {
      setFormData((prev) => ({...prev, disputeProof: [...uploadedImages]}))
    }, [uploadedImages])

    useEffect(() => {
      if (!disputes_with_proof.includes(formData.disputeType)) {
        if(uploadedImages.length > 0){
          uploadedImages.map(async(item) => {
            await deleteFromServer(item)
          });
        }
      }
    }, [formData.disputeType])

    useEffect(() => {
      const socket = getSocket();
      setSocket(socket);
    }, [deal]);

    const disputeReasons = [
      // { label: "Item not received", value: "not_received" },
      { label: "Item not as described / Wrong item", value: "wrong_item" },
      { label: "Damaged or defective item", value: "damaged_item" },
      { label: "Late delivery", value: "late_delivery" },
      { label: "Other (with text field)", value: "others" }
    ];
    

    const preferredResolution = [
      { label: "Request full refund", value: "full_refund" },
      // { label: "Request replacement / resend item", value: "replacement" }
    ];
    const handleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ''
        }));
      }
    };


    const validateForm = () => {

      const newErrors = {};

      if (!formData.disputeType) { 
        newErrors.disputeType = 'Please select dispute type';
      }

      if (formData.deliveryMethod === 'courier' && !formData.courierType) {
        newErrors.courierType = 'Please select courier service type';
      }

      if (!formData.disputeDescription.trim()) {
        newErrors.disputeDescription = 'Please provide description of your dissatisfaction';
      }

      if (!formData.preferredResolution) {
        newErrors.preferredResolution = 'Please select resolution for this dispute';
      }
        
      if(formData.disputeType === 'others' && !formData.disputeTypeOthers) {
        newErrors.disputeTypeOthers = 'Please provide your dispute reason'
      }
        
      if(disputes_with_proof.includes(formData.disputeProof) && formData.disputeProof.length === 0) {
        newErrors.disputeTypeOthers = 'Please provide an image for evidence'
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = () => {
      if (validateForm()) {
      setLoading(true);
        socket.emit(
          'deal_dispute',
          {
            room_id: Tools.generateConversationId(user.user_id, deal.partner.user_id),
            order: deal.order,
            userId: user.user_id,
            date: new Date(), 
            formData,
            
          },
          callback => { 
            const { success, data } = callback;   
            const {
              proof,
              updatedDeal
            } = data;
            if (success) {
            
              dispatch(set_deals(  
                deals.map(item =>
                  item.order.order_id === updatedDeal.order_id
                  ? { ...item, order: updatedDeal }
                  : item 
                )
              ));
              Alert.alert(  
                "Dispute raised successfully",
                "The vendor has been notified about your dispute. They will review the details and confirm whether the issue you reported is accurate. Once the vendor responds, their confirmation and feedback will be sent back to you for further action or resolution.",
                [
                  // { text: "Cancel", style: "cancel" },
                  { 
                    text: "Continue",
                    onPress: () => {
                      navigation.navigate('deal_buyer', {deal: {...deal, order: data}})
                    },
                  },
                ]
              );
            } else {
              setLoading(false)              
              Alert.alert("Error", "Unable to update this deal. Please try again.");
            }
          }     
        );
      }
    };

    const updateData = (data, name, value) => {
      if(name === 'dispute_type'){
        setFormData(prev => ({...prev, disputeType: value}))
      }else if(name === 'preferred_resolution'){
        setFormData(prev => ({...prev, preferredResolution: value}))
      }else if(name == 'delivery_time'){
        setFormData(prev => ({...prev, deliveryTime: value}))
      }
    }

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

    const uploadToServer = async (image) => {
        try {
            setLoading(true); // Correct loading state
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
            setLoading(false); // Correct loading state
        }
    };

    const deleteFromServer = async (url) => {
        try {
            setLoading(true);
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
            setLoading(false);
        }
    };
    
    const isProofable = disputes_with_proof.includes(formData.disputeType)
    ? formData.disputeProof.length > 0
    : true;

    const isFormValid = isProofable && formData.disputeType && 
    (formData.disputeType !== 'others' || formData.disputeTypeOthers) && 
    formData.disputeDescription.trim() && formData.preferredResolution;
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        {loading &&
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
            <ActivityIndicator size={'large'} color={'#FFA500'}></ActivityIndicator>
          </View>
        }
        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 35}
        >
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            
            {/* Additional Information */}
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={20} color="#FFA500" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Dispute Best Practices</Text>
                <Text style={styles.infoText}>
                  {/* •  */}
                  If this dispute is approved as valid by the vendor, your money will be refunded after the vendor confirms you returned the item {'\n'}Else If this dispute is not approved by the vendor, then the dispute will be escalated{'\n'}
                </Text>
              </View>
            </View>
            {/* Dispute Reason Section*/}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="warning-outline" size={20} color="#FFA500" />
                <Text style={styles.sectionTitle}>Dispute Reason</Text>
              </View>
              <Text style={styles.sectionDescription}>
                Choose the reason that best describes your dispute.
              </Text>
          
              <DropdownComp
                dropdownData={disputeReasons}
                placeholder="Select dispute type"
                fieldName={"label"}
                input_name={"dispute_type"}
                // dropdownPosition={'top'}
                updateData={updateData}
                isValueField={true}
              />
              {errors.disputeType ? (
                <Text style={styles.errorText}>{errors.disputeType}</Text>
              ) : null}
            </View>

            {/* Courier Type Section - Conditionally Rendered */}
            {formData.disputeType === 'others' && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="business-outline" size={20} color="#FFA500" />
                  <Text style={styles.sectionTitle}>State your dispute reason</Text>
                </View>
                
                <TextInput
                  style={[
                    styles.textInput,
                    errors.currentLocation && styles.inputError,
                    styles.locationInput
                  ]}
                  placeholder="State the reason you created this dispute e.g: we had a misunderstanding"
                  placeholderTextColor="#9CA3AF"
                  value={formData.disputeTypeOthers}
                  onChangeText={(text) => handleInputChange('disputeTypeOthers', text)}
                  multiline
                />
                {errors.disputeType ? (
                  <Text style={styles.errorText}>{errors.disputeType}</Text>
                ) : null}
              </View>
            )}
           
            {/* Dispute Description Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="document-text-outline" size={20} color="#DC2626" />
                <Text style={styles.sectionTitle}>Dispute Description</Text>
              </View>
              <Text style={styles.sectionDescription}>
                Describe how this issue affects the item or service you received.
              </Text>
          
              <View style={styles.locationContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.currentLocation && styles.inputError,
                    styles.locationInput
                  ]}
                  placeholder="Provide brief description about your dissatisfaction about the item or service."
                  placeholderTextColor="#9CA3AF"
                  value={formData.disputeDescription}
                  onChangeText={(text) => handleInputChange('disputeDescription', text)}
                  multiline
                />
              </View>
              {errors.disputeDescription ? (
                <Text style={styles.errorText}>{errors.disputeDescription}</Text>
              ) : null}
              <Text style={styles.helperText}>
                This helps builds trust with the community.
              </Text>
            </View>

            {/* Upload Section */}
            <View style={{padding: 10}}>
              {
                disputes_with_proof.includes(formData.disputeType) &&
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
              }
            </View>
            
            {/* Preferred Solution Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="construct-outline" size={20} color="#F59E0B" />
                <Text style={styles.sectionTitle}>Preferred Solution</Text>
              </View>
              <Text style={styles.sectionDescription}>
                How do you want this dispute resolved?
              </Text>
          
              <DropdownComp
                dropdownData={preferredResolution}
                placeholder="Select preferred resolution"
                fieldName={"label"}
                input_name={"preferred_resolution"}
                isValueField={true}
                dropdownPosition={'top'}
                updateData={updateData}
              />
              {errors.preferredResolution ? (
                <Text style={styles.errorText}>{errors.preferredResolution}</Text>
              ) : null}
              <Text style={styles.helperText}>
                This tells the action to be executed
              </Text>
            </View>
          
          </ScrollView>
          {/* Fixed Submit Button */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[
                styles.submitButton,
                isFormValid ? styles.submitButtonActive : styles.submitButtonDisabled
              ]}
              onPress={e => {
                Alert.alert(
                  "Confirm Dispute Submission",
                  "Are you sure you want to raise a dispute against this vendor? Doing so will temporarily halt the current transaction process (this review period typically takes a few days). Please note that initiating a dispute does not guarantee an automatic refund. The outcome depends on the evidence provided and the conditions outlined in our dispute resolution policy. This means there is a fair 50-50 chance of receiving a refund or the funds being released to the vendor, based on the findings of our review.",
                  [
                    {
                      text: "Learn More",
                      onPress: () => {
                        ''
                      }
                    },
                    {
                      text: "Continue",
                      style: "default",
                      onPress: () => {
                        handleSubmit()
                      }
                      
                    },
                    
                    {
                      text: "Cancel",
                      style: "destructive"
                    },
                  ]
                )
              }}
              disabled={!isFormValid} 
            >
              <Ionicons 
                name="checkmark-circle" 
                size={20} 
                color="#FFFFFF" 
                style={styles.buttonIcon}
              />
              <Text style={styles.submitButtonText}>
                Raise dispute
              </Text>
            </TouchableOpacity>
            
            {!isFormValid && (
              <Text style={styles.footerHint}>
                Complete all fields to raise dispute
              </Text>
            )}
          </View>
        </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
    marginBottom: 25
  },
  scrollContent: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationInput: {
    flex: 1,
    marginRight: 12,
  },
  locationButton: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginTop: 4,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff4e0',
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonActive: {
    backgroundColor: '#FFA500',
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
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
    borderColor: '#FFA500',
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
    backgroundColor: '#FFA500',
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
    color: '#FFA500',
    fontWeight: '500',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 12,
    color: '#ff4444',
    marginTop: 4,
    fontWeight: '500',
  },
  footerHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default DisputeForBuyer;