import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import ActionBtn from '../../../store/components/Home/buttons/actionBtn';
import { useTheme } from '@react-navigation/native'; // Optional: for theme support

const SUBSCRIPTION_OFFER = {
  price: 700,
  currency: '₦',
  title: 'Build Your Business For',
  imageUrl: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1743769930/2024-06-27_dqlq3a.png'
};

export default function Subscription() {
  const { colors } = useTheme(); // Optional: for theme support

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.image} 
              source={{ uri: SUBSCRIPTION_OFFER.imageUrl }} 
              resizeMode="cover"
            />
          </View> 
          
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              {SUBSCRIPTION_OFFER.title}{' '}
              <Text style={styles.price}>
                {SUBSCRIPTION_OFFER.currency}{SUBSCRIPTION_OFFER.price}
              </Text>
            </Text> 
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <ActionBtn />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    width: '30%',
    paddingRight: 12,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  textContainer: {
    width: '70%',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  price: {
    fontSize: 15,
    color: '#3fcd32',
    fontWeight: '600',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});