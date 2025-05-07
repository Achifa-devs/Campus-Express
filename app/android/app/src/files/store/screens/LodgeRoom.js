import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

export default function ProductDetailScreen({ route }) {
  const lodge = {
    title: "Luxury Student Lodge",
    lodgeName: "Eden Suites",
    location: "UNN Nsukka",
    price: 350000,
    videoUrl: "https://your-cdn.com/lodge1.mp4",
    features: ["24/7 Electricity", "Free Wi-Fi", "Furnished", "Water Supply"],
    description: "Spacious and fully furnished rooms ideal for students. Located 5 mins from campus.",
    contact: "+2348012345678"
  };

  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePause = () => setPaused(!paused);
  const toggleMute = () => setMuted(!muted);

  const handleContact = () => {
    Alert.alert('Contact Vendor', `Call or message ${lodge.contact}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => console.log('Call pressed') },
      { text: 'Message', onPress: () => console.log('Message pressed') }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Video Section */}
      <View style={styles.videoContainer}>
        <TouchableOpacity onPress={togglePause} activeOpacity={0.9}>
          <Video
            source={{ uri: lodge.videoUrl }}
            style={styles.video}
            resizeMode="cover"
            paused={paused}
            muted={muted}
            repeat
          />
          <TouchableOpacity onPress={toggleMute} style={styles.volumeIcon}>
            <Icon name={muted ? 'volume-mute' : 'volume-high'} size={24} color="#fff" />
          </TouchableOpacity>
          {paused && (
            <View style={styles.playButtonOverlay}>
              <Icon name="play" size={48} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>₦{lodge.price.toLocaleString()}</Text>
        </View>
        
        <Text style={styles.title}>{lodge.title}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-outline" size={16} color="#FF4500" />
          <Text style={styles.locationText}>{lodge.location} • {lodge.lodgeName}</Text>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="star-outline" size={20} color="#FF4500" />
            <Text style={styles.sectionTitle}>Key Features</Text>
          </View>
          <View style={styles.featuresContainer}>
            {lodge.features.map((feature, idx) => (
              <View key={idx} style={styles.featureItem}>
                <Icon name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="document-text-outline" size={20} color="#FF4500" />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          <Text style={styles.description}>{lodge.description}</Text>
        </View>

        {/* Contact Button */}
        <TouchableOpacity 
          onPress={handleContact} 
          style={styles.contactButton}
          activeOpacity={0.8}
        >
          <Icon name="call-outline" size={20} color="#fff" style={styles.contactIcon} />
          <Text style={styles.contactText}>Contact Vendor</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  videoContainer: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  video: {
    width: screenWidth,
    height: screenWidth * 0.6,
    backgroundColor: '#000',
  },
  volumeIcon: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  playButtonOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  priceTag: {
    position: 'absolute',
    top: -25,
    right: 20,
    backgroundColor: '#FF4500',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  featuresContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  contactButton: {
    marginTop: 16,
    backgroundColor: '#FF4500',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});