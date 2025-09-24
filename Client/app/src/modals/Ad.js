import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const AdModal = ({ isVisible, onClose, adContent }) => {
  // Sample ad content (you would replace this with your actual ad data)
  const defaultAdContent = {
    title: "Special Offer Just For You!",
    description: "Upgrade to our premium plan and get 50% off your first month. Limited time offer!",
    image: "https://via.placeholder.com/300x200/FF4500/FFFFFF?text=Special+Offer",
    cta: "Claim Offer Now",
    features: [
      "Advanced analytics",
      "Priority support",
      "Unlimited products",
      "Custom branding"
    ]
  };

  const ad = adContent || defaultAdContent;

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.7}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      useNativeDriverForBackdrop
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.adLabel}>Sponsored</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Ad Content - Takes most of the screen */}
          <View style={styles.adContent}>
            {/* Ad Image - Larger to take more space */}
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: ad.image }} 
                style={styles.adImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.textContent}>
              <Text style={styles.title}>{ad.title}</Text>
              <Text style={styles.description}>{ad.description}</Text>
              
              {/* Features List */}
              {ad.features && (
                <View style={styles.featuresContainer}>
                  {ad.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#FF4500" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Additional Info */}
              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>Limited time offer</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="people-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>Exclusive for you</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer with CTA Button - Fixed at bottom */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaText}>{ad.cta}</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    height: height , // Increased height to show more content
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40, // Added more top padding
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  adLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  adContent: {
    padding: 20,
    paddingBottom: 150, // Added padding to prevent content from being hidden behind fixed button
  },
  imageContainer: {
    width: '100%',
    height: height * 0.35, // Increased height to take more space
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    borderColor: '#000', 
    borderWidth: 1, 
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  featureText: {
    fontSize: 15,
    color: '#2D3436',
    marginLeft: 12,
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  ctaButton: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ctaText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default AdModal;