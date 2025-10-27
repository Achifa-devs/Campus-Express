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
  Platform
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropdownComp from '../../reusables/Dropdown';
import Tools from '../../utils/generalHandler';

const ProofOfDeliveryUpload = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [description, setDescription] = useState('');

    const pickImage = async() => {
        const hasPermission = await Tools.requestCameraPermission();

        if (!hasPermission) {
            Alert.alert('Permission Denied', 'You need to allow camera access.');
            return;
        }
        if (uploadedImages.length >= 2) {
            Alert.alert('Maximum reached', 'You can only upload up to 2 images.');
            return;
        }
        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                {
                    text: 'Take Photo',
                    onPress: () => handleLaunchCamera(),
                },
                {
                    text: 'Choose from Gallery',
                    onPress: () => handleLaunchGallery(),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };
    const handleLaunchCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            saveToPhotos: true, // optional: saves taken photo to gallery
        };

        launchCamera(options, (response) => {
            handleImageResponse(response);
        });
    };

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

    const handleImageResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            Alert.alert('Error', 'Failed to pick image: ' + response.errorMessage);
        } else if (response.assets && response.assets[0]) {
            const newImage = {
            uri: response.assets[0].uri,
            id: Date.now().toString(),
            };
            setUploadedImages(prev => [...prev, newImage]);
        }
    };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

    // launchCamera(options, (response) => {
    //     if (!response || response.didCancel) return;
    //     if (response.errorCode) {
    //         console.warn('Camera Error:', response.errorMessage);
    //         return;
    //     }
    //     const asset = response.assets?.[0];
    //     if (!asset?.uri) return;

    //     setUploadedImages(prev => [...prev, { uri: asset.uri, id: Date.now().toString() }]);
    // });


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


           
        </ScrollView>
        {/* Submit Button */}
        <View style={styles.bottomBar}>
            <TouchableOpacity
                style={[
                styles.submitButton,
                styles.bottomBtn,
                (uploadedImages.length === 0 || !description.trim()) && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={uploadedImages.length === 0 || !description.trim()}
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
    marginBottom: 12,
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
    marginBottom: 12,
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
    marginBottom: 12,
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
    marginBottom: 12,
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

    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
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