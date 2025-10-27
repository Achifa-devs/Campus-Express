import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ProofOfDeliveryUpload = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [description, setDescription] = useState('');

  const pickImage = () => {
    // Check if already have max images
    if (uploadedImages.length >= 2) {
      Alert.alert('Maximum reached', 'You can only upload up to 2 images.');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'Failed to pick image: ' + response.error);
      } else if (response.assets && response.assets[0]) {
        const newImage = {
          uri: response.assets[0].uri,
          id: Date.now().toString(),
        };
        setUploadedImages(prev => [...prev, newImage]);
      }
    });
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = () => {
    if (uploadedImages.length === 0) {
      Alert.alert('Image required', 'Please upload at least one image as proof of delivery.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Description required', 'Please provide a description for this delivery evidence.');
      return;
    }

    // Submit logic here
    Alert.alert('Success', 'Proof of delivery submitted successfully!');
    console.log('Submitted:', { 
      images: uploadedImages, 
      description,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Proof of Delivery Evidence</Text>
        <Text style={styles.subtitle}>
          Upload visual evidence that the delivery was completed successfully. 
          This helps verify delivery completion and resolve any customer disputes.
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
          {uploadedImages.map((image) => (
            <View key={image.id} style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeImage(image.id)}
              >
                <Text style={styles.removeText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          {/* Upload Button - Show if less than 2 images */}
          {uploadedImages.length < 2 && (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
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

      {/* Submit Button */}
      <TouchableOpacity 
        style={[
          styles.submitButton,
          (uploadedImages.length === 0 || !description.trim()) && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={uploadedImages.length === 0 || !description.trim()}
      >
        <Text style={styles.submitButtonText}>
          Submit Proof of Delivery
        </Text>
      </TouchableOpacity>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
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
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
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
    borderRadius: 8,
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
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
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
    marginBottom: 12,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
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
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  uploadIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
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
    color: '#007AFF',
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
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
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
    backgroundColor: '#e8f4fd',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066cc',
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