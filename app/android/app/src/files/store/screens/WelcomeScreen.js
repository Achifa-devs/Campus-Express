import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';

const WelcomeScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const scaleValue = React.useRef(new Animated.Value(0.8)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
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
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: opacityValue,
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <View style={[styles.logoContainer, { width: screenWidth * 0.35, height: screenWidth * 0.35, borderRadius: (screenWidth * 0.35) / 2 }]}>
            <Image
              style={styles.logo}
              source={{
                uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png',
              }}
            />
          </View>

          <Text style={styles.title}>Campus Sphere</Text>
          <Text style={styles.subtitle}>Connecting campuses nationwide</Text>
        </Animated.View>

        <View style={styles.sponsorContainer}>
          <Text style={styles.sponsorText}>Sponsored by</Text>
          <Text style={styles.sponsorName}>U-COMMERCE LIMITED</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    borderWidth: 4,
    borderColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 24,
  },
  logo: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  title: {
    color: '#FF4500',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(255, 69, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  sponsorContainer: {
    alignItems: 'center',
  },
  sponsorText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  sponsorName: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
