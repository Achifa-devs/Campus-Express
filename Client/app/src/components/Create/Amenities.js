import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Features({ updateFeatures, error }) {
  const screenWidth = Dimensions.get('window').width;

  // All available amenities
  const allAmenities = [
    "Balcony", "Tiled floor", "Wardrobe", "POP ceiling", "Ceiling fan", 
    "Bathtub", "Well", "Prepaid meter", "Water pump", "Public bathroom", 
    "Private bathroom", "Public kitchen", "Private kitchen", "Air conditioning",
    "Parking", "Security"
  ];

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [customAmenity, setCustomAmenity] = useState('');

  const toggleAmenity = (amenity) => {
    const newSelectedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(item => item !== amenity)
      : [...selectedAmenities, amenity];
    
    setSelectedAmenities(newSelectedAmenities);
    if (updateFeatures) {
      updateFeatures(newSelectedAmenities);
    }
  };

  const addCustomAmenity = () => {
    if (customAmenity.trim() && !selectedAmenities.includes(customAmenity.trim())) {
      const newSelectedAmenities = [...selectedAmenities, customAmenity.trim()];
      setSelectedAmenities(newSelectedAmenities);
      setCustomAmenity('');
      if (updateFeatures) {
        updateFeatures(newSelectedAmenities);
      }
    }
  };

  const removeAmenity = (amenity) => {
    const newSelectedAmenities = selectedAmenities.filter(item => item !== amenity);
    setSelectedAmenities(newSelectedAmenities);
    if (updateFeatures) {
      updateFeatures(newSelectedAmenities);
    }
  };

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <Text style={styles.label}>Select Available Amenities</Text>

      <View style={[
        styles.inputContainer,
        error && styles.inputContainerError
      ]}>
        {/* Standard Amenities */}
        <View style={styles.featureSection}>
          <Text style={styles.sectionTitle}>Standard Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {allAmenities.map((amenity) => (
              <TouchableOpacity
                key={amenity}
                style={[
                  styles.amenityButton,
                  selectedAmenities.includes(amenity) && styles.amenityButtonSelected
                ]}
                onPress={() => toggleAmenity(amenity)}
              >
                <Text style={[
                  styles.amenityText,
                  selectedAmenities.includes(amenity) && styles.amenityTextSelected
                ]}>
                  {amenity}
                </Text>
                {selectedAmenities.includes(amenity) && (
                  <Ionicons name="checkmark" size={16} color="#fff" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom Amenities */}
        <View style={styles.featureSection}>
          <Text style={styles.sectionTitle}>Add Custom Amenities</Text>
          <View style={styles.customInputRow}>
            <TextInput
              style={styles.customInput}
              placeholder="Enter custom amenity"
              value={customAmenity}
              onChangeText={setCustomAmenity}
              onSubmitEditing={addCustomAmenity}
            />
            <TouchableOpacity 
              style={[styles.addButton, !customAmenity.trim() && styles.addButtonDisabled]}
              onPress={addCustomAmenity}
              disabled={!customAmenity.trim()}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          {selectedAmenities.filter(amenity => !allAmenities.includes(amenity)).length > 0 && (
            <View style={styles.customAmenitiesSection}>
              <Text style={styles.subSectionTitle}>Custom Amenities:</Text>
              <View style={styles.customAmenitiesList}>
                {selectedAmenities
                  .filter(amenity => !allAmenities.includes(amenity))
                  .map((amenity, index) => (
                    <View key={index} style={styles.customAmenityItem}>
                      <Text style={styles.customAmenityText}>{amenity}</Text>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => removeAmenity(amenity)}
                      >
                        <Ionicons name="close-circle" size={20} color="#ff4444" />
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.hintText}>
            {selectedAmenities.length > 0 
              ? `Selected ${selectedAmenities.length} amenity${selectedAmenities.length !== 1 ? 'ies' : ''}`
              : 'Tap to select available amenities'
            }
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 4,
    // Removed maxHeight to allow natural expansion
  },
  inputContainerError: {
    borderColor: '#ff3333',
  },
  featureSection: {
    marginBottom: 20,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
    marginTop: 4,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  amenityButtonSelected: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
  },
  amenityTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  checkIcon: {
    marginLeft: 4,
  },
  customInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  customInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  addButton: {
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: '#2962FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  customAmenitiesSection: {
    marginTop: 8,
  },
  customAmenitiesList: {
    gap: 8,
  },
  customAmenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  customAmenityText: {
    fontSize: 14,
    color: '#333',
  },
  deleteButton: {
    padding: 4,
  },
  footer: {
    minHeight: 20,
    marginTop: 8,
  },
  errorText: {
    color: '#ff3333',
    fontSize: 13,
  },
  hintText: {
    color: '#666',
    fontSize: 13,
  },
});