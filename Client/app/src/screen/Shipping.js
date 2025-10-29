import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import DropdownComp from "../reusables/Dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tools from '../utils/generalHandler';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { set_deals } from '../../redux/info/deals';

const { width: screenWidth } = Dimensions.get('window');

const Shipping = () => {

  const {
    user
  } = useSelector(s => s.user)
  const {
    deals
  } = useSelector(s => s.deals)
  const {
    deal
  } = useRoute?.parms;
  const [loading, setLoading] = useState(false)
  

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    deliveryMethod: '',
    courierType: '',
    currentLocation: '',
    deliveryTime: ''
  });


  const [errors, setErrors] = useState({});

  const deliveryOptions = [
    { label: 'I will deliver it myself', value: 'self' },
    { label: 'Use a courier service (3rd party logistics)', value: 'courier' },
  ];

  const courierTypeOptions = [
    { label: '🚴 Bike Delivery', value: 'bike' },
    { label: '🚗 Car Delivery', value: 'car' },
    { label: '🚚 Van/Truck', value: 'truck' },
    { label: '📦 Way Bill (Pick up from park)', value: 'waybill' },
  ];

  const timeOptions = [
    { label: 'Half an hour', value: '30 mins' },
    { label: 'Within 1 hour', value: '1h' },
    { label: '1-3 hours', value: '3h' },
    { label: '3-6 hours', value: '6h' },
    { label: 'Same day delivery', value: 'same_day' },
    { label: 'Next day delivery', value: 'next_day' },
    { label: '2-3 days', value: '2-3d' },
    { label: '3-5 days', value: '3-5d' },
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

    if (!formData.deliveryMethod) {
      newErrors.deliveryMethod = 'Please select who will deliver the item';
    }

    if (formData.deliveryMethod === 'courier' && !formData.courierType) {
      newErrors.courierType = 'Please select courier service type';
    }

    if (!formData.currentLocation.trim()) {
      newErrors.currentLocation = 'Please provide current location';
    }

    if (!formData.deliveryTime) {
      newErrors.deliveryTime = 'Please select estimated delivery time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      socket.emit(
        'deal_update',
        {
          room_id: Tools.generateConversationId(user.user_id, deal.partner.user_id),
          order: deal.order,
          userId: user.user_id,
          date: new Date(),
          new_stage: "shipping",
          nxt_stage: "delivered"
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
            Alert.alert( 
              "Uploa",
              message,
              [
                { text: "Cancel", style: "cancel" },
                { 
                  text: "Confirm",
                  onPress: () => {
                    
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
    if(name === 'delivery_src'){
      setFormData(prev => ({...prev, deliveryMethod: value}))
    }else if(name === 'courier_type'){
      setFormData(prev => ({...prev, courierType: value}))
    }else if(name == 'delivery_time'){
      setFormData(prev => ({...prev, deliveryTime: value}))
    }
  }


  
  const isFormValid = formData.deliveryMethod && 
  (formData.deliveryMethod !== 'courier' || formData.courierType) && 
  formData.currentLocation.trim() && formData.deliveryTime;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
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
                <ActivityIndicator size={'large'} color={'#FF4500'}></ActivityIndicator>
              </View>
            }
            {/* Additional Information */}
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={20} color="#FF4500" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Shipping Best Practices</Text>
                <Text style={styles.infoText}>
                  • Ensure the item is properly packaged{'\n'}
                  • Include your contact number in the package{'\n'}
                  • Update the customer about shipping progress{'\n'}
                  • Keep tracking information handy
                </Text>
              </View>
            </View>
            {/* Delivery Method Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="person-outline" size={20} color="#FF4500" />
                <Text style={styles.sectionTitle}>Delivery Responsibility</Text>
              </View>
              <Text style={styles.sectionDescription}>
                Choose who will handle the delivery of this item to your customer
              </Text>
          
              <DropdownComp
                dropdownData={deliveryOptions}
                placeholder="Select who will deliver this item"
                fieldName={"label"}
                input_name={"delivery_src"}
                dropdownPosition={'top'}
                updateData={updateData}
                isValueField={true}
              />
              {errors.deliveryMethod ? (
                <Text style={styles.errorText}>{errors.deliveryMethod}</Text>
              ) : null}
            </View>
            {/* Courier Type Section - Conditionally Rendered */}
            {formData.deliveryMethod === 'courier' && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="business-outline" size={20} color="#FF4500" />
                  <Text style={styles.sectionTitle}>Courier Service Type</Text>
                </View>
                <Text style={styles.sectionDescription}>
                  Select the type of courier service you prefer for delivery
                </Text>
          
                <DropdownComp
                  dropdownData={courierTypeOptions}
                  placeholder="Choose courier type"
                  fieldName={"label"}
                  input_name={"courier_type"}
                  dropdownPosition={'top'}
                  isValueField={true}
                  updateData={updateData}
                />
                {errors.courierType ? (
                  <Text style={styles.errorText}>{errors.courierType}</Text>
                ) : null}
              </View>
            )}
            {/* Current Location Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="location-outline" size={20} color="#DC2626" />
                <Text style={styles.sectionTitle}>Current Item Location</Text>
              </View>
              <Text style={styles.sectionDescription}>
                Where is the item currently located before shipping?
              </Text>
          
              <View style={styles.locationContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    errors.currentLocation && styles.inputError,
                    styles.locationInput
                  ]}
                  placeholder="Enter current location (e.g., Miracle Junction, Ifite, Awka)"
                  placeholderTextColor="#9CA3AF"
                  value={formData.currentLocation}
                  onChangeText={(text) => handleInputChange('currentLocation', text)}
                  multiline
                />
                {/* <TouchableOpacity
                  style={styles.locationButton}
                  onPress={async(e) => {
                    const hasPermission = await Tools.requestLocationPermission();
                    if (!hasPermission) {
                      console.log('Permission not granted');
                      return;
                    }
                    const { latitude, longitude } = await Tools.getUserLocation()
                    const location = await Tools.getAddressFromCoordinates(latitude, longitude); 
                    console.log("location: ", location)
                  }}
                >
                  <Ionicons name="locate" size={20} color="#FF4500" />
                </TouchableOpacity> */}
              </View>
              {errors.currentLocation ? (
                <Text style={styles.errorText}>{errors.currentLocation}</Text>
              ) : null}
              <Text style={styles.helperText}>
                This helps builds trust with the customer.
              </Text>
            </View>
            {/* Delivery Time Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="time-outline" size={20} color="#F59E0B" />
                <Text style={styles.sectionTitle}>Estimated Delivery Time</Text>
              </View>
              <Text style={styles.sectionDescription}>
                How long will it take for the package to reach the customer?
              </Text>
          
              <DropdownComp
                dropdownData={timeOptions}
                placeholder="Select estimated delivery time"
                fieldName={"label"}
                input_name={"delivery_time"}
                isValueField={true}
                dropdownPosition={'top'}
                updateData={updateData}
              />
              {errors.deliveryTime ? (
                <Text style={styles.errorText}>{errors.deliveryTime}</Text>
              ) : null}
              <Text style={styles.helperText}>
                This helps set customer expectations for delivery
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
              onPress={handleSubmit}
              disabled={!isFormValid}
            >
              <Ionicons 
                name="checkmark-circle" 
                size={20} 
                color="#FFFFFF" 
                style={styles.buttonIcon}
              />
              <Text style={styles.submitButtonText}>
                Save Shipping Details
              </Text>
            </TouchableOpacity>
            
            {!isFormValid && (
              <Text style={styles.footerHint}>
                Complete all fields to save shipping configuration
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
    borderLeftColor: '#FF4500',
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
    backgroundColor: '#FF4500',
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
  footerHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default Shipping;