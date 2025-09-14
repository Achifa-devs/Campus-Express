import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const DisruptiveAdModal = ({ visible, adData, onClose, onAdPress }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(0));
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Sample ad data
  const sampleAds = [
    {
      id: 1,
      type: 'image',
      media: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      title: 'Premium Smartphone X Pro',
      price: '₦89,999',
      originalPrice: '₦99,999',
      location: 'Lagos, Nigeria',
      category: 'Electronics',
      sponsored: true,
      duration: 10000,
    },
    {
      id: 2,
      type: 'image',
      media: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      title: 'Luxury Watch Collection',
      price: '₦45,500',
      location: 'Abuja, Nigeria',
      category: 'Fashion',
      sponsored: true,
      duration: 8000,
    }
  ];

  const ads = adData || sampleAds;

  useEffect(() => { 
    if (visible) {
      // modalVisible.current = true;
      
      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(height);

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ]).start();

      // Auto-rotate ads
      if (ads.length > 1) {
        const timer = setInterval(() => {
          setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, ads[currentAdIndex]?.duration || 800);

        return () => clearInterval(timer);
      }
    } else if (!visible) {
      // modalVisible.current = false;
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible, ads.length]);
 
  const handleAdPress = () => {
    onAdPress?.(ads[currentAdIndex]);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const currentAd = ads[currentAdIndex];

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="#FFF" />
        </TouchableOpacity>

        {/* Ad Counter */}
        {ads.length > 1 && (
          <View style={styles.adCounter}>
            <Text style={styles.adCounterText}>
              {currentAdIndex + 1} of {ads.length}
            </Text>
          </View>
        )}

        <Animated.View 
          style={[
            styles.adContainer, 
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          {/* Media Content */}
          <TouchableOpacity 
            style={styles.mediaContainer} 
            onPress={handleAdPress}
            activeOpacity={0.9}
          >
            {currentAd.type === 'video' ? (
              <Video
                source={{ uri: currentAd.media }}
                style={styles.media}
                resizeMode="cover"
                paused={false}
                muted={false}
                repeat={true}
                controls={false}
              />
            ) : (
              <Image
                source={{ uri: currentAd.media }}
                style={styles.media}
                resizeMode="cover"
                onError={(error) => console.log('Image loading error:', error)}
              />
            )}

            {/* Sponsored Badge */}
            <View style={styles.sponsoredBadge}>
              <Ionicons name="star" size={12} color="#FFF" />
              <Text style={styles.sponsoredText}>Sponsored</Text>
            </View>

            {/* Skip Button */}
            {currentAd.type === 'video' && (
              <TouchableOpacity style={styles.skipButton} onPress={handleClose}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {/* Ad Content */}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>
              {currentAd.title}
            </Text>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>{currentAd.price}</Text>
              {currentAd.originalPrice && (
                <Text style={styles.originalPrice}>{currentAd.originalPrice}</Text>
              )}
            </View>

            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.metaText}>{currentAd.location}</Text>
              </View>
              
              <View style={styles.metaItem}>
                <Ionicons name="pricetag-outline" size={14} color="#666" />
                <Text style={styles.metaText}>{currentAd.category}</Text>
              </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity 
              style={styles.ctaButton} 
              onPress={handleAdPress}
            >
              <Text style={styles.ctaText}>View Product</Text>
            </TouchableOpacity>
          </View>

          {/* Indicator Dots */}
          {ads.length > 1 && (
            <View style={styles.indicatorContainer}>
              {ads.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === currentAdIndex && styles.indicatorActive
                  ]}
                />
              ))}
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 30,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adCounter: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 30,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  adCounterText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  adContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  mediaContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  sponsoredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 106, 0, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  sponsoredText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  skipButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skipText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6A00',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  ctaButton: {
    backgroundColor: '#FF6A00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
    gap: 6,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DDD',
  },
  indicatorActive: {
    backgroundColor: '#FF6A00',
    width: 12,
  },
});

export default DisruptiveAdModal;