import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Photo({ photos, updatePhotos, setUploading, updateThumbnail, productId, error }) {
  const [uploadProgress, setUploadProgress] = useState({});
  const [deletingIndex, setDeletingIndex] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const maxPhotos = 6;

  const selectPhoto = async (index) => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        selectionLimit: 1,
      };

      const response = await launchImageLibrary(options);
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Failed to select image. Please try again.');
      } else if (response.assets?.[0]) {
        await uploadToServer(response.assets[0], index);
      }
    } catch (error) {
      console.error('Image selection error:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const uploadToServer = async (image, index) => {
    try {
      setUploading(true);
      setUploadProgress(prev => ({ ...prev, [index]: 0 }));

      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        name: image.fileName || `product_${productId}_${Date.now()}.jpg`,
        type: image.type || 'image/jpeg',
      });
      formData.append('productId', productId);
      formData.append('isThumbnail', index === 0);

      const response = await axios.post('https://cs-server-olive.vercel.app/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(prev => ({ ...prev, [index]: progress }));
        },
      });
      console.log('Updated photos:', response.data.success, response.data.data?.url, index);

      if (response.data?.success && response.data.data?.url) {
        const newPhotos = [...photos];
        newPhotos[index] = { uri: response.data.data?.url, publicId: response.data.data?.public_id };
        updatePhotos(newPhotos);
        
        if (index === 0) {
          updateThumbnail(response.data.data?.url, response.data.data?.public_id);
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Failed', 'Could not upload image. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(prev => ({ ...prev, [index]: undefined }));
    }
  };

  const deletePhoto = async (index) => {
    try {
      setDeletingIndex(index);
      const photoToDelete = photos[index];
      console.error('Upload failed:', photoToDelete, index);
      
      if (photoToDelete?.publicId) {
        await axios.post('https://cs-server-olive.vercel.app/delete', {
          publicId: photoToDelete.publicId 
        });
      }

      const newPhotos = [...photos];
      newPhotos[index] = null;
      updatePhotos(newPhotos);

      if (index === 0 && newPhotos.some(photo => photo)) {
        // Set first available photo as thumbnail if deleting main photo
        const firstPhoto = newPhotos.find(photo => photo);
        if (firstPhoto) {
          updateThumbnail(firstPhoto.uri);
        }
      }
    } catch (error) {
      console.error('Delete failed:', error);
      Alert.alert('Error', 'Failed to delete photo. Please try again.');
    } finally {
      setDeletingIndex(null);
    }
  };

  const confirmDelete = (index) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deletePhoto(index), style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Photos ({photos.filter(Boolean).length}/{maxPhotos})
        </Text>
        <Text style={styles.hintText}>
            First photo will be used as thumbnail
          </Text>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {Array(maxPhotos).fill().map((_, index) => (
          <View key={index} style={styles.photoContainer}>
            {photos[index] ? (
              <View style={styles.imageWrapper}>
                <Image 
                  source={{ uri: photos[index].uri }} 
                  style={styles.image}
                  resizeMode="cover"
                />
                {uploadProgress[index] !== undefined ? (
                  <View style={styles.progressOverlay}>
                    <ActivityIndicator size="small" color="#FFF" />
                    <Text style={styles.progressText}>
                      {uploadProgress[index]}%
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmDelete(index)}
                    disabled={deletingIndex === index}
                  >
                    {deletingIndex === index ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Ionicons name="close" size={16} color="#FFF" />
                    )}
                  </TouchableOpacity>
                )}
                {index === 0 && (
                  <View style={styles.thumbnailBadge}>
                    <Text style={styles.thumbnailText}>Main</Text>
                  </View>
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => selectPhoto(index)}
                disabled={uploadProgress[index] !== undefined}
              >
                {uploadProgress[index] !== undefined ? (
                  <ActivityIndicator size="small" color="#FF4500" />
                ) : (
                  <>
                    <MaterialIcons name="add-a-photo" size={28} color="#FF4500" />
                    {index === 0 && (
                      <Text style={styles.addButtonText}>Add Main Photo</Text>
                    )}
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    height: 240,
    marginBottom: 0,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorText: {
    color: '#ff3333',
    fontSize: 13,
    marginTop: 4,
  },
  header: {
    marginBottom: 12,
  },
  headerText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  subHeaderText: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
  scrollContainer: {
    paddingVertical: 8,
  },
  photoContainer: {
    width: 120,
    height: 120,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  progressOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,0,0,0.7)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  thumbnailText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#FF4500',
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  addButtonText: {
    color: '#FF4500',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});