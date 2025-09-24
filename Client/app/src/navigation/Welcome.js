
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import RNFS from 'react-native-fs';

const WelcomeScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const scaleValue = React.useRef(new Animated.Value(0.8)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

  }, []);

  

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor={"#FF4500"} />
     
      <View style={styles.container}>
        <View
          style={[
            styles.content]}
        >
          <View style={[styles.logoContainer, { width: screenWidth * 0.35, height: screenWidth * 0.35, borderRadius: (screenWidth * 0.35) / 2 }]}>
            <Image
              style={styles.logo}
              source={{
                uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/e_background_removal/f_png/v1750632165/20250622_233137_0000_lq4yjm.png',
              }}
            />
          </View>

          <Text style={styles.title}>Campus Sphere</Text>
          <Text style={styles.subtitle}>Connecting 169 campuses nationwide</Text>
        </View>

        {/* <View style={styles.sponsorContainer}>
          <Text style={styles.sponsorText}>Sponsored by</Text>
          <Text style={styles.sponsorName}>U-COMMERCE LIMITED</Text>
        </View> */}
      </View>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... keep all your existing styles ...

  safeContainer: {
    flex: 1,
    backgroundColor: '#FF4500',
  },
  container: {
    flex: 1,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    // borderWidth: 4,
    // borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4500',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 8,
    marginBottom: 24,
  },
  logo: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(255, 69, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  sponsorContainer: {
    alignItems: 'center',
    // marginVertical: 
  },
  sponsorText: {
    color: '#FFF',
    fontSize: 12,
    marginBottom: 4,
  },
  sponsorName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  // Add these new styles for the modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#FF4500',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noteText: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
});

export default WelcomeScreen;