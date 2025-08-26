import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Animated,
  Easing 
} from 'react-native';

export default function UploadBtn({ setUploadToTrue }) {
  const scaleValue = new Animated.Value(1);
  
  const handlePress = () => {
    // Add button press animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setUploadToTrue(true);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity 
          onPress={handlePress}
          style={styles.uploadButton}
          activeOpacity={0.8}
        >
          <Text style={styles.uploadButtonText}>Publish Now</Text>
        </TouchableOpacity>    
      </Animated.View>
      
      {/* <View style={styles.draftContainer}>
        <TouchableOpacity 
          style={styles.draftButton}
          disabled={true}
        >
          <Text style={styles.draftButtonText}>Save Draft</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flex: 1,
    marginRight: 8,
  },
  uploadButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  draftContainer: {
    width: 100,
  },
  draftButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  draftButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
  },
});