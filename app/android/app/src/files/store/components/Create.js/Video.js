import React, { useState, useRef } from 'react';
import {
  Dimensions,
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
import Video from 'react-native-video';

export default function VideoUpload({ videos, updatePhotos, setUploading, updateThumbnail, productId, error }) {
  const [uploadProgress, setUploadProgress] = useState({});
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [pausedVideos, setPausedVideos] = useState({}); // Track which videos are paused
  const videoRefs = useRef({});
  const screenWidth = Dimensions.get('window').width;
  const maxVideos = 4;

  const selectVideo = async (index) => {
    try {
      const options = {
        mediaType: 'video',
        quality: 1,
        selectionLimit: 1,
        videoQuality: 'high',
      };

      const response = await launchImageLibrary(options);
      
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Failed to select video. Please try again.');
      } else if (response.assets?.[0]) {
        await uploadToServer(response.assets[0], index);
      }
    } catch (error) {
      console.error('Video selection error:', error);
      Alert.alert('Error', 'Failed to select video. Please try again.');
    }
  };

  const uploadToServer = async (video, index) => {
    try {
      setUploading(true);
      setUploadProgress(prev => ({ ...prev, [index]: 0 }));

      const formData = new FormData();
      formData.append('file', {
        uri: video.uri,
        name: video.fileName || `product_${productId}_${Date.now()}.mp4`,
        type: video.type || 'video/mp4',
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

      if (response.data?.success && response.data.data?.url) {
        const newVideos = [...videos];
        newVideos[index] = { 
          uri: response.data.data?.url, 
          publicId: response.data.data?.public_id,
        };
        updatePhotos(newVideos);

        if (index === 0) {
          updateThumbnail(response.data.data?.url, response.data.data?.public_id);
        }
        
        // Pause all other videos when a new one is added
        setPausedVideos(prev => {
          const newPaused = {...prev};
          Object.keys(newPaused).forEach(key => {
            newPaused[key] = true;
          });
          return newPaused;
        });
      }
    } catch (error) {
      console.error('Video upload failed:', error);
      Alert.alert('Upload Failed', 'Could not upload video. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(prev => ({ ...prev, [index]: undefined }));
    }
  };

  const deleteVideo = async (index) => {
    try {
      setDeletingIndex(index);
      const videoToDelete = videos[index];
      
      if (videoToDelete?.uri) {
        await axios.post('https://cs-server-olive.vercel.app/delete', {
          url: videoToDelete.uri,
          type: 'video'
        });
      }

      const newVideos = [...videos];
      newVideos[index] = null;
      updatePhotos(newVideos);

      if (index === 0 && newVideos.some(video => video)) {
        // Set first available video as main if deleting main video
        const firstVideo = newVideos.find(video => video);
        if (firstVideo) {
          updateThumbnail(firstVideo.uri);
        }
      }
    } catch (error) {
      console.error('Video delete failed:', error);
      Alert.alert('Error', 'Failed to delete video. Please try again.');
    } finally {
      setDeletingIndex(null);
    }
  };

  const confirmDelete = (index) => {
    Alert.alert(
      'Delete Video',
      'Are you sure you want to delete this video?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteVideo(index), style: 'destructive' },
      ]
    );
  };

  const togglePlayPause = (index) => {
    setPausedVideos(prev => {
      const newPaused = {...prev};
      
      // Pause all other videos
      Object.keys(newPaused).forEach(key => {
        if (parseInt(key) !== index) {
          newPaused[key] = true;
        }
      });
      
      // Toggle the current video
      newPaused[index] = !newPaused[index];
      return newPaused;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Videos ({videos.filter(Boolean).length}/{maxVideos})
        </Text>
        <Text style={styles.hintText}>
          First video will be used as the main video
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
        {Array(maxVideos).fill().map((_, index) => (
          <View key={index} style={styles.videoContainer}>
            {videos[index] ? (
              <View style={styles.videoWrapper}>
                {/* Video Player */}
                <Video
                  ref={ref => videoRefs.current[index] = ref}
                  source={{ uri: videos[index].uri }}
                  style={styles.videoPlayer}
                  resizeMode="cover"
                  paused={pausedVideos[index] !== false} // Default to paused
                  repeat={true}
                  muted={true}
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
                
                {/* Play/Pause Button */}
                <TouchableOpacity
                  style={styles.playPauseButton}
                  onPress={() => togglePlayPause(index)}
                >
                  <Ionicons 
                    name={pausedVideos[index] ? "play" : "pause"} 
                    size={24} 
                    color="#FFF" 
                  />
                </TouchableOpacity>
                
                {index === 0 && (
                  <View style={styles.mainBadge}>
                    <Text style={styles.mainText}>Main</Text>
                  </View>
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => selectVideo(index)}
                disabled={uploadProgress[index] !== undefined}
              >
                {uploadProgress[index] !== undefined ? (
                  <ActivityIndicator size="small" color="#FF4500" />
                ) : (
                  <>
                    <MaterialIcons name="video-library" size={28} color="#FF4500" />
                    {index === 0 && (
                      <Text style={styles.addButtonText}>Add Main Video</Text>
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
    height: 250,
    marginBottom: -6,
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
  hintText: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
  scrollContainer: {
    paddingVertical: 8,
  },
  videoContainer: {
    width: 150,
    height: 120,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  progressOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
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
    zIndex: 10,
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  mainBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 5,
  },
  mainText: {
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