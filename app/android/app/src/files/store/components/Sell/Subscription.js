import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import ActionBtn from '../../../store/components/Home/buttons/actionBtn';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SUBSCRIPTION_OFFER = {
  price: 700,
  currency: '₦',
  title: 'Build Your Business',
  subtitle: 'Premium business tools and features',
  imageUrl: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1743769930/2024-06-27_dqlq3a.png'
};

export default function Subscription() {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8F9FA']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.image} 
              source={{ uri: SUBSCRIPTION_OFFER.imageUrl }} 
              resizeMode="contain"
            />
          </View> 
          
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              {SUBSCRIPTION_OFFER.title}
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              {SUBSCRIPTION_OFFER.subtitle}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {SUBSCRIPTION_OFFER.currency}{SUBSCRIPTION_OFFER.price}
                <Text style={styles.perMonth}>/month</Text>
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <ActionBtn 
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'rgba(245,245,245,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  image: {
    height: 80,
    width: 80,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#718096',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 22,
    color: '#38A169',
    fontWeight: '700',
  },
  perMonth: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '400',
    marginLeft: 4,
  },
  buttonContainer: {
    height: 48,
  },
  button: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3182CE',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});