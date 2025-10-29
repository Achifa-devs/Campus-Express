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
} from 'react-native';
import DropdownComp from "../reusables/Dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');

const Shipping = () => {
  const [formData, setFormData] = useState({
    deliveryMethod: '',
    courierType: '',
    currentLocation: '',
    deliveryTime: '',
    deliveryRoute: '',
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

  const handleLocationDetection = () => {
    Alert.alert(
      'Detect Location',
      'Allow Campus Sphere to access your location to automatically fill your current address?',
      [
        { text: 'Not Now', style: 'cancel' },
        { 
          text: 'Allow', 
          onPress: () => {
            // Simulate location detection 
            setTimeout(() => {
              handleInputChange('currentLocation', 'Miracle Junction, Ifite, Awka');
              Alert.alert('Success', 'Location detected successfully!');
            }, 1000);
          }
        },
      ]
    );
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

    if (!formData.deliveryRoute.trim()) {
      newErrors.deliveryRoute = 'Please specify the delivery route';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Shipping Details Saved',
        'Your shipping information has been updated successfully.',
        [{ text: 'OK' }]
      );
      // Handle form submission here
      console.log('Form data:', formData);
    }
  };

  const updateData = (data, name, value) => {
    if(name === 'delivery_src'){
      setFormData(prev => ({...prev, deliveryMethod: value}))
    }else if(name === 'courier_type'){
      setFormData(prev => ({...prev, courierType: value}))
    }
  }


  
  const isFormValid = formData.deliveryMethod && 
  (formData.deliveryMethod !== 'courier' || formData.courierType) && 
  formData.currentLocation.trim() && 
  formData.deliveryTime && 
  formData.deliveryRoute.trim();

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
                  <Ionicons name="business-outline" size={20} color="#8B5CF6" />
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
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={handleLocationDetection}
                >
                  <Ionicons name="locate" size={20} color="#FF4500" />
                </TouchableOpacity>
              </View>
              {errors.currentLocation ? (
                <Text style={styles.errorText}>{errors.currentLocation}</Text>
              ) : null}
              <Text style={styles.helperText}>
                Be specific to help the delivery person locate the item easily
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
                onSelect={(value) => handleInputChange('deliveryTime', value)}
                error={errors.deliveryTime}
              />
              {errors.deliveryTime ? (
                <Text style={styles.errorText}>{errors.deliveryTime}</Text>
              ) : null}
              <Text style={styles.helperText}>
                This helps set customer expectations for delivery
              </Text>
            </View>
            {/* Delivery Route Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="map-outline" size={20} color="#10B981" />
                <Text style={styles.sectionTitle}>Delivery Route</Text>
              </View>
              <Text style={styles.sectionDescription}>
                Specify the route you'll follow for delivery
              </Text>
          
              <TextInput
                style={[
                  styles.textInput,
                  styles.textArea,
                  errors.deliveryRoute && styles.inputError
                ]}
                placeholder="Describe the delivery route (e.g., Ifite Road → Aroma Junction → UNIZIK Temp Site)"
                placeholderTextColor="#9CA3AF"
                value={formData.deliveryRoute}
                onChangeText={(text) => handleInputChange('deliveryRoute', text)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              {errors.deliveryRoute ? (
                <Text style={styles.errorText}>{errors.deliveryRoute}</Text>
              ) : null}
              <Text style={styles.helperText}>
                Include major landmarks and roads for better navigation
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